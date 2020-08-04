import { combineReducers } from "redux";
import account from "./account";
import invite from "./invite";

export default combineReducers({
    account,
    invite
})
