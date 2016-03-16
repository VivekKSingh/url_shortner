var React = require('react');

var FeedForm = React.createClass({

  handleForm: function(e) {
    e.preventDefault();

    var newItem = {
      title: this.refs.title.getDOMNode().value,
      description: this.refs.desc.getDOMNode().value,
      voteCount: 0
    };

    this.refs.feedForm.getDOMNode().reset();

    this.props.onNewItem(newItem);

  },

  render: function() {

    return (
      <form ref="feedForm" id="feedForm" className="container" onSubmit={this.handleForm}>

        <div className="form-group">

          <input ref="title" type="text" className="form-control" placeholder="Title" />
          <input ref="desc" type="text" className="form-control" placeholder="Description" />

          <button type="submit" className="btn btn-primary btn-block">Add</button>
        </div>

      </form>
    );
  }

});

module.exports = FeedForm;
