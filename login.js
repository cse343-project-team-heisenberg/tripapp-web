import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import {auth} from "./firebase_config.js"

/* Timeout will be arranged after the implementation is finished. */
setTimeout(function(){
    document.getElementById("splash").style.display = "none";  
    document.getElementById("form").style.display = "block";
}, 500); 

document.getElementById("login").addEventListener("click", function(){ 

    var email = document.getElementById("email").value;

    var password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth,email,password)  .then((userCredential) => {

        const user = userCredential.user;

        self.location = "profile.html?uid=" + user.uid;

    })

    .catch((error) => {

        const errorCode = error.code;

        const errorMessage = error.message;

        document.getElementById("authenticationError").style.display = "block";

    });

});
