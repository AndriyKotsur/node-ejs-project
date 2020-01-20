let slideIndex = 1;

function showSlides(n) {
    let slides = document.querySelectorAll(".slides-item");

    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = slides.length;
    };
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
};

showSlides(slideIndex);
/* PREV BTN */
let prev = document.querySelector('.prev');
prev.addEventListener('click', function () {
    showSlides(slideIndex -= 1);
    console.log('-')
});
/* NEXT BTN */
let next = document.querySelector('.next');
next.addEventListener('click', function () {
    showSlides(slideIndex += 1);
    console.log('+')
});
/* SLIDESHOW */
let slideshow = document.querySelector('.slideshow-row');
slideshow.addEventListener('click', function () {
    let slider = event.target.closest('img');
    let arrSlides = [];
    arrSlides[slider.id-1] = slider;
    let idx = arrSlides.indexOf(slider);
    showSlides(slideIndex = ++idx);
    console.log('click');
    
});
/* LIGHTBOX */
let slideshowImg = document.querySelector('.slideshow-items');
let modalWindow = document.querySelector('.modal-product');
let modalClose = document.querySelector('.modal-close');

slideshowImg.addEventListener('click', function(){
    let image = event.target.closest('img');
    if(!image) return;
    let modalImage = document.querySelector('.modal-image');
    modalWindow.style.display = 'block';
    modalImage.src = image.src;
});

modalClose.addEventListener('click', function(){
    if(!modalClose) return;
    modalWindow.style.display = 'none';
});
window.addEventListener('click', function(e){
    if(e.target===modalWindow){
        modalWindow.style.display = 'none';
    };
});