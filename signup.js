import { storage, auth, db} from "/firebase_config.js"
import { createUserWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js"
import { collection, addDoc,doc, setDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-storage.js";


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
}

/* Register the user to the system. */
document.getElementById('signup').addEventListener("click", async function(){
    passwordMatchCheck();
    passwordLongCheck();
    document.getElementById("emailUsedError").style.display = "none";
    if(passwordLong == false || passwordMatch == false)
        return;
    
    var email =  document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
  
        createUserWithEmailAndPassword(auth,email,password).then(async (userCredential) =>{
            const user = userCredential.user;   
            
            var name = document.getElementById("name").value;
            var surname = document.getElementById("surname").value;

            sendEmailVerification(auth.currentUser).then(() =>{});
               
            await await setDoc(doc(db, "testWeb", user.uid), {
                UserInfo: {
                uuid: user.uid,
                mail: email,
                password: password,
                name: name,
                surname: surname,
                userName: username},
                following: {following: []},
                followers: {followers: []},
                data: {data: []}
            });
    
            self.location = "login.html";
    
        })
        
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            document.getElementById("emailUsedError").style.display = "block";
            
        })
});

/* Timeout will be arranged after the implementation is finished. */
setTimeout(function(){
    document.getElementById("splash").style.display = "none";  
    document.getElementById("form").style.display = "block";
}, 500); 

    