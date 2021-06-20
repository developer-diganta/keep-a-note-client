import {Form} from "react-bootstrap";
import {addNotes} from "../services/services";
import {store} from "../store/store";



export default function AddNote(){
    const user =JSON.parse(localStorage.getItem('profile'));
const addThis = async (e)=>{
    
    e.preventDefault();
    const newNote={
        name:e.target.title.value,
        desc:e.target.desc.value
    }
    console.log("NEW ENTRY : "+newNote);

    const res=await addNotes(user,newNote);
    store.dispatch({
        type:"addNote"
    });
    console.log("DONE")
    
}
    return(
        <Form onSubmit={addThis}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required name="title" as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required name="desc" as="textarea" rows={3} />
            </Form.Group>
            <button type="submit">SUBMIT</button>
        </Form>
    )
}