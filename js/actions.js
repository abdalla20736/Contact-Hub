function RegisterEvents() {
  openFormBtn.addEventListener("click", OpenForm);
  closeFormBtn.addEventListener("click", CloseForm);
  cancelFormBtn.addEventListener("click", CloseForm);
  saveContactBtn.addEventListener("click", SaveContact);
  searchInput.addEventListener("input", (e) => FindContact(e.target.value));
  inputs[0].addEventListener("change", (e) => UpdateProfileImg(e.target));
  inputs[1].addEventListener("input", (e) => ValidateInputs(e.target, 0));
  inputs[2].addEventListener("input", (e) => ValidateInputs(e.target, 1));
  inputs[3].addEventListener("input", (e) => ValidateInputs(e.target, 2));
}

function OpenForm() {
  addContactForm.classList.add("opacity-100");
  addContactForm.classList.remove("visually-hidden");
  formTitle.innerHTML = "Add New Contact";
  ResetProfileImg();
  ClearForm();
}

function CloseForm(input) {
  editMode = false;
  currentContactIndex = undefined;

  addContactForm.classList.remove("opacity-100");
  addContactForm.addEventListener(
    "transitionend",
    function () {
      addContactForm.classList.add("visually-hidden");
    },
    { once: true }
  );
}
