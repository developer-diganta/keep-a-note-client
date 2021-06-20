export default  function noteReducer(state=0,action){
    switch(action.type){
        case "addNote":
            // console.log(state.count);
            return ++state;
        case "deleteNote":
            return --state;
        default:
            return state;
    }
}