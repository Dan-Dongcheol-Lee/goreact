import AppDispatcher from '../dispatchers/AppDispatcher';
import MessageConstants from '../constants/MessageConstants';

var MessageActions = {
    addMessage(message) {
        $.ajax({method: 'POST',
            url: '/messages',
            data: JSON.stringify(message),
            dataType: 'json',
            contentType: 'application/json'})
        .done(function(res) {
            $.getJSON('/messages')
            .done(function (results) {
                AppDispatcher.dispatch({
                    actionType: MessageConstants.MESSAGE_ADDED,
                    messages: results.messages
                });
            });
        });
    },
    getMessages() {
        $.getJSON('/messages')
        .done(function (results) {
            AppDispatcher.dispatch({
                actionType: MessageConstants.MESSAGE_FETCHED,
                messages: results.messages
            });
        });
    }
};

export default MessageActions;