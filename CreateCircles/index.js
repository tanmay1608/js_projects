const mainContainer = document.getElementById("wrapper");
const resetButton = document.getElementById("resetButton");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");

const colors = ["#ff0000", "#3cb371", "#ffa500", "#6a5acd", "#ee82ee", "#0000ff"];
const divList = [];
const removedChild = [];


mainContainer.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
        switch (e.target.id) {
            case "resetButton":
                resetList();
                break;
            case "undoButton":
                removeFromList();
                break;
            case "redoButton":
                addInList();
                break;
            default:
                break;
        }
    } else {
        resetButton.style.opacity = "100%";
        createCircleElement(e);
        renderScreen();
        undoButton.style.opacity = "100%";
    }
});


function createCircleElement(e) {
    const circle = document.createElement("div");
    circle.style.height = "20px";
    circle.style.width = "20px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = getRandomColor();
    circle.style.position = "absolute";
    circle.style.top = e.clientY-10 + "px";
    circle.style.left = e.clientX-10 + "px";
    divList.push(circle);
}

function addInList() {
    if (removedChild.length === 0) return;
    divList.push(removedChild.pop());
    if (removedChild.length !== 0) undoButton.style.opacity = "100%";
    if (removedChild.length === 0) {
        redoButton.style.opacity = "50%";
        undoButton.style.opacity = "100%";
    }
    renderScreen();
}
function removeFromList() {
    if (divList.length === 0) return;
    redoButton.style.opacity = "100%";
    const child = divList.pop();
    if (divList.length === 0) undoButton.style.opacity = "50%";
    removedChild.push(child);
    mainContainer.removeChild(child);
}

function renderScreen() {
    divList.forEach((el) => {
        mainContainer.append(el);
    })
}

function resetList() {
    removeFromDOM();
    divList.length = 0;
    removedChild.length = 0;
    resetButton.style.opacity = "50%";
    undoButton.style.opacity = "50%";
    redoButton.style.opacity = "50%";
    renderScreen();
}
function removeFromDOM() {
    Array.from(mainContainer.children).forEach((el, index) => {
        if (index >= 3) mainContainer.removeChild(el);

    })
}



function getRandomColor() {
    return colors[Math.floor(Math.random() * (colors.length) + 0)];
}