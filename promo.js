// Промо-ролик на главной (index*.html). Ролик без звука и грузится только при показе.
// «Уменьшить движение» или экономия трафика — без автозапуска: обложка и кнопка Play.
(function () {
  var video = document.querySelector('.promo video');
  if (!video) return;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator.connection && navigator.connection.saveData);
  if (calm || !('IntersectionObserver' in window)) {
    video.controls = true;
    return;
  }
  // Играет, пока виден на экране, и встаёт на паузу, когда его прокрутили
  new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) video.play().catch(function () { video.controls = true; });
      else video.pause();
    });
  }, { threshold: 0.25 }).observe(video);
})();
