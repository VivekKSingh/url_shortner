var React = require('react');

var FeedForm = React.createClass({

  componentDidMount: function() {
    this.refs
  },

  handleForm: function(e) {
    console.log("Creating...")
  },

  render: function() {
    return (
      <div>
        <h1> Create a new publisher.</h1>
        <hr></hr>
        <form ref="feedForm" id="feedForm" className="container" method="POST" onSubmit={this.handleForm} action="/createPublisher">
          <div className="form-group">
            <input name="name" ref="name" type="text" className="form-control" placeholder="Enter Publisher Name" />
            <input name="code" ref="code" type="text" className="form-control" placeholder="Code" />
            <button type="submit" className="btn btn-primary btn-block">Create</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = FeedForm;
