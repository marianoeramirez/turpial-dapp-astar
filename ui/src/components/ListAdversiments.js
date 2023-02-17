import React, { useState, useEffect } from 'react';

import * as consts from '../consts';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {get_contract} from '../utils';

var send_start_commerce = async (api, account, extensions, id) => {
  var contract = get_contract(api);

  api.setSigner(extensions[0].signer)

  const { gasRequired, result, output } = await contract.tx.startCommerce(
    {
      dest:consts.CONTRACT_ADDRESS,
      gasLimit: api.registry.createType('WeightV2', {
        refTime: consts.refTime,
        proofSize: consts.proofSize,
      }),
      storageDepositLimit: consts.storageDepositLimit,
    },
    id
  ).signAndSend(account, result => {
    console.log(result.toHuman());
    if (result.status.isInBlock) {
      console.log('in a block');
    } else if (result.status.isFinalized) {
      console.log('finalized');
    }
  });

};


var send_mark_as_paid = async (api, account, extensions, id) => {
  var contract = get_contract(api);

  api.setSigner(extensions[0].signer)

  const { gasRequired, result, output } = await contract.tx.markAsPaid(
    {
      dest:consts.CONTRACT_ADDRESS,
      gasLimit: api.registry.createType('WeightV2', {
        refTime: consts.refTime,
        proofSize: consts.proofSize,
      }),
      storageDepositLimit: consts.storageDepositLimit,
    },
    id
  ).signAndSend(account, result => {
    console.log(result.toHuman());
    if (result.status.isInBlock) {
      console.log('in a block');
    } else if (result.status.isFinalized) {
      console.log('finalized');
    }
  });

};


var send_release_money = async (api, account, extensions, id) => {
  var contract = get_contract(api);

  api.setSigner(extensions[0].signer)

  const { gasRequired, result, output } = await contract.tx.releaseMoney(
    {
      dest:consts.CONTRACT_ADDRESS,
      gasLimit: api.registry.createType('WeightV2', {
        refTime: consts.refTime,
        proofSize: consts.proofSize,
      }),
      storageDepositLimit: consts.storageDepositLimit,
    },
    id
  ).signAndSend(account, result => {
    console.log(result.toHuman());
    if (result.status.isInBlock) {
      console.log('in a block');
    } else if (result.status.isFinalized) {
      console.log('finalized');
    }
  });

};

var get_number_tokens = async (api) => {
      var contract = get_contract(api);

      const { gasRequired, result, output } = await contract.query.lastToken(
        consts.ALICE_ADDRESS,
        {
          dest:consts.CONTRACT_ADDRESS,
          gasLimit: api.registry.createType('WeightV2', {
            refTime: consts.refTime,
            proofSize: consts.proofSize,
          }),
          storageDepositLimit: consts.storageDepositLimit,
        }
      )

      // check if the call was successful
      if (result.isOk) {
        
        return output?.toNumber()
      } else {
        console.error('Error', result.toHuman())
        console.error('Error', result.asErr)
      }
};



var get_row_information= async (api, row, method) => {
      var contract = get_contract(api);

      const { gasRequired, result, output } = await contract.query[method](
        consts.ALICE_ADDRESS,
        {
          dest:consts.CONTRACT_ADDRESS,
          gasLimit: api.registry.createType('WeightV2', {
            refTime: consts.refTime,
            proofSize: consts.proofSize,
          }),
          storageDepositLimit: consts.storageDepositLimit,
        }, row
      )

      // check if the call was successful
      if (result.isOk) {
        
        return output
      } else {
        console.error('Error', result.toHuman())
        console.error('Error', result.asErr)
      }
};

function ListAdversiments({ api, account, extensions }) {
  const [is_buy, setFilterBuy] = useState('true');
  const [result, setResult] = useState([]);
  useEffect(() => {
    get_number_tokens(api).then(async (tokens) =>{
      var list_results = [];
      for(var x=1; x <=tokens; x++ ){
        var finalized = await get_row_information(api, x, 'getFinalized');
        // if(finalized == false)
        //   continue
        var id = x;
        var balance = await get_row_information(api, x, 'getBalance');
        var rate = await get_row_information(api, x, 'getRate');
        var is_buy = await get_row_information(api, x, 'getIsBuy');
        list_results.push({id:id,
          balance: balance.toHuman()['Ok'], rate: rate.toHuman(), 
          is_buy:is_buy.toHuman(), finalized:finalized.toHuman()})
      }
      setResult(list_results);
    })
  },[]);
  function start_commerce(row) {
    send_start_commerce(api, account, extensions, row.id)
  }
  function mark_as_paid(row) {
    send_mark_as_paid(api, account, extensions, row.id)
  }
  function release_money(row) {
    send_release_money(api, account, extensions, row.id)
  }
    return (
        <div>
          <ToggleButtonGroup
                color="primary"
                value={is_buy}
                exclusive
                onChange={(e, value) => setFilterBuy(value)}
                aria-label="Platform"
                >
                <ToggleButton value="true">Buy</ToggleButton>
                <ToggleButton value="false">Sell</ToggleButton>
          </ToggleButtonGroup>

          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Rate</TableCell>
                <TableCell align="center">Balance</TableCell>
                <TableCell align="center">Finalized</TableCell>
                <TableCell align="left">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row) => {
                if(is_buy == "true" && row.is_buy )
                  return null;

                if(is_buy == "false" && row.is_buy == false )
                  return null;
                return (<TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.rate}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                  <TableCell align="right">{row.finalized}</TableCell>
                  <TableCell>
                      <Button onClick={() => start_commerce(row)}>Start</Button>
                      <Button onClick={() => mark_as_paid(row)}>Mark as paid</Button>
                      <Button onClick={() => release_money(row)}>Release money</Button>
                  </TableCell>
                </TableRow>);
              }
                
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        </div>
    );
  }
  
  export default ListAdversiments;
  