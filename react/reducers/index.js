import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_CHAT, UPDATE_STATUS } from '../actions.js';
import { combineReducers } from 'redux';

const { SHOW_ACTIVE } = VisibilityFilters;

const visibilityFilter = (state = SHOW_ACTIVE, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
};

const chats = (state = [], action) => {
  switch (action.type) {
    case ADD_CHAT:
      return [
        ...state,
        {
          chatId: action.chatId,
          name: action.name,
          profilePic: action.profilePic,
          busy: action.busy,
          active: action.active,
          solved: action.solved,
        }
      ];
    case UPDATE_STATUS:
      return state.chats.map((chat, index) => {
        if (index === action.index)
        return {...chat, status: action.status}
        return chat
      });
    default:
      return state;
  }
};

const ChatApp = combineReducers({
  visibilityFilter,
  chats
})

export default ChatApp;

// TODO:
// Use immutable map for UPDATE_STATUS

// Add:
// notifications: action.notifications,
// updatedAt: action.updatedAt
// bubbles: []

//
// ======
//
//
// Note for ES6 Savvy Users
//
// Because combineReducers expects an object, we can put all top-level reducers into a separate file, export each reducer function, and use import * as reducers to get them as an object with their names as the keys:
//
// import { combineReducers } from 'redux'
// import * as reducers from './reducers'
//
// const chatApp = combineReducers(reducers)
// Because import * is still new syntax, we don’t use it anymore in the documentation to avoid confusion, but you may encounter it in some community examples.