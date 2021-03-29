import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import "firebase/firestore";
import React, { useEffect, useState, Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import * as SockJS from 'sockjs-client';

const styles = {
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
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "5px",
    width: '100%',
    background: "#3f0e40",
    color: "white"
  },
  body:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "85%",
    overflow: "auto"
  },
  bodyApp:{
    position: "absolute",
    width: "100%",
    height:"100%",
    top:"0",
    left:"0"
  },
  messageInboxSender:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    border: "1px solid #666",
    background: "#d5f0c0",
    padding: "0.3vw",
    borderRadius: "2px"
  },
  messageInboxReciver:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    border: "1px solid #666",
    background: "#ebe4dc",
    padding: "0.3vw",
    borderRadius: "2px"
  },
  messageInbox:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "99%",
    margin: "5px"
  },
  messageInboxReverse:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "99%",
    margin: "0.3vw"
  },
  message:{
    display:"flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    height: "10%",
    padding: "0.4vw"
  },
  messageBox: {
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "99%",
    height: "100%",
    border: "1px solid #666",
    borderRadius: "5px"
  },
  messageText:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "85%",
    height: "90%",
    border: "none",
    outline: "none",
    margin: "0.3vw",
  },
  messageSend:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "10%",
    height: "100%",
    border: "none",
    background: "white",
    cursor: "pointer"
  },
  author:{
    fontWeight: "bold"
  },
  nav:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "40px",
    background: "#350d36",
    borderBottom: "1px solid white"
  },
  navItem:{
    marginLeft:"10px",
    color: "white"
  },
  registerBody:{
    minHeight: "calc(100% - 40px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  registerForm:{
    height: "250px",
    width: "250px",
    background: "#666",
    border:"1px solid black",
    borderRadius: "5px"
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

export function mySocketFactory() {
  return new SockJS('http://127.0.0.1:3000/stomp');
}

const App = ()=> {
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("hola?")
    return <Redirect to="/"/>
  }, [loggedIn])

    return (
      <Router>
      <div style={styles.bodyApp}>
        <nav style={styles.nav}>
          <Link style={styles.navItem} to="/">Home</Link>
          <Link style={styles.navItem} to="/register">Register</Link>    
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register setLoggedIn={setLoggedIn}/>
          </Route>
          <Route path="/">
            {(loggedIn) ? <Main setCurrentRoomId={setCurrentRoomId} currentRoomId={currentRoomId}/> : <LogIn setLoggedIn={setLoggedIn}/>}
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }


function LogIn(props){
  const loggIn = () => {
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      props.setLoggedIn(true);
    })
  }
  return (
    <div style={styles.registerBody}>
      <h1>LoggIn</h1>
      <div style={styles.registerForm}>
        <label for="email">Email</label>
        <input id="email" name="email" type="text" placeholder="email"/>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="password"/>
        <button onClick={loggIn}>Logearse</button>
      </div>
    </div>
  )
}

function Register(props){
  const register = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      props.setLoggedIn(true);
    });
  }

  return (
    <div style={styles.registerBody}>
      <h1>Registrarse</h1>
      <div style={styles.registerForm}>
        <label for="email">Email</label>
        <input id="email" name="email" type="text" placeholder="email"/>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="password"/>
        <button onClick={register}>Registrarse</button>
      </div>
    </div>
  )
}

function Main(room){
  return (
    <div style={styles.fRow}>
      <Rooms setCurrentRoomId={room.setCurrentRoomId} />
      <ChatRoom currentRoomId={room.currentRoomId}/>
    </div>
  )
}

function Rooms({setCurrentRoomId}) {
  const [rooms,setRooms]= useState([])
  const fetchRooms=async()=>{
      const response= db.collection('Rooms');
      const data=await response.get();
      data.docs.forEach(item=>{ 
        setRooms(oldRooms => [...oldRooms, [item.id,item.data()]]);
      })

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
            <span style={styles.mL5} onClick={() => {setCurrentRoomId(room[0])}}>{room[1].title}</span>
          )
        })
      }
    </details>
    
  );
}

function ChatRoom(roomId){

  const [messages,setMessages]= useState([])
  const fetchMessages=async(roomId)=>{
      const response= db.collection('Rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc");
      const data=await response.get();
      data.docs.forEach(item=>{ 
        setMessages(oldMessages => [...oldMessages, [item.id,item.data()]]);
      })

  }

  useEffect(() => {
    if(roomId.currentRoomId){
      setMessages([]);
      db.collection("Rooms").doc(roomId.currentRoomId).get().then(doc => {
        let data = doc.data();
        document.getElementById("roomTitle").innerText = data.title;
        document.getElementById("roomHeader").innerText = data.header;
        fetchMessages(roomId.currentRoomId);
      });
    }
  }, [roomId])

  const saveMessage = () => {
    if(roomId.currentRoomId) {
      
      db.collection("Rooms").doc(roomId.currentRoomId).collection("messages").add({
        author : "Yo",
        message : document.getElementById("messageText").value,
        timestamp: new Date().getTime()
      })
    }
  }

  return(
    <div style={styles.chatRoom}>
      <div style={styles.header}>
        <span id="roomTitle" style={styles.author}>No se ha seleccionado una sala</span>
        <span>#<span id="roomHeader">No se ha seleccionado una sala</span></span>
      </div>
      <div id="messageArray" style={styles.body}>
        {
          messages && messages.map(message=>{
            return(
              <div style={(message[1].author != "Yo") ? styles.messageInbox: styles.messageInboxReverse}>
                <div style={(message[1].author != "Yo") ? styles.messageInboxReciver: styles.messageInboxSender}>
                  <span style={styles.author}>{message[1].author}</span>  
                  <span>{message[1].message}</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <div style={styles.message}>
        <div style={styles.messageBox}>
          <textarea id="messageText" style={styles.messageText} placeholder= "Aqui va texto"></textarea>
          <button onClick={saveMessage}style={styles.messageSend}>send</button>
        </div>
      </div>
    </div>
  )
}

export default App;
