import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import "firebase/firestore";
import React, { useEffect, useState, Component} from "react";


var styles = {
  fRow:{
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    height: '100%'
  },
  sidePanel:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '15vw',
    minWidth: "130px",
    height: '100%',
    background: "#350d36",
    padding: "5px",
    color: "white"
  },
  mL5:{
    marginLeft:'30px',
    cursor: 'pointer',
    '&:hover':{
      textShadow: "1px 1px 10px black"
    }
  },
  mL10:{
    marginLeft:'15px'
  },
  chatRoom:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  header:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: "5px",
    width: '100%',
    background: "#3f0e40",
    color: "white"
  }
}

var firebaseConfig = {
  apiKey: "AIzaSyCk2-wLDYjYGyrLrnZfNdiWOApE6ZZPAgM",
  authDomain: "loginjs-46882.firebaseapp.com",
  databaseURL: "https://loginjs-46882-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "loginjs-46882",
  storageBucket: "loginjs-46882.appspot.com",
  messagingSenderId: "466005197003",
  appId: "1:466005197003:web:e5a0b3ffe1ccb78d1cdb4e",
  measurementId: "G-007V9V65WZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.database();
const db = firebase.firestore();

class App extends Component {
  constructor(){
    super();
    this.state ={
      Id: "",
    }
  }

  render() {
    const room = {Id : ""};

    return (
      <div style={styles.fRow}>
        <Rooms room={room}/>
        <ChatRoom room={room}/>
      </div>
    );
  }
}

function Rooms(parentRoom) {
  const [rooms,setRooms]= useState([])
  const fetchRooms=async()=>{
      const response= db.collection('Rooms');
      const data=await response.get();
      data.docs.forEach(item=>{ 
        console.log(item.data());
        setRooms([rooms,item.data()])
      })

      console.log(parentRoom.room.id + "<-- ID ");
  }
  
  useEffect(() => {
    fetchRooms();
  }, [])


  return (
    <details style={styles.sidePanel}>
      <summary style={styles.mL10}>Salas</summary>
      {
        rooms && rooms.map(room=>{
          return(
            <span style={styles.mL5} onClick={() => {parentRoom.room.id = room.title;}}>{room.title}</span>
          )
        })
      }
    </details>
  );
}

function ChatRoom(room){

  useEffect(() => {
    if(room.room.Id != "") console.log(room.room.Id);
  }, [room])

  return(
    <div style={styles.chatRoom}>
      <div style={styles.header}>
        <span>Aqui va la cabecera del chat</span>
      </div>
    </div>
  )
}

export default App;
