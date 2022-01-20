import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from './user/userReducers';
import { noteListReducer, noteDeleteReducer, noteUpdateReducer, noteCreateReducer } from './forum/notesReducers';
import { messageListReducer, messageCreateReducer } from './messages/messageReducers';
const reducer = combineReducers ({
    userList: userListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteDelete: noteDeleteReducer,
    noteUpdate: noteUpdateReducer,
    messageList: messageListReducer,
    messageCreate: messageCreateReducer,


})

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin:{userInfo:userInfoFromStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;