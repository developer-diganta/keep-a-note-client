import {Card} from "react-bootstrap";
import { deleteNotes } from "../services/services";
import {store} from "../store/store";
import "./Note.css";
import {useState,useEffect} from "react";
import EditForm from "./EditForm"; 

export default function Note(props){
    const user =JSON.parse(localStorage.getItem('profile'));
    const deleteThis =async ()=>{
        await deleteNotes(user,props.id);
        await store.dispatch({
            type:"deleteNote"
        });
    }
    const [formDisplay,setFormDisplay] = useState("none");
    const [changeVisibilty,setChangeVisibility] = useState(0);
    store.subscribe(()=>{
        setChangeVisibility(!changeVisibilty);
    })
    useEffect(()=>{
        setFormDisplay("none");
    },[changeVisibilty])
    return (
        <div className="col-lg-4 col-md-6 col-xs-12 d-flex justify-content-center" >
                <Card style={{ width:'18rem',height:"30rem",overflow:"auto",margin:"10px",backgroundColor:"#f48fb1"}}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFwGjXf7R4e7uMFvXxcXyiLCdM_G5mmPLA&usqp=CAU" />
            <Card.Body  >
                <Card.Title>{props.title}</Card.Title>
                <Card.Text >
                    {props.desc}
                </Card.Text>
                <button onClick={deleteThis}><i className="fas fa-trash del-icon"></i></button>
                <button onClick={()=>setFormDisplay("block")} ><i className="fas fa-edit del-icon"></i></button>
               <span style={{display:formDisplay}}> 
                    <EditForm key={props.id} id={props.id} title={props.title} desc={props.desc}/>
                    <button onClick={()=>setFormDisplay("none")}>Close</button> 
               </span>
            </Card.Body>
        </Card>
        </div>
        
    )
}