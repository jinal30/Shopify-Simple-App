document.querySelector(".small-menu").addEventListener('click', () => {
    document.querySelector('#mobile-menu').className = "menu"
});
document.querySelector('.menubar').addEventListener('click', (e) => {
    e.stopPropagation();
});
var menudrawer = document.querySelector(".dropbox");
window.onclick = function(event) {
    profile.style.display = "none";
}