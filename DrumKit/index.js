const rightSection=document.getElementById("right");

generateImageElements();


document.addEventListener("keydown",(e)=>{
    switch(e.key){
        case "a":
            playAudio("crash");
            break;

        case "w":
            playAudio("kick");
            break;    
        
        case "s":
            playAudio("snare");
            break;

        case "d":
            playAudio("tom");
            break;
        default:
            break;        
    }
});
rightSection.addEventListener("click",(e)=>{
    switch(e.target.id){
        case "crash":
            playAudio("crash");
            break;

        case "kick":
            playAudio("kick");
            break;    
        
        case "snare":
            playAudio("snare");
            break;

        case "tom":
            playAudio("tom");
            break;
        default:
            break;        
    }
})

function playAudio(instrument){
    const player=new Audio(`./assets/${instrument}.mp3`);
    player.play();
}

function generateImageElements(){

    const topParentDiv=document.createElement("div");
    const bottomParentDiv=document.createElement("div");
    const topLeftImage=document.createElement("img");
    const topRightImage=document.createElement("img");
    const bottomLeftImage=document.createElement("img");
    const bototmRightImage=document.createElement("img");

    topLeftImage.id="crash";
    topRightImage.id="kick";
    bottomLeftImage.id="snare";
    bototmRightImage.id="tom";
    
    
    topLeftImage.src="./assets/crash.png";
    topRightImage.src="./assets/kick.png";
    bottomLeftImage.src="./assets/snare.png";
    bototmRightImage.src="./assets/tom.png";
    topParentDiv.classList.add("displayClass");
    bottomParentDiv.classList.add("displayClass");
    topParentDiv.append(topLeftImage,topRightImage);
    bottomParentDiv.append(bottomLeftImage,bototmRightImage);

    rightSection.append(topParentDiv,bottomParentDiv);
}