"use strict";

import React from 'react';
import MessageStore from '../stores/MessageStore';


function getMessages() {
    return {
        messages: MessageStore.getMessages()
    };
}


class MsgList extends React.Component {
    constructor() {
        super();
        this.state = getMessages();
    }

    componentDidMount() {
        MessageStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        MessageStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.state = getMessages();
        console.log(this.state);
    }

    render() {
        return (
            <div className="container-fluid">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Writer</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.messages.map(function (msg, i) {
                        return (<tr key={i}>
                            <td>{msg.writer}</td>
                            <td>{msg.message}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MsgList;