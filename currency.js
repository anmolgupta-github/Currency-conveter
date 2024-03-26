const Base_URL = "https://api.frankfurter.app/latest?amount";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(" form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for ( let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

const updateExchangeRate =async ()=>{
    let amount = document.querySelector(".data");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === ""||  amtVal<1){
    amtVal = 1;
    amount.value = "1";
    }
    const URL =`${Base_URL}&from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
   let rate = data.rates;
   let rate1 =rate[toCurr.value];
   
   let finalAmount = amtVal*rate1;
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount*amtVal} ${toCurr.value}`;
};
const updateFlag=(element)=>
    {
        let currCode = element.value; 
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    };
    btn.addEventListener("click",(evt)=>{
        evt.preventDefault(); 
        updateExchangeRate();
    });

    window.addEventListener("load", () => {
        updateExchangeRate();
      });