const HERO_SLIDES = [
  {
    eyebrow: "Kampala, Uganda",
    heading: "Your one-stop shop for genuine electrical products",
    lead: "Cables, switches, lighting, solar and more — in stock at our Kampala showroom, with WhatsApp ordering and fast local delivery.",
    btnText: "Product range",
    btnHref: "#products",
    img: "images/banner4.jpeg",
  },
  {
    eyebrow: "Genuine Brands",
    heading: "Trusted brands, honest prices",
    lead: "ABB, Schneider Electric, Havells and more — genuine products, always in stock at our showroom.",
    btnText: "View brands",
    btnHref: "#brands",
    img: "images/hero-banner-2.jpeg",
  },
  {
    eyebrow: "Order Your Way",
    heading: "WhatsApp orders, fast delivery",
    lead: "Message us your list and we'll have it ready for collection or delivery across Kampala.",
    btnText: "Contact us",
    btnHref: "#contact",
    img: "images/wires-and-cables.webp",
  },
];

let heroTimer = null;
let heroIndex = 0;

function updateHeroSlide(i) {
  const img = document.getElementById("heroImg");
  if (!img) return;
  const s = HERO_SLIDES[i];
  const eyebrow = document.getElementById("heroEyebrow");
  const heading = document.getElementById("heroHeading");
  const lead = document.getElementById("heroLead");
  const btn = document.getElementById("heroBtn");
  const dots = document.querySelectorAll("#heroDots span");

  img.style.opacity = 0;
  [eyebrow, heading, lead, btn].forEach((el) => {
    if (el) el.style.opacity = 0;
  });

  setTimeout(() => {
    img.src = s.img;
    if (eyebrow) eyebrow.textContent = s.eyebrow;
    if (heading) heading.textContent = s.heading;
    if (lead) lead.textContent = s.lead;
    if (btn) {
      btn.textContent = s.btnText;
      btn.setAttribute("href", s.btnHref);
    }
    img.style.opacity = 1;
    [eyebrow, heading, lead, btn].forEach((el) => {
      if (el) el.style.opacity = 1;
    });
  }, 300);

  dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  heroIndex = i;
}

function goToHeroSlide(i) {
  updateHeroSlide(i);
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    updateHeroSlide((heroIndex + 1) % HERO_SLIDES.length);
  }, 5000);
}

function toggleRecaptcha(elOrEvent) {
  // Accept either an element or an event from click/keydown
  let el =
    elOrEvent instanceof Event
      ? elOrEvent.currentTarget || elOrEvent.target
      : elOrEvent;
  if (!el) return;
  // allow passing from a child element
  if (!el.classList || !el.classList.contains("recaptcha-check")) {
    el =
      el.closest && el.closest(".recaptcha-check")
        ? el.closest(".recaptcha-check")
        : el;
  }
  if (!el || !el.classList) return;

  const native =
    el.parentElement && el.parentElement.querySelector(".recaptcha-native");
  // prevent double toggles while loading
  if (el.classList.contains("loading")) return;

  // If already checked, uncheck
  if (el.classList.contains("checked")) {
    el.classList.remove("checked");
    if (native) native.checked = false;
    el.setAttribute("aria-checked", "false");
    return;
  }

  el.classList.add("loading");
  el.setAttribute("aria-busy", "true");
  setTimeout(() => {
    el.classList.remove("loading");
    el.classList.add("checked");
    if (native) native.checked = true;
    el.setAttribute("aria-checked", "true");
    el.removeAttribute("aria-busy");
  }, 700);
}

