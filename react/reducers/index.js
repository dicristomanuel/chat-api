import { VisibilityFilters, SET_CHAT_VISIBILITY_FILTER, SET_MESSAGES_VISIBILITY_FILTER, ADD_CHAT, ADD_CHATS, CHAT_UPDATE, ADD_MESSAGE, ADD_MESSAGES} from '../actions.js';
import { combineReducers } from 'redux';

const { SHOW_ALL } = VisibilityFilters;

const chatVisibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_CHAT_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const messagesVisibilityFilter = (state = 0, action) => {
  switch (action.type) {
    case SET_MESSAGES_VISIBILITY_FILTER:
      return action.chatId;
    default:
      return state;
  }
};

const chats = (state = [], action) => {
  switch (action.type) {
    case ADD_CHAT:
      return [
        ...state,
        {
          chatId: action.id,
          name: `${action.firstName} ${action.lastName}`,
          profilePic: action.profilePic,
          state: action.state,
          active: action.active,
          busy: action.busy,
          solved: action.solved,
          engaged: action.engaged,
        }
      ];
    case ADD_CHATS:
      return action.chats;
    case CHAT_UPDATE:
      return state.map((chat, index) => {
        if (action.chatId === chat.chatId)
        return { ...chat, ...action.change }
        return chat
      });
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [ ...state, ...action.message ];
    case ADD_MESSAGES:
      return action.messages
    default:
      return state;
  }
};

const ChatApp = combineReducers({
  chatVisibilityFilter,
  messagesVisibilityFilter,
  chats,
  messages,
});

export default ChatApp;

// TODO:
// Use immutable map for CHAT_UPDATE

// Add:
// notifications: action.notifications

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
