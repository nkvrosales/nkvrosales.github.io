/*===== DARK MODE TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const applyTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    } else {
        htmlElement.removeAttribute('data-theme');
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    }
};

// Initialize theme on page load
applyTheme(getPreferredTheme());

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

/*===== MENU SHOW =====*/
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navIcon = navToggle.querySelector('i');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        
        // Toggle icon between menu and X
        if (navMenu.classList.contains('show')) {
            navIcon.classList.remove('bx-menu');
            navIcon.classList.add('bx-x');
        } else {
            navIcon.classList.remove('bx-x');
            navIcon.classList.add('bx-menu');
        }
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link')

function linkAction() {
    navMenu.classList.remove('show')
    navIcon.classList.remove('bx-x');
    navIcon.classList.add('bx-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction))

/*==================== CLOSE MENU ON OUTSIDE CLICK ====================*/
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('show')) {
            linkAction();
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .work__img1, .contact__input', { interval: 200 });

/*===== PROJECT MODAL LOGIC =====*/
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalGithub = document.getElementById("modalGithub");
const modalWebsite = document.getElementById("modalWebsite"); // New variable
const closeBtn = document.querySelector(".modal__close");

function openModal(imgSrc, title, githubUrl, webUrl) {
    modal.style.display = "flex";
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalGithub.href = githubUrl;

    // Logic for the Website Button
    if (webUrl && webUrl !== "") {
        modalWebsite.href = webUrl;
        modalWebsite.style.display = "inline-block";
    } else {
        modalWebsite.style.display = "none"; // Hide if no website exists
    }

    document.body.style.overflow = "hidden";
}

// Close logic remains the same
closeBtn.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}