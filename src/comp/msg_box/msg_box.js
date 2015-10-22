var MsgBox = React.createClass({
    render: function () {
        return (
            <div>
                <b>Hello I am MsgBox!</b>
            </div>
        );
    }
});

ReactDOM.render(
  <MsgBox />,
  document.getElementById('content')
);