function setProductPageHero() {
  const hero = document.querySelector(".pdhero");
  if (!hero) return;

  const heroLabel = hero.querySelector(".pdhero-label");
  const labelText = heroLabel ? heroLabel.textContent.trim() : "Product";
  const pagePath = window.location.pathname.split("/").pop() || "";
  const pageName = pagePath.replace(/\.html$/i, "");

  const heroImages = {
    "cables-wires": "../../images/wires-and-cables.webp",
    "wiring-accessories": "../../images/wiring_accessories.jpeg",
    "lamps-bulbs-tubes": "../../images/lights.jpeg",
    "lighting-control": "../../images/led-indicators-push-button.webp",
    "solar-led-lighting": "../../images/a1-storefront.webp",
    "switchgear-distribution": "../../images/rotary-load-break-switches.webp",
    "ventilation-fans": "../../images/industrial_motor.jpeg",
    "circuit-protection": "../../images/breaker.jpeg",
    "motor-controls-starters": "../../images/industrial_motor.jpeg",
    "power-protection": "../../images/mccb.jpeg",
    "light-fittings-luminaires": "../../images/lights.jpeg",
    "cable-trays-conduits": "../../images/products.jpeg",
    "security-fire": "../../images/side.jpeg",
    generators: "../../images/16570.jpg",
    "lightning-protection": "../../images/4186281_16484.jpg",
  };

  const imagePath = heroImages[pageName] || "../../images/a1-storefront.webp";
  const existingImage = hero.querySelector("img.pd-hero-image");

  if (existingImage) {
    existingImage.src = imagePath;
    existingImage.alt = labelText;
    return;
  }

  const iconFill = hero.querySelector(".icon-fill");
  if (iconFill) iconFill.remove();

  const img = document.createElement("img");
  img.className = "pd-hero-image";
  img.src = imagePath;
  img.alt = labelText;
  hero.insertBefore(img, hero.firstChild);
}

function ensureGlobalLogoStrip() {
  if (document.querySelector(".global-logostrip")) return;
  const footer = document.querySelector("footer");
  if (!footer) return;

  const existing =
    document.querySelector(".logorow") || document.querySelector(".logostrip");
  let strip;
  if (existing) {
    strip = existing.cloneNode(true);
    strip.classList.add("global-logostrip");
    // remove internal borders or decorations
    strip.querySelectorAll(".bmark, a").forEach((el) => {
      el.style.border = "none";
      if (el.style.background) el.style.background = "transparent";
    });
    // remove any Schneider branding from the cloned strip
    strip.querySelectorAll("a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const img = a.querySelector("img");
      const alt = ((img && img.alt) || "").toLowerCase();
      const text = (a.textContent || "").toLowerCase();
      if (
        href.includes("schneider") ||
        alt.includes("schneider") ||
        text.includes("schneider")
      ) {
        a.remove();
      }
    });
  } else {
    strip = document.createElement("div");
    strip.className = "global-logostrip";
    const w = document.createElement("div");
    w.className = "wrap";
    const brands = [
      { href: "pages/brands/abb", img: "images/abb.jpeg", alt: "ABB" },
      {
        href: "pages/brands/havells",
        img: "images/ace.jpeg",
        alt: "Havells",
      },
      {
        href: "pages/brands/philips-lighting",
        img: "images/phillips_lights.jpeg",
        alt: "Philips",
      },
      {
        href: "pages/brands/ledvance",
        img: "images/ledvance.jpeg",
        alt: "LEDVANCE",
      },
      {
        href: "pages/brands/marshall-tufflex",
        img: "images/marshell_tufflex.jpeg",
        alt: "Marshall",
      },
    ];
    brands.forEach((b) => {
      const a = document.createElement("a");
      a.href = b.href;
      const im = document.createElement("img");
      im.src = b.img;
      im.alt = b.alt;
      a.appendChild(im);
      w.appendChild(a);
    });
    strip.appendChild(w);
  }

  footer.parentElement.insertBefore(strip, footer);
  // remove older logo rows/strips to avoid duplicates across the page
  document.querySelectorAll(".logorow, .logostrip").forEach((el) => {
    if (el === strip) return;
    if (!el.classList.contains("global-logostrip")) el.remove();
  });
}

function closeAllNavDropdowns() {
  document.querySelectorAll(".navitem.open").forEach((item) => {
    item.classList.remove("open");
    const dd = item.querySelector(".dropdown");
    if (dd) {
      dd.style.top = "";
      dd.style.bottom = "";
    }
  });
}

