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
    if(window.localStorage["uName"] != undefined && window.localStorage["uId"] != undefined) {
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
        if (currentPage != 'signinUpPage') {
            alert("Sorry, you must be logged in to access that page");
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
    if(u != '' && p!= '') {
        $.post(serviceURL +'signIn.php', {unameEmail:u,password:p}, function(data) {
            if(data.items.length !== 0) {
                //store the sign-in check vars
                window.localStorage["uName"] = data.items[0].uname;
                window.localStorage["uId"] = data.items[0].id;             
                $.mobile.changePage("home.html");
            } else {
                alert("Whoops! That username or password doesn't match our records. Try again.");
                $("#unameEmail", form).val("");
                $("#pword", form).val("");
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
    window.localStorage.removeItem("uName");
    window.localStorage.removeItem("uId");
    $.mobile.changePage("index.html");
}

function validEmailCheck(event) {
    var formValue = $(event.target.id);
    var formName = $(event.target.value);
    $.post(serviceURL +'validInput.php', {value:formValue,form:formName}, function(data) {
        if(data.items.length !== 0) {
            //store the sign-in check vars
        } else {
            alert("That username/email is already taken");
            //console.log(data);
        }
    },"json");    
}

function validUnameCheck(event) {
    console.log("uname check = "+event.target.id);
}

$(document).on('pageshow', '#signinUpPage', function(event) {
    console.log('sign up page run');
    $("#signinForm").on("submit",handleLogin);
    $("#newEmail").on("change keyup", validEmailCheck);
    $("#newUname").on("change keyup", validUnameCheck);
});

$(document).on('pageshow', '#homePage', function(event) {
    //console.log('home page code here');
});

