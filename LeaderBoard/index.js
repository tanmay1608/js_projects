const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const selectElement = document.getElementById("selectedCountry");
const scoreElement = document.getElementById("score");
const form = document.querySelector("form");
const board = document.getElementById("board");

let lsitOfUsers = [];

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const enteredFirstName = firstName.value;
    const enteredLastName = lastName.value;
    const selectedCountry = selectElement.value;
    const score = scoreElement.value;

    lsitOfUsers.push({
        fName: enteredFirstName,
        lName: enteredLastName,
        country: selectedCountry,
        score: score,
    });

    renderList();
    resetForm();

})

function resetForm() {
    form.reset();
}


function renderList() {
    lsitOfUsers = lsitOfUsers.sort((a, b) => b.score - a.score);
    board.innerHTML = null;

    lsitOfUsers
        .forEach((user, index) => {

            const { fName, lName, country, score } = user;

            const parentDiv = document.createElement("div");
            const fNameElement = document.createElement("p");
            const lNameElement = document.createElement("p");
            const scoreElement = document.createElement("p");
            const countryElement = document.createElement("p");
            const plusFive = document.createElement("p");
            const minusFive = document.createElement("p");
            const deleteButton = document.createElement("button");

            parentDiv.classList.add("boardItem");

            fNameElement.innerText = fName;
            lNameElement.innerText = lName;
            scoreElement.innerText = score;
            countryElement.innerText = country;
            plusFive.innerText = `+`;
            minusFive.innerText = `-`;
            deleteButton.innerText = "Delete";

            plusFive.addEventListener("click", () => {
                lsitOfUsers[index].score = Number(lsitOfUsers[index].score) + 5;
                renderList();
            })

            minusFive.addEventListener("click", () => {
                lsitOfUsers[index].score -= 5;
                renderList();
            })

            deleteButton.addEventListener("click", () => {
                lsitOfUsers = lsitOfUsers.filter((user, i) => {
                    console.log(i, index);
                    return !(i === index);
                })
                renderList();
            });
            
            parentDiv.append(fNameElement,lNameElement,countryElement,scoreElement,plusFive,minusFive,deleteButton);
            board.appendChild(parentDiv);
        
        })
}


