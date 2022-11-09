document.getElementById("edit_button").addEventListener("click", function(){
    document.querySelector(".bio").disabled = false;
    document.getElementById("save_button").hidden = false;
})

document.getElementById("save_button").addEventListener("click", function(){
    document.querySelector(".bio").disabled = true;
    document.getElementById("save_button").hidden = true;
    /*Content of the bio must be added to the database. */
})

document.getElementById('profile_pic_download').addEventListener("change", function(){
    var read = new FileReader();
    read.readAsDataURL(document.getElementById('profile_pic_download').files[0]);
    read.onload = function(){
        document.getElementById('profile_pic').src = read.result;
        /*Profile picture must be added to the database. */
    }
})

document.getElementById('post_it').addEventListener("click", function(){
    if(document.getElementById('post_text').value == "" && document.getElementById('post_photo_display').src == "add-photo.ico")
        return;    

    var post = document.createElement("li");
    var photo = document.createElement("img");
    var text = document.createElement('section');
    var profile_pic = document.createElement('img');
    var username = document.createElement('text');
    var read = new FileReader();

    post.style.cssText = "position: relative; width: 550px;max-height: 800px; display: block;border-radius: 15px;border: 3px solid black";
    text.style.cssText = "font-size: 20px; font-family: Arial, Helvetica, sans-serif; width: 500px;overflow-wrap: normal; margin-left: 50px";
    profile_pic.style.cssText = "border-radius: 50%;width: 50px;height: 50px;";
    username.style.cssText = " width: 500px;height: 25px;font-size: 25px; vertical-align: top; ";

    profile_pic.src = document.getElementById('profile_pic').src;
    username.textContent = document.getElementById('username').textContent;
    text.textContent = document.getElementById('post_text').value;
    // add this to database. //

    post.appendChild(profile_pic);
    post.appendChild(username);
    post.appendChild(text);

    if(document.getElementById('post_photo').files[0] != undefined){
        read.readAsDataURL(document.getElementById('post_photo').files[0]);
        read.onload = function(){
            photo.src = read.result;
            // add this to database. //
        }
        photo.style.cssText = "position: relative;width: 500px; margin-left: 50px; border-radius: 15px;";
        post.appendChild(photo);
    }

    document.getElementById('posts').prepend(post);
    document.getElementById('posts').prepend(post);
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
