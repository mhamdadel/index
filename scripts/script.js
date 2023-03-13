document.onscroll = function (e) {
    let contactMe = document.getElementById("contact-me");
    let bodyElements = document.body.children;
    let navbar = document.getElementById("navbar");
    let navList = document.getElementById("nav-list");
    if (
        navbar.offsetTop + navbar.offsetHeight >
        document.documentElement.scrollTop
    ) {
        navbar.style.position = "static";
        navbar.classList.remove("nav-dark-bg");
    } else {
        navbar.style.position = "fixed";
        navbar.style.zIndex = "65000";
        navbar.classList.add("nav-dark-bg");
    }

    [...bodyElements].forEach(function (el, index) {
        const elementTop = el.offsetTop;
        const elementTopHeight = el.offsetTop + el.offsetHeight;
        let whereAreYou = document.documentElement.scrollTop;
        if (whereAreYou >= elementTop && whereAreYou <= elementTopHeight) {
            [...navList.children].forEach(function (ele, ind) {
                ele.classList.remove("active");
            });
            [...navList.children][index - 1]?.classList.add("active");
        }
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});
hiddenE1ements = document.getElementsByClassName("hidden");
[...hiddenE1ements].forEach((el) => {
    observer.observe(el);
});
