const buttonNavBarMenu = document.querySelector(".navbar_button_menu");
const navBarIconCenter = document.querySelector(".icon-bars-center");
const navBarIconTop = document.querySelector(".icon-bars-top");
const navBarIconBottom = document.querySelector(".icon-bars-bottom");
const modalMenuHeader = document.querySelector(".modal-menu");
const mainHeader = document.querySelector(".main_header");
const iconSearch = document.querySelector(".icon-svg-search");
const iconBookmarks = document.querySelector(".icon-svg-save");
const app = {
  render() {},
  handleEvent() {
    // handle click show header
    if (buttonNavBarMenu) {
      buttonNavBarMenu.onclick = () => {
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
  },
  start() {
    this.render();
    this.handleEvent();
  },
};

app.start();
