import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import Navbar from "./components/global/Navbar";
import Buttons from "./components/deedoo/Buttons";
import Footer from "./components/global/Footer";

import BackingForm from "./components/deedoo/BackingForm";
import LearningForm from "./components/deedoo/LearningForm";
import TeachingForm from "./components/deedoo/TeachingForm";
import RPC from "./web3RPC";
import "./App.css";

const clientId = "BGc1PFGZCX0OZSZcOtyIMvRSqprQlb5DG2fySLNCPvWhdNEbn1kxIz2qtCmakWgVl5gezjM8JZhKtfkzw5KPvUQ"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [form, setForm] = useState("");
  const [userAddress, setUserAddress]=useState("");

  const selectForm = (form: any) => {
    console.log("Selected form2: " + form);
    setForm(form);                
  };
  const selectUserAddress = (userAddress: any) => {
    console.log("Selected form2: " + userAddress);
    setUserAddress(userAddress);                
  };

  useEffect(() => {
    const init = async () => {
      try {

        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x13881", // hex of 80001, polygon testnet
            rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
            // Avoid using public rpcTarget in production.
            // Use services like Infura, Quicknode etc
            displayName: "Polygon Mainnet",
            blockExplorer: "https://mumbai.polygonscan.com/",
            ticker: "MATIC",
            tickerName: "Matic",
          },
        });

      setWeb3auth(web3auth);

      await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);          
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
    selectUserAddress(user);
    
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
    <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-xs-8">
            <div className="single-blog-post">      

            <button className="deedoo-button-auth" onClick={getUserInfo} >
              Get User Info
            </button>      
            <button  className="deedoo-button-auth" onClick={getPrivateKey} >
              Get Private Key
            </button>
            <button  className="deedoo-button-auth" onClick={logout} >
              Log Out
            </button>

            <div id="console" style={{ whiteSpace: "pre-line" }}>
              <p style={{ whiteSpace: "pre-line" }}></p>
            </div>
          </div>
        </div>
      </div>

    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login with web3auth
    </button>
  );

  return (
    <>
<Navbar selectForm={(form: any) => selectForm(form)}/>
      {provider ? (
        <div className="container-home">
          <>
        {form=='teaching' ? 
          <TeachingForm selectForm={(form: any) => selectForm(form)}/>
        : form=='backing' ? 
          <BackingForm selectForm={(form: any) => selectForm(form)}/>
        : form=='learning' ? 
          <LearningForm selectForm={(form: any) => selectForm(form)}/>
        : (
        <>
        <label id="res-auth"></label>
          <Buttons selectForm={(form: any) => selectForm(form)}/>
          {loggedInView}
          
          </>)
        }
        
        </>
        </div>
      ) :  (


        <div className="container">
          <div className="section-title">
              <h2>LOG IN</h2>
              <div className="bar"></div>
              
              <img src="/images/dark_transparent_cropped.png" alt="logo" style={{height: '120px'}} />
          </div>

          <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 col-xs-8">
                  <div className="single-blog-post">            
                      <div>{provider ? loggedInView : unloggedInView} </div>
                  </div>
              </div>
          </div>
        </div>




      )}

      <Footer />
      

      </>
  );
}

export default App;