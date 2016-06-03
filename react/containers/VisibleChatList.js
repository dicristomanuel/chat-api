import { connect } from 'react-redux';
import ChatList from '../components/ChatList';

const getVisibleChats = (chats, filter) => {
  switch (filter) {
    case 'SHOW_ACTIVE'
      return chats.filter(chat => chat.active) // and not busy
    case 'SHOW_BUSY'
      return chats.filter(chat => chat.busy)
    case 'SHOW_SOLVED'
      return chats.filter(chat => chat.solved)
    // case 'SHOW_ENGAGED'
      // return chats.filter(chat => chat.engaged) // MS id
  }
}

const mapStateToProps = (state) => {
  return {
    chats: getVisibleChats(state.chats, state.VisibilityFilter)
  }
}

const VisibleChatList = connect(
  mapStateToProps
)(ChatList);

export default VisibleChatList;



// const mapDispatchToProps = (dispatch) => {
//   return {
//     onChatClick: (id) => {
//       dispatch(getMessagesForChat(id))
//     }
//   }
// }
// LATER
