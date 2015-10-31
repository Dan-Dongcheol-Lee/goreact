import AppDispatcher from '../dispatchers/AppDispatcher';

var MessageActions = {
    addMessage(message) {
        $.post('/messages', message, function( data ) {
            console.log('Message added');
            $.getJSON('/messages')
            .done(function (results) {
                AppDispatcher.dispatch({
                    actionType: 'MESSAGE_ADDED',
                    messages: results.messages
                });
            });
        }, 'json');
    }
};

export default MessageActions;