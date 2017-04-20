/**
 * Created by omar on 17/04/2017.
 */


window.GoogleLogin = React.createClass({
    getInitialState: function() {
        return {
            isSelected: false
        };
    },
    handleClick: function() {
        this.setState({
            isSelected: true
        });

        window.setTimeout(authorize);
    },
    render: function() {

        return (
            <button onClick={this.handleClick} >{this.props.content}</button>
        );
    }
});



window.NavigationPrevious = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleClick: function(type) {
        window.page = window.page-1;
        getMessages(window.page);
    },
    render: function() {

        return(
            <li className="page-item disabled" id="nav_prev">
            <a className="page-link" onClick={this.handleClick} href="javascript:void(0)" tabindex="-1">Previous</a>
            </li>
        );
    }
});


window.NavigationNext = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleClick: function(type) {
        window.page = window.page+1;
        getMessages(window.page);
    },
    render: function() {
        return(
            <li className="page-item">
            <a className="page-link" onClick={this.handleClick} href="javascript:void(0)" >Next</a>
            </li>
        );
    }
});


window.Navigation = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return(
            <div>
                <NewButton />
                <nav aria-label="...">
                    <ul className="pagination">
                        <NavigationPrevious />
                        <NavigationNext />
                    </ul>
                </nav>
            </div>
        );
    }
});



window.NewButton = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleClick: function(type) {
        $("#sendEmailModal").modal("show");
        $("#input_to").val("");
        $("#input_subject").val("");
        tinymce.get('editor').setContent('<p>Your message here ...!</p>');
    },
    render: function() {
        return(
            <button onClick={this.handleClick} type="button" className="btn btn-danger"><i className="fa fa-plus"></i> New</button>
        );
    }
});


window.SendEmailButton = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleClick: function(type) {

        sendEmail();

    },
    render: function() {
        return(
            <div>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button id="AddBrandButton" onClick={this.handleClick} type="button" className="btn btn-primary">Send</button>
            </div>
        );
    }
});


function sendEmail(){

    var headers_obj = {
        'To': $("#input_to").val(),
        'Subject': $("#input_subject").val(),
        'Content-Type': 'text/html; charset=UTF-8'

};
    var message = tinymce.get('editor').getContent();

    var email = '';

    for(var header in headers_obj)
        email += header += ": "+headers_obj[header]+"\r\n";

    email += "\r\n" + message;


    axios.post("https://www.googleapis.com/gmail/v1/users/me/messages/send?alt=json&access_token=" + window.authorizationResult.access_token, {
        raw: window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    })
    .then(function (response) {
            $("#sendEmailModal").modal("hide");
        })
    .catch(function (error) {
            console.log("send email error!!!");
            $("#sendEmailModal").modal("hide");
    });


}
