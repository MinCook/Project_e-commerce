const buttonsStatus = document.querySelectorAll("[button-status]");
let url = new URL(window.location.href);
buttonsStatus.forEach((button) => {
  button.addEventListener("click", (e) => {
    const status = button.getAttribute("button-status");
    status ? url.searchParams.set("status", status) : url.searchParams.delete("status");
    window.location.href = url.href;
  });
});
// url.searchParams.set là cài đặt thuộc tính status thành giá trị 
// url.searchParams.get là lấy xuống thuộc tính
const formSearch = document.querySelector(".form");
// -------------------------END SEARCH--------------------------------------

const buttonsPage = document.querySelectorAll("[page-number]");
buttonsPage.forEach((button) => {
  button.addEventListener("click", (e) => {
    const page = button.getAttribute("page-number");
    page > 0
      ? url.searchParams.set("page", page)
      : url.searchParams.delete("page");
    window.location.href = url.href;
  });
});
// -------------------------END PAGINATION-------------------------

const btnChangeStatus = document.querySelectorAll(".box--item button");
btnChangeStatus.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const status = btn.getAttribute("status");
    const id = btn.getAttribute("id");
    let statusChange = status == "active" ? "inactive" : "active";
    const form = document.querySelector("#changeStatus");
    const path = form.getAttribute("path");
    const action = path + `/${statusChange}/${id}` + `/?_method=patch`;
    form.action = action;
    form.submit();
  });
});
// -------------------------END CHANGE STATUS-------------------------

const checkAll = document.querySelector("[checkAll]");
const checkOne = document.querySelectorAll("[checkOne]");
if(checkAll){
  checkAll.addEventListener("click", () => {
    checkAll.checked == true
      ? checkOne.forEach((btn) => (btn.checked = true))
      : checkOne.forEach((btn) => (btn.checked = false));
  });
}
checkOne.forEach((btn) => {
  btn.addEventListener("click", () => {
    const countChecked = document.querySelectorAll("[checkOne]:checked");
    countChecked.length == checkOne.length
      ? (checkAll.checked = true)
      : (checkAll.checked = false);
  });
});

// -------------------------END CHECKED ALL -------------------------
const btn = document.querySelector(".btn");
const input = document.querySelector("input[changeMulti]");
const formMulti = document.querySelector("#changeMulti");
if(formMulti){
  formMulti.addEventListener("submit", () => {
    const option = document.querySelector("#changeMulti select").value;
    let arr = [];
    if(option != "changePosition"){
      const listId = document.querySelectorAll("[checkOne]:checked").forEach((input) => arr.push(input.id)) ;
    }
    else {
      const listId = document.querySelectorAll("[checkOne]:checked").forEach((input) => {
        const position = input.closest(".box--item").querySelector("input[position]").value
        arr.push(`${input.id}-${position}`)
      }) ;
    }
     input.value = arr.join(", ");
    formMulti.submit();
  });
}

// -------------------------END CHANGE MULTI -------------------------
const deleteForm = document.querySelector("#deleteItem");
const deleteBtn = document.querySelectorAll("button[delete-item]");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = confirm(" Bạn có đồng ý xóa không ?");
    if (value) {
      const id = btn.getAttribute("id");
      const path = deleteForm.getAttribute("path");
      const action = `${path}/${id}` + `?_method=delete`;
      deleteForm.action = action;
      deleteForm.submit();
    }
  });
});
// -------------------------DELETE   -------------------------
const getInput = document.querySelector(".inputPreview")
const img = document.querySelector("img")
const btnClose = document.querySelector(".closeInput")
if(getInput){
  getInput.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    if (file) {
      img.src = URL.createObjectURL(file)

    }
})
}
if(btnClose){
  btnClose.addEventListener("click",()=>{
    img.src= "";
    getInput.value="";
  })
}
// -------------------------PREVIEW IMAGE BEFORE UPDATE   -------------------------
const btnEdit = document.querySelector("a[btn-edit]]")
if(btnEdit){
  btnEdit.addEventListener("click",()=>{
      
  })
}
// -------------------------UPDATE DATA   -------------------------