function positionNavDropdown(item) {
  const dd = item.querySelector(".dropdown");
  if (!dd || window.innerWidth <= 900) return;
  const itemRect = item.getBoundingClientRect();
  const ddHeight = dd.offsetHeight;
  const spaceBelow = window.innerHeight - itemRect.bottom;
  if (spaceBelow < ddHeight + 16) {
    dd.style.top = "auto";
    dd.style.bottom = "100%";
  } else {
    dd.style.top = "100%";
    dd.style.bottom = "auto";
  }
}

function toggleNavDropdown(e, el) {
  e.preventDefault();
  e.stopPropagation();
  const item = el.closest(".navitem");
  const wasOpen = item.classList.contains("open");
  closeAllNavDropdowns();
  if (!wasOpen) {
    item.classList.add("open");
    positionNavDropdown(item);
  }
}

function bindNavHover() {
  document.querySelectorAll(".navitem").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      closeAllNavDropdowns();
      item.classList.add("open");
      positionNavDropdown(item);
    });

    item.addEventListener("mouseleave", () => {
      if (!item.matches(":hover")) {
        item.classList.remove("open");
      }
    });
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".navitem")) closeAllNavDropdowns();
});

window.addEventListener("scroll", closeAllNavDropdowns, { passive: true });

document.addEventListener("DOMContentLoaded", () => {
  ["enquiryForm", "pdEnquiryForm"].forEach((id) => {
    const form = document.getElementById(id);
    if (form) {
      form.setAttribute("action", "mailto:info@a1electricalsltd.com");
      form.setAttribute("method", "post");
      form.setAttribute("enctype", "text/plain");
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fields = Array.from(
          form.querySelectorAll("input, textarea, select"),
        ).filter((field) => {
          if (field.disabled) return false;
          if (field.type === "submit" || field.type === "button") return false;
          if (
            (field.type === "checkbox" || field.type === "radio") &&
            !field.checked
          )
            return false;
          return true;
        });

        const bodyLines = fields.map((field) => {
          const label =
            field.name ||
            (field.closest(".field") &&
              field.closest(".field").querySelector("label")?.innerText) ||
            field.placeholder ||
            field.getAttribute("aria-label") ||
            field.type;
          let value = field.value || "";
          if (field.tagName === "SELECT") {
            value = field.options[field.selectedIndex]?.text || value;
          }
          return `${label}: ${value}`;
        });

        const subject =
          form.querySelector("h3")?.innerText ||
          document.querySelector(".pagehead h1")?.innerText ||
          document.title ||
          "Website enquiry";

        const mailto = `mailto:info@a1electricalsltd.com?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

        window.location.href = mailto;

        const toast = document.getElementById("toast");
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 3600);
        }
        form.reset();
      });
    }
  });

  // Initialize accessible fake reCAPTCHA widgets
  document.querySelectorAll(".recaptcha-check").forEach((el) => {
    // ensure keyboard focusable and announce role/state
    el.setAttribute("role", "checkbox");
    el.setAttribute("tabindex", "0");
    const native =
      el.parentElement && el.parentElement.querySelector(".recaptcha-native");
    const checked = native && native.checked;
    el.setAttribute("aria-checked", checked ? "true" : "false");
    el.setAttribute("aria-label", "I am not a robot");
    // click handler (pages may already have inline onclick)
    el.addEventListener("click", (e) => {
      toggleRecaptcha(e);
    });
    // keyboard support: Enter / Space
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggleRecaptcha(e);
      }
    });
  });

  bindNavHover();
  setProductPageHero();
  ensureGlobalLogoStrip();

  if (document.getElementById("heroImg")) {
    heroIndex = 0;
    heroTimer = setInterval(() => {
      updateHeroSlide((heroIndex + 1) % HERO_SLIDES.length);
    }, 5000);
  }
});
