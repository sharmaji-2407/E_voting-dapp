import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import NavBar from './NavBar';
import Vote from './Vote';
import Container from './Container';
import ElectionAbi from './contracts/Elections.json';





function App() {
  //const [mounted, setMounted] = useState(false)
  const [currentAccount, setcurrentAccount] = useState("");
  const [loader, setloader] = useState(true);
  
  
  //storing smart contract instance to interact with it
  const [ElectionSC, setElectionSC] = useState();

  const [Candidate1, setCandidate1] = useState();
  const [Candidate2, setCandidate2] = useState();
  const [Candidate3, setCandidate3] = useState();


  //to run these two functions before react mounts the component
  useEffect(() => {
    loadWeb3();
    LoadBlockChainData();
  
  }, []);





  

  //function to check meta mask is installed or not
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    } 
    
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  //function to interact with blockchain 
  const LoadBlockChainData = async () =>{
    //swtting loader as true here 
    setloader(true);


    const web3 = window.web3;

    // getting all accounts from meta mask wallet
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    //setting current account to state variable
    setcurrentAccount(account);

    //getting network id
    const networkId = await web3.eth.net.getId();

    //getting address of smart contract to interact with it
    const networkData = ElectionAbi.networks[networkId];




    //setting up a condition to check if network id is compatible with ganache or not
    //Basically check connection with ganache

    if(networkData){
      
      //<----defining smart contract in front-end to interact with it.---->
      const election = new web3.eth.Contract(ElectionAbi.abi,networkData.address);

      //calling candidate information to front-end and stroing for further use
      
      //getting information form smart contract
          
      const candidate1 =  await election.methods.Candidates(1).call();
      const candidate1Id = candidate1.id;
      const candidate1Name = candidate1.name; 
      const candidate1Party = candidate1.party; 
      setCandidate1(candidate1);

      const candidate2 =  await election.methods.Candidates(2).call();
      const candidate2Id = candidate2.id;
      const candidate2Name = candidate2.name; 
      const candidate2Party = candidate2.party; 
      setCandidate2(candidate2);

      const candidate3 =  await election.methods.Candidates(3).call();
      const candidate3Id = candidate3.id;
      const candidate3Name = candidate3.name; 
      const candidate3Party = candidate3.party; 
      setCandidate3(candidate3);


      //setting smart comtract instance to "election" variable we called above
      setElectionSC(election);
      
      console.log(election);

      //setting loader as false as the loading part is done 
      setloader(false);
    }

    else{
      window.alert("Smart Contract not deployed to current network")
    }

}

  //stting up loader
  if(loader){
    return <div>loading...</div>
  }
  return (
    
    <div className="app">
      <NavBar account= {currentAccount}/>
      <h1>E Voting Dapp</h1>
      <p>Your Account : {currentAccount} </p>
      <Container title={"Register"} content={"Get your self registered"} button={"Get Registered"} />
      <Vote candidate1={Candidate1} candidate2={Candidate2} candidate3={Candidate3} />
    </div>
  );
}

export default App;



// const LoadBlockChainData = async() =>
  // {
  //   //<----- Old way --->
  //   // if (window.ethereum) 
  //   // {
  //   //   const web3 = new Web3(window.ethereum);
  //   //   // Ask User permission to connect to Metamask
  //   //   await window.ethereum.enable();
  //   // };

  //   //<---- New Way to connect to metamask ---->
  //   if (window.ethereum) 
  //   {
  //       try 
  //       {
  //         const provider = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //         //setaccount(accounts);
  //       } 
  //       catch (error)
  //       {
  //         if (error.code === 4001) 
  //           {
  //             // User rejected request
  //           }
  //       }
  //   }

  //     const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
  //     const network = await web3.eth.net.getNetworkType()
  //     const accounts = await web3.eth.getAccounts();
  //     //console.log("account", accounts[0])
  //     setaccount(accounts);
  // }
    
  
  // if(!mounted)
  //   {
  //   // Code for componentWillMount here
  //   LoadBlockChainData()
  //   }
  //   useEffect(() =>{setMounted(true)},[])


 
      
         
      
    





