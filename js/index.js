let row = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

// loadng
$(document).ready(function () {
  $("#loading-icon").fadeOut(500, function () {
    $("#loading").slideUp(1000);
    $("body").css("overflow", "visible");
  });
});

// close and open
let boxWidth = $(".menu .tab").outerWidth();
$("#btn").click(function () {
  if ($(".menu").css("left") == "0px") {
    $(".menu").animate({ left: `-${boxWidth}px` }, 500);
    $(".main-nav").animate({ left: `0px` }, 500);
  } else {
    $(".menu").animate({ left: `0px` }, 500);
    $(".main-nav").animate({ left: `${boxWidth}px` }, 500);
  }
});
$(".menu").css("left", `-${boxWidth}px`);

// 20 meals
let rowData = $("#rowData");
async function getMeals() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  response = await response.json();
  console.log(response);
  displayMeals(response.meals);
}
getMeals();

function displayMeals(arr) {
  console.log(arr);

  for (let i = 0; i < arr.length; i++) {
    rowData.append(` <div class="col-md-3 mb-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img  class="w-100 imgData" src="${arr[i].strMealThumb}" alt="" >
                    <div class="inner position-absolute d-flex align-items-center  p-3">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `);
  }
}

// search

// catogery

async function getCategories() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  console.log(response);
  displayCategories(response.categories);
}

function displayCategories(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3 mb-3">
                <div onclick="getFilterCategory('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" >
                    <div class="inner position-absolute text-center  p-3">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
        </div>
        `;
  }

  row.innerHTML = cartoona;
}

// Area
async function getArea() {
  rowData.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  // console.log(respone.meals);
  displayArea(respone.meals);
}

function displayArea(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3 mb-3">
                <div onclick="getFilterArea('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `;
  }
  row.innerHTML = cartoona;
}

// getIngredients()
async function getIngredients() {
  rowData.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);
  displayIngredients(respone.meals.slice(0, 20));
}

function displayIngredients(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getFilterIngredients('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }
  row.innerHTML = cartoona;
}
// meal-Filter
async function getFilterCategory(category) {
  row.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayMeals(response.meals);
}

async function getFilterArea(area) {
  row.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayMeals(response.meals);
  console.log(response);
}

async function getFilterIngredients(ingredients) {
  row.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
}



////////////////search
function search() {
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)"  class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  row.innerHTML = "";
}

async function searchByName(srarchName) {
  row.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${srarchName}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

async function searchByFLetter(srarchName) {
  row.innerHTML = "";
  srarchName == "" ? (srarchName = "a") : "z";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${srarchName}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

function contactUs() {
  row.innerHTML = `<div class=" contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="mb-3 container w-75 text-center">
        <div class="row g-4 mb-3">
            <div class="col-md-6 mb-2">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
            </div>
            <div class="col-md-6 mb-2">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
            </div>
            <div class="col-md-6 mb-2">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
            </div>
            <div class="col-md-6 mb-2">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
            </div>
            <div class="col-md-6 mb-2">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">         
            </div>
            <div class="col-md-6 mb-2">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">            
            </div>
        </div>
        <button id="submitBtn"  class="btn btn-info px-2 mb-3">Submit</button>
    </div>
</div> `;
  

}
function inputsValidation(inp) {
    var signupRegex = {
        nameInput : /^[\w]{3,}$/,
        emailInput : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/,
        passwordInput : /^[\w]{5,}$/,
        phoneInput:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        ageInput:/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,

    }
    if(signupRegex[inp.id].test(inp.value)){
        inp.classList.add('is-valid')
        inp.classList.remove('is-invalid')
        return true
    }
    else{
        inp.classList.add('is-invalid')
        inp.classList.remove('is-valid')
        return false
    }
}
