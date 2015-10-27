"use strict";

import React from 'react';
import MsgBox from '../msg-box/msg-box';
import MsgList from '../msg-list/msg-list';

class MsgContainer extends React.Component {
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
};

export default MsgContainer