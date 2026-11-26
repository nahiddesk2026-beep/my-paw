/* ==========================================================================
   THAT'S MY PAW — MAIN JAVASCRIPT
   Handles: Mobile Menu, Dropdowns, Product Rendering, Live Search,
            Category Filters, Subscribe Form, Contact Form, 3-Dot Footer Panel.
   ========================================================================== */

/* ===== SOCIAL MEDIA LINKS (ADD YOUR LINKS BELOW) =====
   Paste your full page URL inside the quotes "" for any platform you use.
   Leave "" empty to hide that icon. Delete a line to remove it completely.
   All 6 icons are hidden until at least one link is filled in. */
var SOCIAL_LINKS = [
  { name: "Facebook",  url: "" },
  { name: "Instagram", url: "" },
  { name: "Pinterest", url: "" },
  { name: "YouTube",   url: "" },
  { name: "TikTok",    url: "" },
  { name: "X",         url: "" }
];
/* ===== END SOCIAL MEDIA LINKS ===== */

document.addEventListener("DOMContentLoaded", function () {
  loadProductsThenInit(function () {
    initNavigation();
    highlightActiveNav();
    renderProductsOnPage();
    initSearchForm();
    initSubscribeForm();
    initContactForm();
    initThreeDotPanel();
    initFaqAccordion();
    initGuideReader();
    initProductDetailsToggle();
    initMediaSliders();
    initImageLightbox();
    initVideoPlayingState();
    initMediaAutoSlide();
    initProductShare();
    initSocialLinks();
  });
});

/* --------------------------------------------------------------------------
   1. MOBILE HAMBURGER MENU & DROPDOWN MENUS
   -------------------------------------------------------------------------- */
