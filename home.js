document.getElementById('post_it').addEventListener("click", function(){
    var date = new Date();
    var post = document.createElement('li');
    var post_photo = document.createElement('img');
    var post_text = document.createElement('textarea');
    var post_details = document.createElement('section');
    var post_date = document.createElement('text');
    post_date.textContent = date.toLocaleString('en-US');
    post_date.style = "position: absolute;";
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
    post_details.className = "post_details";
    post_text.disabled = true;
    post.appendChild(post_text);
    post_details.appendChild(post_date);
    post.appendChild(post_details);
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