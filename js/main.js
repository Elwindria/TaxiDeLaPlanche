/* navBar Responsive Apparition */

const menuToggle = document.querySelector('.menu-toggle');
const navResponsive = document.querySelector('#nav_responsive');
const burgerLine1 = document.querySelector('.burgerline1');
const burgerLine2 = document.querySelector('.burgerline2');
const burgerLine3 = document.querySelector('.burgerline3');

document.addEventListener("click", function(e){
    var eTarget = e.target;
    navResponsiveOpenOrNot(eTarget);
});

function navResponsiveOpenOrNot(e){

        //open
    if ( navResponsive.style.transform != 'translateX(0px)' && (e === menuToggle || e === burgerLine1 || e === burgerLine2 || e === burgerLine3 )){
        navResponsive.style.transform = ("translateX(0px)");
        burgerLine1.style.transform = ('translateY(3px) rotate(45deg)');
        burgerLine2.style.display =("none");
        burgerLine3.style.transform = ('translateY(-3px) rotate(-45deg)');

        //close
    } else if (navResponsive.style.transform = 'translateX(0px)' && e != navResponsive) {
        navResponsive.style.transform = ("translateX(100%)");
        burgerLine1.style.transform = ('unset');
        burgerLine2.style.display =("unset");
        burgerLine3.style.transform = ('unset');
    }
}

/* navBar Responsive Apparition */