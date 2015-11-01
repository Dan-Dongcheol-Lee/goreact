"use strict";

import React from 'react';
import MsgBox from './msg-box';
import MsgList from './msg-list';

class MsgContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [
                {writer: 'test1', message: 'msg1'},
                {writer: 'test2', message: 'msg2'},
                {writer: 'test3', message: 'msg3'}
            ]
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <MsgBox/>
                </div>
                <div className="row">
                    <MsgList/>
                </div>
            </div>
        );
    }
}

export default MsgContainer