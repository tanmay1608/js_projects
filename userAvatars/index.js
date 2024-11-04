const userSection = document.getElementById("userSection");
const addButton = document.querySelector("button");
const modalContainer = document.getElementById("modalContainer");
const closeModalButton = document.getElementById("cancel");
const confirmButton = document.getElementById("confirm");
const inputElement = document.querySelector("input");
const closeModalFromTop = document.getElementById("close");
const confirmationModalContainer = document.getElementById(
    "confirmationModalContainer"
);
const cancelConfirmation = document.getElementById("cancelConfirmation");
const deleteButton = document.getElementById("deleteButton");

let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
let index = -1;

window.addEventListener("load", () => {
    render();
});

userSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancelElementStyle")) {
        confirmationModalContainer.classList.add("openConfirmationModal");
        index = e.target.getAttribute("index");
    }
});

deleteButton.addEventListener("click", () => {
    deleteItem(index);
    render();
    index = -1;
    confirmationModalContainer.classList.remove("openConfirmationModal");
});

cancelConfirmation.addEventListener("click", () => {
    confirmationModalContainer.classList.remove("openConfirmationModal");
    index = -1;
});

closeModalFromTop.addEventListener("click", () => {
    modalContainer.classList.remove("openModal");
});

confirmButton.addEventListener("click", () => {
    const name = inputElement.value;
    if (!name) {
        alert("Please enter your name.");
        return;
    }
    usersList.push(name);
    saveDataToLocalStorage();
    render();
    modalContainer.classList.remove("openModal");
});

closeModalButton.addEventListener("click", () => {
    modalContainer.classList.remove("openModal");
});

addButton.addEventListener("click", () => {
    inputElement.value = "";
    modalContainer.classList.add("openModal");
});

function saveDataToLocalStorage() {
    localStorage.setItem("usersList", JSON.stringify(usersList));
}

function deleteItem(index) {
    usersList.splice(index, 1);
    saveDataToLocalStorage();
}

function render() {
    userSection.innerHTML = "";
    usersList.forEach((el, index) => {
        userSection.append(createUser(el.charAt(0).toUpperCase(), index));
    });
}

function getRandomColor() {
    const rgb = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
    ];
    return rgb;
}

function getUserAvatarColors() {
    const rgb = getRandomColor();
    const backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    const brightness = Math.round(
        (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
    );
    const color = brightness > 125 ? "black" : "white";
    return {
        backgroundColor,
        color,
    };
}

function createUser(letter, index) {
    const userAvatar = document.createElement("div");
    const cancelElement = document.createElement("div");
    cancelElement.innerText = "X";
    userAvatar.innerText = letter;
    cancelElement.classList.add("cancelElementStyle");
    userAvatar.classList.add("userStyle");
    cancelElement.setAttribute("index", index);
    const { backgroundColor, color } = getUserAvatarColors();
    userAvatar.style.backgroundColor = backgroundColor;
    userAvatar.style.color = color;
    userAvatar.appendChild(cancelElement);
    return userAvatar;
}