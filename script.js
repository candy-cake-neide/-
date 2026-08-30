(function(){
  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav-links');

  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  var onScroll = function(){
    if(window.scrollY > 10) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if(!reduceMotion && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
    // Safety net: guarantee visibility even if an observer edge case never fires
    setTimeout(function(){
      revealEls.forEach(function(el){ el.classList.add('is-visible'); });
    }, 2200);
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
})();
