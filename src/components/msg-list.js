"use strict";

import React from 'react';
import MessageStore from '../stores/MessageStore';
import MessageActions from '../actions/MessageActions';


function getMessages() {
    return {
        messages: MessageStore.getMessages()
    };
}


class MsgList extends React.Component {
    constructor() {
        super();
        this.state = getMessages();
        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        MessageStore.addChangeListener(this._onChange);
        MessageActions.getMessages();
    }
    componentWillUnmount() {
        MessageStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.setState(getMessages());
    }
    render() {
        return (
            <div className="container-fluid">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Writer</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.messages.map(function (msg, i) {
                        return (
                            <tr key={i}>
                                <td>{msg.writer}</td>
                                <td>{msg.message}</td>
                                <td>{msg.createdDate}</td>
                            </tr>
                            );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MsgList;