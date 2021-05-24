import '../styles/reset.css';
import '../styles/final.css';
import '/final.html';


const CHOSEN_CAR = JSON.parse(localStorage.getItem("car"));
const TITLE = document.getElementById("title-car");
const DALIVERY_DAY = document.getElementById("delivery-day");
const IMAGE_BOX = document.getElementById("image-box");
const PAYMENT_METHOD = document.getElementById("pay-method");
const TOTAL_PRICE = document.getElementById("total-price");
const CHOSEN_ACCESSORIES = document.getElementById("chosen-accessories");
const LIST_TITLE = document.getElementById("active");


TITLE.innerText += " " + CHOSEN_CAR["model"] + "!";
DALIVERY_DAY.innerText += " " + CHOSEN_CAR["delivery date"];
PAYMENT_METHOD.innerText += " " + CHOSEN_CAR["payment method"];
TOTAL_PRICE.innerText += " " + CHOSEN_CAR["cost"];

let picture = CHOSEN_CAR["image"];
let image = document.createElement("img");
image.src = picture;
image.setAttribute("alt", "image of chosen car");
image.id = "image-car";
IMAGE_BOX.appendChild(image);

const duplicateAccessoriesArr = [];
function countAccessories(){
CHOSEN_CAR.accessories.map(item => {
    if(duplicateAccessoriesArr.find(object => {
        if(object.title === item.title) {
            object.times++;
            return true;
        }else{
            return false;
        }
    })){   
    }else{
        item.times = 1;
        duplicateAccessoriesArr.push(item);  
    } 
    })
}

countAccessories();

function showAccessories(){
    for(let i=0; i < duplicateAccessoriesArr.length; i++){
        if(duplicateAccessoriesArr.length == 0){
            return true;
        }else{
            let variousAccessories = document.createElement("ul");
            variousAccessories.id= "ulList"; 
            variousAccessories.innerHTML = `<li class="chosenAccessory">x${duplicateAccessoriesArr[i].times} ${duplicateAccessoriesArr[i].title}</li>`
            CHOSEN_ACCESSORIES.appendChild(variousAccessories);
            LIST_TITLE.style.visibility = "visible";  
        }
    }   
}

showAccessories();
