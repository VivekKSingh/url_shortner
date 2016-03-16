var React = require('react');

var Upload = React.createClass({

  render: function() {
    return (
      <div>
        <form role="form", action="/uploadExcel", method="post", enctype="multipart/form-data">
          <input type="file", name="file", id="file">Upload</input>
        </form>
      </div>
    );
  }

});

module.exports = Upload;
