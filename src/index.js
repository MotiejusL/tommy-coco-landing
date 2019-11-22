import './style.scss';

window.addEventListener("load", function() {
  document.querySelector("body").classList.add("loaded");
  document.querySelector("body").style.display = "block";
})

var nav = document.querySelector("nav");
var header = document.querySelector("header");
var navMenuLinksUl = document.getElementsByClassName("menu-links")[0];
var clonedNavMenuLinksUl = navMenuLinksUl.cloneNode(true);
var menuIcon = document.getElementsByClassName("menu-icon")[0];
var popup = clonedNavMenuLinksUl.getElementsByClassName("pop-up")[0];
var newsForm = document.getElementsByClassName("news-form")[0];
var newsButton = document.getElementById("news-button");
var sliders = document.getElementsByClassName("slider");

Array.from(sliders).forEach(function(element, index) {
  var items = document.getElementsByClassName("items")[index];
  var itemsContainer = element.getElementsByClassName("items-container")[0];
  var buttonToLeft = element.querySelector(".slider-arrow.left");
  var buttonToRight = element.querySelector(".slider-arrow.right");
  addSliderEffect(items, itemsContainer, buttonToLeft, buttonToRight);
})

styleNavMenuLinks();

var tabletView = window.matchMedia("(max-width: 800px)");
revealMenuTablet(tabletView);
tabletView.addListener(revealMenuTablet);

var mobileView = window.matchMedia("(max-width: 500px)");
changeMobileLayout(mobileView);
mobileView.addListener(changeMobileLayout);


function addSliderEffect(container, itemsContainer, left, right) {
  left.addEventListener("click", function() {
    slide(container, "left", itemsContainer, left);
  })
  right.addEventListener("click", function() {
    slide(container, "right", itemsContainer, right);
  })
}

function slide(container, direction, itemsContainer, button) {
  var slideWrapper = container.getElementsByClassName("slide-items-wrapper")[0];
  var sliderItemsFilter = container.getElementsByClassName("slider-items-filter")[0];
  if (slideWrapper.children.length > 1)
    slideWrapper.removeChild(slideWrapper.lastChild);
  var itemsCloned = itemsContainer.cloneNode(true);

  slideWrapper.style.overflow = "hidden";
  button.style.pointerEvents = "none";
  sliderItemsFilter.style.boxShadow = "inset 175px 0 30px -110px #ffffff, inset -175px 0 30px -110px #ffffff";
  sliderItemsFilter.style.pointerEvents = "auto";

  setAsideItemsCloneForSlider(itemsCloned, direction);

  slideWrapper.appendChild(itemsCloned).focus();

  itemsCloned.style.transition = "transform 0.6s ease-in-out";
  itemsContainer.style.transition = "transform 0.6s ease-in-out";


  swapItemsInClonedContainerIfMobile(itemsContainer, itemsCloned, direction);

  setSlidersContainersTransformByDirection(itemsCloned, itemsContainer, direction);

  setTimeout(function() {
    var itemNodeList = itemsCloned.getElementsByClassName("item");
    clearNodesExceptFromBeginning(itemsContainer, 0);

    changeItemsMainContNotMobile(itemNodeList, direction, itemsContainer);

    slideWrapper.removeChild(itemsCloned);
    itemsContainer.style.transition = "none";
    itemsContainer.style.transform = "translateX(0)";

    button.style.pointerEvents = "auto";

    slideWrapper.style.overflow = "visible";
    sliderItemsFilter.style.boxShadow = "none";
    sliderItemsFilter.style.pointerEvents = "none";
  }, 600)
}

function changeItemsMainContNotMobile(itemNodeList, direction, itemsContainer) {
  Array.from(itemNodeList).forEach(function(element, index) {
    if (mobileView.matches)
      var copyItem = element.cloneNode(true);
    else {
      if (direction === "left")
        var copyItem = itemNodeList[mod((index + 1),itemNodeList.length)].cloneNode(true);
      else if (direction === "right")
        var copyItem = itemNodeList[mod((index - 1),itemNodeList.length)].cloneNode(true);
    }
    itemsContainer.appendChild(copyItem);
  })
}

function setSlidersContainersTransformByDirection(itemsCloned, itemsContainer, direction) {
  if (direction === "right") {
    if (mobileView.matches) {
      itemsCloned.style.transform = "translateX(0%)";
      itemsContainer.style.transform = "translateX(100%)";
    } else {
      itemsCloned.style.transform = "translateX(-" + (100 / itemsContainer.children.length * (itemsContainer.children.length - 1)) + "%)";
      itemsContainer.style.transform = "translateX(" + (100 / itemsContainer.children.length) + "%)";
    }
  }
  else if (direction === "left") {
    if (mobileView.matches) {
      itemsCloned.style.transform = "translateX(0%)";
      itemsContainer.style.transform = "translateX(-100%)";
    } else {
      itemsCloned.style.transform = "translateX(" + (100 / itemsContainer.children.length * (itemsContainer.children.length - 1)) + "%)";
      itemsContainer.style.transform = "translateX(-" + (100 / itemsContainer.children.length) + "%)";
    }
  }
}

function setAsideItemsCloneForSlider(itemsCloned, direction) {
  itemsCloned.style.position = "absolute";
  itemsCloned.style.left = "0";
  itemsCloned.style.right = "0";
  itemsCloned.style.top = "0";
  itemsCloned.style.bottom = "0";

  if (direction === "right")
    itemsCloned.style.transform = "translateX(-100%)";
  else if (direction === "left")
    itemsCloned.style.transform = "translateX(100%)";
}

function swapItemsInClonedContainerIfMobile(itemsContainer, itemsCloned, direction) {
  if (mobileView.matches) {
    var itemNodeList = itemsContainer.getElementsByClassName("item");
    clearNodesExceptFromBeginning(itemsCloned, 0);

    Array.from(itemNodeList).forEach(function(element, index) {
      if (direction === "left")
        var copyItem = itemNodeList[mod((index - 1),itemNodeList.length)].cloneNode(true);
      else if (direction === "right")
        var copyItem = itemNodeList[mod((index + 1),itemNodeList.length)].cloneNode(true);
      itemsCloned.appendChild(copyItem);
    })
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function changeMobileLayout(mobileView) {
  if (mobileView.matches) {
    newsForm.removeChild(newsButton);
    newsForm.appendChild(newsButton);
    header.style.height = "90px";
  } else {
    newsForm.insertBefore(newsButton, newsForm.firstChild);
    header.style.height = "120px";
  }
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

  header.style.height = "auto";
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

  header.style.overflow = "visible";

  menuIcon.removeEventListener("click", hideMenuLinks);
  menuIcon.addEventListener("click", showMenuLinks);
}
