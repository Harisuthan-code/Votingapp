import React from 'react';
import Fontslide from './Font';
import Create from './create';
import Vote from './Voting';
import Other from './Others';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App(){

    return(


        <Router>
            
            <Routes>
                <Route path='/' element = {<Fontslide/>}/>
                <Route path='/createpage' element = {<Create/>}/>
                <Route path='/votepage' element = {<Vote/>}/>
                <Route path='/otherPropsals' element = {<Other/>}/>

            </Routes>
        </Router>
    )
}


export default App