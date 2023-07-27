let state = false
function toggleNav(){
    if(state){
        document.querySelector(".flex-container").style.width = "100%";
        document.getElementById("my-side-panel").style.width = "0px";
    }
    else{
        document.querySelector(".flex-container").style.width = "75%";
        document.getElementById("my-side-panel").style.width = "25%";
        document.getElementById("my-side-panel").style.right = '0px';
    }
    state = !state;
}
