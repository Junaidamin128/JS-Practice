let tabcontent = document.getElementsByClassName("tabcontent");
let tablink = document.getElementsByClassName("btn");
function change(evt, tab) {
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
    }
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace("active", "");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += "active";
}