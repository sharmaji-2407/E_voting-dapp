import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import NavBar from './components/NavBar';
import Vote from './components/Vote';
import Container from './components/Container';
import ElectionAbi from './contracts/Elections.json';
import Button from '@restart/ui/esm/Button';
import Loader from './components/Loader';
import VoteCounter from './components/VoteCounter';

const vote_count_disp = () =>{
  return(<p>Votes : {'{'}prop.candidate1.party{'}'} {'{'}prop.candidate1.voteCount{'}'}<br /> {'{'}prop.candidate2.party{'}'} {'{'}prop.candidate2.voteCount{'}'}<br /> {'{'}prop.candidate3.party{'}'} {'{'}prop.candidate3.voteCount{'}'}<br /></p>
  );
}




function App() {
  //const [mounted, setMounted] = useState(false)
  const [currentAccount, setcurrentAccount] = useState("");
  const [loader, setloader] = useState(true);
  
  
  //storing smart contract instance to interact with it
  const [ElectionSC, setElectionSC] = useState();

  const [Candidate1, setCandidate1] = useState();
  const [Candidate2, setCandidate2] = useState();
  const [Candidate3, setCandidate3] = useState();


  //states to render components
  const [render_vote, setrender_vote] = useState(false);
  const [render_Reg, setrender_Reg] = useState(false);
  const [render_Login, setrender_Login] = useState(false);

  //button click events 
  const vote_event = ()=>{
    setrender_vote(true);
    setrender_Login(false);
    setrender_Reg(false);
  }

  const reg_event = () =>{
    setrender_vote(false);
    setrender_Login(false);
    setrender_Reg(true);
  }


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
      // const candidate1Id = candidate1.id;
      // const candidate1Name = candidate1.name; 
      // const candidate1Party = candidate1.party; 
      setCandidate1(candidate1);

      const candidate2 =  await election.methods.Candidates(2).call();
      // const candidate2Id = candidate2.id;
      // const candidate2Name = candidate2.name; 
      // const candidate2Party = candidate2.party; 
      setCandidate2(candidate2);

      const candidate3 =  await election.methods.Candidates(3).call();
      // const candidate3Id = candidate3.id;
      // const candidate3Name = candidate3.name; 
      // const candidate3Party = candidate3.party; 
      setCandidate3(candidate3);


      //setting smart comtract instance to "election" variable we called above
      setElectionSC(election);
      
      console.log(election);
      console.log(candidate1.voteCount);

      //setting loader as false as the loading part is done 
      setloader(false);
    }

    else{
      window.alert("Smart Contract not deployed to current network")
    }

}

  //send vote to vote function in smart contract
  //transaction is happening here
  const voteCandidate = async (candidateid)=>{
    setloader(true);
    try{
    await ElectionSC
    .methods
    .Vote(candidateid)
    .send({from : currentAccount})
    .on('transactionhash',()=>{
      console.log("Transaction Success. Vote casted.");
    })
  }
  catch(error){
    window.alert("Transaction Unsuccessful");
  }
    setloader(false);
  }

  //stting up loader
  if(loader){
    return <Loader />
  }

  
  


  return (
    
    <div className="app">
    {/* <Loader /> */}
      <NavBar account= {currentAccount}/>
     
      
      {/* <p>Your Account : {currentAccount} </p> */}

      <div className='starting'>
        <h1 className='light'>Welcome to new world of voting</h1>
        <div className='register_container'>
          <Container title={"Register"} content={"Get your self registered"} button={"Get Registered"} width={'400px'} height={'500px'}/>
        </div>
      </div>
        
      <div className='ellipse bg-dark'></div>
      <div className='ellipse2 bg-dark'></div>
      {/* test button */}
      <Button onClick={vote_event}>vote</Button>
      <Button onClick={()=>{setrender_vote(false)}}>vote off</Button>
      {render_vote && (<Vote candidate1={Candidate1} candidate2={Candidate2} candidate3={Candidate3} vote={voteCandidate} />)}
     
      {/* <div className="ellipse_out">
        <div className="ellipse_in">
        </div>
      </div> */}
      
      <VoteCounter candidate1={Candidate1} candidate2={Candidate2} candidate3={Candidate3} />
      
      
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


 
      
         
      
    





