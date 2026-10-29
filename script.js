/* Sayyed Transport & Logistics - settings (CONFIG) and page code */
/* =====================================================================
   CONFIG  –  All company details are here. Change them in this one place.
   Phone / WhatsApp numbers: country code + number, digits only.
   ===================================================================== */
const CONFIG = {
  company: "Sayyed Transport & Logistics",

  // Quote, track and message requests are sent to this WhatsApp number
  whatsapp: "918369794814",
  email: "sayyedtransport53@gmail.com",

  people: [
    { name: "Azher Sayyed",  phone: "918369794814" },
    { name: "Rumana Sayyed", phone: "919653379758" }
  ],

  // Companies shown on the About Us page
  clients: [
    "DMart", "Booker Wholesale", "Khushrow Logistics", "Shadowfax", "Bhago International",
    "Kaizen Engineering", "Native Again Food LLP", "Mahanagar Gas", "Mumbai Garlic", "Al Bhaan International"
  ],

  address: "Lal Bahadur Shastri Marg, Syndicate Bank Officers Quarters, Nabard Colony, Damodar Park, Ghatkopar West, Mumbai, Maharashtra",
  // Text used to place the pin on Google Maps (pincode helps accuracy)
  mapQuery: "Damodar Park, Nabard Colony, Lal Bahadur Shastri Marg, Ghatkopar West, Mumbai 400086",

  // ---- Home banner photo ----
  // Photo file name (it sits next to index.html).
  heroImage: "orange-truck.jpg",

  texts: {
    homeP1: "Sayyed Transport Mumbai is committed to providing reliable, efficient, and professional transportation and logistics services to meet the diverse needs of businesses and customers. We focus on the safe handling, timely delivery, and secure transportation of goods, ensuring a smooth and hassle-free experience for every client.",
    homeP2: "With a strong commitment to customer satisfaction and dependable service, we aim to build long-term relationships based on trust and reliability. Whether you require transportation for commercial goods, business consignments, or regular logistics needs, Sayyed Transport strives to deliver solutions you can count on.",
    aboutMission: "Our Mission: To provide reliable, secure, and affordable transportation and logistics services while maintaining the highest standards of customer satisfaction.",
    aboutBody: "At Sayyed Transport and Logistics, we are dedicated to providing reliable, safe, and efficient transportation solutions for businesses and individuals. Based in Mumbai, we focus on delivering goods securely and on time while maintaining high standards of professionalism and customer service.",
    contactIntro: "Looking for reliable transportation and logistics services? Sayyed Transport and Logistics is here to help. Contact us for transportation enquiries, truck bookings, delivery requirements, and customized logistics solutions."
  },

  // icon: truck | fast | route | warehouse | box
  services: [
    { icon: "box",       title: "Goods Transport",         text: "Safe movement of commercial goods and business consignments of every size." },
    { icon: "fast",      title: "Local Delivery",          text: "Quick pickup and drop anywhere in Mumbai and Navi Mumbai." },
    { icon: "route",     title: "Long-Distance Transport", text: "Dependable trips to other cities and states across Maharashtra." },
    { icon: "warehouse", title: "Logistics Solutions",     text: "Planned, customized logistics for regular and business needs." }
  ],

  // type: "mini" | "pickup" | "truck"  (drawing used when there is no photo)
  // photo: "orange" | "white" built-in photos, or a path like "images/tata-ace.jpg"
  // NOTE: capacities below are sample values. Please confirm and edit.
  fleet: [
    { name: "Mini Closed Body Truck", type: "mini",   photo: "own",    capacity: "750 kg",  use: "Small and medium loads", text: "Our own closed-body mini truck. Safe from rain and dust, ideal for city deliveries." },
    { name: "Tata Ace Closed Body",   type: "mini",   photo: "lineup", capacity: "750 kg",  use: "Local delivery",         text: "Tata Ace closed-body trucks for shop goods, parcels and business deliveries." },
    { name: "Closed Body Truck",      type: "truck",  photo: "orange", capacity: "4 Ton",   use: "Heavier goods",          text: "Fully closed container body that protects your goods from rain and dust." },
    { name: "Pickup Truck",           type: "pickup", photo: "",       capacity: "1.5 Ton", use: "Medium loads",           text: "Open pickup for medium loads, shifting and local delivery." }
  ]
};

