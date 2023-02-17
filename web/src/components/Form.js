import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import * as consts from '../consts';
import {get_contract} from '../utils';
const { Keyring } = require('@polkadot/keyring');


var add_adversiment = async (api, account, extensions, is_buy, rate, balance) => {
  var contract = get_contract(api);

  balance = parseInt(balance, 10);
  rate = parseInt(rate);
  api.setSigner(extensions[0].signer)

  const { gasRequired, result, output } = await contract.tx.newAdvertisement(
    {
      dest:consts.CONTRACT_ADDRESS,
      value:balance,
      gasLimit: api.registry.createType('WeightV2', {
        refTime: consts.refTime,
        proofSize: consts.proofSize,
      }),
      storageDepositLimit: consts.storageDepositLimit,
    },
    is_buy, rate
  ).signAndSend(account, result => {
    if (result.status.isInBlock) {
      console.log('in a block');
    } else if (result.status.isFinalized) {
      console.log('finalized');
    }
  });

  console.log(result.toHuman());
  console.log(output.toHuman());
  // check if the call was successful
  if (result.isOk) {
    
    return output?.toNumber()
  } else {
    console.error('Error', result.toHuman())
    console.error('Error', result.asErr)
  }
};



function Form({ api, account, extensions }) {

    const [rate, setRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [isBuy, setIsBuy] = useState('true');


    const handleSubmit= (e) => {
        add_adversiment(api, account, extensions,   isBuy == 'true', rate, amount);
        
      }

    return (
      <Stack
      component="form"
      sx={{
        width: '25ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
        <h3>Add new Adversiment</h3>
            <TextField
                    label="Rate"
                    id="rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    />
            
                
            <TextField
                    label="Amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
            <ToggleButtonGroup
                color="primary"
                value={isBuy}
                exclusive
                onChange={(e, value) => setIsBuy(value)}
                aria-label="Platform"
                >
                <ToggleButton value="true">Buy</ToggleButton>
                <ToggleButton value="false">Sell</ToggleButton>
                </ToggleButtonGroup>
       
          <Button onClick={handleSubmit}
            variant="contained">Add</Button>

      </Stack>
  
    );
  }
  
  export default Form;
  