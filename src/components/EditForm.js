import {Form} from "react-bootstrap";
import { editNotes } from "../services/services";
import {store} from "../store/store";


export default function EditForm(props){
    const editThis = async (e)=>{
        const user =JSON.parse(localStorage.getItem('profile'));
        e.preventDefault();
        const id=props.id;
        const data={
            name:e.target.title.value,
            desc:e.target.desc.value
        }
        const a=await editNotes(user,id,data);
        store.dispatch({
            type:"addNote"
        });
        console.log(a);
    }
    return (
        <Form onSubmit={editThis}> 
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required name="title" defaultValue={props.title} as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control required name="desc" defaultValue={props.desc} as="textarea" rows={3} />
            </Form.Group>
            <button>SUBMIT</button>
        </Form>
    );
}