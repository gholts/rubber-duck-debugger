

var DuckHistoryRow = React.createClass({
  render: function() {
    var name = this.props.poster;
    var text = this.props.text;

    return (<p>{name}: {text}</p>);
  }
});

var DuckHistory = React.createClass({
  render: function() {
    var rows = [];
    this.props.startingRows.forEach(function(row) {
      rows.push(<DuckHistoryRow poster={row.name} text={row.text} />);
    });
    return (<div className="duckHistory">{rows}</div>);
  }
});

var DuckForm = React.createClass({
  render: function() {
    return (
      <form className="duckForm">
        <input type="hidden" value="You" ref="name" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});



var Duck = React.createClass({
  render: function() {
    return (
      <div>
        <h2>The duck.</h2>
        <DuckHistory startingRows={this.props.startingRows} />
        <DuckForm />
      </div>
    );
  }
});

var ROWS = [
  {name: "You", text: "And then this happens"},
  {name: "Duck", text: "OK"},
  {name: "You", text: "And then this happens"},
];

React.render(
  <Duck startingRows={ROWS} />,
  document.body
);
