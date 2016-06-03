import { New_message } from '../../../data/socketConstants';
import { Socket } from '../../../app/transformer';
import { SendMessage, SendGiftcards } from '../../../app/messenger';

const sendOut = (data) => {
  const { sender, answer, brand } = data;
  SendMessage(sender, answer);
  brand ? SendGiftcards(sender, brand) : null;
  return data;
};

export const OffBot = (data) => {
  const { io, chat } = data;
  sendOut(data);
  io.emit(`${New_message}${chat.id}`, Socket.message(data));
  return data;
}