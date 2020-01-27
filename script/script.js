window.onload = function () {
    let slideIndex = 1;
    let slides = document.querySelectorAll(".slides-item");
    function showSlides(n) {
        
        if(slides.length==0){
            return false;
        } else if (n > slides.length) {
            slideIndex = 1;
        } else if (n < 1) {
            slideIndex = slides.length;
        }
        console.log(slides);
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        console.log(slides)
        slides[slideIndex - 1].style.display = "block"
    };
    showSlides(slideIndex);

    /* PREV BTN */
    let prev = document.querySelector('.prev');
    if(prev){
        prev.addEventListener('click', function () {
            showSlides(slideIndex -= 1);
        });
    };
    /* NEXT BTN */
    let next = document.querySelector('.next');
    next.addEventListener('click', function () {
        showSlides(slideIndex += 1);
    });
    /* SLIDESHOW */
    let slideshow = document.querySelector('.slideshow-row');
    slideshow.addEventListener('click', function () {
        let slider = event.target.closest('img');
        let arrSlides = [];
        arrSlides[slider.id - 1] = slider;
        let idx = arrSlides.indexOf(slider);
        showSlides(slideIndex = ++idx);

    });

    /* LIGHTBOX */
    let largeImage = document.querySelector('.slideshow-items');
    let modalSlider = document.querySelector('.popup-window_slider');
    largeImage.addEventListener('click', function () {

        let image = event.target.closest('img');
        let modalImage = document.querySelector('.popup-image');
        if (!image) return;
        modalSlider.style.display = 'block';
        modalImage.src = image.src;
    });

    let modalBtns = [...document.querySelectorAll('.popup-btn')];
    modalBtns.forEach(function (btn) {
        btn.onclick = function () {
            let popup = btn.getAttribute('data-popup');
            document.getElementById(popup).style.display = "block";
        };
    });
    let closeBtns = [...document.querySelectorAll('.popup-close')];
    closeBtns.forEach(function (btn) {
        btn.onclick = function () {
            let popup = btn.closest('.popup-window_modal, .popup-window_slider');
            popup.style.display = "none";
        };
    });
    window.onclick = function (e) {
        if (e.target.className === "popup-window_modal" || e.target.className === 'popup-window_slider') {
            e.target.style.display = 'none';
        };
    };
}