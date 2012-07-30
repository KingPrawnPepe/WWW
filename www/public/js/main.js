function init() {
    document.addEventListener("deviceready", deviceReady, true);
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
    var form = $("#signinForm");    
    //disable the button so we can't resubmit while we wait
    $("#signinButton",form).attr("disabled","disabled");
    var u = $("#unameEmail", form).val();
    var p = $("#pword", form).val();
    console.log("click");
    if(u != '' && p!= '') {
        $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["unameEmail"] = u;
                window.localStorage["pword"] = p;             
                $.mobile.changePage("some.html");
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

function deviceReady() {
    
    $("#signinForm").on("submit",handleLogin);

}