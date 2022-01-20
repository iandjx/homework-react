import {
  MESSAGE_CREATE_FAIL,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_DELETE_FAIL,
  MESSAGE_DELETE_REQUEST,
  MESSAGE_DELETE_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_UPDATE_FAIL,
  MESSAGE_UPDATE_REQUEST,
  MESSAGE_UPDATE_SUCCESS,
} from "../messages/messageConstants";
import axios from "axios";

export const listMessage = () => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGE_LIST_REQUEST,
    });

    const url = "http://localhost:8080/forumMessage/";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(url, config);

    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: data,
    });
    //localStorage.setItem("messageInfo", JSON.stringify(response));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGE_LIST_FAIL,
      payload: message,
    });
  }
};

export const createMessageAction =
  (forumID, messageText, messageTitle) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MESSAGE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const url = "http://localhost:8080/forumMessage/";

      const { data } = await axios.post(
        url,
        { forumID, messageText, messageTitle },
        config
      );

      dispatch({
        type: MESSAGE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MESSAGE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteMessageAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const url = "http://localhost:8080/forumMessage/";

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {
        _id: id,
      },
    });
    console.log(data);
    dispatch({
      type: MESSAGE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MESSAGE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateMessageAction =
  (forumID, messageText, message) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MESSAGE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const url = "http://localhost:8080/forumMessage/";

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(url, { forumID, messageText }, config);

      dispatch({
        type: MESSAGE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MESSAGE_UPDATE_FAIL,
        payload: message,
      });
    }
  };
