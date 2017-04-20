/**
 * Created by omar on 17/04/2017.
 */




/*function Rows(props) {
    const rows = props.data;

    handleClick: function() {
        console.log(this.props.data);
    },

    const items = rows.map((element) =>
        <tr onClick={this.handleClick} id={element.id} ><td>1</td><td>2</td><td>3</td><td>4</td></tr>
    );
    return (<tbody>{items}</tbody>
);
}*/


window.Row = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleClick: function() {
        console.log(this.props.data);
    },
    render: function() {
        return (<tr onClick={this.handleClick} id={this.props.data.id} ><td name="Name">1</td><td name="Subject">2</td><td name="Body">...</td><td name="Date">4</td></tr>);
    }
});

window.DataTable = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {

        const  rows = this.props.data;

        const items = rows.map((element) =>
            <Row data={element} />
        );
        return (
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th >Name</th>
                         <th>Object</th>
                         <th>Body</th>
                         <th>Date</th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        );
    }
});




