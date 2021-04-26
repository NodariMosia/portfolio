"use strict";

/*******************
 * Query Selectors *
 ******************/
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const highlight = document.querySelector(".highlight");
const btnToggleTheme = document.querySelector(".nav__switch-theme");
const scrollElements = document.querySelectorAll(
	".nav__logo, .nav__link, .header__scroll, .header__down-arrow-link"
);

/* Other Variables */
const HIGHLIGHT_WORDS = ["right", "simple"];
const HIGHLIGHT_TIMER_TIME = 7000;
const navHeight = nav.getBoundingClientRect().height;

let wordIndex = 0;
let currentWord = "";
let themeIsDark = false;

/******************
 * Initialization *
 *****************/
highlightTimerFunction();
const highlightTimer = setInterval(
	highlightTimerFunction,
	HIGHLIGHT_TIMER_TIME
);

btnToggleTheme.addEventListener("click", toggleTheme);

scrollElements.forEach((el) => {
	el.addEventListener("click", btnScrollHandler);
});

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	rootMargin: `-${navHeight}px`,
	threshold: [],
});
headerObserver.observe(header);

/*************
 * Functions *
 ************/
function highlightTimerFunction() {
	highlight.innerHTML = "";
	currentWord = HIGHLIGHT_WORDS[wordIndex++];

	(currentWord + ".").split("").forEach((letter, i) => {
		const el = document.createElement("span");

		el.textContent = letter;
		el.classList.add("highlight-letter");
		el.style = `animation-delay: ${i / 4}s`;

		highlight.insertAdjacentElement("beforeend", el);
	});

	if (wordIndex >= HIGHLIGHT_WORDS.length) wordIndex = 0;
}

function toggleTheme() {
	themeIsDark = !themeIsDark;
	const theme = themeIsDark ? "dark" : "light";

	btnToggleTheme.src = `./images/theme-icon-${theme}.png`;
	document.querySelector(
		".header__down-arrow"
	).src = `./images/down-arrow-${theme}.png`;

	document
		.querySelectorAll(
			"body, .nav__logo, .nav__link, .projects__project, .skill, .footer"
		)
		.forEach((el) => el.classList.toggle("dark"));
}

function btnScrollHandler(e) {
	e.preventDefault();
	const id = this.getAttribute("href");
	document.querySelector(id).scrollIntoView({ behavior: "smooth" });
}

function stickyNav(entries) {
	const [entry] = entries;
	if (!entry.isIntersecting) nav.classList.add("sticky");
	else nav.classList.remove("sticky");
}