/* ===================== helpers ===================== */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmtPhone = n => {
  const d = String(n).replace(/\D/g, "");
  return d.length === 12 && d.startsWith("91") ? `+91 ${d.slice(2, 7)} ${d.slice(7)}` : "+" + d;
};
const waLink = (num, msg = "") => `https://wa.me/${num}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
// Built-in photos (photo files sit next to index.html)
const PHOTOS = {
  orange: "orange-truck.jpg",
  own:    "our-truck.jpg",
  lineup: "tata-trucks.jpg"
};
const photoSrc = k => PHOTOS[k] || k;

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 3500);
}

/* ===================== icons ===================== */
const ICONS = {
  truck:     '<svg viewBox="0 0 24 24"><path d="M1.5 6.5h12v9.5h-12z"/><path d="M13.5 9.5h4l3.5 3.5v3h-7.5z"/><circle cx="6" cy="17.8" r="1.8"/><circle cx="17.5" cy="17.8" r="1.8"/></svg>',
  fast:      '<svg viewBox="0 0 24 24"><path d="M6 6.5h9v9.5H6z"/><path d="M15 9.5h3l3 3v3.5h-6z"/><circle cx="9.5" cy="17.8" r="1.6"/><circle cx="18" cy="17.8" r="1.6"/><path d="M1.5 9h3M0.5 12h4M2 15h2.5"/></svg>',
  route:     '<svg viewBox="0 0 24 24"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  warehouse: '<svg viewBox="0 0 24 24"><path d="M3 21V9l9-6 9 6v12"/><path d="M8 21v-7h8v7"/><path d="M8 17.5h8"/></svg>',
  box:       '<svg viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  phone:     '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  chat:      '<svg viewBox="0 0 24 24"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1 1 21 12z"/><path d="M9 11h6M9 14h4"/></svg>',
  mail:      '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
};

/* ===================== vehicle drawings (fleet fallback) ===================== */
function vehicleSVG(type) {
  const wheel = (x, y) => `<circle cx="${x}" cy="${y}" r="15" fill="#10151f"/><circle cx="${x}" cy="${y}" r="7" fill="#aab4c6"/>`;
  if (type === "mini") return `<svg viewBox="0 0 300 120"><rect x="30" y="38" width="130" height="52" rx="6" fill="#fff"/><path d="M165 52h52l30 26v16h-82z" fill="#8b1a3a"/><path d="M175 60h36l18 18h-54z" fill="#e6eefc"/><rect x="30" y="90" width="218" height="8" rx="3" fill="#4a3039"/>${wheel(80,100)}${wheel(205,100)}</svg>`;
  if (type === "pickup") return `<svg viewBox="0 0 300 120"><path d="M25 50h110v42H25z" fill="#fff"/><path d="M25 50h110" stroke="#8b1a3a" stroke-width="6"/><path d="M140 48h54l36 28v18H140z" fill="#8b1a3a"/><path d="M152 58h38l20 18h-58z" fill="#e6eefc"/><rect x="25" y="92" width="205" height="8" rx="3" fill="#4a3039"/>${wheel(70,102)}${wheel(190,102)}</svg>`;
  return `<svg viewBox="0 0 300 120"><rect x="14" y="22" width="170" height="70" rx="6" fill="#fff"/><rect x="14" y="22" width="170" height="14" rx="6" fill="#8b1a3a"/><path d="M190 40h52l40 30v24h-92z" fill="#8b1a3a"/><path d="M200 48h36l22 22h-58z" fill="#e6eefc"/><rect x="14" y="92" width="268" height="8" rx="3" fill="#4a3039"/>${wheel(55,102)}${wheel(105,102)}${wheel(240,102)}</svg>`;
}
function vehicleMedia(v) {
  const svg = vehicleSVG(v.type);
  if (!v.photo) return svg;
  return `<img class="fleet-photo" src="${photoSrc(v.photo)}" alt="${v.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div style="display:none;padding:26px 20px 14px">${svg}</div>`;
}