function initNavigation() {
  var menuToggle = document.getElementById("menu-toggle");
  var mainNav = document.getElementById("main-nav");
  var dropdownTriggers = document.querySelectorAll(".dropdown-trigger");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* Toggle Dogs & Cats dropdown sub-menus on tap/click */
  dropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var parentItem = trigger.closest(".nav-item-dropdown");
      var wasExpanded = parentItem.classList.contains("is-expanded");

      /* Close other open dropdowns first */
      document.querySelectorAll(".nav-item-dropdown.is-expanded").forEach(function (item) {
        item.classList.remove("is-expanded");
        var btn = item.querySelector(".dropdown-trigger");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (!wasExpanded) {
        parentItem.classList.add("is-expanded");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Close mobile menu & dropdowns when a navigation link is tapped */
  if (mainNav) {
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        document.querySelectorAll(".nav-item-dropdown.is-expanded").forEach(function (item) {
          item.classList.remove("is-expanded");
        });
      });
    });
  }

  /* Close menu & dropdowns when clicking anywhere outside */
  document.addEventListener("click", function (event) {
    if (mainNav && !mainNav.contains(event.target) && event.target !== menuToggle) {
      mainNav.classList.remove("is-open");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }

    document.querySelectorAll(".nav-item-dropdown.is-expanded").forEach(function (item) {
      if (!item.contains(event.target)) {
        item.classList.remove("is-expanded");
        var btn = item.querySelector(".dropdown-trigger");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* Highlight active top-level menu item based on current page */
function highlightActiveNav() {
  var currentPage = document.body.getAttribute("data-page") || "home";
  var navLinks = document.querySelectorAll("[data-nav-page]");

  navLinks.forEach(function (el) {
    if (el.getAttribute("data-nav-page") === currentPage) {
      el.classList.add("is-active");
    }
  });
}

/* --------------------------------------------------------------------------
   2. RENDER PRODUCT CARDS FROM js/products.js
   -------------------------------------------------------------------------- */
var activeCategoryFilter = "all";
var activeSubcategoryFilter = "all";
var activeSearchQuery = "";

function renderProductsOnPage() {
  var grid = document.getElementById("product-grid");
  if (!grid || !Array.isArray(window.PRODUCTS)) return;

  var pageType = document.body.getAttribute("data-page") || "home";

  /* Read optional search query from URL (?q=...) */
  var urlParams = new URLSearchParams(window.location.search);
  var urlQuery = urlParams.get("q");
  if (urlQuery) {
    activeSearchQuery = urlQuery.trim();
    var searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = activeSearchQuery;
  }

  /* Read optional subcategory hash (e.g. dogs.html#toys) */
  if (window.location.hash) {
    var hashValue = window.location.hash.replace("#", "").toLowerCase();
    if (hashValue && hashValue !== "subscribe" && hashValue !== "top-picks") {
      activeSubcategoryFilter = hashValue;
    }
  }

  /* Wire up category/subcategory filter buttons if present on this page */
  var filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach(function (btn) {
    if (btn.getAttribute("data-filter") === activeSubcategoryFilter) {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
    }

    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      var filterValue = btn.getAttribute("data-filter");
      if (pageType === "reviews") {
        activeCategoryFilter = filterValue;
      } else {
        activeSubcategoryFilter = filterValue;
      }
      drawFilteredProducts(grid, pageType);
    });
  });

  /* Re-filter if user clicks a dropdown subcategory link while already on dogs/cats */
  window.addEventListener("hashchange", function () {
    var newHash = window.location.hash.replace("#", "").toLowerCase();
    if (newHash) {
      activeSubcategoryFilter = newHash;
      filterButtons.forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-filter") === newHash);
      });
      drawFilteredProducts(grid, pageType);
    }
  });

  drawFilteredProducts(grid, pageType);
}

function drawFilteredProducts(grid, pageType) {
  var list = window.PRODUCTS.slice();

  /* 1. Filter by page animal type */
  if (pageType === "dogs") {
    list = list.filter(function (p) { return p.category === "dogs"; });
  } else if (pageType === "cats") {
    list = list.filter(function (p) { return p.category === "cats"; });
  } else if (pageType === "reviews" && activeCategoryFilter !== "all") {
    list = list.filter(function (p) { return p.category === activeCategoryFilter; });
  }

  /* 2. Filter by subcategory on Dogs / Cats pages */
  if ((pageType === "dogs" || pageType === "cats") && activeSubcategoryFilter !== "all") {
    var matchedSub = list.filter(function (p) {
      return p.subcategory === activeSubcategoryFilter;
    });
    if (matchedSub.length > 0) {
      list = matchedSub;
    }
  }

  /* 3. Filter by search keyword */
  if (activeSearchQuery) {
    var q = activeSearchQuery.toLowerCase();
    list = list.filter(function (p) {
      return (
        p.title.toLowerCase().indexOf(q) !== -1 ||
        p.category.toLowerCase().indexOf(q) !== -1 ||
        (p.keywords && p.keywords.toLowerCase().indexOf(q) !== -1)
      );
    });
  } else if (pageType === "home") {
    /* On Home page (without active search), show 8 balanced Top Picks */
    list = list.slice(0, 8);
  }

  updateSearchStatus(list.length);

  if (list.length === 0) {
    grid.innerHTML =
      '<div class="empty-state">' +
      '<p><strong>No pet products matched "' + escapeHtml(activeSearchQuery) + '".</strong></p>' +
      '<button type="button" class="search-clear-btn" id="empty-reset-btn">Show All Products</button>' +
      '</div>';

    var resetBtn = document.getElementById("empty-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", clearSearchFilter);
    }
    return;
  }

  /* Build HTML for every product card (NO prices/discounts per Amazon rules) */
  grid.innerHTML = list.map(function (product) {
    var badgeHtml = product.badge
      ? '<span class="badge-top-pick">' + escapeHtml(product.badge) + '</span>'
      : "";

    var starsText = getStarString(product.rating);
    var detailsHtml = buildProductDetailsHtml(product);

    return (
      '<article class="product-card">' +
        '<div class="product-media">' +
          badgeHtml +
          buildMediaHtml(product) +
          buildShareButtonHtml(product) +
        '</div>' +
        '<div class="product-body">' +
          '<h3 class="product-title">' + escapeHtml(product.title) + '</h3>' +
          '<div class="product-rating" aria-label="Rated ' + product.rating + ' out of 5 stars">' +
            '<span class="stars" aria-hidden="true">' + starsText + '</span>' +
            '<span class="rating-score">' + product.rating.toFixed(1) + '</span>' +
            '<span>(' + Number(product.reviews).toLocaleString("en-US") + ')</span>' +
          '</div>' +
          '<a class="btn-amazon" href="' + escapeHtml(product.link) + '" target="_blank" rel="nofollow sponsored noopener">' +
            'Check Price on Amazon' +
          '</a>' +
          detailsHtml +
        '</div>' +
      '</article>'
    );
  }).join("");
}

