import LIST_HEADER from "./data/listHeader.js";
import LIST_SLIDER from "./data/listSlider.js";
import LIST_INSPIRED from "./data/listInspired.js";
const buttonNavBarMenu = document.querySelector(".navbar_button_menu");
const navBarIconCenter = document.querySelector(".icon-bars-center");
const navBarIconTop = document.querySelector(".icon-bars-top");
const navBarIconBottom = document.querySelector(".icon-bars-bottom");
const modalMenuHeader = document.querySelector(".modal-menu");
const mainHeader = document.querySelector(".main_header");
const iconSearch = document.querySelector(".icon-svg-search");
const iconBookmarks = document.querySelector(".icon-svg-save");
const navbarListMobile = document.querySelector(".modal-menu-list");
const logoElement = document.querySelector(".navbar_header_item.isFull");
const sliderWrapper = document.querySelector(".slider");
const sliderElement = document.querySelector(".main_slider_image");
const sliderHeading = document.querySelector(".main_slider_text-heading");
const listDescription = document.querySelector(".list_desc");
const seasonBtn = document.querySelector(".season-button");
const seasonText = document.querySelector(".season-button-text");
const seasonDesc = document.querySelector(".main_slider_button_select_season");
const seasonItem = document.querySelectorAll(".season_item");
const seasonMenu = document.querySelector(".season_menu");
const inspiredTabWrapper = document.querySelector(".inspired_tab_list_title");
const htmlWidth = document.documentElement.offsetWidth;
const style = getComputedStyle(document.body);
let depWindow = 4;
let inspiredWrapperScroll;
const inspiredScroll = document.querySelector(
  ".inspired_data_trip_list-scroll"
);
const inspiredContentWrapper = document.querySelector(
  ".inspired_tab_list_data"
);
let inspiredTabs;
let inspiredContent;
let inspiredContentList;
let navBarTitleMobiles;
let templateNavbarListPC;
const app = {
  debounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  },
  renderInspiredContent(depWindow) {
    let templateInspiredContents = LIST_INSPIRED.map((item) => {
      let templateSub = "";
      let templateDot = "";
      let templateTmpDot = `<div class="dot"></div>`;
      if (item.content.length % depWindow !== 0 && depWindow !== 0) {
        let MathContent = depWindow - (item.content.length % depWindow);
        let templateTmpSub = `<li class="col c-3 inspired_data_trip_item"></li>`;
        for (let i = 0; i < MathContent; i++) {
          templateSub = templateSub + templateTmpSub;
        }
        for (let i = 0; i < item.content.length / depWindow; i++) {
          if (i === 0) {
            templateTmpDot = `<div class="dot dot_active"></div>`;
          } else {
            templateTmpDot = `<div class="dot"></div>`;
          }
          templateDot = templateDot + templateTmpDot;
        }
      }
      if (depWindow === 0) {
        for (let i = 0; i < item.content.length; i++) {
          if (i === 0) {
            templateTmpDot = `<div class="dot dot_active"></div>`;
          } else {
            templateTmpDot = `<div class="dot"></div>`;
          }
          templateDot = templateDot + templateTmpDot;
        }
      }
      let wrapperDot = `<div class="dot-wrapper">
      ${templateDot}
      </div>`;
      return `
      <div class="inspired_data inspired_data_trip">
                            <ul class="inspired_data_trip_list">
                                <div class="grid">
                                    <div class="inspired_data_trip_list-scroll row">
                                        ${
                                          item.content
                                            .map((obj) => {
                                              return ` <li class="col c-11 m-4 l-3 inspired_data_trip_item">
                                            <a class="inspired_data_trip_link" href="">
                                                <div class="inspired_data_trip_item_wrapper">
                                                    <div class="inspired_data_trip_item_image">
                                                        <img src=${
                                                          obj.url
                                                        } alt="">
                                                    </div>
                                                    ${
                                                      obj.desc
                                                        ? `<h3 class="inspired_data_desc">${obj.desc}</h3>
                                                    <div class="inspired_data_info">
                                                        <div class="inspired_data_day">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true" class="inspired_data_icon" style="margin-right: 0.375rem;"><path d="M13 6.12a1 1 0 0 0-2 0v6.37a.94.94 0 0 0 .29.69l4.4 4.41a1 1 0 0 0 1.41-1.39L13 12.08Z"></path><path fill-rule="evenodd" d="M23.75 12A11.75 11.75 0 1 1 12 .25 11.75 11.75 0 0 1 23.75 12Zm-2 0A9.79 9.79 0 1 1 12 2.21 9.79 9.79 0 0 1 21.79 12Z"></path></svg>
                                                            <div class="inspired_data_info_text">${obj.day} Days</div>
                                                        </div>
                                                        <div class="inspired_data_location">
                                                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 18 24" focusable="false" aria-hidden="true" class="inspired_data_icon" style="margin-right: 0.375rem;"><path fill-rule="evenodd" d="M14.27 12.17a8.53 8.53 0 0 0 1.11-3.26A6.28 6.28 0 0 0 9 2.73a6.28 6.28 0 0 0-6.38 6.18 8.53 8.53 0 0 0 1.11 3.26 39 39 0 0 0 2.78 4.5C7.39 17.93 8.28 19.09 9 20c.72-.92 1.61-2.08 2.49-3.34a39 39 0 0 0 2.78-4.49Zm-3.91 9.52c2.39-3 7.14-9.38 7.14-12.78A8.38 8.38 0 0 0 9 .67 8.38 8.38 0 0 0 .5 8.91c0 3.4 4.75 9.77 7.14 12.78C8.46 22.7 9 23.33 9 23.33s.54-.63 1.36-1.64Z"></path><path fill-rule="evenodd" d="M9 9.94a1 1 0 1 0-1.06-1 1 1 0 0 0 1.06 1ZM9 12a3.14 3.14 0 0 0 3.19-3.09A3.14 3.14 0 0 0 9 5.82a3.14 3.14 0 0 0-3.19 3.09A3.14 3.14 0 0 0 9 12Z"></path></svg>
                                                            <div class="inspired_data_info_text">${obj.location} Experiences</div>
                                                        </div>
                                                    </div>`
                                                        : ""
                                                    }
                                                </div>
                                                <span class="inspired_data_info-sub">${
                                                  obj.sub
                                                }</span>
                                            </a>
                                        </li>`;
                                            })
                                            .join("") + templateSub
                                        }
                                    </div>
                                </div>
                                ${wrapperDot}
                                </ul>   
                        <button class="inspired_trip_btn inspired_trip_btn_left hide-on-mobile-and-tablet isHidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="flickity-button-icon" viewBox="0 0 100 100"><path d="M18.33,29.87a4.22,4.22,0,0,1,6,0,4.3,4.3,0,0,1,0,6.05l-9.74,9.8H95.66a4.28,4.28,0,0,1,0,8.56H14.59l9.74,9.8a4.3,4.3,0,0,1,0,6,4.22,4.22,0,0,1-6,0L1.34,53a4.29,4.29,0,0,1,0-6Z" class="arrow"></path></svg>
                        </button>
                        <button class="inspired_trip_btn inspired_trip_btn_right isActive hide-on-mobile-and-tablet">
                            <svg xmlns="http://www.w3.org/2000/svg" class="flickity-button-icon" viewBox="0 0 100 100"><path d="M18.33,29.87a4.22,4.22,0,0,1,6,0,4.3,4.3,0,0,1,0,6.05l-9.74,9.8H95.66a4.28,4.28,0,0,1,0,8.56H14.59l9.74,9.8a4.3,4.3,0,0,1,0,6,4.22,4.22,0,0,1-6,0L1.34,53a4.29,4.29,0,0,1,0-6Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>
                        </button>  
        </div>
      `;
    });
    templateInspiredContents = templateInspiredContents.join("");
    inspiredContentWrapper.innerHTML = templateInspiredContents;
    inspiredContentList = document.querySelectorAll(".inspired_data");
    if (inspiredContentList) {
      inspiredContentList[0].classList.add("isShow");
    }
  },
  render() {
    //render navbar in mobile
    let templateNavbarListMobile = LIST_HEADER.map(
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
    //render navbar in pc
    templateNavbarListPC = LIST_HEADER.map(
      (item) =>
        `<li class="navbar_header_item hide-on-mobile-and-tablet">
      <button class="navbar_header_item_button">
          <span class="navbar_header_item_button_text navbar_header_item_button-tab">${
            item.title
          }</span>
          <svg viewBox="0 0 10 10" focusable="false" aria-hidden="true"
              class="navbar_header_item_button_icon">
              <path
                  d="M.18 2.7a.83.83 0 0 1 1.17-.13L5 5.48l3.65-2.91a.83.83 0 0 1 1.17.13.84.84 0 0 1-.13 1.17L5 7.62.31 3.87A.84.84 0 0 1 .18 2.7Z"
                  class="css-9q8ke0"></path>
          </svg>
      </button>
      <div class="navbar_header_menu-pc">
              <h2 class="navbar_header_menu-pc-heading">${item.title}</h2>
              <ul class="navbar_header_menu-pc-list">
                ${item.children
                  .map(
                    (content) =>
                      `<li class="navbar_header_menu-pc-item">
                <a href="" class="navbar_header_menu-pc-link">${content}</a>
              </li>`
                  )
                  .join("")}
              </ul>
          <ul class="navbar_header_menu-pc-list-image">
          ${item.images
            .map(
              (image) => `<li class="menu-pc-item-image">
          <a class="menu-pc-item-image-link" href="">
              <div class="menu-pc-item-image-wrapper">
                  <img src=${image.url} alt=${image.text}>
                  <span class="menu-pc-item-image-text">${image.text}</span>
              </div>
          </a>
      </li>`
            )
            .join("")}
          </ul>
      </div>
  </li>`
    );
    templateNavbarListPC = templateNavbarListPC.join("");
    logoElement.insertAdjacentHTML("afterend", templateNavbarListPC);
    //render description in Slider
    //render season
    let templateSeason = LIST_SLIDER.map(
      (item) =>
        `<li class="season_item">
        <button class="season_item_btn">
        <span class="season-text">${item.season}</span>
        <span class="season-month">${item.month}</span>
        </button>
        </li>`
    );
    seasonMenu.innerHTML = templateSeason.join("");
    //render Inspired Tabs
    let templateInspiredTabs = LIST_INSPIRED.map((item, index) => {
      if (index === 0) {
        return `<button class="inspired_tab_button isActive">
        <div class="inspired_tab_button_text">
            ${item.title}
        </div>
      </button>`;
      }
      return `<button class="inspired_tab_button">
      <div class="inspired_tab_button_text">
          ${item.title}
      </div>
    </button>`;
    });
    templateInspiredTabs = templateInspiredTabs.join("");
    inspiredTabWrapper.innerHTML = templateInspiredTabs;
    //render Inspired Content
    if (htmlWidth < 414) {
      this.renderInspiredContent(0);
    }
    if (htmlWidth > 415 && htmlWidth < 1024) {
      console.log(1);
      this.renderInspiredContent(2);
    } else {
      this.renderInspiredContent(depWindow);
    }
    // this.renderInspiredContent(depWindow);
  },
  handleEvent() {
    const _this = this;
    // handle click show header
    if (buttonNavBarMenu) {
      buttonNavBarMenu.onclick = () => {
        if (modalMenuHeader.classList.contains("hide-on-pc")) {
          document.body.scroll = "no";
          document.body.style = "overflow:hidden";
        } else {
          document.body.scroll = "yes";
          document.body.style = "overflow-y:auto";
        }
        modalMenuHeader.classList.toggle("hide-on-pc");
        mainHeader.style.backgroundColor = "#fff";
        navBarIconTop.classList.toggle("transition");
        navBarIconCenter.classList.toggle("transition");
        navBarIconBottom.classList.toggle("transition");
        iconSearch.classList.toggle("none");
        iconBookmarks.classList.toggle("none");
      };
    }
    //handle click show content navbar header in mobile
    if (navBarTitleMobiles) {
      navBarTitleMobiles.forEach((element) => {
        element.onclick = (e) => {
          const content = element.querySelector(".content-nav-mobile");
          const listItems = element.querySelectorAll(
            ".content-nav-mobile-item"
          );
          const navBarTitleMobilesIcon = element.querySelector(
            ".modal-menu-item-button"
          );
          if (content) {
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
    //handle click show content navbar header in pc
    if (templateNavbarListPC) {
      const tabsItemHeaderPC = document.querySelectorAll(
        ".navbar_header_item_button-tab"
      );
      const modalListPC = document.querySelectorAll(".navbar_header_menu-pc");
      tabsItemHeaderPC.forEach((item) => {
        const parentTab = item.parentElement.nextElementSibling;
        if (parentTab.classList.contains("isShow")) {
          parentTab.classList.remove("isShow");
        }
        item.onclick = (e) => {
          mainHeader.style.backgroundColor = "#fff";
          const itemActive = document.querySelector(
            ".navbar_header_item_button-tab.isActive"
          );
          if (itemActive) {
            itemActive.classList.remove("isActive");
          }
          const modalPC = item.parentElement.nextElementSibling;
          const listText = modalPC.querySelector(".navbar_header_menu-pc-list");
          const listImage = modalPC.querySelector(
            ".navbar_header_menu-pc-list-image"
          );
          if (modalListPC) {
            modalListPC.forEach((item) => {
              if (item !== modalPC) {
                item.classList.remove("isShow");
                listImage.classList.remove("isShow");
                listText.classList.remove("isShow");
              }
              if (item.classList.contains("isShow")) {
                mainHeader.style.backgroundColor = "#f2eee9";
              }
            });
          }
          item.classList.add("isActive");
          modalPC.classList.toggle("isShow");
          setTimeout(() => {
            listText.classList.toggle("isShow");
            listImage.classList.toggle("isShow");
          }, 100);
          if (!!modalListPC) {
            if (itemActive) {
              itemActive.classList.remove("isActive");
            }
          }
        };
      });
    }
    //click season button show description season
    seasonBtn.onclick = () => {
      seasonDesc.classList.add("isShow");
    };
    if (seasonItem) {
      seasonItem.forEach((item) => {
        item.onclick = () => {
          const text = item.querySelector(".season-text");
          seasonText.innerText = `Season: ${text}`;
          seasonDesc.classList.remove("isShow");
        };
      });
    }
    //Slider
    function Slider() {
      LIST_SLIDER.forEach((item, index) => {
        setTimeout(function () {
          item.content.forEach(function (obj, index) {
            setTimeout(function () {
              let templateDescSlider = obj.text.map((item, index) => {
                return `<li class="list_desc_item">
                  <a class="list_desc_item_link" href="">
                      <span class="list_desc_item_dot">
                          <span>.</span>
                      </span>
                      <span class="list_desc_item_text">${item}</span>
                  </a>
              </li>   `;
              });
              templateDescSlider = templateDescSlider.join("");
              listDescription.innerHTML = templateDescSlider;
              sliderWrapper.style.display = "block";
              sliderElement.animate([{ opacity: 0.5 }, { opacity: 1 }], {
                duration: 1000,
              });
              sliderHeading.animate(
                [
                  { opacity: 0, transform: "translateY(-10%)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 500 }
              );
              sliderElement.setAttribute("src", obj.url);
              sliderHeading.innerText = obj.title;
              listDescription.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 1000,
              });
            }, 7000 * (index + 1));
            seasonText.innerText = `Season: ${item.season}`;
          });
        }, 21000 * index);
      });
    }
    Slider();
    setInterval(() => {
      Slider();
    }, 84000);
    //Click tab Inspired
    inspiredTabs = document.querySelectorAll(".inspired_tab_button");
    if (inspiredTabs) {
      inspiredTabs.forEach((tab, index) => {
        // _this.renderInspiredContent();
        tab.onclick = () => {
          let inspiredContentShow = document.querySelector(
            ".inspired_data.isShow"
          );
          let inspiredContent = inspiredContentList[index];
          handleClickDot(
            inspiredContent.querySelector(
              ".inspired_data_trip_list-scroll.row"
            ),
            inspiredContent.querySelectorAll(".dot")
          );
          let tabActive = document.querySelector(
            ".inspired_tab_button.isActive"
          );
          // inspired_data_trip_list-scroll row
          if (tabActive) {
            tabActive.classList.remove("isActive");
            inspiredContentShow.classList.remove("isShow");
          }
          tab.classList.add("isActive");
          inspiredContent.classList.add("isShow");
          inspiredContent.animate([{ opacity: 0.5 }, { opacity: 1 }], {
            duration: 300,
          });
        };
      });
    }
    //Click left tab Inspired
    let btnLeft = document.querySelectorAll(".inspired_trip_btn_left");
    let btnRight = document.querySelectorAll(".inspired_trip_btn_right");
    let scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    let paddingPage = style.getPropertyValue("--padding-page");
    paddingPage = parseInt(paddingPage);
    let tmp = window.screen.width - paddingPage * 2 + scrollBarWidth;
    btnLeft.forEach((btn) => {
      let handleClick = (e) => {
        let element = e.target.parentElement
          .querySelector(".inspired_data_trip_list")
          .querySelector(".inspired_data_trip_list-scroll");
        let btnRight = e.target.nextElementSibling;
        element.scrollLeft -= tmp;
        console.log("left", element.scrollLeft);
        if (Math.ceil(element.scrollLeft) === 0) {
          btn.classList.remove("isActive");
          btn.classList.add("isHidden");
        }
        if (Math.ceil(element.scrollLeft) > 0) {
          btn.classList.add("isActive");
          btn.classList.remove("isHidden");
          btnRight.classList.add("isActive");
          btnRight.classList.remove("isHidden");
        }
      };
      const debouncedFunction = _this.debounce(handleClick, 200);
      btn.addEventListener("click", debouncedFunction);
    });
    btnRight.forEach((btn) => {
      let handleClick = (e) => {
        let element = e.target.parentElement
          .querySelector(".inspired_data_trip_list")
          .querySelector(".inspired_data_trip_list-scroll");
        const scrollElement = element.scrollWidth - element.offsetWidth;
        element.scrollLeft += tmp;
        let btnLeft = e.target.previousElementSibling;
        if (
          element.scrollLeft + 1 > scrollElement ||
          element.scrollLeft - 1 > scrollElement
        ) {
          btn.classList.remove("isActive");
          btn.classList.add("isHidden");
          btnLeft.classList.add("isActive");
          btnLeft.classList.remove("isHidden");
        }
      };
      const debouncedFunction = _this.debounce(handleClick, 200);
      btn.addEventListener("click", debouncedFunction);
    });
    function resizeWindow(e) {
      let InspiredElement = document.querySelector(".inspired_wrapper");
      let windowHeight = e.target.innerWidth;
      if (windowHeight) {
        if (windowHeight < 414) {
          _this.renderInspiredContent(0);
          InspiredElement.style.marginTop = `${
            sliderWrapper.offsetHeight + 120
          }px`;
        } else {
          _this.renderInspiredContent(2);
          InspiredElement.style.marginTop = `${
            sliderWrapper.offsetHeight / 2
          }px`;
        }
      }
    }
    //resize window
    window.onresize = (e) => {
      resizeWindow(e);
    };
    //click dot
    inspiredWrapperScroll = document.querySelector(".inspired_data.isShow");
    let dots = inspiredWrapperScroll.querySelectorAll(".dot");
    let elementScroll = inspiredWrapperScroll.querySelector(
      ".inspired_data_trip_list-scroll.row"
    );
    function handleClickDot(elementScroll, dots) {
      dots.forEach((dot, index) => {
        dot.onclick = () => {
          let dotActive = dot.parentElement.querySelector(".dot_active");
          let indexActive;
          dots.forEach((dot, index) => {
            if (dot === dotActive) {
              indexActive = index;
            }
          });
          dotActive.classList.remove("dot_active");
          if (index === 0) {
            let scroll = tmp * (dots.length - 1);
            elementScroll.scrollLeft -= scroll;
            dot.classList.add("dot_active");
            return;
          }
          if (index === dots.length - 1) {
            let scroll = tmp * (dots.length - 1);
            elementScroll.scrollLeft += scroll;
            dot.classList.add("dot_active");
            return;
          }
          if (index < indexActive) {
            console.log(tmp);
            elementScroll.scrollLeft -= tmp;
            dot.classList.add("dot_active");
          } else if (index > indexActive) {
            elementScroll.scrollLeft += tmp;
            dot.classList.add("dot_active");
          } else if (index === indexActive) {
            dot.classList.add("dot_active");
          }
        };
      });
    }
    handleClickDot(elementScroll, dots);
    //handle slider mousemove
    // const rect = sliderWrapper.getBoundingClientRect();
    // var mouse = { x: 0, y: 0, moved: false };
    // console.log(sliderElement);
    // sliderWrapper.addEventListener("mousemove", (e) => {
    //   mouse.x = e.clientX - rect.left;
    //   mouse.y = e.clientY - rect.top;
    // });
    // if (htmlWidth < 414) {
    //   this.renderInspiredContent(0);
    // }
    // if (htmlWidth > 415 && htmlWidth < 1024) {
    //   this.renderInspiredContent(1);
    // } else {
    //   this.renderInspiredContent(depWindow);
    // }
    //prevent wheel
    // function detectTrackPad(e) {
    //   var isTrackPad = false;
    //   if (e.wheelDeltaY) {
    //     if (Math.abs(e.wheelDeltaY) !== 120) {
    //       isTrackPad = true;
    //     }
    //   } else if (e.deltaMode === 0) {
    //     isTrackPad = true;
    //   }
    // }
    // document.addEventListener("mousewheel", detectTrackPad, false);
    // document.addEventListener("DOMMouseScroll", detectTrackPad, false);
  },
  start() {
    this.render();
    this.handleEvent();
  },
};

app.start();
