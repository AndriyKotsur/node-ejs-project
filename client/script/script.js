window.onload = function () {
  //////////
  /* INIT */
  let slideIndex = 1;
  const slides = document.querySelectorAll(".slidesItem");
  const sliderContainer = document.querySelector(".sliderContainer");
  const sliderGallery = document.querySelector(".sliderGallery");
  const sliderModal = document.querySelector(".popup-window_slider");
  const sliderModalContainer = document.querySelector(".sliderModalContainer");

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

        if (prevBtnModal) {
          prevBtnModal.addEventListener("click", e => {
            e.preventDefault();
            showSlides((slideIndex -= 1), slidesModal);
          });
        }

        let nextBtnModal = document.querySelector(".nextBtnModal");
        if (nextBtnModal) {
          nextBtnModal.addEventListener("click", e => {
            e.preventDefault();
            showSlides((slideIndex += 1), slidesModal);
          });
        }

        /* CLOSE BTN */
        let closeBtn = document.querySelector('.popupCloseBtnSlider');
        if (closeBtn) {
          closeBtn.addEventListener("click", e => {
            e.preventDefault();
            sliderModal.style.display = 'none';
            sliderModalContainer.innerHTML = "";
          })
        }
        window.onclick = (e) => {
          e.preventDefault();
          if (e.target.className === "popup-window_slider") {
            e.target.style.display = "none";
            sliderModalContainer.innerHTML = "";
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
    e.preventDefault();
    if (e.target.className === "popup-window_modal") {
      e.target.style.display = "none";
    }
  };
};

// /* CHATBOX */
// const chatBtn = document.querySelector(".popup-chat");
// chatBtn.addEventListener("click", function() {
//   const socialBtns = document.querySelector(".popup-chat_links");
//   socialBtns.style.display == "block" ? "none" : "block";
// });