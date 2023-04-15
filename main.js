import LIST_DATA from "./data/listHeader.js";
const buttonNavBarMenu = document.querySelector(".navbar_button_menu");
const navBarIconCenter = document.querySelector(".icon-bars-center");
const navBarIconTop = document.querySelector(".icon-bars-top");
const navBarIconBottom = document.querySelector(".icon-bars-bottom");
const modalMenuHeader = document.querySelector(".modal-menu");
const mainHeader = document.querySelector(".main_header");
const iconSearch = document.querySelector(".icon-svg-search");
const iconBookmarks = document.querySelector(".icon-svg-save");
const navbarListMobile = document.querySelector(".modal-menu-list");
let navBarTitleMobiles;
const app = {
  render() {
    //render navbar in mobile
    let templateNavbarListMobile = LIST_DATA.map(
      (item) => `<li class="modal-menu-item">
      <button class="modal-menu-item-button">${item.title}</button>
      <div class="content-nav-mobile">
      <ul class="content-nav-mobile-list">
      ${item.children
        .map(
          (content) => `<li class="content-nav-mobile-item">
          <a class="content-nav-mobile-item-link" href="">${content}</a>
          </li>`
        )
        .join("")}
          </ul>
          </div>
          </li>`
    );
    templateNavbarListMobile = templateNavbarListMobile.join("");
    navbarListMobile.insertAdjacentHTML("afterbegin", templateNavbarListMobile);
    navBarTitleMobiles = document.querySelectorAll(".modal-menu-item");
  },
  handleEvent() {
    // handle click show header
    if (buttonNavBarMenu) {
      buttonNavBarMenu.onclick = () => {
        console.log(1);
        modalMenuHeader.classList.toggle("hide-on-pc");
        mainHeader.style.backgroundColor = "#fff";
        navBarIconTop.classList.toggle("transition");
        navBarIconCenter.classList.toggle("transition");
        navBarIconBottom.classList.toggle("transition");
        iconSearch.classList.toggle("none");
        iconBookmarks.classList.toggle("none");
        if (modalMenuHeader) {
          document.body.scroll = "no";
          document.body.style = "overflow:hidden";
        }
      };
    }
    //handle click show content navbar header
    if (navBarTitleMobiles) {
      navBarTitleMobiles.forEach((element) => {
        console.log(element);
        element.onclick = (e) => {
          const content = element.querySelector(".content-nav-mobile");
          const listItems = element.querySelectorAll(
            ".content-nav-mobile-item"
          );
          const navBarTitleMobilesIcon = element.querySelector(
            ".modal-menu-item-button"
          );
          console.log(content);
          if (content) {
            console.log(1);
            content.classList.toggle("isShow");
            navBarTitleMobilesIcon.classList.toggle("isChange");
            listItems.forEach((item) => {
              setTimeout(() => {
                item.classList.toggle("isShow");
              }, 100);
            });
          }
        };
      });
    }
  },
  start() {
    this.render();
    this.handleEvent();
  },
};

app.start();
