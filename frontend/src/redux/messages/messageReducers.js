
import { MESSAGE_UPDATE_REQUEST,
    MESSAGE_UPDATE_SUCCESS,
    MESSAGE_UPDATE_FAIL,
    MESSAGE_CREATE_FAIL,
    MESSAGE_CREATE_REQUEST,
    MESSAGE_CREATE_SUCCESS,
    MESSAGE_DELETE_FAIL,
    MESSAGE_DELETE_REQUEST,
    MESSAGE_DELETE_SUCCESS,
    MESSAGE_LIST_FAIL,
    MESSAGE_LIST_REQUEST,
    MESSAGE_LIST_SUCCESS,} from './messageConstants';


export const messageListReducer = (state = { messages: [] }, action) => {
    switch (action.type){
        case MESSAGE_LIST_REQUEST:
            return { loading: true };
        case MESSAGE_LIST_SUCCESS:
            return { loading: false, messages: action.payload };
        case MESSAGE_LIST_FAIL:
            return { loading: false, error: action.payload };
        
        default:
            return state;
    }
};

export const messageCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case MESSAGE_CREATE_REQUEST:
        return { loading: true };
      case MESSAGE_CREATE_SUCCESS:
        return { loading: false, success: true };
      case MESSAGE_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const messageDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case MESSAGE_DELETE_REQUEST:
        return { loading: true };
      case MESSAGE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case MESSAGE_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const messageUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case MESSAGE_UPDATE_REQUEST:
        return { loading: true };
      case MESSAGE_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case MESSAGE_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };