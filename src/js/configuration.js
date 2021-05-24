import '../styles/reset.css';
import '../styles/configuration.css';
import '/configuration.html';
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');




const CHOSEN_CAR = JSON.parse(localStorage.getItem("car"));
const TOTAL_PRICE = document.getElementById("totalPrice");
const SELECTED_CAR = document.getElementById("selectedCar");
const RADIO_BUTTONS = document.getElementsByName("type-of-pay");
const BUTTON = document.getElementById("buy-button");
const MASSAGE = document.getElementById("massage");
const SELECTED_DATE = document.getElementById("datepicker");
const FULL_NAME = document.getElementById("full-owner-name");
const DELIVERY_LOCATION = document.getElementById("city");
const DELIVERY_DAY = document.getElementById("datepicker");
const ADD_BUTTON = document.getElementById("add-button");
const SUB_BUTTON = document.getElementById("minus-button");
const SELECTED_ITEM_SUB = document.getElementById('remove-akcessory');

TOTAL_PRICE.innerHTML = CHOSEN_CAR["cost"];
SELECTED_CAR.innerHTML = CHOSEN_CAR["model"];

BUTTON.addEventListener("click", (e)=>{
    let fullName = FULL_NAME.value;
    e.preventDefault();
    if(!SELECTED_DATE.value){
        SELECTED_DATE.style.border = "1px solid red";
        MASSAGE.innerHTML= `<p class="massage" style="color: red; font-size: 0.8rem;">Wybierz datę dostawy </p>`;  
    }else{
        SELECTED_DATE.style.border = "none";
    } 
    if(!DELIVERY_LOCATION.value){
        DELIVERY_LOCATION.classList.add("invalid"); 
        MASSAGE.innerHTML = `<p class="massage" style="color: red; font-size: 0.8rem;">Wpisz miejscowość</p>`;
    }else{
        DELIVERY_LOCATION.classList.remove("invalid"); 
        CHOSEN_CAR["delivery location"] = DELIVERY_LOCATION.value;
    }
    if(fullName.trim().split(" ").length < 2) {
        let msgFullName = `<p class="massage" style="color: red; font-size: 0.8rem;">Wpisz imię i nazwisko</p>`;
        FULL_NAME.classList.add("invalid"); 
        MASSAGE.innerHTML = msgFullName;   
    }else if(fullName.trim().split(" ").length > 2){
        let msgFullName = `<p  class="massage" style="color: red; font-size: 0.8rem;">Wpisz imię i nazwisko</p>`; 
        MASSAGE.innerHTML = msgFullName;
        FULL_NAME.classList.add("invalid");  
    }else {
        FULL_NAME.classList.remove("invalid");
        CHOSEN_CAR["full name"]= fullName;     
    }  
});

function resetNameMassage(){
    MASSAGE.innerHTML = "";
};
window.resetNameMassage = resetNameMassage;

function resetCityMassage(){
    MASSAGE.innerHTML = "";
};
window.resetCityMassage = resetCityMassage;

function resetDateMassage(){
    MASSAGE.innerHTML = "";
};
window.resetDateMassage = resetDateMassage;

function resetRadioMassage(){
    MASSAGE.innerHTML = "";
};
window.resetRadioMassage = resetRadioMassage;

window.addEventListener('beforeunload',() => localStorage.setItem('value', [...document.querySelectorAll('input[type="text"]')].map((e,i) => e.value)) );

let vals = localStorage.getItem('value') ? localStorage.getItem('value').split`,` : '';
let inp = document.querySelectorAll('input[type="text"]');
for(let i = 0; i < inp.length; i++) vals[i] ? inp[i].value = vals[i] : '';

