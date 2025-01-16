// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)


gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})

const faqAccordion = document.querySelectorAll('.faq-accordion')

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active')

        // Toggle 'rotate' class to rotate the arrow
        let content = this.nextElementSibling

        // content.classList.toggle('!tw-hidden')
        if (content.style.maxHeight === '200px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'

        } else {
            content.style.maxHeight = '200px'
            content.style.padding = '20px 18px'
        }
    })
})



// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
            trigger: sec,
            start: "10% 80%", // top of trigger hits the top of viewport
            end: "20% 90%",
            // markers: true,
            // scrub: 1,
        }
    })

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})

// ------------- cards animations ---------------

const items = gsap.utils.toArray(".card");
const lastCard = items[items.length - 1];

// Calculate the height of the last card
let lastCardHeight = lastCard.clientHeight;

// Calculate the total offset based on the "animation-item" attribute of each card
const totaOffset = parseFloat(lastCard.getAttribute("animation-item")) || 0;

// Add the total offset to the height of the last card
lastCardHeight += totaOffset;

items.forEach((item, index) => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top top+=" + item.getAttribute("animation-item"),
            endTrigger: "#card-animation-end",
            // Dynamically set the end position based on the total height of all cards
            end: `bottom top+=${lastCardHeight}px`,
            pin: true,
            pinSpacing: false,
            scrub: true,
            //   markers: true
        }
    });

    if (item === lastCard) {
        // If it's the last card, only scale it
        tl.to(item, {
            scale: 0.9 + 0.02 * index,
            transformOrigin: "center center"
        });
    } else {
        // For other cards, animate both opacity and scale
        tl.to(item, {
            opacity: 0.4,
            scale: 0.9 + 0.02 * index,
            transformOrigin: "center center"
        });
    }
});

/* Technology logos fade-in */

var controller = new ScrollMagic.Controller();

var revealElements = document.getElementsByClassName("tech-logo");
for (var i=0; i<revealElements.length; i++) { // create a scene for each element
    new ScrollMagic.Scene({
                        triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
                        offset: ((i % 6) + 1) *10,												 // start a little later
                        triggerHook: 0.9,
                    })
                    .setClassToggle(revealElements[i], "visible") // add class toggle
                    // .addIndicators({name: "logo " + (i+1) }) // add indicators (requires plugin)
                    .addTo(controller);
}

/** section wipes  */

var controller2 = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave',
        duration: "350%" // this works just fine with duration 0 as well
        // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
        // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
    }
});

// get all slides
var slides = document.querySelectorAll("section.panel");

// create scene for every slide
for (var i=0; i<slides.length; i++) {
    new ScrollMagic.Scene({
            triggerElement: slides[i]
        })
        .setPin(slides[i], {
            pushFollowers: false, 
            spacerClass: `gradient-panel-pin-spacer-${i+1}`
        })
        .setClassToggle(`#slide-header-${i+1}`, "visible")
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller2);
}

const standardSpeed = 35;

/** typing animations */
var typedHero = new Typed('#hero-typed', {
    stringsElement: '#hero-typed-strings',
    typeSpeed: standardSpeed,
    backSpeed: standardSpeed,
    // showCursor: false,
    loop: true,
    backDelay: 2000
});

/** typing animations */
var typedCardHeader = new Typed('#cards-header-typed', {
    stringsElement: '#cards-header-typed-strings',
    typeSpeed: standardSpeed,
    backSpeed: standardSpeed,
    // showCursor: false,
    loop: true,
    backDelay: 2000
});

/** typing animations */
var typedCardHeader = new Typed('#technologies-header-typed', {
    stringsElement: '#technologies-header-typed-strings',
    typeSpeed: standardSpeed,
    backSpeed: standardSpeed,
    // showCursor: false,
    loop: true,
    backDelay: 2000
});