function buildProductDetailsHtml(product) {
  if (!product.details || typeof product.details !== "object") {
    return "";
  }

  var d = product.details;
  var panelId = "details-" + escapeHtml(product.id || product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  var sections = "";

  if (d.about) {
    sections += '<div class="details-block"><strong>About:</strong> <p>' + escapeHtml(d.about) + '</p></div>';
  }
  if (d.bestFor) {
    sections += '<div class="details-block"><strong>Best for:</strong> <p>' + escapeHtml(d.bestFor) + '</p></div>';
  }
  if (Array.isArray(d.howToUse) && d.howToUse.length > 0) {
    sections +=
      '<div class="details-block"><strong>How to use:</strong><ol class="details-list">' +
      d.howToUse.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join("") +
      '</ol></div>';
  }
  if (Array.isArray(d.pros) && d.pros.length > 0) {
    sections +=
      '<div class="details-block"><strong>Pros:</strong><ul class="details-list details-list--pros">' +
      d.pros.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") +
      '</ul></div>';
  }
  if (Array.isArray(d.cons) && d.cons.length > 0) {
    sections +=
      '<div class="details-block"><strong>Cons:</strong><ul class="details-list details-list--cons">' +
      d.cons.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") +
      '</ul></div>';
  }

  if (!sections) {
    return "";
  }

  return (
    '<button type="button" class="details-toggle" aria-expanded="false" aria-controls="' + panelId + '">' +
      '<span>View Details</span>' +
      '<span class="details-arrow" aria-hidden="true">&#9662;</span>' +
    '</button>' +
    '<div id="' + panelId + '" class="details-panel" hidden>' +
      sections +
    '</div>'
  );
}

/* One delegated click listener so toggles keep working after search or filter */
function initProductDetailsToggle() {
  document.addEventListener("click", function (event) {
    var toggleBtn = event.target.closest(".details-toggle");
    if (!toggleBtn) return;

    var panelId = toggleBtn.getAttribute("aria-controls");
    var panel = panelId ? document.getElementById(panelId) : toggleBtn.nextElementSibling;
    if (!panel) return;

    var isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    panel.hidden = isExpanded;
  });
}

function getStarString(rating) {
  var fullStars = Math.round(rating);
  var out = "";
  for (var i = 0; i < 5; i++) {
    out += i < fullStars ? "★" : "☆";
  }
  return out;
}

/* --------------------------------------------------------------------------
   3. SEARCH BAR LOGIC (Filters cards on current page, or redirects to reviews)
   -------------------------------------------------------------------------- */
function initSearchForm() {
  var form = document.getElementById("search-form");
  var input = document.getElementById("search-input");
  var grid = document.getElementById("product-grid");
  var pageType = document.body.getAttribute("data-page") || "home";

  if (!form || !input) return;

  /* Live filtering on pages that have a product grid */
  if (grid) {
    input.addEventListener("input", function () {
      activeSearchQuery = input.value.trim();
      drawFilteredProducts(grid, pageType);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var query = input.value.trim();

    if (grid) {
      activeSearchQuery = query;
      drawFilteredProducts(grid, pageType);
      grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else if (query) {
      /* On non-product pages (About, Contact, Pet Care, Legal), go to reviews.html */
      window.location.href = "reviews.html?q=" + encodeURIComponent(query);
    }
  });
}

function updateSearchStatus(resultCount) {
  var statusBox = document.getElementById("search-status");
  if (!statusBox) return;

  if (!activeSearchQuery) {
    statusBox.innerHTML = "";
    return;
  }

  statusBox.innerHTML =
    '<span>Showing <strong>' + resultCount + '</strong> result(s) for "' + escapeHtml(activeSearchQuery) + '"</span>' +
    '<button type="button" class="search-clear-btn" id="clear-search-btn">Clear Search</button>';

  var clearBtn = document.getElementById("clear-search-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearSearchFilter);
  }
}

function clearSearchFilter() {
  activeSearchQuery = "";
  var input = document.getElementById("search-input");
  var grid = document.getElementById("product-grid");
  var pageType = document.body.getAttribute("data-page") || "home";
  if (input) input.value = "";
  if (grid) drawFilteredProducts(grid, pageType);
}

/* --------------------------------------------------------------------------
   4. SUBSCRIBE FORM (Frontend demo — connect Mailchimp or Formspree later)
   -------------------------------------------------------------------------- */
function initSubscribeForm() {
  var form = document.getElementById("subscribe-form");
  var emailInput = document.getElementById("subscribe-email");
  var msgEl = document.getElementById("subscribe-message");

  if (!form || !emailInput || !msgEl) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = emailInput.value.trim();

    if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      msgEl.textContent = "Please enter a valid email address.";
      return;
    }

    /* CONNECT MAILCHIMP OR FORMSPREE HERE LATER:
       Example: fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: new FormData(form) }) */
    msgEl.textContent = "Thanks for subscribing!";
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM (Frontend demo — connect Formspree or EmailJS later)
   -------------------------------------------------------------------------- */
function initContactForm() {
  var form = document.getElementById("contact-form");
  var msgEl = document.getElementById("contact-status");

  if (!form || !msgEl) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    /* CONNECT FORMSPREE OR EMAIL SERVICE HERE LATER:
       Replace the lines below with a fetch() POST request to your Formspree endpoint. */
    msgEl.textContent = "Thank you! Your message has been received. We usually reply within 1–2 business days.";
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   6. BOTTOM 3-DOT (⋮) SLIDE-UP FOOTER & ABOUT PANEL
   -------------------------------------------------------------------------- */
function initThreeDotPanel() {
  var openBtn = document.getElementById("more-panel-btn");
  var closeBtn = document.getElementById("sheet-close-btn");
  var overlay = document.getElementById("sheet-overlay");
  var sheet = document.getElementById("bottom-sheet");

  if (!openBtn || !overlay || !sheet) return;

  function openPanel() {
    overlay.classList.add("is-open");
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    overlay.classList.remove("is-open");
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
  }

  openBtn.addEventListener("click", openPanel);
  overlay.addEventListener("click", closePanel);
  if (closeBtn) closeBtn.addEventListener("click", closePanel);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && sheet.classList.contains("is-open")) {
      closePanel();
    }
  });
}

/* --------------------------------------------------------------------------
   7. REVIEWS PAGE FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  var faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

/* --------------------------------------------------------------------------
   8. PET CARE PAGE GUIDE READER MODAL
   -------------------------------------------------------------------------- */
function initGuideReader() {
  var modal = document.getElementById("guide-modal");
  var modalTitle = document.getElementById("guide-modal-title");
  var modalBody = document.getElementById("guide-modal-body");
  var modalClose = document.getElementById("guide-modal-close");
  var guideButtons = document.querySelectorAll("[data-guide-title]");

  if (!modal || !modalTitle || !modalBody) return;

  guideButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      modalTitle.textContent = btn.getAttribute("data-guide-title") || "Pet Care Guide";
      modalBody.textContent = btn.getAttribute("data-guide-content") || "";
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });
}

