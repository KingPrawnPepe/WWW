/*** PHONEGAP VERSION of WWW 
This is the JS for the phonegap version of the game. 
***/

var serviceURL = "http://concentratedblend.com/www-services/";

/*function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}*/

window.addEventListener('load', function () {
    document.addEventListener('deviceready', function () {
        console.log('device ready');
        $(document).bind( 'pagebeforeshow',function(event){
            //initUtils();
            checkPreAuth();
        });
    }, false);
}, false);


function checkPreAuth() {
    //var form = $("#signinForm");
    if(window.localStorage["unameEmail"] != undefined && window.localStorage["loggedIn"] == true) {
        //$("#unameEmail", form).val(window.localStorage["unameEmail"]);
        //$("#pword", form).val(window.localStorage["pword"]);
        //handleLogin();
        console.log('logged in! the page you need to run function is');

    }
    else if (window.localStorage["loggedIn"] != true) {
        console.log('User is not logged in. Kick to homepage!');
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
        $.post(serviceURL +'signIn.php', {username:u,password:p}, function(data) {
            if(data.items.length !== 0) {
                //store
                window.localStorage["unameEmail"] = u;
                window.localStorage["loggedIn"] = true;             
                $.mobile.changePage("home.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#signinButton").removeAttr("disabled");
        },"json");
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#signinButton").removeAttr("disabled");
    }
    return false;
}

/*function deviceReady() {
    console.log('device ready');
    $("#signinForm").on("submit",handleLogin);

}*/

/*function initUtils() {
    console.log('initUtils fired');
    checkPreAuth();
   //$("#logOutBtn").click(handleLogout);
}*/