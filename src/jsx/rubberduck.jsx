/* rubberduck.jsx */
'use strict';

var DuckHistoryRow = React.createClass({
  render: function() {
    var name = this.props.poster;
    var text = this.props.text;
    var time = this.getTimeFromDate(new Date());

    return (<p>{name}: {text} <small className="pull-right timeText">{time}</small></p>);
  },

  getTimeFromDate: function(date) {
    return date.toTimeString().split(" ")[0];
  }
});

var DuckHistory = React.createClass({
  render: function() {
    return (
      <div className="duckHistory">
        {this.props.rows}
      </div>
    );
  }
});

var DuckForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text) {
      return;
    }
    this.props.onFormSubmit({name: name, text: text});
    this.refs.text.getDOMNode().value = "";
    return;
  },
  render: function() {
    return (
      <form className="duckForm" onSubmit={this.handleSubmit}>
        <input type="hidden" value="You" ref="name" />
        <div className="input-group">
          <input className="form-control" type="text" placeholder="Say something..." ref="text" />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit"><span className="glyphicon glyphicon-send"></span></button>
          </span>
        </div>
      </form>
    );
  }
});

var Duck = React.createClass({
  addDuckMessage: function() {
    var rows = this.state.rows;
    rows.unshift(<DuckHistoryRow poster="Duck" text={this.pickDuckMessage()} />);
    this.setState({rows: rows});
  },
  getInitialState: function() {
    return {
      rows: [],
      duckTimeout: null
    };
  },
  handleFormSubmit: function(chatMessage) {
    var rows = this.state.rows;
    var duckTimeout = this.state.duckTimeout;
    // array.unshift will put the new item at the front of the array
    rows.unshift(<DuckHistoryRow poster={chatMessage.name} text={chatMessage.text} />);
    clearTimeout(duckTimeout);
    duckTimeout = setTimeout(this.addDuckMessage, 4000);
    this.setState({rows: rows, duckTimeout: duckTimeout});
  },
  pickDuckMessage: function() {
    var duckSayings = [
      "Hmmm.",
      "Okay.",
      "I see.",
      "Alright.",
      "Interesting.",
      "OK",
      "I'm with you.",
      "Following.",
      "Huh.",
    ];
    return duckSayings[Math.floor(Math.random() * duckSayings.length)];
  },
  render: function() {
    return (
      <div className="superDuck">
        <DuckForm onFormSubmit={this.handleFormSubmit} />
        <DuckHistory rows={this.state.rows} />
      </div>
    );
  }
});

React.render(
  <Duck />,
  document.getElementById("duckContainer")
);