/* Helper: Prevent XSS when inserting text into HTML */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* --------------------------------------------------------------------------
   9. PRODUCT MEDIA SLIDER & VIDEO
   -------------------------------------------------------------------------- */
function getYouTubeId(item) {
  if (item.id) return item.id;
  var url = item.url || "";
  var m = url.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : "";
}

function buildMediaHtml(product) {
  var items = (Array.isArray(product.media) && product.media.length)
    ? product.media
    : [{ type: "image", src: product.image }];

  var slides = items.map(function (m) {
    if (m.type === "youtube" || m.type === "video") {
      var isYt = m.type === "youtube";
      var source = isYt ? getYouTubeId(m) : m.src;
      var poster = isYt ? "https://img.youtube.com/vi/" + source + "/hqdefault.jpg" : (m.poster || "");
      return '<div class="media-slide media-video" data-type="' + m.type + '" data-src="' + escapeHtml(source) + '">' +
               '<img src="' + escapeHtml(poster) + '" alt="' + escapeHtml(product.title) + ' video" loading="lazy">' +
               '<button type="button" class="video-play-btn" aria-label="Play video">&#9654;</button>' +
             '</div>';
    }
    return '<div class="media-slide"><img src="' + escapeHtml(m.src) + '" alt="' + escapeHtml(product.title) +
           '" loading="lazy" onerror="this.outerHTML=\'<div class=product-fallback>' + escapeHtml(product.title) + '</div>\'"></div>';
  }).join("");

  var controls = "";
  if (items.length > 1) {
    var dots = items.map(function (_, i) {
      return '<span class="media-dot' + (i === 0 ? ' active' : '') + '"></span>';
    }).join("");
    controls =
      '<button type="button" class="media-arrow media-prev" aria-label="Previous">&#8249;</button>' +
      '<button type="button" class="media-arrow media-next" aria-label="Next">&#8250;</button>' +
      '<div class="media-dots">' + dots + '</div>';
  }
  return '<div class="media-track">' + slides + '</div>' + controls;
}

