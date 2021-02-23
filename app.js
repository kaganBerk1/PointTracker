///////////////// VARIABLES ///////////////
const persons = [];
const addBtn = document.querySelector(".buttonAdd");
const containerPoints = document.querySelector(".points");
const scoresBtn = document.querySelector(".buttonScores");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".closeSpan");
///////////////////  FUNCTIONS  ////////////////////

//////// adding html to pointers  ////////////////////////
function add(name, point, value) {
  const HTML = `<div class="person">
  <label for="name" class="box"><span>${name}</span></label>
  <label for="point" class="box"><span> ${point}    (${
    value > 0 ? `+` : ``
  }${value})</span></label>
</div>`;
  containerPoints.insertAdjacentHTML("afterbegin", HTML);
}
////////  display pointer containers  ////////////////////////
function display() {
  modal.style.display = "none";
  containerPoints.style.opacity = 1;
  scoresBtn.style.opacity = 1;
}

////////  hide pointer containers ////////////////////////
function hidden() {
  modal.style.display = "block";
  containerPoints.style.opacity = 0;
  scoresBtn.style.opacity = 0;
}

//////// adding html to modal ////////////////////////
function addModal(name, point) {
  const HTML = `<div class="person" > <label for="name" class="modal-box"><span>${name} </span></label>
  <label for="point" class="modal-box"><span>${point}</span></label></div>`;
  modalContent.insertAdjacentHTML("afterend", HTML);
}

/////////////////  EVETNS  //////////////////////////////////
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let firstName = document.querySelector("#name").value;
  firstName = firstName.trim();
  firstName = firstName.toUpperCase();
  const pointUser = +document.querySelector("#pointValue").value;

  let found = false;

  /////Checking all object. If name is including, just add point to this obj  ////////////////////////
  if (firstName) {
    persons.forEach((el) => {
      if (el.name === firstName) {
        el.point = el.point + pointUser;
        found = true;
        add(el.name, el.point, pointUser);
      }
    });
    ////// if name is not including  create to pointers ////////////////////////
    if (!found) {
      persons.push({
        name: firstName,
        point: pointUser,
      });
      add(firstName, pointUser, pointUser);
    }
  }
});

////// show top scores ////////////////////////
scoresBtn.addEventListener("click", (e) => {
  e.preventDefault();

  ///remove previous  top scores from html ////////////////////////
  while (modalContent.nextSibling) {
    modalContent.nextSibling.remove();
  }

  ///sortting persons by point value ////////////////////////
  persons.sort((a, b) => {
    if (a.point > b.point) return 1;
    if (a.point < b.point) return -1;
  });

  ///creating modal top points ////////////////////////
  persons.forEach((el) => {
    addModal(el.name, el.point);
  });
  hidden();
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  display();
});
