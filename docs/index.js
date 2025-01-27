//declare user proile login details
let profileLogin = document.getElementById("loginHolder");
let usernameProfile = document.getElementById("usernameProfile");
let memberShipDate = document.getElementById("memberships");

let isAccMade = false;
//declare passnotmatch
let passNoMatch = document.getElementById("passNoMatch");
let isConBttnHit = false;
let isFormSubmited = false;
let isFormSubmitedCondition = JSON.parse(
  localStorage.getItem("isFormSubmitedCondition") || false
);

//get userstuff
usernameProfile.innerHTML = JSON.parse(localStorage.getItem("savedUser")) || "";
memberShipDate.innerHTML = JSON.parse(localStorage.getItem("savedDate")) || "";

isFormSubmited = isFormSubmitedCondition;
console.log(isFormSubmited);
if (isFormSubmited) {
  profileLogin.style.display = "flex";
}

//grab the boolen of isFormSubmited local storage

let website = [];
let thumbMails = [];
let mealName = [];
//get from local storage if there is anything inside if not set back to an empty array
let savedWebsites = JSON.parse(localStorage.getItem("savedWebsites")) || [];
let savedThumbMails = JSON.parse(localStorage.getItem("savedThumbMails")) || [];
let savedMealNames = JSON.parse(localStorage.getItem("savedMealNames")) || [];
//set the normal arrays to the local storage ones and will set empty if nothing was there
website = savedWebsites;
thumbMails = savedThumbMails;
mealName = savedMealNames;

//Make logo refresh page
let logo = document.querySelector('[data-type="logo"]');
let recipesNav = document.getElementById("recipesNav");
//declare SavedListArray for localstroage
let savedList = [];

logo.addEventListener("click", () => {
  location.reload();
});
//make recipes tab refresh the page
recipesNav.addEventListener("click", () => {
  location.reload();
});

//Make when you hit saved it goes to next site
let savedTab = document.getElementById("savedNav");
savedTab.addEventListener("click", () => {
  window.location.href = "index2.html";
});

//Add in food api
//set up search
let userSearch = document.getElementById("foodSearch");
let formRecipie = document.getElementById("submitRecipes");
let recipeHolder = document.getElementById("recipeHolder");
let meals;