BUTTON.addEventListener("click", (e)=>{
    e.preventDefault();    
    if (RADIO_BUTTONS[0].checked == true) {
        CHOSEN_CAR["payment method"] = "Leasing";
    }else if(RADIO_BUTTONS[1].checked == true) {
        CHOSEN_CAR["payment method"]= "Gotówka";   
    }else{
        let msgRadio = `<p style="color: red; font-size: 0.9rem;">Wybierz formę płatności</p>`;
        MASSAGE.innerHTML = msgRadio;
    }
    if(RADIO_BUTTONS[0].checked == false && RADIO_BUTTONS[1].checked == false ) {
        RADIO_BUTTONS[0].style.outline = "1px solid #ff0000";
        RADIO_BUTTONS[1].style.outline = "1px solid #ff0000";
    }else{
        RADIO_BUTTONS[0].style.outline = "none";
        RADIO_BUTTONS[1].style.outline = "none";
    }
});

function saveRadioValue(){
for(let i = 0; i < RADIO_BUTTONS.length; i++) {
    RADIO_BUTTONS[i].onclick = function() {
    localStorage.setItem("inputRadio", this.value);
    }
    }
  if(localStorage.getItem("inputRadio")) {
    let inputRadio = localStorage.getItem("inputRadio");
    document.querySelector('input[name="type-of-pay"][value="' + inputRadio + '"]').setAttribute("checked","checked");   
    }
}

saveRadioValue();

let selectedDate;
$(function() {
        $("#datepicker").datepicker({
            minDate:0,
            maxDate:"+13D",
            onSelect: function() { 
                selectedDate = $(this).val();
                $(this).datepicker("hide");                
            },  
        });
        let show = 1;
        $("#select-date-picker").click(function() { 
            if(show == 1){
                $("#datepicker").datepicker("show");
                show = 0;
            }else{
                $("#datepicker").datepicker("hide");
                show = 1;
            }
        }
    ) 
});

$.datepicker.regional["pl"] = {
	closeText: "Close",
	prevText: "Previous",
	nextText: "Following",
	currentText: "Today",
	monthNames: ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzeszeń","Październik","Listopad","Grudzień"],
	dayNamesMin: ["Nd","Pn","Wt","Śr","Cz","Pt","Sb"],
	dateFormat: 'dd/mm/yy',
	firstDay: 1,
	showMonthAfterYear: false
};
$.datepicker.setDefaults($.datepicker.regional["pl"]);

function selectAdd(){
    let selectHeaderAdd = document.querySelectorAll(".select-header-add");
    let selectItemAdd = document.querySelectorAll(".select-add-item");
    selectHeaderAdd.forEach(item=>{
        item.addEventListener("click", selectToggleAdd);
    });
    selectItemAdd.forEach(item=>{
        item.addEventListener("click", selectChooseAdd);
    });
    function selectToggleAdd(){
        this.parentElement.classList.toggle("not-active-add");
    }
    function selectChooseAdd(){
        let text = this.innerText,
        selectAdd = this.closest(".select-add"),
        currentAddText = selectAdd.querySelector(".select-current-add");
        selectAdd.classList.toggle("not-active-add");
        currentAddText.innerText = text.replace("\n"," "); 
    } 
};

selectAdd();

let arrAddAkcessory = [];
let subId = 0;
let newTotalPrice;
ADD_BUTTON.addEventListener("click", function(){
    let currentAddAkcessories = document.getElementsByClassName("select-current-add");
    for(let i=0; i < currentAddAkcessories.length; i++){
        let chosenAkcessory = Number(currentAddAkcessories[i].innerText.split(" ").slice(-2,-1).join(""));
        let title = currentAddAkcessories[i].innerText.split(" ").slice(0,-2).join(" "); 
            ++subId;
            const newAddPosition = {
                id: `subAkcessory_${subId}`,
                title: title,
                cost:chosenAkcessory,
            }
        arrAddAkcessory.push(newAddPosition);
        let sumOfAkcesssory = arrAddAkcessory.reduce((prev, next) => 
        prev + next.cost, 0);
        let totalPrice = CHOSEN_CAR["cost"];
        newTotalPrice = Number(totalPrice.split(" ").slice(0,2).join(""));
        newTotalPrice += sumOfAkcesssory;
        newTotalPrice = newTotalPrice.toString().split("");
        if(newTotalPrice.length === 5){    
            newTotalPrice = newTotalPrice.slice(0, 2).join("")+ " " + newTotalPrice.slice(-3).join("");
            TOTAL_PRICE.innerText = `${newTotalPrice} PLN` 
        }else if(newTotalPrice.length === 6){
            newTotalPrice = newTotalPrice.slice(0, 3).join("") + " " + newTotalPrice.slice(-3).join("");
            TOTAL_PRICE.innerText =  `${newTotalPrice} PLN`;   
        } 
        let elemli = document.createElement('li');
        elemli.id = `${arrAddAkcessory[arrAddAkcessory.length-1].id}`;
        elemli.innerText = `${arrAddAkcessory[arrAddAkcessory.length-1].title +" " + arrAddAkcessory[arrAddAkcessory.length-1].cost + " PLN" }`;
        elemli.setAttribute("class","select-sub-item"); 
        SELECTED_ITEM_SUB.appendChild(elemli);
    }  
    chooseItem(); 
});

