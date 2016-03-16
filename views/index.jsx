var React = require('react');

var HelloMessage = React.createClass({
  render: function() {
    return (<div>
      <h1>Welcome to AppNexus application.</h1>
      <a href="/createPublisher">Create a new Publisher</a>
    </div>);
  }
});

module.exports = HelloMessage;
