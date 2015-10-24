"use strict";

var MsgList = React.createClass({
    render: () => {
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
                        <tr>
                            <td>Writer1</td>
                            <td>message1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
});

