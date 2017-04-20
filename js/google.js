/**
 * Created by omar on 17/04/2017.
 */

window.contacts = [];
window.labels = [];
window.pagesTokens = [];
var clientId = '943549773222-8spur60a6ve4gdpe1p6k0rr2e6pttmnr.apps.googleusercontent.com';
var apiKey = '943549773222-8spur60a6ve4gdpe1p6k0rr2e6pttmnr.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/gmail.send ' +
    'https://www.googleapis.com/auth/contacts.readonly ' +
    'https://www.googleapis.com/auth/gmail.compose ' +
    'https://mail.google.com/ ' +
    'https://www.googleapis.com/auth/gmail.modify ' +
    'https://www.googleapis.com/auth/gmail.readonly ' +
    'https://www.googleapis.com/auth/gmail.metadata ';


window.authorize = function() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthorization);
}
window.handleAuthorization = function(authorizationResult) {
    if (authorizationResult && !authorizationResult.error) {


        window.authorizationResult = authorizationResult;

        $('#googleLoginModal').modal('hide');

        // get Labels
        axios.get("https://www.googleapis.com/gmail/v1/users/me/labels?alt=json&access_token=" + authorizationResult.access_token )
            .then(res => {
            window.labels = [];
            for(var item in res.data.labels){
                window.labels.push(res.data.labels[item].name);
            }
            ReactDOM.render(<Menu data={window.labels} />,
                document.getElementById('sidebar')
            );
        });


        // get contacts
        getContacts();

        //get Messages
        window.page = 0;
        getMessages(window.page);


    }
}


window.getContacts = function(){





    axios.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + window.authorizationResult.access_token + "&max-results=500&v=3.0")
        .then(res => {
        window.contacts = [];
        console.log(res);
        for(var index in res.data.feed.entry){
            if(res.data.feed.entry[index].gd$email != undefined)



                for(var emailIndex in res.data.feed.entry[index].gd$email){

                    contacts.push({
                        id: emailIndex,
                        name: res.data.feed.entry[index].gd$email[emailIndex].address,
                        full_name: res.data.feed.entry[index].title.$t
                    });
                }
        }

        $('#input_to').typeahead({
            source: window.contacts
        });
    });

}


window.getMessages = function(pageIndex){

    console.log(pageIndex);
    if(pageIndex == 0){
        $("#nav_prev").addClass("disabled");
    }else {
        $("#nav_prev").removeClass("disabled");
    }

    var page = "";
    if(window.pagesTokens[pageIndex] != undefined || pageIndex > 0){
        page = "&pageToken="+ window.pagesTokens[pageIndex];
    }

    var label = "";
    if(window.selectedLabel != undefined && window.selectedLabel != "All"){
        label = "&labelIds="+ window.selectedLabel;
    }

    axios.get("https://www.googleapis.com/gmail/v1/users/me/messages?alt=json&access_token=" + window.authorizationResult.access_token + "&maxResults=10" + page + label)
        .then(res => {

        window.pagesTokens[pageIndex +1] = res.data.nextPageToken;
        for(var item in res.data.messages){
            getEmail(res.data.messages[item].id, authorizationResult);
        }

        ReactDOM.render(<DataTable data={res.data.messages} />,
            document.getElementById('messages')
        );
    });

}

window.getEmail = function(id, authorizationResult){
    //console.log("https://www.googleapis.com/gmail/v1/users/me/threads/"+id+"?alt=json&format=METADATA&access_token=" + authorizationResult.access_token);
    axios.get("https://www.googleapis.com/gmail/v1/users/me/threads/"+id+"?alt=json&format=METADATA&access_token=" + authorizationResult.access_token )
        .then(res => {

        var headres = res.data.messages[0].payload.headers;

        for(var item in headres){
            if(headres[item].name == "Subject"){
                $('#'+res.data.id).find("td[name=Subject]").html(headres[item].value);
            }
            if(headres[item].name == "From"){
                $('#'+res.data.id).find("td[name=Name]").html(headres[item].value);
            }
            if(headres[item].name == "Date"){
                $('#'+res.data.id).find("td[name=Date]").html(headres[item].value);
            }
            if(headres[item].name == "Message-ID"){
                $('#'+res.data.id).data('message_id', headres[item].value);
            }
        }


    });
}




window.hello = function(){
    console.log("hello");
}