function initMediaSliders() {
  document.addEventListener("click", function (e) {
    var arrow = e.target.closest(".media-arrow");
    if (arrow) {
      var track = arrow.closest(".product-media").querySelector(".media-track");
      var dir = arrow.classList.contains("media-next") ? 1 : -1;
      track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" });
      return;
    }
    var play = e.target.closest(".video-play-btn");
    if (play) {
      var slide = play.closest(".media-video");
      var src = slide.getAttribute("data-src");
      if (slide.getAttribute("data-type") === "youtube") {
        slide.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(src) +
          '?autoplay=1&rel=0" title="Product video" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
      } else {
        slide.innerHTML = '<video src="' + escapeHtml(src) + '" controls autoplay playsinline></video>';
      }
    }
  });
  document.addEventListener("scroll", function (e) {
    var track = e.target;
    if (!track.classList || !track.classList.contains("media-track")) return;
    var index = Math.round(track.scrollLeft / track.clientWidth);
    var dots = track.parentNode.querySelectorAll(".media-dot");
    dots.forEach(function (d, i) { d.classList.toggle("active", i === index); });
  }, true);
}

/* --------------------------------------------------------------------------
   10. API-READY PRODUCT LOADER
   NOTE FOR LATER: When you connect a live API, use a backend (such as a
   serverless function) to store your secret API key. NEVER put a secret API
   key inside this front-end JavaScript file, because visitors can view it.
   -------------------------------------------------------------------------- */
function normalizeApiProduct(item) {
  var safe = item && typeof item === "object" ? item : {};
  var parsedRating = Number(safe.rating);
  var parsedReviews = parseInt(safe.reviews, 10);

  return {
    id: safe.id ? String(safe.id) : "",
    title: safe.title ? String(safe.title) : "Pet Product",
    image: safe.image ? String(safe.image) : "",
    media: Array.isArray(safe.media) ? safe.media : [],
    rating: !isNaN(parsedRating) ? parsedRating : 0,
    reviews: !isNaN(parsedReviews) ? parsedReviews : 0,
    badge: safe.badge ? String(safe.badge) : "",
    category: safe.category === "cats" ? "cats" : "dogs",
    subcategory: safe.subcategory ? String(safe.subcategory) : "",
    keywords: safe.keywords ? String(safe.keywords) : "",
    link: safe.link ? String(safe.link) : "#",
    details: safe.details && typeof safe.details === "object" ? safe.details : null
  };
}

function loadProductsThenInit(startApp) {
  var apiUrl = typeof window.PRODUCTS_API_URL === "string" ? window.PRODUCTS_API_URL.trim() : "";

  /* When PRODUCTS_API_URL is empty, run synchronously using local window.PRODUCTS */
  if (!apiUrl) {
    startApp();
    return;
  }

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) throw new Error("API error");
      return response.json();
    })
    .then(function (data) {
      var rawList = Array.isArray(data)
        ? data
        : (data && Array.isArray(data.products) ? data.products : null);

      if (rawList && rawList.length > 0) {
        window.PRODUCTS = rawList.map(normalizeApiProduct);
      }
      startApp();
    })
    .catch(function () {
      /* Silently fall back to local window.PRODUCTS if the API request fails */
      startApp();
    });
}

/* --------------------------------------------------------------------------
   11. PRODUCT IMAGE LIGHTBOX
   -------------------------------------------------------------------------- */
