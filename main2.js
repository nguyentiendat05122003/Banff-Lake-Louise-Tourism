import LIST_ACCOMMODATION from "./data/listAccommodation.js";
const btnAddElement = document.querySelector(".btn-add-wrapper");
const fromWrapper = document.querySelector(".modal-form");
const fromElement = document.querySelector(".info-form");
const tableElement = document.querySelector(".table");
const inputElement = document.querySelector(".search-input");
const btnSubmitElement = document.querySelector(".btn-submit");
const sttElement = document.querySelector("#stt");
const maElement = document.querySelector("#maChoO");
const tenElement = document.querySelector("#tenChoO");
const anhElement = document.querySelector("#anh");

//Tạo my list lưu trữ trên local
// const jsonList = JSON.stringify(LIST_ACCOMMODATION);
// localStorage.setItem("myList", jsonList);
let listBtnDelete;

function GetData() {
  const storedJson = localStorage.getItem("myList");
  const storedArray = JSON.parse(storedJson);
  return storedArray;
}

function RenderTemplate(results) {
  const templateTable = `
    <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã chỗ ở</th>
                            <th>Tên Accommodation</th>
                            <th>Ảnh minh họa</th>
                            <th>Tác vụ</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${results
                            .map(
                              (item) =>
                                `<tr>
                            <td>${item.id}</td>
                            <td>${item.ma_cho_o}</td>
                            <td>${item.ten_cho_o}</td>
                            <td>${item.image}</td>
                            <td>
                              <button class="delete-button"><i class="fa fa-trash"></i></button>
                            </td>
                          </tr>`
                            )
                            .join("")}                     
                        </tbody>
    `;
  tableElement.innerHTML = templateTable;
}

btnAddElement.onclick = () => {
  fromWrapper.classList.remove("isHide");
  fromWrapper.classList.add("isShow");
};

document.body.onclick = (e) => {
  if (
    !e.target.closest(".info-form") &&
    !e.target.closest(".btn-add-wrapper")
  ) {
    fromWrapper.classList.add("isHide");
  }
};

function Reload() {
  const storedArray = GetData();
  if (storedArray) {
    RenderTemplate(storedArray);
    listBtnDelete = document.querySelectorAll(".delete-button");
    if (listBtnDelete) {
      console.log(listBtnDelete);
      listBtnDelete.forEach((btn, index) => {
        btn.onclick = (e) => {
          const storedArray = GetData();
          const newList = storedArray.filter(
            (item, _index) => _index !== index
          );
          localStorage.setItem("myList", JSON.stringify(newList));
          Reload();
        };
      });
    }
  }
}
Reload();

fromElement.onsubmit = (e) => {
  e.preventDefault();
  if (
    sttElement.value.Trim !== "" &&
    maElement.value.Trim !== "" &&
    tenElement.value.Trim !== ""
  ) {
    let newObject = {
      id: sttElement.value,
      ma_cho_o: maElement.value,
      ten_cho_o: tenElement.value,
      image: anhElement.value,
    };
    const storedArray = GetData();
    let newList = [...storedArray, newObject];
    localStorage.setItem("myList", JSON.stringify(newList));
    Reload();
    ResetForm();
    fromWrapper.classList.add("isHide");
  }
};
function ResetForm() {
  sttElement.value = "";
  maElement.value = "";
  tenElement.value = "";
  anhElement.value = "";
}

inputElement.oninput = (e) => {
  let value = e.target.value;
  const storedArray = GetData();
  let results = storedArray.filter((item) => {
    let name = item.ten_cho_o.toLowerCase();
    return name.includes(value);
  });
  RenderTemplate(results);
};