function selectSub(){
    let selectHeaderSub = document.querySelectorAll(".select-header-sub");    
    selectHeaderSub.forEach(item=>{
        item.addEventListener("click", selectToggleSub);
    });    
    function selectToggleSub(){
        this.parentElement.classList.toggle("not-active-sub");
    }
};
  
selectSub(); 

function chooseItem(){
    let box = document.getElementById("select-body-sub");
    let li = box.getElementsByTagName('li');
    for(let i = 0; i < li.length; i++) {
        li[i].addEventListener('click', function (el) {
            let currentLi = document.getElementsByClassName("current");
            if(currentLi[0]) {
                currentLi[0].className = " ";
            }
            this.className = "current";
        });
    }
}

let id;
let titleSubItem;
let costSubItem;
SELECTED_ITEM_SUB.addEventListener("click", event =>{let elem = event.target  
    id = elem.id;
    let dataItem  = elem.innerText;
    titleSubItem = dataItem.split(" ").slice(0,-2).join(" "); 
    costSubItem =  Number(dataItem.split(" ").slice(-2,-1).join(" "));
}); 

SUB_BUTTON.addEventListener("click", ()=>{
    arrAddAkcessory = arrAddAkcessory.filter(item => item.id !== id);
    document.querySelector(`li#${id}`).remove();
    newTotalPrice = Number(newTotalPrice.split(" ").slice(0,2).join(""));
    newTotalPrice -= costSubItem;     
    newTotalPrice = newTotalPrice.toString().split("");
    if(newTotalPrice.length === 5){    
        newTotalPrice = newTotalPrice.slice(0, 2).join("")+ " " + newTotalPrice.slice(-3).join("");
        TOTAL_PRICE.innerText =  `${newTotalPrice} PLN` 
    }else if(newTotalPrice.length === 6){
        newTotalPrice = newTotalPrice.slice(0, 3).join("") + " " + newTotalPrice.slice(-3).join("");
        TOTAL_PRICE.innerText =  `${newTotalPrice} PLN`;
    }   
});  
            
document.getElementById("arrow").addEventListener("click", ()=> {
    window.location.href ="main.html"       
});
     
BUTTON.addEventListener("click", ()=> {
    if((RADIO_BUTTONS[0].checked == true || RADIO_BUTTONS[1].checked == true) && (FULL_NAME.value !== "" && FULL_NAME.value.trim().split(" ").length == 2) && DELIVERY_LOCATION.value !== "" && DELIVERY_DAY.value !== ""){
        window.location.href = "final.html";
        document.getElementById("private-data").reset();
        document.getElementById("type-of-pay").reset();   
    } 
    CHOSEN_CAR["delivery date"] = selectedDate;
    CHOSEN_CAR["accessories"]= arrAddAkcessory;
    CHOSEN_CAR["cost"] = TOTAL_PRICE.innerText;
    localStorage.setItem("car", JSON.stringify(CHOSEN_CAR));
    localStorage.removeItem("value");
    localStorage.removeItem("inputRadio");     
});
    
    