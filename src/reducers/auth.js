export default function authReducer(state=null,action){
    switch(action.type){
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({...action.data}));
            // console.log(action?.data);
            console.log(state);
            state=JSON.stringify({...action.data});
            console.log("STETETEET" +state.authData);
            return state;
        case "LOGOUT":
            localStorage.setItem('profile',null);
            state=null
            return state
        default : 
            // console.log("OOPS!");
            return state;
    }
};