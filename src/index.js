import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from "react";
import { UALProvider } from "ual-reactjs-renderer";
import { Wax } from "@eosdacio/ual-wax";
import { Anchor } from "ual-anchor";
import { JsonRpc } from "eosjs";

import App from './App';

const chains = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "wax.greymass.com",
      port: 443
    }
  ]
};

const endpoint = `${chains.rpcEndpoints[0].protocol}://${chains.rpcEndpoints[0].host}:${chains.rpcEndpoints[0].port}`;
const rpc = new JsonRpc(endpoint);

const appName = 'WaxAudio';
const wcw = new Wax([chains]);
const anchor = new Anchor([chains], { appName: appName });


ReactDOM.render(
  <>
    <UALProvider
      appName={appName}
      authenticators={[wcw, anchor]}
      chains={[chains]}>
    
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </UALProvider>
</>,
  document.getElementById('root') 
);

