const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

let msg = document.querySelector(".msg");

for (let select of dropdown){
    for (code in countryList){
        let newOpt = document.createElement("option");
        newOpt.value = code;
        newOpt.innerText = code;
        
        if (select.name === "from" && code === "USD") {
            newOpt.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newOpt.selected = "selected";
        }

        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};

const updateFlag = (ele) => {
    let currCode = ele.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
};


const updateExhchangeRate = async () => {
    let inp = document.querySelector("form input");

    let amt = inp.value;
    console.log(amt);
    if (amt === "" || amt < 0){
        amt = 1;
        inp.value = "1";
        alert("Enter a positive value");
    }
    if (isNaN(parseInt(amt, 10))){
        alert("Enter valid amount");
        amt = 1;
        inp.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`; 

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = rate*amt;
    console.log(finalAmount);

    msg.innerText = `${amt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExhchangeRate();
});

window.addEventListener("load", () => {
    updateExhchangeRate();
})