function initImageLightbox() {
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Image viewer");
  box.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>' +
    '<img class="lightbox-img" alt="">' +
    '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>' +
    '<div class="lightbox-count"></div>';
  document.body.appendChild(box);

  var imgEl = box.querySelector(".lightbox-img");
  var countEl = box.querySelector(".lightbox-count");
  var closeBtn = box.querySelector(".lightbox-close");
  var list = [];
  var index = 0;
  var lastFocus = null;
  var pushed = false;

  function show() {
    imgEl.src = list[index].src;
    imgEl.alt = list[index].alt;
    countEl.textContent = list.length > 1 ? (index + 1) + " / " + list.length : "";
    box.classList.toggle("single", list.length < 2);
    if (list.length > 1) {
      [1, -1].forEach(function (d) {
        var p = new Image();
        p.src = list[(index + d + list.length) % list.length].src;
      });
    }
  }

  function openBox(imgs, i) {
    list = imgs;
    index = i;
    lastFocus = document.activeElement;
    show();
    box.classList.add("open");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
    try { history.pushState({ lightbox: true }, ""); pushed = true; } catch (err) { pushed = false; }
  }

  function hideBox() {
    box.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    imgEl.removeAttribute("src");
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (err) {} }
  }

  function closeBox() {
    if (!box.classList.contains("open")) return;
    if (pushed) { pushed = false; history.back(); } /* popstate below hides the box */
    else { hideBox(); }
  }

  function step(d) {
    index = (index + d + list.length) % list.length;
    show();
  }

  window.addEventListener("popstate", function () {
    if (box.classList.contains("open")) { pushed = false; hideBox(); }
  });

  document.addEventListener("click", function (e) {
    var img = e.target.closest(".media-slide:not(.media-video) img");
    if (!img) return;
    var media = img.closest(".product-media");
    if (!media) return;
    var all = Array.prototype.slice.call(media.querySelectorAll(".media-slide:not(.media-video) img"));
    var imgs = all.map(function (el) { return { src: el.currentSrc || el.src, alt: el.alt }; });
    openBox(imgs, all.indexOf(img));
  });

  box.addEventListener("click", function (e) {
    if (e.target.closest(".lightbox-prev")) { step(-1); return; }
    if (e.target.closest(".lightbox-next")) { step(1); return; }
    if (e.target === imgEl) return;
    closeBox();
  });

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") closeBox();
    else if (e.key === "ArrowLeft" && list.length > 1) step(-1);
    else if (e.key === "ArrowRight" && list.length > 1) step(1);
  });

  /* Mobile gestures: swipe left/right = next/prev, swipe down = close */
  var tx = 0, ty = 0, tracking = false;
  box.addEventListener("touchstart", function (e) {
    tracking = e.touches.length === 1;
    if (tracking) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }
  }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (!tracking) return;
    tracking = false;
    if (window.visualViewport && window.visualViewport.scale > 1.05) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - tx;
    var dy = t.clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && list.length > 1) {
      step(dx < 0 ? 1 : -1);
    } else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) {
      closeBox();
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   12. VIDEO PLAYING STATE (nav strip below video)
   -------------------------------------------------------------------------- */
function stopMediaVideos(media, keepSlide) {
  var slides = media.querySelectorAll(".media-video[data-poster-html]");
  Array.prototype.forEach.call(slides, function (s) {
    if (s === keepSlide) return;
    if (s.querySelector("iframe, video")) {
      s.innerHTML = s.getAttribute("data-poster-html");
    }
    s.removeAttribute("data-poster-html");
  });
  if (!keepSlide) {
    media.classList.remove("is-playing", "has-nav");
  }
}

function initVideoPlayingState() {
  /* CAPTURE phase: runs BEFORE the existing click handler swaps the poster for the player */
  document.addEventListener("click", function (e) {
    var play = e.target.closest ? e.target.closest(".video-play-btn") : null;
    if (!play) return;
    var slide = play.closest(".media-video");
    var media = play.closest(".product-media");
    if (!slide || !media) return;
    stopMediaVideos(media, slide);
    slide.setAttribute("data-poster-html", slide.innerHTML);
    media.classList.add("is-playing");
    if (media.querySelector(".media-arrow")) {
      media.classList.add("has-nav");
    }
  }, true);

  /* When the visitor slides away from the playing video, stop it */
  document.addEventListener("scroll", function (e) {
    var track = e.target;
    if (!track.classList || !track.classList.contains("media-track")) return;
    var media = track.closest(".product-media");
    if (!media || !media.classList.contains("is-playing")) return;
    var playing = media.querySelector(".media-video[data-poster-html]");
    if (!playing) {
      media.classList.remove("is-playing", "has-nav");
      return;
    }
    var slideIndex = Array.prototype.indexOf.call(track.children, playing);
    var current = Math.round(track.scrollLeft / track.clientWidth);
    if (current !== slideIndex) {
      stopMediaVideos(media, null);
    }
  }, true);
}

/* --------------------------------------------------------------------------
   13. PRODUCT MEDIA AUTO-SLIDE & DOT NAVIGATION
   -------------------------------------------------------------------------- */
function initMediaAutoSlide() {
  var SLIDE_MS = 5000;       /* how long each photo / video poster stays visible (change here) */
  var USER_PAUSE_MS = 8000;  /* pause after the visitor touches a card */

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

  function pauseCard(e) {
    var media = e.target && e.target.closest ? e.target.closest(".product-media") : null;
    if (media) media.setAttribute("data-pause-until", String(Date.now() + USER_PAUSE_MS));
  }
  ["pointerdown", "touchstart", "wheel"].forEach(function (evt) {
    document.addEventListener(evt, pauseCard, { capture: true, passive: true });
  });

  /* Tap / click a dot = go to that slide */
  document.addEventListener("click", function (e) {
    var dot = e.target.closest ? e.target.closest(".media-dot") : null;
    if (!dot) return;
    var media = dot.closest(".product-media");
    if (!media) return;
    var track = media.querySelector(".media-track");
    var dots = Array.prototype.slice.call(media.querySelectorAll(".media-dot"));
    var i = dots.indexOf(dot);
    if (!track || i < 0) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    media.setAttribute("data-pause-until", String(Date.now() + USER_PAUSE_MS));
  });

  if (reduceMotion) return;

  /* One timer for all cards. It only scrolls the slider; it NEVER clicks play on a video. */
  setInterval(function () {
    if (document.hidden) return;
    if (document.body.classList.contains("lightbox-open")) return;
    var cards = document.querySelectorAll(".product-media");
    Array.prototype.forEach.call(cards, function (media) {
      var track = media.querySelector(".media-track");
      if (!track || track.children.length < 2 || !track.clientWidth) return;
      if (media.classList.contains("is-playing")) return;
      if (Number(media.getAttribute("data-pause-until") || 0) > Date.now()) return;
      if (canHover && media.matches(":hover")) return;
      var r = media.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      var current = Math.round(track.scrollLeft / track.clientWidth);
      var next = (current + 1) % track.children.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: next === 0 ? "auto" : "smooth" });
    });
  }, SLIDE_MS);
}

