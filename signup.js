var passwordMatch = false;
var passwordLong = false;

/* Checks whether passwords match or not. */
function passwordMatchCheck(){
    if(document.getElementById("password").value == document.getElementById("passwordAgain").value){
        document.getElementById("notMatchError").style.display = "none";
        passwordMatch = true;
    }
    else{
        document.getElementById("notMatchError").style.display = "block";
        passwordMatch = false;
    }
    enableLogin();
}

/* Checks whether password is long enough. */
function passwordLongCheck(){
    if(document.getElementById("password").value.length > 7){
        document.getElementById("notLongError").style.display = "none";
        passwordLong = true;
    }
    else{
        document.getElementById("notLongError").style.display = "block";
        passwordLong = false;
    }
    enableLogin();
}

/* Activate or deactivate submit button according to passwords match and are long enough. */
function enableLogin(){
    if(passwordMatch == true && passwordLong == true){
        document.querySelector(".submit").disabled = false;
    }
    else{
        document.querySelector(".submit").disabled = true;
    }
}

/* Timeout will be arranged after the implementation is finished. */
setTimeout(function(){
    document.getElementById("splash").style.display = "none";  
    document.getElementById("form").style.display = "block";
}, 0); 

    