import { doc, getDoc, updateDoc, arrayUnion, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";
import { db, storage} from "/firebase_config.js"
import { ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-storage.js";


const uid = localStorage.getItem("user id");

const docRef = doc(db, "users", uid);
var docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    document.getElementById("username").textContent = docSnap.data().name + " " + docSnap.data().surname;
    if(docSnap.data().profile_pic_url != undefined)
        document.getElementById('profile_pic').src = docSnap.data().profile_pic_url;
    if(docSnap.data().followers != undefined){
        document.getElementById("followers_number").textContent = docSnap.data().followers.length;
    }
    if(docSnap.data().posts != undefined){
        var username_content = document.getElementById('username').textContent;
        var profile_pic_src = document.getElementById('profile_pic').src;
        for(var i = 0; i < docSnap.data().posts.length; i++){
            createPost(username_content, profile_pic_src, docSnap.data().posts[i].post_text, docSnap.data().posts[i].post_picture);
        }
    }
    if(docSnap.data().follows != undefined){
        document.getElementById("follows_number").textContent = docSnap.data().follows.length;
    }
} 
else {
console.log("No such document!");
}

document.getElementById("search_button").addEventListener("click", async function(){
    document.getElementById("users").innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    if(doc.data().posts != undefined){
        var username_content = doc.data().name + " " + doc.data().surname;
        var profile_pic_src = "icons/profile.ico"
        if(doc.data().profile_pic_url != undefined)
            profile_pic_src = doc.data().profile_pic_url;
        if(username_content === document.getElementById("search_key").value){
            createUser(username_content, profile_pic_src, doc.data().uid);
        }
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


document.getElementById('profile_pic_download').addEventListener("change", function(){
    var read = new FileReader();
    var file = document.getElementById('profile_pic_download').files[0];
    const storageRef = ref(storage, "web/" + uid);
    const uploadTask = uploadBytes(storageRef, file).then(function(snapshot){

        getDownloadURL(storageRef).then(async (url)=>{
            docSnap = await updateDoc(docRef, {
                profile_pic_url: url
            })
        })
    });

    read.readAsDataURL(document.getElementById('profile_pic_download').files[0]);
    read.onload = function(){
        document.getElementById('profile_pic').src = read.result;
        /*Profile picture must be added to the database. */
    }
})


function createPost(username_content, profile_pic_src, textContent, photo_src){
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

    username.textContent = username_content;
    profile_pic.src = profile_pic_src;
    text.textContent = textContent;
    fav.src ="icons/unfavved.ico";
    fav.alt = "unfavved"
    save.src = "icons/saved.ico";
    fav_number.textContent = "0";

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
    document.getElementById('posts').prepend(post);

    fav.addEventListener('click', function(){
        if(fav.alt == "unfavved"){
            fav.src = "icons/favved.ico";
            fav.alt = "favved";
            fav_number.textContent = parseInt(fav_number.textContent) + 1;
        }
        else{
            fav.src = "icons/unfavved.ico";
            fav.alt = "unfavved";
            fav_number.textContent = parseInt(fav_number.textContent) - 1;
        }
    })
}

document.getElementById('post_it').addEventListener("click", async function(){ 
    var username_content = document.getElementById('username').textContent;
    var textContent = document.getElementById('post_text').value;
    var profile_pic_src = document.getElementById('profile_pic').src;
    var photo_src = null;
    if(document.getElementById('post_photo').files[0] != undefined){
        var read = new FileReader();

        var file = document.getElementById('post_photo').files[0];
        const storageRef = ref(storage, "web/" + file.name);
        const uploadTask = uploadBytes(storageRef, file).then(function(snapshot){
    
            getDownloadURL(storageRef).then(async (url)=>{
                docSnap = await updateDoc(docRef, {
                    posts: arrayUnion({
                        post_text: textContent,
                        post_picture: url
                    })
                })
            })
        })

        read.readAsDataURL(document.getElementById('post_photo').files[0]);
        read.onload = function(){
            photo_src = read.result;
            createPost(username_content, profile_pic_src, textContent, photo_src);
        }
    }
    else{
        createPost(username_content, profile_pic_src, textContent, photo_src);
        docSnap = await updateDoc(docRef, {
            posts: arrayUnion({
                post_text: textContent,
                post_picture: null
            })
        })
    }

    document.getElementById('post_text').value = null;
    document.getElementById('post_photo_display').src = "icons/add-photo.ico";
    document.getElementById('post_photo').value = null;
})



document.getElementById('post_photo').addEventListener("change", function(){
    var read = new FileReader();
    read.readAsDataURL(document.getElementById('post_photo').files[0]);
    read.onload = function(){
        document.getElementById('post_photo_display').src = read.result;
    }
})
