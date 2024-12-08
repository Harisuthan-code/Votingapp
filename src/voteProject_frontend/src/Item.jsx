process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import React, { useEffect, useState } from "react";
import {Actor, HttpAgent} from "@dfinity/agent";
import { idlFactory } from "../../declarations/each_canister";
import { Principal } from '@dfinity/principal';
import CURRENT_USER_ID from "./main";
import { voteProject_backend } from 'declarations/voteProject_backend';




function Item(props){

const cuurentuserid = CURRENT_USER_ID.toText()


const [name , setname] = useState()
const [onwerid , setownerid] = useState()
const [title_full , setttitle] = useState()
const [description , setdescription] = useState()
const [imgUrl , setimgUrl] = useState()
const [estiDate , setestiDate] = useState()
const [loading , setloading] = useState(false)
const [hidebtn , sethidebtn] = useState(false)
const [vote , setvote] = useState(props.votestatus)


const id = props.id
const shown = props.shown
const votebtn = props.votebtn
const votecount = props.votecounts

const  localHost = "http://localhost:3000/"

async function loaditems(agent) {


try{

let each_can = await Actor.createActor(idlFactory , {
    agent,
    canisterId:id
})

const userName = await each_can.show_name()
const userId = await each_can.show_userid()
const userownerid = userId.toText()
const title = await each_can.show_title()
const description = await each_can.show_description()
const imgPath = await each_can.show_img()
console.log(imgPath)
const imgBlob = new Blob([new Uint8Array(imgPath)], { type: "image/*" });
const imgURL = URL.createObjectURL(imgBlob); 
const startDate = await each_can.start_date_show()
const endDate = await each_can.enddate_show()
const startDateNum = new Date(Number(startDate.toString())); 
const endDateNum = new Date(Number(endDate.toString()));
const timeDifferenceInMilliseconds = endDateNum - startDateNum
const timeDifferenceInDays = timeDifferenceInMilliseconds / (60 * 60 * 24);
const roundedDays = Math.ceil(timeDifferenceInDays); 



setname(userName)
setownerid(userownerid)
setttitle(title)
setdescription(description)
setimgUrl(imgURL)
setestiDate(roundedDays)

if (cuurentuserid === userownerid) {
    sethidebtn(true)
  } 
  
else {
    sethidebtn(false)

  }
}

catch(err){

    console.log(err)
}


finally{

    setloading(false)
}


}


function  yesVoting(){


  setvote(false)

  console.log("yes vote")
  
  voteProject_backend.getvote(id , true)
    
  }
  
  
  function  noVoting(){

    setvote(false)
  
    console.log("No vote")
    
    voteProject_backend.getvote(id , false)
      
  }

  


useEffect(()=>{

    const agent = new HttpAgent({ host: localHost });
    
    const initializeAgent = async () => {
        await agent.fetchRootKey();
        loaditems(agent);

    };

    initializeAgent();
    
},[])

if(loading){

<div>Loading</div>

    
}

if(!props.id){

  return(
    <p>No Proposals here</p>
  )
}



    return(


    
        <div className="show-other">


        <div className="card">

        <h1>{title_full}</h1>
        <img src= {imgUrl} alt="spec-img"></img>
        <p>{description}</p>
        <p>Estimate time : {estiDate}</p>
        <p>Publisher : {onwerid}</p>

        {shown && (
          <>
            <p>Yes : {votecount.yes || 0}</p>
            <p>No : {votecount.no || 0}</p>
          </>
        )}

        {vote && !hidebtn && (
        <div className="btn-vote">
        
        <button onClick= {yesVoting}>Yes</button>
        <button onClick={noVoting}>No</button>
        </div>
        )}


        {!vote && !hidebtn &&  (
        <div className="btn-vote">
        
        <button>Voted</button>

        </div>
        )}

        </div>


        
        </div>




    )
}


export default Item