function loadContent(url) {
  var iFrame = document.getElementById('content');
  $(iFrame).attr('src', url);
  $([document.documentElement, document.body]).animate({
    scrollTop: $('Footer').offset().top
  }, 500);
}