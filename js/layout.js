/* ── Layout: header + bottom nav, auth guard, language/voice ── */
(function () {
  const lang        = localStorage.getItem(Config.KEYS.LANG)  || "ar";
  const voiceOn     = localStorage.getItem(Config.KEYS.VOICE) !== "false";
  const isAr        = lang === "ar";

  /* Apply direction ------------------------------------------------- */
  document.documentElement.lang = lang;
  document.documentElement.dir  = isAr ? "rtl" : "ltr";

  /* Voice ----------------------------------------------------------- */
  window.speak = function (text) {
    if (!voiceOn || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = isAr ? "ar-SA" : "en-US";
    speechSynthesis.speak(u);
  };

  /* Logo SVG -------------------------------------------------------- */
  const LOGO_SVG = `<svg width="38" height="30" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="22" cy="30" rx="16" ry="2.5" fill="currentColor" opacity=".10"/>
    <rect x="2" y="19" width="40" height="3" rx="1.5" fill="currentColor"/>
    <path d="M2 22 Q10 8 18 22" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M26 22 Q34 8 42 22" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <line x1="10" y1="13" x2="10" y2="19" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
    <line x1="34" y1="13" x2="34" y2="19" stroke="currentColor" stroke-width="1.2" opacity=".6"/>
    <circle cx="14" cy="10" r="2.2" fill="currentColor"/>
    <line x1="14" y1="12.2" x2="14" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="14" y1="14" x2="18" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="14" y1="16" x2="12" y2="19" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="14" y1="16" x2="16" y2="19" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="28" cy="10" r="2.2" fill="currentColor"/>
    <line x1="28" y1="12.2" x2="28" y2="18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <line x1="28" y1="14" x2="24" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="28" y1="16" x2="26" y2="19" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="28" y1="16" x2="30" y2="19" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="21" cy="15.8" r="1.4" fill="currentColor" opacity=".85"/>
  </svg>`;

  /* Nav icons (SVG strings) ---------------------------------------- */
  const ICONS = {
    home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    users:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    layers:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    bag:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    volOn:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    volOff:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
  };

  /* Render ---------------------------------------------------------- */
  function render(user) {
    const activePage = document.body.dataset.page || "";
    const requireAuth = document.body.dataset.requireAuth === "true";

    if (requireAuth && !user) {
      location.href = "/login.html";
      return;
    }

    const navItems = [
      { href: "/",                  label: T("nav.home"),         page: "home",         icon: ICONS.home   },
      { href: "/disabilities.html", label: T("nav.disabilities"), page: "disabilities", icon: ICONS.users  },
      { href: "/services.html",     label: T("nav.services"),     page: "services",     icon: ICONS.layers },
    ];
    if (user) navItems.push({ href: "/orders.html", label: T("nav.orders"), page: "orders", icon: ICONS.bag });

    /* Header */
    const desktopNav = navItems.map(n =>
      `<a href="${n.href}" class="nav-link${n.page === activePage ? " active" : ""}">${n.label}</a>`
    ).join("");

    const authHtml = user
      ? `<span class="header-username">${user.name}</span>
         <button class="btn btn-outline btn-sm" onclick="Layout.logout()">${T("nav.logout")}</button>`
      : `<button class="btn btn-primary btn-sm" onclick="location.href='/login.html'">${T("nav.login")}</button>`;

    document.getElementById("layout-header").innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a href="/" class="logo-link">${LOGO_SVG}<span class="logo-text">${T("app.name")}</span></a>
          <nav class="desktop-nav">${desktopNav}</nav>
          <div class="header-actions">
            <button class="icon-btn${voiceOn ? " active" : ""}" onclick="Layout.toggleVoice()" title="${isAr ? "تبديل الصوت" : "Toggle voice"}">${voiceOn ? ICONS.volOn : ICONS.volOff}</button>
            <button class="btn btn-ghost btn-sm lang-btn" onclick="Layout.toggleLang()">${isAr ? "English" : "العربية"}</button>
            ${authHtml}
          </div>
        </div>
      </header>`;

    /* Bottom nav */
    document.getElementById("layout-bottom-nav").innerHTML = `
      <nav class="bottom-nav" aria-label="التنقل الرئيسي">
        ${navItems.map(n => `
          <a href="${n.href}" class="bnav-item${n.page === activePage ? " active" : ""}">
            <span class="bnav-icon">${n.icon}</span>
            <span class="bnav-label">${n.label}</span>
          </a>`).join("")}
      </nav>`;

    /* Fire ready event after all scripts have registered their listeners */
    setTimeout(() => window.dispatchEvent(new CustomEvent("layout-ready", { detail: { user } })), 0);
  }

  /* Init ------------------------------------------------------------ */
  const token = localStorage.getItem(Config.KEYS.TOKEN);
  if (token) {
    API.getMe()
      .then(render)
      .catch(() => {
        localStorage.removeItem(Config.KEYS.TOKEN);
        render(null);
      });
  } else {
    render(null);
  }

  /* Public helpers -------------------------------------------------- */
  window.Layout = {
    logout() {
      localStorage.removeItem(Config.KEYS.TOKEN);
      location.href = "/";
    },
    toggleLang() {
      localStorage.setItem(Config.KEYS.LANG, isAr ? "en" : "ar");
      location.reload();
    },
    toggleVoice() {
      localStorage.setItem(Config.KEYS.VOICE, voiceOn ? "false" : "true");
      location.reload();
    },
  };
})();