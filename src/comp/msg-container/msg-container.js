"use strict";

var MsgContainer = React.createClass({
    render: () => {
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
});

ReactDOM.render(
  <MsgContainer />,
  document.getElementById('content')
);