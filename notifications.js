import { doc, getDoc, updateDoc, arrayUnion, getDocs, collection, arrayRemove} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";
import { db, storage} from "/firebase_config.js"
import { ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-storage.js";

const uid = localStorage.getItem("user id");
const docRef = doc(db, "testWeb", uid);
var docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    createNotification("icons/notif_bell.png","welcome to tripapp!")
    for(var i=0;i<docSnap.data().data.data.length;++i){
        for(var j = 0; j < docSnap.data().data.data[i].like.length; j++){
            const new_uid = String(docSnap.data().data.data[i].like[j]);
            const new_docRef = doc(db, "testWeb", new_uid);
            var new_docSnap = await getDoc(new_docRef);
            var profile_pic = (new_docSnap.data().profilePicture != undefined) ? new_docSnap.data().profilePicture : "icons/profile.ico";
            createNotification(profile_pic,new_docSnap.data().UserInfo.userName + " liked your post!")
        }
    }
    for(var j = 0; j < docSnap.data().followers.followers.length; j++){
        const new_uid = String(docSnap.data().followers.followers[j]);
        const new_docRef = doc(db, "testWeb", new_uid);
        var new_docSnap = await getDoc(new_docRef);
        var profile_pic = (new_docSnap.data().profilePicture != undefined) ? new_docSnap.data().profilePicture : "icons/profile.ico";
        createNotification(profile_pic,new_docSnap.data().UserInfo.userName + " followed you!")
    }
}

setTimeout(function(){
    document.getElementById("splash").style.display = "none";  
    document.getElementById("main").style.display = "block";
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("leftsidebar").style.display = "block";
}, 500); 

function createNotification(profile_pic_src, context){
    var notification = document.createElement("li");
    var profile_pic = document.createElement("img");
    var text = document.createElement('span');
    notification.style.cssText = "position: relative; width: 90%;max-height: 200px; display: block;border-radius: 15px;border: 3px solid black; margin-bottom: 20px";
    text.style.cssText = "font-size: 25px; font-family: Arial, Helvetica, sans-serif;overflow-wrap: normal; margin-left: 10px; vertical-align: middle";
    profile_pic.style.cssText = "border-radius: 50%;width: 50px;height: 50px; vertical-align: middle";

    profile_pic.src = profile_pic_src;
    text.textContent = context;

    notification.appendChild(profile_pic);
    notification.appendChild(text);

    document.getElementById('notifications_list').prepend(notification);
}

document.getElementById("search_button").addEventListener("click", async function(){
    document.getElementById("users").innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "testWeb"));
    querySnapshot.forEach((doc) => {
        var username_content = doc.data().UserInfo.userName;
        var profile_pic_src = "icons/profile.ico"
        if(doc.data().profilePicture != undefined)
            profile_pic_src = doc.data().profilePicture;
        if(username_content === document.getElementById("search_key").value){
            createUser(username_content, profile_pic_src, doc.data().UserInfo.uuid);
        }
    });
})

document.getElementById("search_key").addEventListener("input", function(){
    document.getElementById("users").innerHTML = "";
})

function createUser(username_content, profile_pic_src, uid){
    var user = document.createElement("li");
    var link = document.createElement("a");
    var profile_pic = document.createElement("img");
    var username = document.createElement("text");

    user.style.cssText = "width: 80%; height: 10%; display: block; border: 1px solid black; border-radius: 20px";
    profile_pic.style.cssText = "border-radius: 50%; width: 30px; height: 30px";
    username.style.cssText = " width: 30px;height: 25px;font-size: 25px; vertical-align: top; "
    link.style.cssText = "text-decoration: none; color: black";
    link.href = "profile.html?uid=" + uid;
    username.textContent = username_content;
    profile_pic.src = profile_pic_src;
    link.appendChild(profile_pic)
    link.appendChild(username);
    user.appendChild(link);
    document.getElementById('users').prepend(user);
}