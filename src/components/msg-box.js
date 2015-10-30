"use strict";

import React from 'react';

class MsgBox extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitMessage = this.submitMessage.bind(this);
        this.handleWriter = this.handleWriter.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }
    handleWriter(newValue) {
        this.setState({writer: newValue});
    }
    handleMessage(newValue) {
        this.setState({message: newValue});
    }
    submitMessage(event) {
        console.log('submitMessage writer:' + this.state.writer + ', message: ' + this.state.message);
        console.log('event', event);
    }
    render() {
        let writerValue = {value: this.state.writer, requestChange: this.handleWriter};
        let messageValue = {value: this.state.message, requestChange: this.handleMessage};

        return (
            <div className="container-fluid">
                <form className="form-inline">
                  <div className="form-group">
                    <label className="sr-only" htmlFor="writer">Writer</label>
                    <input type="text" className="form-control" id="writer" placeholder="Writer"
                        valueLink={writerValue}/>
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="message">Password</label>
                    <input type="text" className="form-control" id="message" placeholder="Message"
                        valueLink={messageValue}/>
                  </div>
                  <button type="button" className="btn btn-default" onClick={this.submitMessage}>Send1</button>
                </form>
            </div>
        );
    }
}

export default MsgBox;

