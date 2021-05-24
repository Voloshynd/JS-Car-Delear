import '../styles/reset.css';
import '../styles/main.css';
import '/main.html';

const CHOSEN_CAR = document.getElementById("container-for-cars");
const CARS = document.querySelectorAll(".cars");


function FindOnPage(){
    let input = document.getElementById("search");
    let search = input.value.toUpperCase().trim();
    let modelName = document.querySelectorAll(".cars");
    modelName.forEach(element =>{
        if(element.innerText.indexOf(search) > -1){
            element.style.display = "";
        } else {
            element.style.display = "none"
        }
    })  
   
};

window.FindOnPage = FindOnPage;

const selectedCar = {};
CHOSEN_CAR.addEventListener("click", event =>{let src = event.target.parentElement.firstChild.getAttribute('src')
selectedCar["image"] = src;
})
CHOSEN_CAR.addEventListener("click", event =>{let model = event.target.parentElement.lastElementChild.firstChild
 selectedCar["model"] = model.data;
})
CHOSEN_CAR.addEventListener("click", event =>{let cost = event.target.parentElement.lastElementChild.lastChild
selectedCar["cost"] = cost.data;
localStorage.setItem("car", JSON.stringify(selectedCar))
});

function toConfigurationPage(){
    for(let i = 0; i < CARS.length; i++) {
        let singleCar = CARS[i];
        singleCar.onclick = function(e) {   
            window.location.href =  "configuration.html"
        }
    };
}
toConfigurationPage();

