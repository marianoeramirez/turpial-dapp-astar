#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;


pub type TokenId = u128;


#[ink::contract]
pub mod turpial {
    use ink_storage::{
        traits::SpreadAllocate,
        traits::SpreadLayout,
        traits::PackedLayout,
        Mapping,
    };
    use scale::{
        Decode,
        Encode,
    };
    use super::*;

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode, PartialEq)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    enum TypeOperation{
        Buy,
        Sell
    }

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    struct Adversiment{
        type_operation: TypeOperation,
        rate:u32,
        // payment_method
        balance:Balance,
        owner: AccountId,
        interested: Option<AccountId>,
        mark_as_paid:bool,
        finalized:bool,
    }

    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct Turpial {
        admin: AccountId,
        token_id_nonce: TokenId,
        /// Mapping from token to owner.
        token_owner: Mapping<TokenId, Adversiment>,

    }

    #[derive(Encode, Decode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        NotValid,
        TokenNotFound,
        NotAllowed,
        CallerIsNotOwner,
        CallerIsNotContrapart
    }


    impl Turpial {
        /// Creates a new flipper smart contract initialized with the given value.
        #[ink(constructor)]
        pub fn new() -> Self {
            ink_lang::utils::initialize_contract(|contract: &mut Self| {
                contract.admin = Self::env().caller();
            })
        }

        #[ink(message, payable)]
        pub fn new_advertisement(&mut self, is_buy:bool, rate:u32) -> Result<TokenId, Error> {
            let _transferred = self.env().transferred_value();
            
            if _transferred == 0 || rate == 0 {
                return Err(Error::NotValid)
            }

            self.token_id_nonce += 1;

            self.token_owner.insert(self.token_id_nonce,&Adversiment{
                balance:_transferred,
                owner:self.env().caller(),
                finalized:false,
                type_operation: if is_buy { TypeOperation::Buy } else { TypeOperation::Sell },
                rate,
                interested: None,
                mark_as_paid:false,
            });
            Ok(self.token_id_nonce)
        }
        #[ink(message)]
        pub fn last_token(&self) -> TokenId {
            self.token_id_nonce
        }

        #[ink(message)]
        pub fn get_balance(&self, id: TokenId) -> Result<Balance, Error> {
            if id > self.token_id_nonce || id == 0 {
                return Err(Error::TokenNotFound)
            }

            let instance = self.token_owner.get(id).unwrap();
            Ok(instance.balance)
        }
        
        #[ink(message)]
        pub fn get_rate(&self, id: TokenId) -> u32 {
            self.token_owner.get(id).unwrap().rate
        }
        
        
        #[ink(message)]
        pub fn get_is_buy(&self, id: TokenId) -> bool {
            self.token_owner.get(id).unwrap().type_operation == TypeOperation::Buy
        }

        
        #[ink(message)]
        pub fn get_finalized(&self, id: TokenId) -> bool {
            self.token_owner.get(id).unwrap().finalized
        }


        #[ink(message)]
        pub fn start_commerce(&mut self, id: TokenId) -> Result<(), Error>{
            if id > self.token_id_nonce || id == 0 {
                return Err(Error::TokenNotFound)
            }

            let caller = self.env().caller();
            let owner = self.token_owner.get(id).unwrap().owner;
            if caller == owner {
                return Err(Error::NotAllowed)
            }
            self.token_owner.get(id).unwrap().interested = Some(self.env().caller());
            Ok(())
        }

        #[ink(message)]
        pub fn mark_as_paid(&mut self, id: TokenId) -> Result<(), Error> {
            if id > self.token_id_nonce || id == 0 {
                return Err(Error::TokenNotFound)
            }

            let caller = self.env().caller();
            
            let interested = self.token_owner.get(id).unwrap().interested.unwrap();
            if caller != interested {
                return Err(Error::CallerIsNotContrapart)
            }

            self.token_owner.get(id).unwrap().mark_as_paid = true;
            Ok(())
        }


        #[ink(message)]
        pub fn release_money(&mut self, id: TokenId) -> Result<(), Error> {
            if id > self.token_id_nonce || id == 0 {
                return Err(Error::TokenNotFound)
            }

            let caller = self.env().caller();
            let owner = self.token_owner.get(id).unwrap().owner;
            if caller != owner {
                return Err(Error::CallerIsNotOwner)
            }

            self.token_owner.get(id).unwrap().finalized = true;
            let instance = self.token_owner.get(id).unwrap();
            self.env().transfer(instance.interested.unwrap(), instance.balance);
            Ok(())
        }
    }

    #[cfg(test)]
    mod tests {
        use ink_lang as ink;

        use super::*;

        #[ink::test]
        fn default_works() {
            let flipper = Flipper::new_default();
            assert!(!flipper.get());
        }

        #[ink::test]
        fn it_works() {
            let mut flipper = Flipper::new(false);
            assert!(!flipper.get());
            flipper.flip();
            assert!(flipper.get());
        }
    }

    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        use super::*;
        use ink_e2e::build_message;

        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        #[ink_e2e::test]
        async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<(), E> {
            // given
            let constructor = FlipperRef::new(false);
            let contract_acc_id = client
                .instantiate("flipper", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            let get = build_message::<FlipperRef>(contract_acc_id.clone())
                .call(|flipper| flipper.get());
            let get_res = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_res.return_value(), false));

            // when
            let flip = build_message::<FlipperRef>(contract_acc_id.clone())
                .call(|flipper| flipper.flip());
            let _flip_res = client
                .call(&ink_e2e::bob(), flip, 0, None)
                .await
                .expect("flip failed");

            // then
            let get = build_message::<FlipperRef>(contract_acc_id.clone())
                .call(|flipper| flipper.get());
            let get_res = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_res.return_value(), true));

            Ok(())
        }

        #[ink_e2e::test]
        async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<(), E> {
            // given
            let constructor = FlipperRef::new_default();

            // when
            let contract_acc_id = client
                .instantiate("flipper", &ink_e2e::bob(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // then
            let get = build_message::<FlipperRef>(contract_acc_id.clone())
                .call(|flipper| flipper.get());
            let get_res = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_res.return_value(), false));

            Ok(())
        }
    }
}
