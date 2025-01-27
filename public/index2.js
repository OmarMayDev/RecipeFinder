//userlogin
//declare user proile login details
let profileLogin = document.getElementById("loginHolder");
let usernameProfile = document.getElementById("usernameProfile");
let memberShipDate = document.getElementById("memberships");

let isFormSubmited = false;
let isFormSubmitedCondition = JSON.parse(
  localStorage.getItem("isFormSubmitedCondition") || false
);

//get userstuff
usernameProfile.innerHTML = JSON.parse(localStorage.getItem("savedUser")) || "";
memberShipDate.innerHTML = JSON.parse(localStorage.getItem("savedDate")) || "";

isFormSubmited = isFormSubmitedCondition;

if (isFormSubmited) {
  profileLogin.style.display = "flex";
}

//add in logo click send to first page
//add in recipes click send to first page
let logo = document.querySelector('[data-type="logo"]');
let recipesNav = document.getElementById("recipesNav");
logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

recipesNav.addEventListener("click", () => {
  window.location.href = "index.html";
});

let savedTab = document.getElementById("savedNav");
savedTab.addEventListener("click", () => {
  window.location.href = "index2.html";
});

//declare
let recipeHolder = document.getElementById("recipeHolder");

//grab the savedMeals local storage
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

//removes
let websiteR = [];
let thumbMailsR = [];
let mealNameR = [];
//send to storage the removed the get the storage up here the push it to the arrays and just use .set to remove what matches
let savedWebsitesRemove =
  JSON.parse(localStorage.getItem("savedWebsitesRemove")) || [];
let savedThumbMailsRemove =
  JSON.parse(localStorage.getItem("savedThumbMailsRemove")) || [];
let savedMealNamesRemove =
  JSON.parse(localStorage.getItem("savedMealNamesRemove")) || [];

websiteR = savedWebsitesRemove;
thumbMailsR = savedThumbMailsRemove;
mealNameR = savedMealNamesRemove;
//it removed the opitsite???
//the removed list is being refreshed needs to stay???
if (websiteR.length !== 0) {
  savedWebsites = savedWebsites.filter((ele) => !websiteR.includes(ele));
}

if (thumbMailsR.length !== 0) {
  savedThumbMails = savedThumbMails.filter((ele) => !thumbMailsR.includes(ele));
}

if (mealNameR.length !== 0) {
  savedMealNames = savedMealNames.filter((ele) => !mealNameR.includes(ele));
}

// just use [...new Set(array)] to take out any duplicates once sent over
savedWebsites = [...new Set(savedWebsites)];
savedThumbMails = [...new Set(savedThumbMails)];
savedMealNames = [...new Set(savedMealNames)];

//make an static apit with all the data values
let savedDataApi = savedWebsites.map((website, index) => {
  return {
    website: website,
    thumbmail: savedThumbMails[index],
    mealName: savedMealNames[index],
  };
});

//send savedMeals to div innerHTML
savedDataApi.forEach((ele) => {
  recipeHolder.insertAdjacentHTML(
    "afterbegin",
    `  <div class="flex flex-col gap-[10px]" data-type="recipee">
            <div class="overflow-hidden hover:cursor-pointer relative rounded-[5px] w-[223.5px] h-[223.5px]">
            <!--Recipie content-->
              <div data-type="recipePic" class="transform transition-transform duration-500 scale-100 hover:scale-110  w-full h-full"><a data-type="aTag" href="${ele.website}" target="_blank"><img src="${ele.thumbmail}" data-type="thumb"/></a></div>
              <div><div class="flex gap-[2px]"><div class="bg-white flex items-center justify-center w-[20px] h-[20px]">Save</div><div class="absolute top-[10px] right-[10px]" data-type="saveIcon"><i class="fa-solid fa-x fa-lg" style="color: #ffffff;"></i></div> </div></div>
            </div>
              <div data-type="mel" class="font-[500] w-[223.5px]">${ele.mealName}</div>
            </div>`
  );
  //make when you hit the x icon it deletes the whole meal
  let bookMark = document.querySelectorAll('[data-type="saveIcon"]');
  bookMark = Array.from(bookMark);
  console.log("test", bookMark);
  bookMark.forEach((book) => {
    book.addEventListener("click", () => {
      //make it so when you hit x it actually removes it from the array
      let closestDiv = book.closest('[data-type="recipee"]');
      closestDiv.style.display = "none";

      //get data associated with the clicked div
      let website = closestDiv.querySelector('[data-type="aTag"]').href;
      let thumbmail = closestDiv.querySelector('[data-type="thumb"]').src;
      let mealName = closestDiv.querySelector('[data-type="mel"]').innerText;

      // Check if the recipe is already in the block list and remove it if necessary
      let blockIndex = savedWebsitesRemove.indexOf(website);
      let blockIndex2 = savedThumbMailsRemove.indexOf(thumbmail);
      let blockIndex3 = savedMealNamesRemove.indexOf(mealName);
      if (blockIndex !== -1) {
        savedWebsitesRemove.splice(blockIndex, 1);
      }
      if (blockIndex2 !== -1) {
        savedThumbMailsRemove.splice(blockIndex2, 1);
      }
      if (blockIndex3 !== -1) {
        savedMealNamesRemove.splice(blockIndex3, 1);
      }
      console.log("fhoewajfi");
      //make website go
      let index = savedWebsites.indexOf(website);
      if (index !== -1) {
        savedWebsites.splice(index, 1);
        savedWebsitesRemove.push(website);
      }
      //make thumbmail go
      let index2 = savedThumbMails.indexOf(thumbmail);
      if (index2 !== -1) {
        savedThumbMails.splice(index2, 1);
        savedThumbMailsRemove.push(thumbmail);
      }
      //make mealname go
      let index3 = savedMealNames.indexOf(mealName);
      if (index3 !== -1) {
        savedMealNames.splice(index3, 1);
        savedMealNamesRemove.push(mealName);
      }
      //send all removed to local storage
      localStorage.setItem("savedWebsites", JSON.stringify(savedWebsites));
      localStorage.setItem("savedThumbMails", JSON.stringify(savedThumbMails));
      localStorage.setItem("savedMealNames", JSON.stringify(savedMealNames));
      localStorage.setItem(
        "savedWebsitesRemove",
        JSON.stringify(savedWebsitesRemove)
      );
      localStorage.setItem(
        "savedThumbMailsRemove",
        JSON.stringify(savedThumbMailsRemove)
      );
      localStorage.setItem(
        "savedMealNamesRemove",
        JSON.stringify(savedMealNamesRemove)
      );
    });
  });
});
//make it center if more than or equal to 4 img
if (savedDataApi.length >= 4) {
  recipeHolder.style.justifyContent = "center";
} else {
  recipeHolder.style.justifyContent = "flex-start";
}
