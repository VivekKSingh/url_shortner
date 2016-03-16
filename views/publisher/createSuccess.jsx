var React = require('react');
var PropTypes = React.PropTypes;

var Success = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Congrats a new publisher has been created.</h1>
        <a href="/">Home</a>
      </div>
    );
  }
});

module.exports = Success;
