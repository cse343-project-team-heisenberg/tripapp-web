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
