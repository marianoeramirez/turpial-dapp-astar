import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { useState, useEffect, useCallback } from 'react';

import { options } from '@astar-network/astar-api';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import {
  web3Enable,
  isWeb3Injected,
  web3Accounts,
} from '@polkadot/extension-dapp'

import Form from './components/Form';
import ListAdversiments from './components/ListAdversiments';

import * as consts from './consts';

var wsProvider = new WsProvider(consts.URL_PROVIDER);


function App() {
  const [apiState, setApi] = useState();
  const [address, setAddress] = useState('')
  const [account, setAccount] = useState('')
  const [accounts, setAccounts] = useState([])
  const [extensions, setExtensions] = useState([])

  useEffect(() => {
    
  }, [address])

  // load Substrate wallet and set the signer
  const initSubstrateProvider = useCallback(async () => {
    

    const extensions = await web3Enable('Turpial')

    if (extensions.length > 0) {
      setExtensions(extensions)
    }else{
      if (!isWeb3Injected) {
        throw new Error('The user does not have any Substrate wallet installed')
      }
    }

    // set the first wallet as the signer (we assume there is only one wallet)
    // wallet.substrate.setSigner(extensions[0].signer)

    const injectedAccounts = await web3Accounts()

    if (injectedAccounts.length > 0) {
      setAccounts(injectedAccounts)
    }
  }, [])

  const handleOnSelect = async (event) => {
    setAccount(event.target.value)
  }

   useEffect(() => {
      ApiPromise.create(options({ wsProvider })).then(async (api) => {
          await api.isReady;
          setApi(api);
      });

      
   }, []);

  function forcereload(){}
   
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {apiState && (
              <ListAdversiments api={apiState} account={account} extensions={extensions} />
            )}
        </Grid>
        <Grid item xs={6}>
        <button onClick={initSubstrateProvider}>Load Wallets</button><br />
        <select onChange={handleOnSelect}>
            <option value="">Select Address</option>
            {accounts.map(account => (
              <option key={account.address} value={account.address}>{account.meta.name} {account.address}</option>
            ))}
          </select><br />
          <Form api={apiState} account={account} extensions={extensions} forcereload={forcereload} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
