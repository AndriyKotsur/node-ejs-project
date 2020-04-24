window.onload = function () {
  //////////
  /* INIT */
  let slideIndex = 1;
  const slides = document.querySelectorAll(".slidesItem");
  const sliderContainer = document.querySelector(".sliderContainer");
  const sliderGallery = document.querySelector(".sliderGallery");
  const sliderModalContainer = document.querySelector(".sliderModalContainer");
  ////////////
  /* SLIDER */
  const showSlides = (index, items) => {
    if (items.length == 0) {
      return false;
    } else if (index > slides.length) {
      slideIndex = 1;
    } else if (index < 1) {
      slideIndex = items.length;
    }
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = "none";
    }

    items[slideIndex - 1].style.display = "block";
  };
  showSlides(slideIndex, slides);

  /* PREV BTN SLIDER */

  let prevBtn = document.querySelector(".prevBtn");
  if (prevBtn) {
    prevBtn.addEventListener("click", e => {
      e.preventDefault();
      showSlides((slideIndex -= 1), slides);
    });
  }

  /* NEXT BTN SLIDER */

  let nextBtn = document.querySelector(".nextBtn");
  if (nextBtn) {
    nextBtn.addEventListener("click", e => {
      e.preventDefault();
      showSlides((slideIndex += 1), slides);
    });
  }


  /* SLIDESHOW */

  if (sliderGallery) {
    sliderGallery.addEventListener("click", e => {
      e.preventDefault();
      let slidesGallery = event.target.closest("img");
      let temp = [];
      temp[slidesGallery.id - 1] = slidesGallery;
      let index = temp.indexOf(slidesGallery);
      showSlides((slideIndex = ++index), slides);
    });
  }
  //////////////////
  /* MODAL SLIDER */

  let titleImage = [...slides];

  titleImage.forEach(btn => {
    btn.onclick = () => {

      if (btn) {
        const sliderModal = document.querySelector(".popup-window_slider");
        sliderModal.style.display = "block";
        let slidesChild = sliderContainer.children;

        for (let i = 0; i < slidesChild.length - 2; i++) {
          let temp = slidesChild[i].cloneNode(true);
          temp.classList.add("active");
          sliderModalContainer.append(temp);
        }
        let slidesModal = document.querySelectorAll(".slidesItem.active");
        showSlides(slideIndex, slidesModal);

        /* CONTROL BTNS MODAL */

        let prevBtnModal = document.querySelector(".prevBtnModal");

        const prevBtnModalFunc = () => {
          showSlides((slideIndex -= 1), slidesModal);

        }
        if (prevBtnModal) {
          prevBtnModal.addEventListener("click", prevBtnModalFunc);
        }

        let nextBtnModal = document.querySelector(".nextBtnModal");

        const nextBtnModalFunc = () => {
          showSlides(slideIndex += 1, slidesModal);
        }
        if (nextBtnModal) {
          nextBtnModal.addEventListener("click", nextBtnModalFunc);
        }

        /* CLOSE BTN */
        let closeBtn = document.querySelector('.popupCloseBtnSlider');
        if (closeBtn) {
          closeBtn.addEventListener("click", e => {
            e.preventDefault();
            sliderModal.style.display = "none";
            sliderModalContainer.innerHTML = "";

            prevBtnModal.removeEventListener("click", prevBtnModalFunc);
            nextBtnModal.removeEventListener("click", nextBtnModalFunc);
          })
        }
        window.onclick = (e) => {
          e.preventDefault();
          if (e.target.className === "popup-window_slider") {
            e.target.style.display = "none";
            sliderModalContainer.innerHTML = "";

            prevBtnModal.removeEventListener("click", prevBtnModalFunc);
            nextBtnModal.removeEventListener("click", nextBtnModalFunc);
          }
        };
      }
    };
  });

  ////////////////////
  /* MODALS WINDOWS */

  let modalBtns = [...document.querySelectorAll(".popupBtn")];
  modalBtns.forEach(function (btn) {
    btn.onclick = () => {
      let popup = btn.getAttribute("data-popup");
      document.getElementById(popup).style.display = "block";
    };
  });

  let closeBtns = [...document.querySelectorAll(".popupCloseBtn")];
  closeBtns.forEach(function (btn) {
    btn.onclick = () => {
      let popup = btn.closest(".popup-window_modal");
      popup.style.display = "none";
    };
  });

  window.onclick = (e) => {

    if (e.target.className === "popup-window_modal") {
      e.target.style.display = "none";
    }
  };

  ///////////////////////////
  /* MAIN PAGE MODAL IMAGE */

  const catalogueImg = document.querySelectorAll(".catalogueTopImg, .catalogueBottomImg");

  catalogueImg.forEach(function (el) {
    el.onmouseover = () => {
      let content = el.getAttribute('data-cover');
      document.getElementById(content).classList.add('active');
    };
    el.onmouseout = () => {
      let content = el.getAttribute('data-cover');
      document.getElementById(content).classList.remove('active');
    }

  })
};

