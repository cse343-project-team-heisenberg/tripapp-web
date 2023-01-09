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
    for(var j = 0; j < docSnap.data().following.following.length; j++){
        const new_uid = String(docSnap.data().following.following[j].uid);
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
