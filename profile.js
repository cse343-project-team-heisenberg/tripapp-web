import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";
import { db, storage} from "/firebase_config.js"
import { ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-storage.js";

const uid = new URLSearchParams(window.location.search).get("uid");

if(uid == localStorage.getItem("user id")){
    self.location = "myprofile.html";
}

const docRef2 = doc(db, "Post", localStorage.getItem("user id"));
var docSnap2 = await getDoc(docRef2);

const docRef = doc(db, "Post", uid);
var docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    document.getElementById("username").textContent = docSnap.data().UserInfo.userName;
    if(docSnap.data().profilePicture != undefined){
        document.getElementById('profile_pic').src = docSnap.data().profilePicture;
    }
    if(docSnap.data().UserInfo.biography != undefined)
        document.getElementById('bio').value = docSnap.data().UserInfo.biography;
    if(docSnap.data().data != undefined){
        var username_content = document.getElementById('username').textContent;
        var profile_pic_src = document.getElementById('profile_pic').src;
        for(var i = 0; i < docSnap.data().data.data.length; i++){
            createPost(username_content, profile_pic_src, docSnap.data().data.data[i].description, docSnap.data().data.data[i].pictureUrl, docSnap.data().UserInfo.uuid, i);
        }
    }
    if(docSnap.data().followers != undefined){
        document.getElementById("followers_number").textContent = docSnap.data().followers.followers.length;
        for(var i = 0; i < docSnap.data().followers.followers.length; i++){
            if(docSnap.data().followers.followers[i] == localStorage.getItem("user id")){
                document.getElementById('follow').textContent = "Following";
                document.getElementById('follow').style.backgroundColor = "green";
            }
        }
    }
    if(docSnap.data().following != undefined){
        document.getElementById("follows_number").textContent = docSnap.data().following.following.length;
    }

} 
else {
console.log("No such document!");
}

document.getElementById('follow').addEventListener("click", async function(){
    if(document.getElementById('follow').textContent == "Follow"){
        document.getElementById('follow').textContent = "Following";
        document.getElementById('follow').style.backgroundColor = "green";
        document.getElementById('followers_number').textContent = parseInt(document.getElementById('followers_number').textContent) + 1;
        const docRef2 = doc(db, "Post", localStorage.getItem("user id"));
        var docSnap2 = await getDoc(docRef2);
        const docRef = doc(db, "Post", uid);
        var docSnap = await getDoc(docRef);
        var followers = docSnap.data().followers.followers;
        followers.push(localStorage.getItem("user id"));
        docSnap = await updateDoc(docRef, {
            "followers.followers": followers,
        })
        var following = docSnap2.data().following.following;
        following.push(uid);
        docSnap2 = await updateDoc(docRef2, {
            "following.following": following
        })
    }
    else{
        document.getElementById('follow').textContent = "Follow";
        document.getElementById('follow').style.backgroundColor = "black";
        document.getElementById('followers_number').textContent = parseInt(document.getElementById('followers_number').textContent) - 1;
        const docRef2 = doc(db, "Post", localStorage.getItem("user id"));
        var docSnap2 = await getDoc(docRef2);
        const docRef = doc(db, "Post", uid);
        var docSnap = await getDoc(docRef);
        var followers = docSnap.data().followers.followers;
        var remove = followers.indexOf(localStorage.getItem("user id"));
        if(remove > -1){
            followers.splice(remove, 1);
        }
        docSnap = await updateDoc(docRef, {
            "followers.followers": followers
        })
        var following = docSnap2.data().following.following;
        remove = following.indexOf(uid);
        if(remove > -1){
            following.splice(remove, 1);
        }
        docSnap2 = await updateDoc(docRef2, {
            "following.following": following
        })
    }
});

document.getElementById("search_button").addEventListener("click", async function(){
    document.getElementById("users").innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "Post"));
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

