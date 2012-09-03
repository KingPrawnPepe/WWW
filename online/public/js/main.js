/*** WEB VERSION of WWW 
This is the JS for the web only version of the game. 
***/

var serviceURL = "http://concentratedblend.com/www-services/";

function test() {
    console.log('this was run when the page first loaded');
    checkPreAuth();
    delete test;
}

window.addEventListener('load', function () { 
    $(document).bind( 'pagebeforeshow',function(event){
        event.preventDefault();
        checkPreAuth();
    }); 
}, false);


function checkPreAuth(event) {
    //var form = $("#signinForm");
    //console.log($.mobile.activePage.attr("id"));
    if(window.localStorage["unameEmail"] != undefined && window.localStorage["pword"] != undefined) {
        $("#logOutBtn").click(handleLogout);
        //$("#unameEmail", form).val(window.localStorage["unameEmail"]);
        //$("#pword", form).val(window.localStorage["pword"]);
        //handleLogin();
        console.log('logged in!');
        $(this).trigger('pageshow');
    }
    else {
        console.log('User is not logged in. Kick to homepage!');
        $.mobile.changePage("index.html");
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
                console.log('the reply happened');
                window.localStorage["unameEmail"] = u;
                window.localStorage["pword"] = p;             
                $.mobile.changePage("home.html");
            } else {
                console.log(data);
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

function handleLogout() {
    window.localStorage.removeItem("unameEmail");
    window.localStorage.removeItem("pword");
    $.mobile.changePage("index.html");
}

function domReady() {
    console.log('the dom is ready, sire');
    //initUtils();
    //$("#signinForm").on("submit",handleLogin);
}

$('#signinUpPage').live('pageshow', function(event) {
    console.log('sign up page run');
    $("#signinForm").on("submit",handleLogin);
});

$('#homePage').live('pageshow', function(event) {
    console.log('home page code here');
});

/*function initUtils() {
    console.log('initUtils fired');
    checkPreAuth();
   //$("#logOutBtn").click(handleLogout);
}*/

/*$(document).bind( 'pagebeforeshow',function(event){
     console.log('the next page is about to be shown');
     //initUtils();
});*/

