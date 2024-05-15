/*document.addEventListener('DOMContentLoaded', function () {
    const detailsBtns = document.querySelectorAll('.details-btn');
    const lessDetailsBtns = document.querySelectorAll('.less-details-btn');

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            const additionalContent = this.nextElementSibling;
            additionalContent.style.display = 'block';
        });
    });

    lessDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            const additionalContent = this.parentNode;
            additionalContent.style.display = 'none';
        });
    });
});

*/
const initSlider = () => {
    const imageList = document.querySelector(".sliderWrap .imgList");
    const slideButtons = document.querySelectorAll(".sliderWrap .slide-button");
    const sliderScrollbar = document.querySelector(".containerr .sliderScrol");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrolThumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

//sticky header
window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
    var navLinks = document.querySelectorAll("header ul li a");
    navLinks.forEach(function(link) {
    link.classList.toggle("sticky", window.scrollY > 0);
    });
});

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);