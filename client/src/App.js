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
import Typewriter from "typewriter-effect";

const vote_count_disp = () =>{
  return(<p>Votes : {'{'}prop.candidate1.party{'}'} {'{'}prop.candidate1.voteCount{'}'}<br /> {'{'}prop.candidate2.party{'}'} {'{'}prop.candidate2.voteCount{'}'}<br /> {'{'}prop.candidate3.party{'}'} {'{'}prop.candidate3.voteCount{'}'}<br /></p>
  );
}




function App() {






// <----------------------States------------------------>

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
  const [form_card_select, setform_card_select] = useState("Registration");
  
  //to store the card selector props
  const [card_title, setcard_title] = useState("Register")
  const [card_content, setcard_content] = useState("Get your self registered bofore the voting process")
  const [card_btn, setcard_btn] = useState("Get Registered")







// <-----------------------Button Click events----------------------------->

  //button click events 
  const vote_event = () => {
    setrender_vote(true);
    setform_card_select("none");
  }

  const form_card_selector = (select_value) => {
    setrender_vote(false);
    if(select_value === "Login")
    {
      setform_card_select("Login")
      
    }
    else if(select_value === "Registration")
    {
      setform_card_select("Register")
      
    }
  }

  if(form_card_select === "Register"){
    setcard_title ("Register");
    setcard_content("Get your self registered bofore the voting process");
    setcard_btn("Get Registered");
  }
  else{
    setcard_title ("Login");
    setcard_content("Login using your credentials");
    setcard_btn("Login");
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

  
  

// <----------------------------Page Template--------------------------------------->

  return (
    
    <div className="app">
    {/* <Loader /> */}
      <NavBar account= {currentAccount}/>
     
      
      {/* <p>Your Account : {currentAccount} </p> */}
      <div className='starting'>
      <h1 className='light'>Welcome to new era of voting.</h1>
      
      <Typewriter 
      options={{
        strings: ['It is safe.', 'It is transparent.', 'It is decentralized.'],
        autoStart: true,
        loop: true,
      }}/>
      <div className='register_container'>
      {form_card_select === "Registration" &&
      <Container title={card_title} content={card_content} button={card_btn} width={'400px'} height={'500px'}/>}
      
      <p onClick={form_card_selector("Login")} >Already Register? Login Here.</p>
      </div>
      </div>
      
      
      
      <div className='ellipse bg-dark'></div>
      
      <div className='ellipse2 bg-dark'>

        
        <div className='navi-list'>
          <a id="li1"><img src='../media/background.png' alt="Developers"/></a>
          <a id="li2">Home</a>
          <a id="li3">Help</a>
        </div>
      </div>

      
      {/* test button */}
      <Button onClick={vote_event}>vote</Button>
      <Button onClick={()=>{setrender_vote(false)}}>vote off</Button>
      {render_vote && (<Vote candidate1={Candidate1} candidate2={Candidate2} candidate3={Candidate3} vote={voteCandidate} />)}
     
      
      
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


 
      
         
      
    





