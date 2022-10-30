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
    var post = document.createElement('li');
    var post_photo = document.createElement('img');
    var post_text = document.createElement('textarea');
    var read = new FileReader();
    post_text.textContent = document.getElementById('post_text').value;
    /*This text content must be also added to the database.*/
    post.className = "post_design";
    if(document.getElementById('post_photo').files[0] != undefined){
        read.readAsDataURL(document.getElementById('post_photo').files[0]);
        read.onload = function(){
            post_photo.src = read.result;
            /* This result must be also added to the database. */
        }
        post_photo.className = "post_photo_display";
        post.appendChild(post_photo);
    }
    post_text.className = "post_text";
    post_text.disabled = true;
    post.appendChild(post_text);
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
