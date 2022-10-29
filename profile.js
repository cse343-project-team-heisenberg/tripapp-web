document.getElementById("edit_button").addEventListener("click", function(){
    document.querySelector(".bio").disabled = false;
    document.getElementById("save_button").hidden = false;
})

document.getElementById("save_button").addEventListener("click", function(){
    document.querySelector(".bio").disabled = true;
    document.getElementById("save_button").hidden = true;
})

document.getElementById('post_it').addEventListener("click", function(){
    var post = document.createElement('li');
    var post_photo = document.createElement('img');
    var post_text = document.createElement('textarea');
    post_text.textContent = document.getElementById('post_text').value;
    post.className = "post_design";
    if(document.getElementById('post_photo').files[0] != undefined){
        post_photo.src = document.getElementById('post_photo').files[0].name;
        post_photo.className = "post_photo_display";
        post.appendChild(post_photo);
        post_text.className = "post_text";
    }
    else{
        post_text.className = "post_text_v2";
    }
    post.appendChild(post_text);
    post_text.disabled = true;
    document.getElementById('posts').prepend(post);
})
document.getElementById('post_photo').addEventListener("change", function(){
    document.getElementById('post_photo_display').src = document.getElementById('post_photo').files[0].name;
})
