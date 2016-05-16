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
      return {
        ...state, chats:
        [
          ...state.chats,
          {
            chatId: action.chatId,
            name: action.name,
            profilePic: action.profilePic,
            status: action.status
          }
        ]
      }
    case UPDATE_STATUS:
      return {
        ...state, {
          chats: state.chats.map((todo, index) => {
            if (index === action.index)
            return {...todo, status: action.status}
            return todo
          })
        }
      }
    default:
      return state;
  }
};

const ChatApp = combineReducers({
  visibilityFilter,
  todos
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
// const todoApp = combineReducers(reducers)
// Because import * is still new syntax, we don’t use it anymore in the documentation to avoid confusion, but you may encounter it in some community examples.
