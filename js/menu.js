/**
 * Created by omar on 17/04/2017.
 */






window.Menu = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {

        const rows = this.props.data;
        const item = rows.map((element) =>
            <MenuItem data={element} />
        );

        return (<div className="list-group panel" >
            <MenuItem data="All" />
            {item}
            </div>);
    }
});


window.MenuItem = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleClick: function() {
        window.selectedLabel = this.props.data;
        window.page = 0;
        getMessages(0);
    },
    render: function() {
        return (<a id={this.props.data} onClick={this.handleClick} href="javascript:void(0)" className="list-group-item collapsed" data-parent="#sidebar">
            <i className="fa fa-folder"></i>
            <span> </span> <span className="hidden-sm-down">{this.props.data}</span>
        </a>);
    }
});




