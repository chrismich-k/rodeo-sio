
import { useState, useContext, useEffect } from "react";
import { UALContext } from "ual-reactjs-renderer";
import { MyAudioContext } from "./AudioPlayer";


export default function LoginWax() {

    const [LoginName, setLoginName] = useState('');
    const [walletAssets, setWalletAssets] = useState([]);

    const ual = useContext(UALContext);

    const presets = {
        "69668": {
            Speed1:0.07, Speed2: 1.25, LoPassFilter1: 0.5, LoPassFilter2: 1.9, Volume1: 1.5, Volume2: 0.5   
                 },
                 
         "69537": {Speed1:0.07, Speed2: 1.25, LoPassFilter1: 0.5, LoPassFilter2: 1.9, Volume1: 1.5, Volume2: 0.5}
   
    }
   
    const {
        playerOne,
        playerTwo,
        filterFrequencyOne,
        setFilterFrequencyOne,
        volumeValueOne,
        setVolumeValueOne,
        pitchValueOne,
        setPitchValueOne,
        volumeValueTwo,
        setVolumeValueTwo,
        pitchValueTwo,
        setPitchValueTwo,
        filterFrequencyTwo,
        setFilterFrequencyTwo,
        setCounter,
      } = useContext(MyAudioContext);
    
    
    useEffect(() => {
        if (ual.activeUser) {
          const wallet = ual.activeUser.accountName;
          const template = "458090"
         
    
          const temp_url =
            "https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=" +
            wallet +
            "&template_id="+template+
            "&page=1&limit=1000&order=desc&sort=asset_id";
          fetch(temp_url)
            .then((response) => response.json())
            .then((json) => {
              setWalletAssets(json.data);
              console.log(json.data);
              return json.data;
            })
            .then((assets) => {
              console.log(
                "got rest data for " +
                  Object.keys(assets).length +
                  " assets in wallet"
              );
            })
    
            .catch((error) => {
              console.error(error);
            });
        } 
        

      }, [ual, setWalletAssets]);



      const login = () => {
        ual.logout();
        ual.showModal();  
      };

    //   const setPreset = (mint_nr) => {
    //     setVolumeValueOne(presets[mint_nr].Volume1)

    //   };

    return (
        <>
           
            <button
           
            onClick={() => {
              login();
            }}

          >Login</button>
          
          <span>{ual.activeUser?.accountName}</span>

           <ul>
            {walletAssets?.map((asset, index)=>  
            <li key={asset.template_mint}>
                <button
                  onClick={setVolumeValueOne(presets[asset.template_mint]?.Volume1)}
                >{asset.template_mint}</button></li>
            )}

          </ul> 
            
        </>

        
    );

}

