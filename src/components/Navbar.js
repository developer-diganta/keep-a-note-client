import {Navbar,Nav,Modal} from "react-bootstrap";
import {useState,useEffect} from "react";
import GoogleLogin from 'react-google-login';
import AddNote from "./Form";
import "./Navbar.css";
import {store} from "../store/store";
import {useDispatch} from "react-redux";


//MODAL TO ALLOW NEW NOTE SUBMISSION -> BOOTSTRAP MODAL
function FormModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/*AddNote -> form to allow new submission */}
         <AddNote/>
        </Modal.Body>
      </Modal>
    );
  }
  
//NAVBAR COMPONENT EXPORTED
export default function Bar(){
    
  const [modalShow, setModalShow] =useState(false);//FOR MODAL VISIBILITY

  
  const dispatch = useDispatch();
  
  const [eff,setEff]=useState(0);
  
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));//TO SET USER

  
  store.subscribe(()=>{
    console.log("USE EFFFFFECT")
        setEff(store.getState());
    });//TO DETECT CHANGES IN STORE SO THAT NEW DATA CAN BE SHOWN , RE-RENDERED
  
  useEffect(()=>{
        setModalShow(false);
  },[eff]);

  const loginSuccess = (res)=>{
    console.log("USER" + user);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({type:"AUTH",data:{result,token}});
      } catch (error) {
      console.log(error);
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
      console.log(res);
    }
    const loginFail = (err)=>{
      console.log(err);
      console.log("FAIL");
    }
    const logout = () =>{
      dispatch({type:"LOGOUT"});
      setUser(null);
    }
    return( 
    <>
        <Navbar  variant="dark" className="nav-body ">
        <div className="container">
          <Navbar.Brand href="#home"> <span className="nav-txt" >Keep A Note</span></Navbar.Brand>
                <Nav className="ml-auto ">
                    {/* <Nav.Link href="#home"> <span className="nav-txt bttn">LOGIN</span> </Nav.Link> */}
                    {/* <Nav.Link href="#pricing"> <span className="nav-txt">ADD</span> </Nav.Link> */}

                    {/* LOGIN WITH GOOGLE */}
                    {user?
                      <button onClick={logout}>LOGOUT</button>
                      :
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                        buttonText="Login"
                        onSuccess={loginSuccess}
                        onFailure={loginFail}
                        cookiePolicy={'single_host_origin'}
                      />
                      
                    }
                    <h1>{process.env.GOOGLE_CLIENTID}</h1>
                    <button className="bttn" disabled={user?false:true} onClick={() => setModalShow(true)}>ADD</button>
                </Nav>
        </div>
        </Navbar>
        <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
    </>
    )
}