async function createPost(username_content, profile_pic_src, textContent, photo_src, uid_of_user, index){
    if(textContent == "" && photo_src == undefined){
        return;
    }

    var post = document.createElement("li");
    var photo = document.createElement("img");
    var text = document.createElement('section');
    var profile_pic = document.createElement('img');
    var username = document.createElement('text');
    var fav_number = document.createElement('text');
    var fav = document.createElement('img');
    var save_number = document.createElement('text');
    var save = document.createElement('img');

    post.style.cssText = "position: relative; width: 90%;max-height: 800px; display: block;border-radius: 15px;border: 3px solid black";
    text.style.cssText = "font-size: 20px; font-family: Arial, Helvetica, sans-serif; width: 500px;overflow-wrap: normal; margin-left: 50px";
    profile_pic.style.cssText = "border-radius: 50%;width: 50px;height: 50px;";
    username.style.cssText = " width: 500px;height: 25px;font-size: 25px; vertical-align: top; ";
    photo.style.cssText = "position: relative;width: 90%; margin-left: 50px; border-radius: 15px; max-height: 600px";
    fav.style.cssText = "position: relative; width: 30px; height: 30px; left: 30%; vertical-align: middle";
    save.style.cssText = "position: relative; width: 30px; height: 30px; left: 60%; vertical-align: middle";
    fav_number.style.cssText = "position: relative; left: 30%; font-size: 30px; vertical-align: middle;";
    save_number.style.cssText = "position: relative; left: 60%; font-size: 30px; vertical-align: middle;";

    username.textContent = username_content;
    profile_pic.src = profile_pic_src;
    text.textContent = textContent;
    fav.src ="icons/unfavved.ico";
    fav.alt = "unfavved"
    save.src = "icons/add-list.ico";
    save.alt = "unsaved"
    fav_number.textContent = "0";
    save_number.textContent = "0";

    post.appendChild(profile_pic);
    post.appendChild(username);
    post.appendChild(text);
    if(photo_src != undefined){
        photo.src = photo_src;
        post.appendChild(photo);
    }

    post.appendChild(fav);
    post.appendChild(fav_number);
    post.appendChild(save);
    post.appendChild(save_number);

    document.getElementById('posts').prepend(post);
    
    const docRef = doc(db, "Post", uid_of_user);
    var docSnap = await getDoc(docRef);
    if(docSnap.data().data.data[index] != undefined){
        post = docSnap.data().data.data[index];
        const current = post.like.indexOf(localStorage.getItem("user id"));

        if(current > -1){
            fav.src = "icons/favved.ico";
            fav.alt = "favved";
        }
        
        const current2 = post.save.indexOf(localStorage.getItem("user id"));

        if(current2 > -1){
            save.src = "icons/added-list.ico";
            save.alt = "saved";
        }
        
        fav_number.textContent = post.like.length;
        save_number.textContent = post.save.length;
    }

    save.addEventListener('click', async function(){

        if(save.alt == "unsaved"){
            save.src = "icons/added-list.ico";
            save.alt = "saved";
            save_number.textContent = parseInt(save_number.textContent) + 1;
            
            const docRef = doc(db, "Post", uid_of_user);
            var docSnap = await getDoc(docRef);
            post = docSnap.data().data.data[index];
            post.save.push(localStorage.getItem("user id"));
            var docSnaps = await updateDoc(docRef, {
                "data.data": arrayRemove(docSnap.data().data.data[index])
            })
            docSnaps = await updateDoc(docRef, {
                "data.data": arrayUnion(post)
            })
        }
        else{
            save.src = "icons/add-list.ico";
            save.alt = "unsaved";
            save_number.textContent = parseInt(save_number.textContent) - 1;
            const docRef = doc(db, "Post", uid_of_user);
            var docSnap = await getDoc(docRef);
            post = docSnap.data().data.data[index];
            const remove = post.save.indexOf(localStorage.getItem("user id"));
            if (remove > -1) { 
            post.like.splice(remove, 1); 
            }
            var docSnaps = await updateDoc(docRef, {
                "data.data": arrayRemove(docSnap.data().data.data[index])
            })
            docSnaps = await updateDoc(docRef, {
                "data.data": arrayUnion(post)
            })
        }
    })


    fav.addEventListener('click', async function(){
        if(fav.alt == "unfavved"){
            fav.src = "icons/favved.ico";
            fav.alt = "favved";
            fav_number.textContent = parseInt(fav_number.textContent) + 1;
            const docRef = doc(db, "Post", uid_of_user);
            var docSnap = await getDoc(docRef);
            post = docSnap.data().data.data[index];
            post.like.push(localStorage.getItem("user id"));
            var docSnaps = await updateDoc(docRef, {
                "data.data": arrayRemove(docSnap.data().data.data[index])
            })
            docSnaps = await updateDoc(docRef, {
                "data.data": arrayUnion(post)
            })
        }
        else{
            fav.src = "icons/unfavved.ico";
            fav.alt = "unfavved";
            fav_number.textContent = parseInt(fav_number.textContent) - 1;
            const docRef = doc(db, "Post", uid_of_user);
            var docSnap = await getDoc(docRef);
            post = docSnap.data().data.data[index];
            const remove = post.like.indexOf(localStorage.getItem("user id"));
            if (remove > -1) { 
            post.save.splice(remove, 1); 
            }
            var docSnaps = await updateDoc(docRef, {
                "data.data": arrayRemove(docSnap.data().data.data[index])
            })
            docSnaps = await updateDoc(docRef, {
                "data.data": arrayUnion(post)
            })
        }
    })
}

setTimeout(function(){
    document.getElementById("splash").style.display = "none";  
    document.getElementById("main").style.display = "block";
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("leftsidebar").style.display = "block";
}, 500); 
