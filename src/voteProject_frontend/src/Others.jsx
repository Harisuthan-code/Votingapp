import React, { useEffect, useState } from "react";
import Item from "./Item";
import { voteProject_backend } from 'declarations/voteProject_backend';
import CURRENT_USER_ID from "./main";


function Other(){

    const [canisterid , setcanisterid] = useState([])
    const [votestatus , setvotestatus] = useState({})



    async function loadids() {


    console.log(CURRENT_USER_ID)

    try{

    const result = await voteProject_backend.show_owner_data(CURRENT_USER_ID)
    console.log("yes it work")
    setcanisterid(result)


    }

    catch(err){

        console.log(err)
    }


}

async function showVoteStatus(can_id) {
    try {

      const status = await voteProject_backend.getListing(can_id)

      setvotestatus((prevStatus) => ({

        ...prevStatus,
        [can_id]: status,

      }));
    } catch (err) {
      console.log(`Error loading status for canister ${can_id}:`, err);
    }
  }


useEffect(()=>{

loadids()


}, [])


useEffect(() => {
    if (canisterid.length > 0) {

        canisterid.forEach((can_id) => {

            showVoteStatus(can_id)
        });
    }
}, [canisterid]);


    return(


    canisterid.map((canid , index) => (

        <Item key = {index} id = {canid} shown = {true} votecounts={votestatus[canid]}/>


    ))



        

    )
}


export default Other;