/* --------------------------------------------------------------------------
   14. PRODUCT SHARE BUTTON
   -------------------------------------------------------------------------- */
function getProductShareId(product) {
  if (product.id) return String(product.id);
  return String(product.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildShareButtonHtml(product) {
  var icon =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>' +
      '<line x1="8.6" y1="13.5" x2="15.4" y2="17.5"></line><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"></line>' +
    '</svg>';
  return '<button type="button" class="share-btn" data-share-id="' + escapeHtml(getProductShareId(product)) +
         '" data-share-title="' + escapeHtml(product.title) +
         '" aria-label="Share ' + escapeHtml(product.title) + '">' + icon + '</button>';
}

function initProductShare() {
  var toastTimer = null;

  function showShareToast(message) {
    var toast = document.querySelector(".share-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "share-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2500);
  }

  function copyShareLink(url) {
    function done() { showShareToast("Link copied! Paste it anywhere to share."); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { ta.setSelectionRange(0, url.length); } catch (err) {}
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(ta);
      showShareToast(ok ? "Link copied! Paste it anywhere to share." : "Copy this link: " + url);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, fallback);
    } else {
      fallback();
    }
  }

  function buildShareUrl(id) {
    var u = new URL("reviews.html", window.location.href);
    u.search = "";
    u.hash = encodeURIComponent(id);
    return u.toString();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".share-btn") : null;
    if (!btn) return;
    e.preventDefault();
    var id = btn.getAttribute("data-share-id");
    var title = btn.getAttribute("data-share-title") || "Pet product";
    var url = buildShareUrl(id);
    if (navigator.share) {
      navigator.share({ title: title, text: "Check out: " + title, url: url }).catch(function (err) {
        if (err && err.name === "AbortError") return;
        copyShareLink(url);
      });
    } else {
      copyShareLink(url);
    }
  });

  function landOnSharedProduct() {
    var id = "";
    try { id = decodeURIComponent(window.location.hash.replace(/^#/, "")); } catch (err) { return; }
    if (!id) return;
    var tries = 0;
    (function attempt() {
      var btns = document.querySelectorAll(".share-btn");
      var card = null;
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute("data-share-id") === id) { card = btns[i].closest(".product-card"); break; }
      }
      if (card) {
        var PULSES = 4;            /* how many times the yellow glow blinks (change this number) */
        var PULSE_MS = 1100;       /* length of one blink in milliseconds (1000 = 1 second) */
        var START_DELAY_MS = 600;  /* short wait so the page can scroll to the product first */
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.style.animationDuration = PULSE_MS + "ms";
        card.style.animationIterationCount = String(PULSES);
        card.style.animationDelay = START_DELAY_MS + "ms";
        card.classList.add("share-highlight");
        setTimeout(function () {
          card.classList.remove("share-highlight");
          card.style.animationDuration = "";
          card.style.animationIterationCount = "";
          card.style.animationDelay = "";
        }, START_DELAY_MS + PULSES * PULSE_MS + 400);
        return;
      }
      tries++;
      if (tries < 20) setTimeout(attempt, 250);
    })();
  }

  landOnSharedProduct();
  window.addEventListener("hashchange", landOnSharedProduct);
}

