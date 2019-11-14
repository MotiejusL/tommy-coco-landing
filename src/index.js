import './style.scss';

var nav = document.querySelector("nav");
var header = document.querySelector("header");
var navMenuLinksUl = document.getElementsByClassName("menu-links")[0];
var clonedNavMenuLinksUl = navMenuLinksUl.cloneNode(true);
var menuIcon = document.getElementsByClassName("menu-icon")[0];
var popup = clonedNavMenuLinksUl.getElementsByClassName("pop-up")[0];
var newsForm = document.getElementsByClassName("news-form")[0];
var newsButton = document.getElementById("news-button");
var items = document.getElementsByClassName("items");

Array.from(items).forEach(function(element) {
  var itemContainer = element.getElementsByClassName("items-container")[0];
  var itemContainerClone = itemContainer.cloneNode(true);
  itemContainerClone.classList.replace("items-container", "items-container-mobile");
  clearNodesExceptFromBeginning(itemContainerClone, 1);
  element.appendChild(itemContainerClone);
  itemContainerClone.style.display = "none";
})

styleNavMenuLinks();

var tabletView = window.matchMedia("(max-width: 800px)");
revealMenuTablet(tabletView);
tabletView.addListener(revealMenuTablet);

var mobileView = window.matchMedia("(max-width: 500px)");
changeMobileLayout(mobileView);
mobileView.addListener(changeMobileLayout);

function changeMobileLayout(mobileView) {
  if (mobileView.matches) {
    newsForm.removeChild(newsButton);
    newsForm.appendChild(newsButton);
    leaveOneItemInItemsContainer();
    header.style.height = "90px";
  } else {
    newsForm.insertBefore(newsButton, newsForm.firstChild);
    getThreeItemsInItemsContainer();
    header.style.height = "120px";
  }
}

function leaveOneItemInItemsContainer() {
  Array.from(items).forEach(function(element) {
    var itemContainer = element.getElementsByClassName("items-container")[0];
    var itemContainerMobile = element.getElementsByClassName("items-container-mobile")[0];
    itemContainer.style.display = "none";
    itemContainerMobile.style.display = "block";
  })
}

function getThreeItemsInItemsContainer() {
  Array.from(items).forEach(function(element) {
    var itemContainer = element.getElementsByClassName("items-container")[0];
    var itemContainerMobile = element.getElementsByClassName("items-container-mobile")[0];
    itemContainer.style.display = "block";
    itemContainerMobile.style.display = "none";
  })
}

function clearNodesExceptFromBeginning(parentNode, childsToLeave) {
  while (parentNode.children.length > childsToLeave) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function revealMenuTablet(tabletView) {
  if (tabletView.matches) {
    navMenuLinksUl.style.display = "none";
    menuIcon.style.display = "inline-block";
    menuIcon.addEventListener("click", showMenuLinks);
  } else {
    navMenuLinksUl.style.display = "block";
    menuIcon.style.display = "none";
  }
}

function styleNavMenuLinks() {
  clonedNavMenuLinksUl.style.display = "block";
  clonedNavMenuLinksUl.style.lineHeight = "30px";
  clonedNavMenuLinksUl.style.width = "100%";
  clonedNavMenuLinksUl.style.position = "relative";
  clonedNavMenuLinksUl.style.bottom = "20px";

  popup.style.position = "static";
  popup.style.boxShadow = "none";
  popup.style.padding = "15px 0 5px 5px";
}

function showMenuLinks() {
  clonedNavMenuLinksUl.style.display = "block";

  header.style.height = "visible";
  header.style.overflow = "hidden";

  header.appendChild(clonedNavMenuLinksUl);

  menuIcon.removeEventListener("click", showMenuLinks);
  menuIcon.addEventListener("click", hideMenuLinks);
}

function hideMenuLinks() {
  clonedNavMenuLinksUl.style.display = "none";

  if (mobileView.matches) {
    header.style.height = "90px";
  } else if (tabletView.matches) {
    header.style.height = "120px";
  }

  header.style.overflow = "auto";

  menuIcon.removeEventListener("click", hideMenuLinks);
  menuIcon.addEventListener("click", showMenuLinks);
}
