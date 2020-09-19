//-----------------------------
// Mobile navigation definition
//-----------------------------
function openNav() {
    const navEl = document.querySelector('.main-navigation');
    const btnEl = document.querySelector('.menu-btn');
    const navActiveClass = 'main-navigation--active';
    const menuHref = 'svg-menu';
    const closeHref = 'svg-close';

    // Change trigger icon by setting <use> href attr
    function setHrefToBtn(val) {
        btnEl.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + val);
    }

    // Toggle navigation items
    btnEl.addEventListener('click', function () {
        if (navEl.classList.contains(navActiveClass)) {
            navEl.classList.remove(navActiveClass);
            setHrefToBtn(menuHref);
        } else {
            navEl.classList.add(navActiveClass);
            setHrefToBtn(closeHref);
        }
    });
}

//-----------------------
// Init mobile navigation
//-----------------------
window.addEventListener("DOMContentLoaded", function () {
    openNav();
});


//---------------------
// Carousel constructor
//---------------------
function Carousel(carouselEl) {

    this.carouselWrapper = carouselEl.querySelector('.carousel__wrapper');
    this.carouselWrapperWidth = this.carouselWrapper.offsetWidth;
    this.carouselItems = carouselEl.querySelectorAll('.carousel__item');
    this.carouselItemWidths = [];
    this.carouselItemWidthsTogether = 0;
    this.currentItemNumber = 1;
    this.currentCarouselPosition = 0;

    // Get widths of items
    this.carouselItems.forEach(function (el) {
        let offsetWidth = el.offsetWidth;
        this.carouselItemWidths.push(offsetWidth);
        this.carouselItemWidthsTogether += offsetWidth;
    }.bind(this));

    // Move carousel by width of previous image
    this.setPosition = function () {
        let newCarouselPosition = this.currentCarouselPosition - this.carouselItemWidths[this.currentItemNumber - 1];

        // Check if last icon is shown
        if (newCarouselPosition * -1 < this.carouselItemWidthsTogether - (this.carouselWrapperWidth - this.carouselItemWidths[this.currentItemNumber - 1])) {
            // Set scroll values
            this.currentCarouselPosition = newCarouselPosition;
            this.currentItemNumber += 1;
        } else {
            // Reset scroll values
            this.currentCarouselPosition = 0;
            this.currentItemNumber = 1;
        }
        // Apply scroll values
        this.carouselWrapper.style.left = this.currentCarouselPosition + 'px';
    }

    // Call setPosition() every xy time
    this.carouselLoop = function () {
        setTimeout(function () {
            this.setPosition();
            this.carouselLoop();
        }.bind(this), 2000)
    }

    // Reset scroll positions
    this.reset = function () {
        this.currentItemNumber = 1;
        this.currentCarouselPosition = 0;
        this.carouselWrapperWidth = this.carouselWrapper.offsetWidth;
        this.carouselWrapper.style.left = this.currentCarouselPosition + 'px';
    }

    // Call reset on resize
    this.carouselLoop();
    window.addEventListener('resize', function () {
        this.reset();
    }.bind(this));
}

//----------------------------
// Init all possible Carousels
//----------------------------
window.addEventListener("load", function () {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(function (carousel) {
        return new Carousel(carousel);
    });
});

//-----------------
// Banner animation
//-----------------

function hideBannerImage() {
    const bannerImage = document.querySelector('.banner__image');
    bannerImage.style.opacity = 0;
    bannerImage.style.right = '-300px';
    setTimeout(function () {
        bannerImage.classList.add('js-animation');
    },0)
}
function hideBannerText() {
    const bannerText = document.querySelector('.banner__heading');
    bannerText.style.opacity = 0;
    setTimeout(function () {
        bannerText.classList.add('js-animation');
    },0)
}

function hideBannerButton() {
    const bannerButton = document.querySelector('.banner > .btn');
    bannerButton.style.opacity = 0;
    setTimeout(function () {
        bannerButton.classList.add('js-animation');
    },0)
}

function animateBannerImage() {
    const bannerImage = document.querySelector('.banner__image');
    bannerImage.style.opacity = 1;
    bannerImage.style.right = '0';
}
function animateBannerText() {
    const bannerImage = document.querySelector('.banner__heading');
    bannerImage.style.opacity = 1;
}
function animateBannerButton() {
    const bannerButton = document.querySelector('.banner > .btn');
    bannerButton.style.opacity = 1;
}

function runAnimationClear(done) {
    document.addEventListener("DOMContentLoaded", function () {
        hideBannerImage();
        hideBannerText();
        hideBannerButton();
    });
    return done();
};

runAnimationClear( runAnimations );

function runAnimations() {
    window.addEventListener("load", function () {
        animateBannerText();
        setTimeout(function () {
            animateBannerButton();
        },100);
        setTimeout(function () {
            animateBannerImage();

        },200)
    });
}

//---------------------
// Load svg sprite file
//---------------------
(function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                document.querySelector(".svg-sprite-icons").innerHTML = xmlhttp.responseText;
            }
        }
    };
    xmlhttp.open("GET", "../img/svg-sprite-icons.svg", true);
    xmlhttp.send();
}());






