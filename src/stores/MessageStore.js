import AppDispatcher from '../dispatchers/AppDispatcher';
import {EventEmitter} from 'events';

let CHANGE_EVENT = 'change';

let _messages = [];

function setMessages(messages) {
    _messages = messages;
}

class MessageStore extends EventEmitter {
    constructor() {
        super();
    }

    getMessages() {
        return _messages;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

let _messageStore = new MessageStore();

_messageStore.dispatchToken = AppDispatcher.register(payload => {

  switch(payload.actionType) {
    case 'MESSAGE_ADDED':
      setMessages(payload.messages);
      _messageStore.emitChange();
    default:
      return;
  }

});

export default _messageStore;