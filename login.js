import {signInWithEmailAndPassword, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import {auth, storage} from "./firebase_config.js"

/* Timeout will be arranged after the implementation is finished. */
setTimeout(function(){
    document.getElementById("splash").style.display = "none";  
    document.getElementById("form").style.display = "block";
}, 500); 


document.getElementById("login").addEventListener("click", function(){ 

    var email = document.getElementById("email").value;

    var password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth,email,password)  .then((userCredential) => {

        if(userCredential.user.emailVerified){

            const user = userCredential.user;

            localStorage.setItem("user id", user.uid);

            self.location = "myprofile.html";
        }
        else{
            document.getElementById('verificationError').style.display = "block";
        }

    })

    .catch((error) => {

        const errorCode = error.code;

        const errorMessage = error.message;

        document.getElementById("authenticationError").style.display = "block";

    });

});

document.getElementById('forgotPassword').addEventListener('click', function(){
    var email = prompt("Enter your email");

    sendPasswordResetEmail(auth, email)
    .then(() => {
        document.getElementById('resetSend').style.display = "block";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})