/* --------------------------------------------------------------------------
   14. SOCIAL MEDIA LINKS IN THE THREE-DOT FOOTER PANEL
   -------------------------------------------------------------------------- */
function initSocialLinks() {
  if (typeof SOCIAL_LINKS === "undefined" || !Array.isArray(SOCIAL_LINKS)) return;
  var sheet = document.getElementById("bottom-sheet");
  if (!sheet) return;
  var sheetLinks = sheet.querySelector(".sheet-links");
  if (!sheetLinks || sheet.querySelector(".sheet-social")) return;

  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.5-1.5h1.7V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H7.6v3h2.7v8h3.2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.2 2C6.8 2 4 5.9 4 9.2c0 2 1 3.8 2.6 4.5.2.1.4 0 .4-.2l.3-1.2c.1-.2 0-.3-.1-.5-.5-.6-.8-1.4-.8-2.4 0-3.1 2.3-5.8 6-5.8 3.3 0 5.1 2 5.1 4.7 0 3.5-1.6 6.5-3.9 6.5-1.3 0-2.2-1.1-1.9-2.4.4-1.6 1.1-3.3 1.1-4.4 0-1-.5-1.9-1.7-1.9-1.3 0-2.4 1.4-2.4 3.2 0 1.2.4 2 .4 2l-1.6 6.8c-.4 1.8-.1 4 0 4.2 0 .1.2.2.3.1.1-.1 1.6-2 2.1-3.8l.8-3.1c.4.8 1.6 1.5 2.9 1.5 3.8 0 6.5-3.5 6.5-8.2C20.2 5.4 16.9 2 12.2 2z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.4 3.7 12 3.7 12 3.7h0s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.4 0 7.7-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.9V8.5l6.1 3.2-6.1 3.2z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.34 0 .66.06.96.16V9.01a6.3 6.3 0 0 0-.96-.08A6.34 6.34 0 0 0 3.15 15.27 6.34 6.34 0 0 0 9.49 21.6a6.34 6.34 0 0 0 6.34-6.34V8.36a8.2 8.2 0 0 0 4.76 1.52V6.43c-.34 0-.68-.05-1-.14z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21l-6.56 7.5L22 22h-6.06l-4.74-6.2L5.77 22H3l7.02-8.02L2.8 2h6.21l4.28 5.66L18.244 2zm-1.06 18h1.53L8.29 3.9H6.65L17.184 20z"/></svg>'
  };

  var valid = [];
  for (var i = 0; i < SOCIAL_LINKS.length; i++) {
    var item = SOCIAL_LINKS[i];
    if (!item || typeof item.url !== "string" || typeof item.name !== "string") continue;
    var url = item.url.trim();
    if (!/^https?:\/\//i.test(url)) continue;
    var key = item.name.trim().toLowerCase();
    if (!ICONS[key]) continue;
    valid.push({ name: item.name.trim(), url: url, icon: ICONS[key] });
  }

  if (!valid.length) return;

  var box = document.createElement("div");
  box.className = "sheet-social";

  var title = document.createElement("p");
  title.className = "sheet-social-title";
  title.textContent = "Follow Us";
  box.appendChild(title);

  var list = document.createElement("div");
  list.className = "sheet-social-list";
  list.setAttribute("role", "list");

  for (var j = 0; j < valid.length; j++) {
    var entry = valid[j];
    var a = document.createElement("a");
    a.className = "social-link";
    a.href = entry.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("role", "listitem");
    a.setAttribute("aria-label", "Follow us on " + entry.name);
    a.title = entry.name;
    a.innerHTML = entry.icon;
    list.appendChild(a);
  }

  box.appendChild(list);
  sheet.insertBefore(box, sheetLinks);
}