/* ===================== render from CONFIG ===================== */
function render() {
  const owner = CONFIG.people[0], T = CONFIG.texts;

  $("#menuCall").href = "tel:+" + owner.phone;

  // Home
  $("#homeCards").innerHTML = CONFIG.services.map(s => `
    <a class="scard" href="#services">
      <div class="ic">${ICONS[s.icon] || ICONS.truck}</div>
      <h3>${s.title}</h3><p>${s.text}</p>
    </a>`).join("");
  $("#homeP1").textContent = T.homeP1;
  $("#homeP2").textContent = T.homeP2;

  // About
  $("#aboutMission").textContent = T.aboutMission;
  $("#aboutBody").textContent = T.aboutBody;
  $("#teamGrid").innerHTML = CONFIG.people.map(p => `
    <div class="card reveal">
      <div class="ic" style="width:64px;height:64px;border-radius:50%;background:var(--dark);color:#fff;display:grid;place-items:center;font-family:'Roboto Condensed','Arial Narrow',sans-serif;font-size:1.7rem;font-weight:700">${initials(p.name)}</div>
      <h3 style="margin-bottom:14px">${p.name}</h3>
      <a class="btn btn-green btn-sm" target="_blank" rel="noopener" href="${waLink(p.phone, "Hello " + p.name.split(" ")[0] + ", I want to enquire about transport service.")}">WhatsApp ${p.name.split(" ")[0]}</a>
    </div>`).join("");

  // Clients (About page)
  $("#clientsGrid").innerHTML = CONFIG.clients.map(c => `<div class="client reveal">${c}</div>`).join("");

  // Services page
  $("#servicesGrid").innerHTML = CONFIG.services.map(s => `
    <div class="card reveal">
      <div class="ic">${ICONS[s.icon] || ICONS.truck}</div>
      <h3>${s.title}</h3><p>${s.text}</p>
    </div>`).join("");

  // Fleet
  $("#fleetGrid").innerHTML = CONFIG.fleet.map(v => `
    <div class="fleet-card reveal">
      <div class="fleet-img ${v.photo ? "has-photo" : ""}">
        <span class="avail">Available</span>
        ${vehicleMedia(v)}
      </div>
      <div class="fleet-body">
        <span class="type">${v.use}</span>
        <h3>${v.name}</h3>
        <p>${v.text}</p>
        <div class="spec"><span>Load capacity</span><b>${v.capacity}</b></div>
        <a href="#quote" class="btn btn-primary" data-vehicle="${v.name}">Book this vehicle</a>
      </div>
    </div>`).join("");

  // Contact
  $("#contactIntro").textContent = T.contactIntro;
  $("#infoGrid").innerHTML = `
    <div class="info reveal">
      <div class="ic">${ICONS.phone}</div><h3>Call Us</h3>
      ${CONFIG.people.map(p => `<a class="line" href="tel:+${p.phone}"><b>${p.name}</b><span>${fmtPhone(p.phone)}</span></a>`).join("")}
    </div>
    <div class="info reveal">
      <div class="ic">${ICONS.chat}</div><h3>WhatsApp Us</h3>
      <p>For quick communication and quotations.</p>
      <a class="line" href="${waLink(CONFIG.whatsapp, "Hello, I want to enquire about transport service.")}" target="_blank" rel="noopener"><span>${fmtPhone(CONFIG.whatsapp)}</span></a>
      <a class="btn btn-green btn-sm" href="${waLink(CONFIG.whatsapp, "Hello, I want to enquire about transport service.")}" target="_blank" rel="noopener">Chat on WhatsApp</a>
    </div>
    <div class="info reveal">
      <div class="ic">${ICONS.route}</div><h3>Our Location</h3>
      <p>${CONFIG.address}</p>
    </div>
    <div class="info reveal">
      <div class="ic">${ICONS.mail}</div><h3>Email Us</h3>
      <a class="line" href="mailto:${CONFIG.email}"><span class="mail">${CONFIG.email}</span></a>
    </div>`;
  $("#mapAddress").textContent = "📍 " + CONFIG.address;
  $("#mapOpen").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.mapQuery);

  // Footer
  $("#footServices").innerHTML = CONFIG.services.map(s => `<li><a href="#services">${s.title}</a></li>`).join("");
  $("#footContact").innerHTML = `
    <li>${owner.name}: <a href="tel:+${owner.phone}">${fmtPhone(owner.phone)}</a></li>
    <li>${CONFIG.people[1].name}: <a href="tel:+${CONFIG.people[1].phone}">${fmtPhone(CONFIG.people[1].phone)}</a></li>
    <li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
    <li>Ghatkopar West, Mumbai</li>`;

  $("#waFloat").href = waLink(CONFIG.whatsapp, "Hello, I want to enquire about transport service.");
  $("#year").textContent = new Date().getFullYear();

  // built-in photos
  $$("img[data-photo]").forEach(i => { i.src = photoSrc(i.dataset.photo); });
}

/* ===================== home banner photo ===================== */
function loadHero() {
  const list = [CONFIG.heroImage].filter(Boolean);
  const tryNext = i => {
    if (i >= list.length) return;
    const img = new Image();
    img.onload = () => {
      $("#heroBg").style.backgroundImage = `url("${list[i]}")`;
      $("#hero").classList.add("has-photo");
    };
    img.onerror = () => tryNext(i + 1);
    img.src = list[i];
  };
  tryNext(0);
}

