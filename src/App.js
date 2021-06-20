import './App.css';
import { useState,useEffect} from 'react';
import Bar from "./components/Navbar";
import Note from "./components/Note";
import {getNotes} from "./services/services";
import {store} from "./store/store";
function App() {
  const [note,updateNote]=useState([]);
  let user= JSON.parse(localStorage.getItem('profile'));
  const[refresh,updateRefresh] = useState(0);


  store.subscribe(()=>{
    const newVal=store.getState();
    console.log("NEWWWWW : "+newVal.authReducer);
    if(newVal.authReducer===null)
      user=null;
    updateRefresh(refresh+1);
    console.log("subscribe called")
  })

  function createNote(x,i){
    return <Note id={i} title={x.name} desc={x.desc}/>
  }

  useEffect(()=>{
  let user= JSON.parse(localStorage.getItem('profile'));
     async function fetchNotes(){
    console.log("Fetch Notes called")
    if (user===null){
      updateNote([]);
      return;
    }
    else{
      const n=await getNotes(user);
      console.log("NEW NOTES : "+n);
      updateNote(n); 
      return;
    }
  }
  fetchNotes();
  },[refresh]);

  return (
    <div className="main-body">
      <Bar/>
      <div style={{margin:"10px"}}></div>
        <div className="container">
          <div className="row">
          {note.map(createNote)}
          </div>
        </div>
    </div>
  );
}

export default App;