///////////////////////
/* RESPONSIVE FUNC */
window.onresize = function () {
  adaptiveFunc();
}
const adaptiveHeader = (width, height) => {

  const headerMenu = document.querySelector(".headerBurgerMenu");
  const headerLang = document.querySelector(".menuTop");
  const headerMenuLeft = document.querySelector(".menuLeft");
  const headerMenuRight = document.querySelector(".menuRight")

  if (width <= 768) {
    if (!headerMenuLeft.classList.contains('active') && !headerMenuRight.classList.contains('active')) {
      headerMenuLeft.classList.add('active');
      headerMenuRight.classList.add('active');
      headerMenu.append(headerMenuLeft);
      headerMenu.append(headerMenuRight);
    }
  } else {
    headerMenuLeft.classList.remove('active');
    headerMenuRight.classList.remove('active');
    document.querySelector('.leftColumn').append(headerMenuLeft);
    document.querySelector('.rightColumn').append(headerMenuRight);
  };

  if (width <= 768) {
    if (!headerLang.classList.contains('active')) {
      headerLang.classList.add('active');
      headerMenu.append(headerLang);

    }
  } else {
    headerLang.classList.remove('active');
    document.querySelector('.header-inner').prepend(headerLang);
  };
};

const adaptiveFilter = (width, height) => {

  const filterContainer = document.querySelector('.filterContainer');
  const filterMenu = document.querySelector('.filterMenu');
  const filterItem = document.querySelectorAll('.catalogue-filter-item');
  const dropdownBtn = document.querySelector('.dropdownBtn');
  const dropdownItem = document.querySelector('.dropdownItem');

  if (width <= 768) {
    if (!filterMenu.classList.contains('active')) {

      filterMenu.classList.add('active');
      dropdownBtn.classList.add('active');

      filterItem.forEach(function (item) {
        item.classList.add('active');
      });

      dropdownItem.append(filterMenu);
    }
  } else {
    filterMenu.classList.remove('active');
    filterContainer.prepend(filterMenu);
  }
};

const adaptiveFunc = async () => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  await adaptiveHeader(w, h);
  await adaptiveFilter(w, h);
}

///////////////////
/* BURGER BUTTON */

const headerBurger = document.querySelector('.headerBurger');
const headerMenu = document.querySelector('.headerBurgerMenu');

headerBurger.addEventListener('click', () => {
  headerBurger.classList.toggle('active');
  headerMenu.classList.toggle('active');
  document.querySelector('body').classList.toggle('active');
});

///////////////////////
/* FILTER RESPONSIVE */
const dropdownBtn = document.querySelector('.dropdownBtn');
dropdownBtn.addEventListener('click', function() {
  const filterMenu = document.querySelector('.filterMenu');
  filterMenu.style.display = filterMenu.style.display == 'block' ? 'none':'block';
})