/* ===================== forms ===================== */
function setErr(input, bad) { input.closest(".field").classList.toggle("err", bad); return bad; }
const okPhone = v => /^[6-9]\d{9}$/.test(v.replace(/\D/g, "").slice(-10));

function bindForms() {
  const q = $("#quoteForm");
  q.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#qName"), phone = $("#qPhone"), pick = $("#qPickup"), drop = $("#qDrop"), goods = $("#qGoods");
    let bad = false;
    bad = setErr(name,  name.value.trim().length < 2) || bad;
    bad = setErr(phone, !okPhone(phone.value)) || bad;
    bad = setErr(pick,  !pick.value.trim()) || bad;
    bad = setErr(drop,  !drop.value.trim()) || bad;
    bad = setErr(goods, !goods.value.trim()) || bad;
    if (bad) { toast("Please fill all the fields correctly"); return; }
    const msg =
`*New Quote Request*
Name: ${name.value.trim()}
Phone: ${phone.value.trim()}
Pickup: ${pick.value.trim()}
Delivery: ${drop.value.trim()}
Goods: ${goods.value.trim()}`;
    window.open(waLink(CONFIG.whatsapp, msg), "_blank");
    toast("Opening WhatsApp. Please press send to submit your request.");
    q.reset();
  });

  const t = $("#trackForm");
  t.addEventListener("submit", e => {
    e.preventDefault();
    const no = $("#tNo"), ph = $("#tPhone");
    let bad = setErr(no, no.value.trim().length < 2);
    bad = setErr(ph, !okPhone(ph.value)) || bad;
    if (bad) return;
    const msg = `*Shipment Status Request*\nBooking / LR No: ${no.value.trim()}\nPhone: ${ph.value.trim()}\nPlease share the latest status.`;
    window.open(waLink(CONFIG.whatsapp, msg), "_blank");
    toast("Opening WhatsApp. Please press send.");
    t.reset();
  });

  $$("input,textarea").forEach(i => i.addEventListener("input", () => i.closest(".field")?.classList.remove("err")));

  $$("[data-vehicle]").forEach(b => b.addEventListener("click", () => {
    $("#qGoods").value = `Need vehicle: ${b.dataset.vehicle}. Goods: `;
  }));
}

/* ===================== page router (menu = pages) ===================== */
const PAGES = ["home", "about", "services", "fleet", "track", "quote", "contact"];
const TITLES = {
  home: "Sayyed Transport & Logistics | Goods Transport in Mumbai",
  about: "About Us | Sayyed Transport & Logistics",
  services: "Our Services | Sayyed Transport & Logistics",
  fleet: "Our Fleet | Sayyed Transport & Logistics",
  track: "Track Shipments | Sayyed Transport & Logistics",
  quote: "Request a Quote | Sayyed Transport & Logistics",
  contact: "Contact Us | Sayyed Transport & Logistics"
};
const header = $("#header");
let mapLoaded = false;

function route() {
  let id = (location.hash || "#home").slice(1);
  if (!PAGES.includes(id)) id = "home";

  PAGES.forEach(p => $("#page-" + p).classList.toggle("active", p === id));
  $$(".menu a.nl").forEach(a => a.classList.toggle("active", a.dataset.page === id));
  document.title = TITLES[id];

  $("#menu").classList.remove("open");
  $("#burger").classList.remove("open");
  $("#burger").setAttribute("aria-expanded", "false");

  if (id === "contact" && !mapLoaded) {
    $("#mapFrame").src = "https://www.google.com/maps?q=" + encodeURIComponent(CONFIG.mapQuery) + "&output=embed";
    mapLoaded = true;
  }
  window.scrollTo(0, 0);
  header.classList.remove("scrolled");
  // reveal items on the new page
  setTimeout(observeReveals, 50);
}

let io;
function observeReveals() {
  if (!io) io = new IntersectionObserver((es, o) => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); o.unobserve(en.target); }
  }), { threshold: .12 });
  $$(".page.active .reveal:not(.in)").forEach(el => io.observe(el));
}

function bindUI() {
  const burger = $("#burger"), menu = $("#menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });
  window.addEventListener("hashchange", route);
}

window.addEventListener("DOMContentLoaded", () => {
  render();
  bindForms();
  bindUI();
  route();
  loadHero();
});
