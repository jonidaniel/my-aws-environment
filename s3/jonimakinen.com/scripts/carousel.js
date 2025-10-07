let slideIndex = 1;
showSlides(slideIndex);

/** Handles left and right arrow clicks (beside the map)
 *
 * @param {-1 or 1; signaling left or right arrow click respectively} n
 */
function plusSlides(n) {
  showSlides((slideIndex += n));
}

/** Handles left, middle, and right spot clicks (below the map)
 *
 * @param {1, 2, or 3; signaling left, middle, or right spot click respectively} n
 */
function currentSlide(n) {
  showSlides((slideIndex = n));
}

/** Handles showing and hiding slides (i.e. maps)
 *
 * @param {0, 1, 2, 3, or 4; indicating the slide to be shown} n
 */
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("map");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  // Update maps' sizes and zooms
  map1.invalidateSize();
  map2.invalidateSize();
  map3.invalidateSize();
  map1.setZoom(2);
  map2.setZoom(2);
  map3.setZoom(2);
}
