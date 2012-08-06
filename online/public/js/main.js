/*** WEB VERSION of WWW 
This is the JS for the web only version of the game. 
***/

var serviceURL = "http://concentratedblend.com/www-services/";

function init() {
    $(document).ready(domReady);
    delete init;
}


function checkPreAuth() {
    var form = $("#signinForm");
    if(window.localStorage["unameEmail"] != undefined && window.localStorage["pword"] != undefined) {
        $("#unameEmail", form).val(window.localStorage["unameEmail"]);
        $("#pword", form).val(window.localStorage["pword"]);
        handleLogin();
    }
}

function handleLogin() {
    //e.preventDefault();
    var form = $("#signinForm");    
    //disable the button so we can't resubmit while we wait
    $("#signinButton",form).attr("disabled","disabled");
    var u = $("#unameEmail", form).val();
    var p = $("#pword", form).val();
    console.log("click");
    if(u != '' && p!= '') {
        $.post(serviceURL +'signIn.php', {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["unameEmail"] = u;
                window.localStorage["pword"] = p;             
                $.mobile.changePage("home.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#signinButton").removeAttr("disabled");
        },"json");
    } else {
        //Thanks Igor!
        alert("You must enter a username and password");
        $("#signinButton").removeAttr("disabled");
    }
    return false;
}

function domReady() {
    console.log('the dom is ready, sire');
    $("#signinForm").on("submit",handleLogin);

}