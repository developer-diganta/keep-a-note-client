import { combineReducers } from "redux";
import authReducer from "./auth";
import noteReducer from "./note";

const reducer = combineReducers({authReducer,noteReducer});

export default reducer;