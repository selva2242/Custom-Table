import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Header from './components/header/header';
import MainContent from './components/mainContent/mainContent';

function App() {

  const [userData, setuserData] = useState([])

  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/selva2242/demo/userDetails")
    .then((response)=> {
        setuserData(response.data)
        console.log(response.data)
    })
    .catch((error)=> {
      
    })
  }, [])


  return (
    <div className="App">
      {
        console.log("coming")
      }
      <Header/>
      <MainContent/>
      
    </div>
  );
}

export default App;
