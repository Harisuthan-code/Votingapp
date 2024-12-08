import React, { useEffect, useState } from "react";
import Item from "./Item";
import { voteProject_backend } from 'declarations/voteProject_backend';
import CURRENT_USER_ID from "./main";



function Vote(){

    const [canid , setcanid] = useState([])
    const [votestatus , setvotestatus] = useState(false)


    async function getallcanid() {

    try{

    const result = await voteProject_backend.show_all()
    setcanid(result)

    }

    catch(err){

        console.log(err)
    }



        
    }


    async function checkVoted(canisterId) {
        try {

            const votedData = await voteProject_backend.votingability(canisterId);
            const hasVoted = votedData.includes(CURRENT_USER_ID.toText())
            setVotedStatus(prevState => ({
                ...prevState,
                [canisterId]: hasVoted, 
            }));


        } 
        
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() =>{

    getallcanid()


    },[])


    useEffect(() => {
        if (canid.length > 0) {

            canid.forEach((canisterId) => {

                checkVoted(canisterId)
            });
        }
    }, []);

    return(

        canid.map((canid , index) => (

            <Item key = {index} id = {canid} shown = {false} votestatus={votestatus[canid] || false}/>
    
    
        ))
    

    )
}


export default Vote;