import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import NavBar from './NavBar';
import Container from './Container';





function App() {
  const [mounted, setMounted] = useState(false)
  const [account, setaccount] = useState("");
  
  const LoadBlockChainData = async() =>
  {
  //<----- Old way --->
  // if (window.ethereum) 
  // {
  //   const web3 = new Web3(window.ethereum);
  //   // Ask User permission to connect to Metamask
  //   await window.ethereum.enable();
  // };

  //<---- New Way to connect to metamask ---->
  if (window.ethereum) 
  {
      try 
      {
        const provider = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //setaccount(accounts);
      } 
      catch (error)
       {
        if (error.code === 4001) 
          {
            // User rejected request
          }
        }
  }

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts();
    //console.log("account", accounts[0])
    setaccount(accounts);
  }
    
  
  if(!mounted)
    {
    // Code for componentWillMount here
    LoadBlockChainData()
    }
    useEffect(() =>{setMounted(true)},[])



  
  return (
    
    <div className="container">
    <NavBar account= {account}/>
      <h1>E Voting Dapp</h1>
      <p>Your Account : {account} </p>
      <Container title={"Register"} content={"Get your self registered"} button={"Get Registered"} />
    </div>
  );
}

export default App;



 




