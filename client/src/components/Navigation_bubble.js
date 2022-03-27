import React,{ useState } from 'react';
import Typewriter from "typewriter-effect";
import developers from '../media/developer.png';
import home from '../media/home.png';
import help from '../media/help.png';

const Navigation_bubble = (props) => {

      //states for page rendering
  const [page_render, setpage_render] = useState("home")
  

  props.func(page_render);


  return (
    <div><h1 className='light' id="main-heading">Welcome to new era of voting.</h1>
      
    <Typewriter 
    options={{
      strings: ['It is safe.', 'It is transparent.', 'It is decentralized.'],
      autoStart: true,
      loop: true,
    }}/>
    <div className='ellipse bg-dark'></div>
  
    <div className='ellipse2 bg-dark'>
      <div className='navi-list'>
        <img className='list-item' id="li1" src={developers} alt="Developers" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("developers")} />
        <img className='list-item' id="li2" src={home} alt="Home" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("home")}  />
        <img className='list-item' id="li3" src={help} alt="Help" draggable="false" onContextMenu={(e)=> e.preventDefault()} onClick={()=>setpage_render("help")} />
      </div>
    </div>
    </div>
  )
}

export default Navigation_bubble;