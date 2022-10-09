import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../../web3RPC";

const clientId = "BGc1PFGZCX0OZSZcOtyIMvRSqprQlb5DG2fySLNCPvWhdNEbn1kxIz2qtCmakWgVl5gezjM8JZhKtfkzw5KPvUQ"; // get from https://dashboard.web3auth.io

const NavbarStyleTwo = (props: any) => {
  const [menu, setMenu] = React.useState(true);
  const [form, setForm] = useState(props.form);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  const toggleNavbar = () => {
    setMenu(!menu);
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
  

    const selectForm = (form: any) => {
        console.log("Selected form1: " + form);
        setForm(form);   
        props.selectForm(form);                
    };

    
  
    const getUserInfo = async () => {
      if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
      }
      const user = await web3auth.getUserInfo();
      console.log(user);
    };
  
    const logout = async () => {
      selectForm("");
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
        <button onClick={getUserInfo} className="card">
          Get User Info
        </button>
        <button onClick={getChainId} className="card">
          Get Chain ID
        </button>       
        <button onClick={getPrivateKey} className="card">
          Get Private Key
        </button>
        <button onClick={logout} className="card">
          Log Out
        </button>
  
        <div id="console" style={{ whiteSpace: "pre-line" }}>
          <p style={{ whiteSpace: "pre-line" }}></p>
        </div>
      </>
    );
  
    
  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";
 
  return (
    <header id="header" className="headroom navbar-style-two">
      <div className="startp-nav">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <a onClick={toggleNavbar} className="navbar-brand">
              <img src="/images/dark_transparent_cropped.png" alt="logo" style={{height: '57px'}} />
            </a>
            <div className={classOne} id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item text-silver">
                {provider? (
                  <> 
                      {loggedInView}
                      <h6> Address:  </h6> 
                      logged in with web3auth <button className="deedoo-button-logout" onClick={logout}
                      
                      >Log out</button>
                  </>
                ):""}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavbarStyleTwo;
