import React,{ useState } from 'react';
import Votecard from './VoteCard';
import VoteButton from './VoteButton';
import '../css/Container.css'

const Vote = (prop) => {
    const [Vote_id, setVote_id] = useState();
    const [Btn_mount, setBtn_mount] = useState(false);

    const select_cand = (id) =>{
        //e.preventDefault();

        console.log('You chose :',id);
        setVote_id(id);
        setBtn_mount(true);
    }

    return (
        <div className="vote">
            <div className="candidates">
            {Btn_mount && (
                <div className="vote_btn"> 
                    <VoteButton  vote_id={Vote_id} castVote={prop.vote}/>
                </div>)}
               <div className="candidate_card" onClick={()=>select_cand(prop.candidate1.id)}><Votecard party={prop.candidate1.party} name={prop.candidate1.name} id={prop.candidate1.id}/></div>
               <div className="candidate_card" onClick={()=>select_cand(prop.candidate2.id)}><Votecard party={prop.candidate2.party} name={prop.candidate2.name} id={prop.candidate2.id}/></div>
               <div className="candidate_card" onClick={()=>select_cand(prop.candidate3.id)}><Votecard party={prop.candidate3.party} name={prop.candidate3.name} id={prop.candidate3.id}/></div>
               
               
            </div>
            

            {/* <p>Votes : {prop.candidate1.party} {prop.candidate1.voteCount}<br/> {prop.candidate2.party} {prop.candidate2.voteCount}<br/> {prop.candidate3.party} {prop.candidate3.voteCount}<br/></p> */}
        </div>
    );
}

export default Vote;
