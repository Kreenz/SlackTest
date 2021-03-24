import logo from './logo.svg';
import './App.css';
import './Styles.js';
import { useEffect, useState } from 'react';

var styles = {
  sidePanel: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: "10px",
      marginTop: "10px"
  },
  roomItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
  },
  body:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  message:{
    width: "100%",
    height: "90%",
    overflow: "auto",
  }
}

//Rutas
/*
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
*/
const db = "";

function SidePannel() {
  const[rooms,setRooms] = useState([])
  const fetchRooms = async()=>{
    const response = db.collection("rooms");
    const data = await response.get();
    
    data.docs.forEach(item => {
      setRooms([rooms, item.data])
    })
  }

  useEffect(() => {
    fetchRooms();
  })
  
  return (
    <div styles={styles.sidePannel}>
      <details>
        <summary>Canales</summary>
        <p>
          {
            rooms && rooms.map(room => {
              return (
                <div id={room.uid}>
                  <i></i> <span>{room.title}</span>
                </div>
              )
            })
          }
        </p>
      </details>
      
    </div>
  );
}

function Body() {
  
  return (
    <div styles={styles.body}>
      <Messages/>
      <SendMessage/>
    </div>
  );
} 

function Messages(){
  const 
} 

function SendMessage(){
  return(
    <div>
      <div>MESSAGE</div>
      <div>SEND</div>
    </div>
  )
}

function Home(){
  return(
    <div>
      <SidePannel/>
      <Body/>
    </div>
  )
}

function login() {
  return (
    <div></div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
