import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { GetMessagesForId } from '../selectors/getMessagesForId';
import { SendMessage } from '../helpers/singleChatHelper';
import { FetchMessages } from '../actions';

const isEngaged = (chats, engaged) => {
  return chats.includes(engaged);
};

const mapStateToProps = state => {
  return {
    messages: GetMessagesForId(state),
    chatId: state.messagesVisibilityFilter,
    isEngaged: isEngaged(state.notifications.chats, state.messagesVisibilityFilter),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendToMessenger: (chatId, text) => {
      SendMessage({ chatId, text })
    },

    fetchMessages: (id, page) => {
      dispatch(FetchMessages(id, page));
    }
  }
}

const VisibleMessageList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageList);

export default VisibleMessageList;
