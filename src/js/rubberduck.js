/* rubberduck.jsx */

var DuckHistoryRow = React.createClass({displayName: "DuckHistoryRow",
  render: function() {
    var name = this.props.poster;
    var text = this.props.text;
    var time = this.getTimeFromDate(new Date());

    return (React.createElement("p", null, name, ": ", text, " ", React.createElement("small", {className: "pull-right timeText"}, time)));
  },

  getTimeFromDate: function(date) {
    return date.toTimeString().split(" ")[0];
  }
});

var DuckHistory = React.createClass({displayName: "DuckHistory",
  addDuckMessage: function() {
    var rows = this.state.rows;
    rows.unshift(React.createElement(DuckHistoryRow, {poster: "Duck", text: this.pickDuckMessage()}));
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
    rows.unshift(React.createElement(DuckHistoryRow, {poster: chatMessage.name, text: chatMessage.text}));
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
      React.createElement("div", null, 
        React.createElement(DuckForm, {onFormSubmit: this.handleFormSubmit}), 
        React.createElement("div", {className: "duckHistory"}, 
          this.state.rows
        )
      )
    );
  }
});

var DuckForm = React.createClass({displayName: "DuckForm",
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
      React.createElement("form", {className: "duckForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "hidden", value: "You", ref: "name"}), 
        React.createElement("div", {className: "input-group"}, 
          React.createElement("input", {className: "form-control", type: "text", placeholder: "Say something...", ref: "text"}), 
          React.createElement("span", {className: "input-group-btn"}, 
            React.createElement("button", {className: "btn btn-primary", type: "submit"}, React.createElement("span", {className: "glyphicon glyphicon-send"}))
          )
        )
      )
    );
  }
});

React.render(
  React.createElement(DuckHistory, null),
  document.getElementById("duckContainer")
);
