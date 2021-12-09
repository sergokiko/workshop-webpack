import '../scss/main.scss'
import gsap from 'gsap';

const slider = document.querySelector('.slider-wrapper');
const slides = [...slider.querySelectorAll(`.slider-item`)];

const getNextPrev = () => {
    const activeSlide = document.querySelector(`.slider-item.active`);
    const slides = [...slider.querySelectorAll(`.slider-item`)];
    const activeIdx = slides.indexOf(activeSlide);

    let next, prev, prevBeforePrev, nextAfterNext;

    if (activeIdx === slides.length - 1) {
        next = slides[0];
    } else {
        next = slides[activeIdx + 1];
    }

    if (activeIdx === 0) {
        prev = slides[slides.length - 1];
    } else {
        prev = slides[activeIdx - 1];
    }

    if(activeIdx === 1){
        prevBeforePrev = slides[slides.length - 1];
    } else {
        if(activeIdx === 0){
            prevBeforePrev = slides[slides.length - 2];
        } else {
            prevBeforePrev = slides[activeIdx - 2];
        }
    }

    if(activeIdx === slides.length - 2){
        nextAfterNext = slides[0];
    } else {
        if(activeIdx === slides.length - 1){
            nextAfterNext = slides[1];
        } else {
            nextAfterNext = slides[activeIdx + 2];
        }
    }
    return {activeSlide, prev, next, prevBeforePrev, nextAfterNext};
};

const setInitialSliderItemsPositions = (time) => {
    setTimeout(() => {

        const { activeSlide, prev, next } = getNextPrev();

        slides.forEach((s, i) => {
            if (s === activeSlide) {
                gsap.set(s, { xPercent: 0 });
                gsap.set(s.children[0], { left: '50%', xPercent: -50 });
            } else if (s === prev){
                gsap.set(s, { xPercent: -100 });
            } else if (s === next) {
                gsap.set(s, { xPercent: 95 });
            } else {
                gsap.set(s, { xPercent: 110 });
            }
        });
    }, time);
};

const goToNextSlide = () => {
    const {activeSlide, next, nextAfterNext} = getNextPrev();

    slides.forEach((s, i) => {
        if (s === activeSlide) {
            gsap.to(s, { xPercent: -100 });
        } else if (s === next) {
            gsap.to(s,{xPercent: 0});
            gsap.to(s.children[0], { left: '50%', xPercent: -50 });
        } else if (s === nextAfterNext) {
            gsap.to(s.children[0], { left: 'unset', xPercent: 0 , duration: 0});
            gsap.to(s,  { xPercent: 95 });
        } else  {
            gsap.set(s, { xPercent: 110 });
        }
    });
    activeSlide.classList.remove('active');
    next.classList.add('active');
}

const goToPrevSlide = () => {
    const {activeSlide, prev, next} = getNextPrev();

    slides.forEach((s, i) => {
        if (s === activeSlide) {
            gsap.to(s.children[0], { left: '0', xPercent: 0 });
            gsap.to(s,  { xPercent: 95 });
        } else if (s === next) {
            gsap.to(s,{xPercent: 110});
        } else if (s === prev) {
            gsap.to(s.children[0], { left: '50%', xPercent: -50 });
            gsap.fromTo(s,  { xPercent: -100 }, {xPercent: 0});
        } else  {
            gsap.set(s, { xPercent: 110 });
        }
    });
    activeSlide.classList.remove('active');
    prev.classList.add('active');
}

setInitialSliderItemsPositions(200);

document.querySelector('.slider-next').addEventListener('click', () => {
    goToNextSlide();
});

document.querySelector('.slider-prev').addEventListener('click', () => {
    goToPrevSlide();
});


