/*** WEB VERSION of WWW 
This is the JS for the web only version of the game. 
***/

var serviceURL = "http://concentratedblend.com/www-services/";
var currentPage;

function domInit() {
    //console.log('this was run when the page first loaded');
    checkPreAuth();
    delete domInit;
}

window.addEventListener('load', function () { 
    $(document).bind( 'pagebeforeshow',function(event){
        event.preventDefault();
        checkPreAuth();
    }); 
}, false);


function checkPreAuth(event) {
    currentPage = $.mobile.activePage.attr("id");
    if(window.localStorage["unameEmail"] != undefined && window.localStorage["pword"] != undefined) {
        console.log('log in check passed');
        if (currentPage == 'signinUpPage') {
            $.mobile.changePage("home.html");
        }
        else {
            $("#logOutBtn").click(handleLogout);
            $(this).trigger('pageshow');
        }
    }
    else {
        console.log('User is not logged in. Kick to homepage!');
        if (currentPage != 'signinUpPage') {
            $.mobile.changePage("index.html");
        }
    }
}

function handleLogin() {
    var form = $("#signinForm");    
    //disable the button so we can't resubmit while we wait
    $("#signinButton",form).attr("disabled","disabled");
    var u = $("#unameEmail", form).val();
    var p = $("#pword", form).val();
    console.log("click");
    if(u != '' && p!= '') {
        $.post(serviceURL +'signIn.php', {username:u,password:p}, function(data) {
            if(data.items.length !== 0) {
                //store the sign-in check vars
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

$('#signinUpPage').live('pageshow', function(event) {
    console.log('sign up page run');
    $("#signinForm").on("submit",handleLogin);
});

$('#homePage').live('pageshow', function(event) {
    console.log('home page code here');
});

