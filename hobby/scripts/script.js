document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function showSection(targetId) {
        sections.forEach((section) => {
            section.style.display = section.id === targetId ? "block" : "none";
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            showSection(targetId);
        });
    });

    showSection("what"); // Default section
});
