"use strict";

var MsgBox = React.createClass({
    render: () => {
        return (
            <div className="container-fluid">
                <form className="form-inline">
                  <div className="form-group">
                    <label className="sr-only" htmlFor="writer">Writer</label>
                    <input type="text" className="form-control" id="writer" placeholder="Writer"/>
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="message">Password</label>
                    <input type="text" className="form-control" id="message" placeholder="Message"/>
                  </div>
                  <button type="submit" className="btn btn-default">Send</button>
                </form>
            </div>
        );
    }
});