var typedCardHeader = new Typed('#service-chat-message-bot-typed', {
    stringsElement: '#service-chat-message-bot-typed-strings',
    typeSpeed: standardSpeed,
    backSpeed: standardSpeed,
    showCursor: false,
    loop: true,
    backDelay: 2000
});

var typedCardHeader = new Typed('#service-card-data-typed', {
    stringsElement: '#service-card-data-typed-strings',
    typeSpeed: standardSpeed,
    backSpeed: standardSpeed,
    showCursor: false,
    loop: true,
    backDelay: 5000
});

/** HERO animated grid highlight radial gradient background */
const heroSectionBackground = document.querySelector('.hero-section');

let cursorX = 0; // Track cursor's X position globally
let cursorY = 0; // Track cursor's Y position globally

// Function to update the gradient position based on mousemove
const updateHeroHighlightPosition = (e) => {
  cursorX = e.clientX; // Store the cursor X position relative to the viewport
  cursorY = e.clientY; // Store the cursor Y position relative to the viewport

  const rect = heroSectionBackground.getBoundingClientRect();
  const x = cursorX - rect.left;
  const y = cursorY - rect.top;

  heroSectionBackground.style.setProperty('--x-hero-highlight', `${x}px`);
  heroSectionBackground.style.setProperty('--y-hero-highlight', `${y}px`);
};

// Function to adjust the gradient position on scroll
const adjustHeroHighlightOnScroll = () => {
  const rect = heroSectionBackground.getBoundingClientRect();
  const x = cursorX - rect.left; // Recalculate X based on stored cursor position
  const y = cursorY - rect.top; // Recalculate Y based on stored cursor position

  heroSectionBackground.style.setProperty('--x-hero-highlight', `${x}px`);
  heroSectionBackground.style.setProperty('--y-hero-highlight', `${y}px`);
};

// Mousemove event to update cursor and gradient position
heroSectionBackground.addEventListener('mousemove', updateHeroHighlightPosition);

// Scroll event to adjust gradient position based on stored cursor
window.addEventListener('scroll', adjustHeroHighlightOnScroll);

// Handle mouse leave to reset the highlight
heroSectionBackground.addEventListener('mouseleave', () => {
    heroSectionBackground.style.setProperty('--x-hero-highlight', `50%`);
    heroSectionBackground.style.setProperty('--y-hero-highlight', `-100%`);
});


/** FAQ animated grid highlight radial gradient background */
const faqSectionBackground = document.querySelector('.faq-section');

// Function to update the gradient position based on mousemove
const updateFaqHighlightPosition = (e) => {
  cursorX = e.clientX; // Store the cursor X position relative to the viewport
  cursorY = e.clientY; // Store the cursor Y position relative to the viewport

  const rect = faqSectionBackground.getBoundingClientRect();
  const x = cursorX - rect.left;
  const y = cursorY - rect.top;

  faqSectionBackground.style.setProperty('--x-faq-highlight', `${x}px`);
  faqSectionBackground.style.setProperty('--y-faq-highlight', `${y}px`);
};

// Function to adjust the gradient position on scroll
const adjustFaqHighlightOnScroll = () => {
  const rect = faqSectionBackground.getBoundingClientRect();
  const x = cursorX - rect.left; // Recalculate X based on stored cursor position
  const y = cursorY - rect.top; // Recalculate Y based on stored cursor position

  faqSectionBackground.style.setProperty('--x-faq-highlight', `${x}px`);
  faqSectionBackground.style.setProperty('--y-faq-highlight', `${y}px`);
};

// Mousemove event to update cursor and gradient position
faqSectionBackground.addEventListener('mousemove', updateFaqHighlightPosition);

// Scroll event to adjust gradient position based on stored cursor
window.addEventListener('scroll', adjustFaqHighlightOnScroll);

// Handle mouse leave to reset the highlight
faqSectionBackground.addEventListener('mouseleave', () => {
  faqSectionBackground.style.setProperty('--x-faq-highlight', `50%`);
  faqSectionBackground.style.setProperty('--y-faq-highlight', `-100%`);
});
