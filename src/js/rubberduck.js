/* rubberduck.jsx */
;(function (React) {
  'use strict';

  var DuckHistoryRow = React.createClass({displayName: "DuckHistoryRow",
    getTimeFromDate: function(date) {
      return date.toTimeString().split(" ")[0];
    },

    render: function() {
      var name = this.props.poster;
      var text = this.props.text;
      var time = this.getTimeFromDate(new Date());

      return (React.createElement("p", null, name, ": ", text, " ", React.createElement("small", {className: "pull-right timeText"}, time)));
    },
  });

  var DuckHistory = React.createClass({displayName: "DuckHistory",
    render: function() {
      return (
        React.createElement("div", {className: "duckHistory"}, 
          this.props.rows
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

  var Duck = React.createClass({displayName: "Duck",
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
      // array.unshift will put the new item at the front of the array
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
        React.createElement("div", {className: "superDuck"}, 
          React.createElement(DuckForm, {onFormSubmit: this.handleFormSubmit}), 
          React.createElement(DuckHistory, {rows: this.state.rows})
        )
      );
    }
  });

  React.render(
    React.createElement(Duck, null),
    document.getElementById("duckContainer")
  );
})(window.React);
