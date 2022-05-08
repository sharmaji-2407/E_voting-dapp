import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

import Vote from './components/Vote';
import Container from './components/Container';
import ElectionAbi from './contracts/Elections.json';
import Button from '@restart/ui/esm/Button';
import Loader from './components/Loader';
import VoteCounter from './components/VoteCounter';
import Typewriter from "typewriter-effect";
import developers from './media/code_50px.png';
import home from './media/home_50px.png';
import help from './media/help_50px.png';
import moving_chain_bg from "./media/block-bg-unscreen.gif";
import heading_chain_bg from "./media/heading_chain.gif";







const App = () => {



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
  
  const [flag, setflag] = useState("alr_reg"); // alr_reg -> already registered ;  not_reg -> not registered
  
  //to store the card selector props
  const [card_title, setcard_title] = useState("Register")
  const [card_content, setcard_content] = useState("Get your self registered bofore the voting process.")
  const [card_btn, setcard_btn] = useState("Get Registered")

  const [reg_log_switch, setreg_log_switch] = useState("Already Registered? Login Here.")

  const [page_render, setpage_render] = useState("home")





// <-----------------------Button Click events----------------------------->

  //button click events 
  const vote_event = () => {
    setrender_vote(true);
    
  }

  

  const form_card_selector = (select_value) => {
    //setrender_vote(false);
    
    
    if (select_value === "alr_reg")
    {
      console.log("login form");
      setcard_title ("Login");
      setcard_content("Login with your credentials and proceed for voting.");
      setcard_btn("Login");
      setreg_log_switch("Haven't registered yet? Get Registered.");
      setflag("not_reg");
    }
    else if(select_value === "not_reg")
    {
      console.log("Reg form");
      setcard_title ("Register");
      setcard_content("Get your self registered bofore the voting process");
      setcard_btn("Get Registered");
      setreg_log_switch("Already Registered? Login Here.");
      setflag("alr_reg");
    }  
      
    
  }

  const backBtn = () => {
    setpage_render("home");
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
    <div className='Navbar' onContextMenu={(e)=> e.preventDefault()}>
      <p>{currentAccount}</p>
    </div>
      
    
    {page_render === "home"  &&
    
    <div className="home" >
    <img className='moving_bg' src={moving_chain_bg} alt="moving chain" draggable="false" onContextMenu={(e)=> e.preventDefault()}/>
    
    <div><h1 className='light' id="main-heading">Welcome to new era of voting.</h1>

        
        <Typewriter 
        options={{
          strings: ['It is safe.', 'It is transparent.', 'It is decentralized.'],
          autoStart: true,
          loop: true,
        }}/>
        <div className='ellipse'>
        <img className='heading_bg' src={heading_chain_bg} alt="moving chain" draggable="false" onContextMenu={(e)=> e.preventDefault()}/>
        
        
        </div>

        <div className='ellipse2'>
          <div className='navi-list'>
            <img title="Meet the developers." className='list-item' id="li1" src={developers} alt="Developers" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("developers")} />
            <img title="You are at the home page." className='list-item' id="li2" src={home} alt="Home" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("home")}  />
            <img title="Go to the help page." className='list-item' id="li3" src={help} alt="Help" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("help")} />
          </div>
        </div>
        </div>

          <div className='register_container'>
            {card_title === "Register" &&
            <Container title={card_title} content={card_content} button={card_btn} width={'400px'} height={'500px'}/>}

            {card_title === "Login" &&
            <Container title={card_title} content={card_content} button={card_btn} width={'400px'} height={'500px'}/>}
            
            {/*{card_title === "Developed By" &&
                <Container title={card_title} content={card_content} button={card_btn} width={'400px'} height={'500px'}/>}*/}

            <p onClick={()=>form_card_selector ( flag ) }> {reg_log_switch} </p>

          </div>

          

        </div>
      }


      {
        page_render === "help" &&
        <div className="help">
          <h1>Help Page</h1>
          <div className='help-navi-list'>
            <img className='list-item' id="hli1" src={developers} alt="Developers" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("developers")} />
            <img className='list-item' id="hli2" src={home} alt="Home" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("home")}  />
            <img title="You are at the help page." className='list-item' id="hli3" src={help} alt="Help" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>{setpage_render("help"); alert("You are at the help page.")}} />
          </div>
         
        </div>
      }
      
      {
        page_render === "developers" &&
        <div>
        <h1>DEv</h1>
        <div className='dev-nav'>
          <img src={home} alt="back" className='home-btn' onClick={()=> backBtn() } />
        </div>
        </div>
      }

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


 
      
         
      
    





