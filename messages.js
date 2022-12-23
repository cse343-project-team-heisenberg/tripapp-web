function createContacts(username_content, profile_pic_src, uid){
    var user = document.createElement("li");
    var profile_pic = document.createElement("img");
    var username = document.createElement("text");

    user.style.cssText = "width: 100%; list-style: none; margin-top: 5%; border-bottom: 1px solid black";
    profile_pic.style.cssText = "border-radius: 50%; width: 30px; height: 30px";
    username.style.cssText = "width: 30px;height: 25px;font-size: 25px; vertical-align: top; "

    username.textContent = username_content;
    profile_pic.src = profile_pic_src;
    user.appendChild(profile_pic);
    user.appendChild(username);
    document.getElementById('contacts').prepend(user);

    user.addEventListener('click', function(){
        document.getElementById('receiver').innerHTML = "";
        document.getElementById('messages_list').innerHTML = "";
        var profile_pic = document.createElement("img");
        var username = document.createElement("text");

        profile_pic.style.cssText = "border-radius: 50%, width: 30px; height: 30px";
        username.style.cssText = "width: 30px;height: 25px;font-size: 25px; vertical-align: top;"

        username.textContent = username_content;
        profile_pic.src = profile_pic_src;

        document.getElementById('receiver').append(profile_pic);
        document.getElementById('receiver').append(username);
        document.getElementById('receiver').hidden = false;
    })
}

function createMessage(content, float){
    var message = document.createElement('li');
    var message_content = document.createElement('text');
    
    message_content.style.cssText = "border: 1px solid black; border-radius: 5px";
    message.style.cssText = "height: 30px; margin-right: 5%"

    message_content.style.float = float;

    message_content.textContent = content;

    message.appendChild(message_content);

    document.getElementById('messages_list').append(message);

    window.scrollTo(0, document.getElementById("messages_list").scrollHeight, "smooth");
}

document.getElementById('message').addEventListener("keypress", function(e){
    var message_content = document.getElementById('message').value;
    if(e.key === "Enter" && message_content !== ""){
        createMessage(message_content, "right");
        document.getElementById('message').value = "";
    }
})

createContacts("Çağrı Çaycı", "icons/profile.ico", 5);
createContacts("Elon", "icons/profile.ico", 5);
