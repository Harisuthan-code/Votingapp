import React, { useState } from "react";
import { voteProject_backend } from 'declarations/voteProject_backend';
import { useNavigate } from "react-router-dom";



function Create(){

    const navigate = useNavigate()
    const [name , setname] = useState("")
    const [title , setttitle] = useState("")
    const [description , setdescription] = useState("")
    const [imgUrl , setimgUrl] = useState("")
    const [startDate , setstartDate] = useState()
    const [endDate , setendDate] = useState()
    const [hide , sethide] = useState(false)

    const today = new Date().toISOString().split('T')[0] //it show today and future dates only not past
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

    async function handleimage(e) {

    const imgFile = e.target.files[0]

    console.log(imgFile)

    if(imgFile){

        const image_array = await imgFile.arrayBuffer();
        const image_byte_data = [...new Uint8Array(image_array)]

        setimgUrl(image_byte_data);

    }

    }


    const handleStartDateChange = (e) => {
        const dateStr = e.target.value; 
        
        if (dateStr) {

            const date = new Date(dateStr);
    

            const timestampMs = date.getTime();
    

            const timestampSec = Math.floor(timestampMs / 1000);
    
            setstartDate(timestampSec); 
        }
    };


    const handleEndDateChange = (e) => {
        const dateend = e.target.value; 
        
        if (dateend) {

            const date = new Date(dateend);
    

            const timestampMs = date.getTime();
    

            const timestampSec = Math.floor(timestampMs / 1000);
    
            setendDate(timestampSec); 
        }
    };

    

    async function handledetails(e){

    e.preventDefault()

    if(startDate == endDate || startDate > endDate){

        alert("select dates properly")
    }

    if (!name || !title || !description || !imgUrl || !startDate || !endDate) {
        alert("Please fill in all required fields.");
        return;
    }

    sethide(true)


    console.log(name  , title , description , imgUrl , startDate , endDate)

    let result = await voteProject_backend.add_propasal(name  , title , description , imgUrl , startDate , endDate)

    console.log(result)

    sethide(false)
    alert(result)
    navigate("/")
    
    }


    return(


        <div className="create-page">

            <form className="create-form">

            <label>Name</label>
            <input type="text" placeholder="enter the name" required onChange={(e) => setname(e.target.value)} value={name}></input>

            <label>Title</label>
            <input type="text" placeholder="enter the title" required  onChange={(e)=>setttitle(e.target.value)} value={title}></input>
            
            <label>Description</label>
            <input type="text" placeholder="enter the Description" required onChange={(e) => setdescription(e.target.value)} value={description}></input>

            <label>Image</label>
            <input type="file" className="image" accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp" required onChange={handleimage}/>

            <label htmlFor="start-date">Start Date:</label>
            <input type="date" className="start-date" required min={today} onChange={handleStartDateChange} />

            <label htmlFor="end-date">End Date:</label>
            <input type="date" className="end-date"required  min={tomorrow} onChange={handleEndDateChange}/>


            <button onClick={handledetails} hidden = {hide}>Publish</button>

            </form>




        </div>


    )
}


export default Create;