var React = require('react');

var PlacementForm = React.createClass({

    componentDidMount: function() {
        this.refs
    },

    handleForm: function(e) {
        console.log("Creating...")
    },

    render: function() {
        return (
            <div>
                <h1> Create a new placement.</h1>
                <hr></hr>
                <form ref="feedForm2" id="feedForm2" className="container" method="POST" onSubmit={this.handleForm} action="/createPlacement">
                    <div className="form-group">
                        <input name="name" ref="name" type="text" className="form-control" placeholder="Enter Placement Name" />
                        <input name="code" ref="code" type="text" className="form-control" placeholder="Code" />
                        <input name="size" ref="size" type="text" className="form-control" placeholder="Enter size in the form widthxheight" />
                        <input name="publisherId" ref="publisherId" type="text" className="form-control" placeholder="Enter publisher id" />
                        <button type="submit" className="btn btn-primary btn-block">Create</button>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = PlacementForm;