async function fetchData() {
  //Add event lister to grab the users input of food

  let searchValue = userSearch.value;

  //declare api link
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    let data = await response.json();

    //Make recipes display based on search result and make a default display
    meals = data.meals;
    //make so if no meals a pop up
    if (meals === null) {
      recipeHolder.innerHTML = `<div class="flex flex-col gap-[10px] items-center justify-center w-full">
                <img src="styles/pictures/fd5c40b49f2411ee8acc7a2f0d1382ba_upscaled.jpg" alt="sadCookCat" id="sadCat"/>
              <div class="text-red-600 pt-[20px]">No Recipes to display based on search result</div>
            </div>`;
    }

    //make it center if more than or equal to 4 img
    if (meals.length >= 4) {
      recipeHolder.style.justifyContent = "center";
    } else {
      recipeHolder.style.justifyContent = "flex-start";
    }

    meals.forEach((data) => {
      recipeHolder.insertAdjacentHTML(
        "afterbegin",

        `  <div class="flex flex-col gap-[10px]" data-type="recipee">
            <div class="overflow-hidden hover:cursor-pointer relative rounded-[5px] w-[223.5px] h-[223.5px]">
            <!--Recipie content-->
              <div data-type="recipePic" class="transform transition-transform duration-500 scale-100 hover:scale-110  w-full h-full"><a data-type="aTag" href="${
                data.strSource || data.strYoutube
              }" target="_blank"><img src="${
          data.strMealThumb
        }" data-type="thumb"/></a></div>
              <div><div class="flex gap-[2px]"><div class="bg-white flex items-center justify-center w-[20px] h-[20px]">Save</div><div class="absolute top-[10px] right-[10px]" data-type="saveIcon"><i class="fa-regular fa-bookmark fa-lg" style="color: #ffffff;"></i></div> </div></div>
            </div>
              <div data-type="mel" class="font-[500] w-[223.5px]">${
                data.strMeal
              }</div>
            </div>`
      );
    });

    //make when you hit the bookmark icon it adds to an array that is put in local storage
    let bookMark = document.querySelectorAll('[data-type="saveIcon"]');
    bookMark = Array.from(bookMark);
    //declare data specifics to send to local storaage
    bookMark.forEach((book) => {
      let bookMarkCounter = 0;
      book.addEventListener("click", () => {
        let signUpForm = document.getElementById("signUPHolder");
        let contin = document.getElementById("continue");
        //declare the forms
        let username = document.getElementById("username");
        let email = document.getElementById("email");
        function formSubmittionChecker() {
          if (isFormSubmited) {
            signUpForm.style.display = "none";
          } else if (!isFormSubmited) {
            signUpForm.style.display = "block";
          }
        }
        formSubmittionChecker();
        //add event lister for conintue btton
        contin.addEventListener("click", () => {
          isConBttnHit = true;
          signUpForm.style.display = "none";
        });
        let userLogin = [];
        signUPHolder.addEventListener("submit", (e) => {
          let pass = document.getElementById("pass");
          let passCon = document.getElementById("passCon");
          //if user types again pop up goes away
          pass.addEventListener("input", () => {
            passNoMatch.style.display = "none";
          });
          passCon.addEventListener("input", () => {
            passNoMatch.style.display = "none";
          });

          e.preventDefault();
          if (pass.value !== passCon.value) {
            passNoMatch.style.display = "block";
          } else {
            //send to api
            isAccMade = true;
            isFormSubmited = true;
            localStorage.setItem(
              "isFormSubmitedCondition",
              JSON.stringify(isFormSubmited)
            );

            username = username.value;
            email = email.value;
            pass = pass.value;
            passCon = passCon.value;
            userLogin.push({
              username: username,
              email: email,
              pass: pass,
            });
            signUPHolder.style.display = "none";
            //add in a display for the log in
            profileLogin.style.display = "flex";
            usernameProfile.innerHTML = `${userLogin[0].username}`;
            //get the current date
            const today = new Date();
            const options = { year: "numeric", month: "long", day: "numeric" };
            const currentDate = today.toLocaleDateString("en-US", options);
            memberShipDate.innerHTML = `Memeber Since ${currentDate}`;
            //set storage for userlogins
            let savedUser = usernameProfile.innerHTML;
            let savedDate = memberShipDate.innerHTML;
            localStorage.setItem("savedUser", JSON.stringify(savedUser));
            localStorage.setItem("savedDate", JSON.stringify(savedDate));
          }
        });
        if (isFormSubmited) {
          //will need to add a logic here to check for form submition
          let closestDiv = book.closest('[data-type="recipee"]');
          //declare the id's to hold the data info
          let websiteID = closestDiv.querySelector('[data-type="aTag"]').href;
          let thumMailID = closestDiv.querySelector('[data-type="thumb"]').src;
          let mealNameID =
            closestDiv.querySelector('[data-type="mel"]').innerHTML;
          bookMarkCounter++;
          //push the id's to the arrays
          //when bookmark icon is clicked it lights up white
          //make it so if you click the bookmark again it goes back and removes from array
          if (bookMarkCounter === 1) {
            website.push(websiteID);
            thumbMails.push(thumMailID);
            mealName.push(mealNameID);
            book.innerHTML = `<i class="fa-solid fa-bookmark fa-lg" style="color: #ffffff;">`;

            let popUpWords = document.getElementById("popUpWords");
            popUpWords.innerHTML = `${mealNameID} recipe was added to the list!`;
            //add in animation for when you hit save it shows save pop up
            let popUptoShow = document.getElementById("popUPSave");
            popUptoShow.classList.remove("slideIn", "slideOut");

            popUptoShow.classList.add("slideIn");
            popUptoShow.classList.remove("slideOut");
            setTimeout(() => {
              popUptoShow.classList.remove("slideIn");
              popUptoShow.classList.add("slideOut");
            }, 3000);
          } else if (bookMarkCounter === 2) {
            bookMarkCounter = 0;
            book.innerHTML = `<i class="fa-regular fa-bookmark fa-lg" style="color: #ffffff;">`;
            //remove elements if clicked again
            //declare index's
            let indexWebsite = website.indexOf(websiteID);
            let indexthumMail = thumbMails.indexOf(thumMailID);
            let indexMealName = mealName.indexOf(mealNameID);
            //make the condition for if in array to remove
            if (indexWebsite !== -1) {
              website.splice(indexWebsite, 1);
            }

            if (indexthumMail !== -1) {
              thumbMails.splice(indexthumMail, 1);
            }

            if (indexMealName !== -1) {
              mealName.splice(indexMealName, 1);
            }
          }
          // send savedList data to local storage
          localStorage.setItem("savedWebsites", JSON.stringify(website));
          localStorage.setItem("savedThumbMails", JSON.stringify(thumbMails));
          localStorage.setItem("savedMealNames", JSON.stringify(mealName));
        }
        //dont send the whole whole div send the values in an array and make the divs again on the other page and use for each! so to clairfy store the api arrays and not the div
      });
    });
  } catch (error) {
    console.log(error, "Error");
  } finally {
    console.log("api process done");
  }
}
//recall api whenever there is an input to search new value
formRecipie.addEventListener("submit", (e) => {
  e.preventDefault();
  //clear the page when search again
  recipeHolder.innerHTML = "";
  fetchData();
});

recipeHolder.innerHTML = "";
fetchData();
