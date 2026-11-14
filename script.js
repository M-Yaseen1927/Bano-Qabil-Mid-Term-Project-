const C = {
  dress0: { t: "dress", n: "Peach dress", s: "assets/dress0.webp" },
  dress1: { t: "dress", n: "Plum dress", s: "assets/dress1.webp" },
  dress2: { t: "dress", n: "Pink flare dress", s: "assets/dress2.webp" },
  dress3: { t: "dress", n: "Blue dress", s: "assets/dress3.webp" },
  jacket0: { t: "jacket", n: "Olive bomber", s: "assets/jacket0.webp" },
  jacket1: { t: "jacket", n: "Red quilted jacket", s: "assets/jacket1.webp" },
  jacket2: { t: "jacket", n: "Green long coat", s: "assets/jacket2.webp" },
  jacket3: { t: "jacket", n: "Grey puffer jacket", s: "assets/jacket3.webp" },
  pants0: { t: "pants", n: "Khaki joggers", s: "assets/pants0.webp" },
  pants1: { t: "pants", n: "Slim jeans", s: "assets/pants1.webp" },
  pants2: { t: "pants", n: "Dark jeans", s: "assets/pants2.webp" },
  pants3: { t: "pants", n: "Green pants", s: "assets/pants3.webp" },
  shirt0: { t: "shirt", n: "Check shirt", s: "assets/shirt0.webp" },
  shirt1: { t: "shirt", n: "Cream check shirt", s: "assets/shirt1.webp" },
  shirt2: { t: "shirt", n: "Blue shirt", s: "assets/shirt2.webp" },
  shirt3: { t: "shirt", n: "Print shirt", s: "assets/shirt3.webp" },
  shirt4: { t: "shirt", n: "Denim shirt", s: "assets/shirt4.webp" },
  shirt5: { t: "shirt", n: "White shirt", s: "assets/shirt5.webp" },
  shirt6: { t: "shirt", n: "Navy shirt", s: "assets/shirt6.webp" },
  sweater0: { t: "sweater", n: "Striped sweater", s: "assets/sweater0.webp" },
  sweater1: { t: "sweater", n: "Argyle sweater", s: "assets/sweater1.webp" },
  sweater2: { t: "sweater", n: "Striped cardigan", s: "assets/sweater2.webp" },
  sweater3: { t: "sweater", n: "Navy sweater", s: "assets/sweater3.webp" },
  tee0: { t: "tee", n: "Yellow top", s: "assets/tee0.webp" },
  tee1: { t: "tee", n: "White tee", s: "assets/tee1.webp" },
  tee2: { t: "tee", n: "Print tee", s: "assets/tee2.webp" },
  tee3: { t: "tee", n: "Sport tee", s: "assets/tee3.webp" },
  tee4: { t: "tee", n: "Black tee", s: "assets/tee4.webp" },
  tee5: { t: "tee", n: "Graphic tee", s: "assets/tee5.webp" },
};
const CAT = {
  hoodie: "Tops",
  kurta: "Tops",
  skirt: "Bottoms",
  shorts: "Bottoms",
  tee: "Tops",
  shirt: "Tops",
  sweater: "Tops",
  jacket: "Tops",
  dress: "Dresses",
  pants: "Bottoms",
};
const POS = {
  hoodie: [16, 22, 68],
  kurta: [18, 22, 64],
  skirt: [24, 46, 52],
  shorts: [26, 46, 48],
  tee: [20, 22, 60],
  shirt: [16, 22, 68],
  sweater: [16, 22, 68],
  jacket: [15, 22, 70],
  dress: [20, 22, 60],
  pants: [24, 46, 52],
};
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const store = {
  get(k, d) {
    try {
      return JSON.parse(localStorage.getItem(k)) || d;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  },
};
const im = (i, c = "") =>
  `<img class="${c}" src="${i.s}" alt="${i.n}" draggable="false">`;
const PAGES = ["home", "tryon", "almirah", "lookbook", "contact"];
function route(x) {
  const h = typeof x == "string" ? x : (location.hash || "#home").slice(1);
  const id = PAGES.includes(h) ? h : "home";
  $$(".page").forEach((p) => p.classList.toggle("on", p.id == id));
  $$("nav a,#drawer a").forEach((a) =>
    a.classList.toggle("on", a.hash == "#" + id)
  );
  scrollTo(0, 0);
}
addEventListener("hashchange", () => route());
const dr = $("#drawer"),
  sc = $("#scrim"),
  mb = $("#mb");
function openM() {
  dr.classList.add("open");
  sc.classList.add("open");
  mb.setAttribute("aria-expanded", "true");
  dr.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeM() {
  dr.classList.remove("open");
  sc.classList.remove("open");
  mb.setAttribute("aria-expanded", "false");
  dr.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
mb.onclick = () => (dr.classList.contains("open") ? closeM() : openM());
$("#mx").onclick = closeM;
sc.onclick = closeM;
addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeM();
});
addEventListener("resize", () => {
  if (innerWidth > 820) closeM();
});
const go = (h) => {
  closeM();
  closeP();
  ddClose();
  try {
    if (location.hash != "#" + h) history.replaceState(null, "", "#" + h);
  } catch (e) {}
  route(h);
  try {
    closeD();
  } catch (e) {}
};
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  if (a.dataset.pop) {
    e.preventDefault();
    openP(a.dataset.pop);
    return;
  }
  const h = a.getAttribute("href").slice(1);
  if (!PAGES.includes(h)) return;
  e.preventDefault();
  go(h);
  if (a.dataset.flt) {
    flt = a.dataset.flt;
    $$("#ft button").forEach((b) =>
      b.classList.toggle("on", b.textContent == flt)
    );
    drawW();
  }
  if (a.dataset.o) look(a.dataset.o);
  if (a.dataset.sc)
    setTimeout(() => {
      const el = document.getElementById(a.dataset.sc);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
});
$("#cut").innerHTML = im(C.jacket0) + im(C.dress2) + im(C.pants1);
$$("[data-g]").forEach((e) => (e.innerHTML = im(C[e.dataset.g])));
const rd = (f, cb) => {
  const r = new FileReader();
  r.onload = () => cb(r.result);
  r.readAsDataURL(f);
};
/* try-on */
const MQ =
  '<svg width="300" height="400" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dff2e6"/><stop offset="1" stop-color="#b5dcc4"/></linearGradient><linearGradient id="sk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3d6c8"/><stop offset=".5" stop-color="#f6ede4"/><stop offset="1" stop-color="#d9c9b9"/></linearGradient></defs><rect width="300" height="400" fill="url(#bg)"/><ellipse cx="150" cy="394" rx="78" ry="6" fill="#1f3a33" opacity=".18"/><g fill="url(#sk)" stroke="#c9b8a6" stroke-width="1"><ellipse cx="150" cy="40" rx="22" ry="27"/><rect x="141" y="62" width="18" height="30" rx="7"/><path d="M76 92Q150 78 224 92L230 112Q224 150 216 190Q224 206 226 224H74Q76 206 84 190Q76 150 70 112Z"/><path d="M76 94Q54 102 48 150L42 226Q41 234 50 234Q59 234 60 226L72 160Q76 132 90 112Z"/><path d="M224 94Q246 102 252 150L258 226Q259 234 250 234Q241 234 240 226L228 160Q224 132 210 112Z"/><path d="M80 222H148L143 390Q142 397 134 397H112Q104 397 104 390Z"/><path d="M152 222H220L196 390Q195 397 188 397H166Q157 397 157 390Z"/></g></svg>';
const ph = '<div class="m mq">' + MQ + "</div>";
let photo = null,
  sel = {},
  active = null;
const slot = (t) =>
  ["pants", "skirt", "shorts"].includes(t)
    ? "bottom"
    : t == "dress"
    ? "dress"
    : "top";
const layers = () => {
  const o = [];
  if (sel.dress) o.push(sel.dress);
  else {
    if (sel.bottom) o.push(sel.bottom);
    if (sel.top) o.push(sel.top);
  }
  return o;
};
const base = () => (photo ? `<img src="${photo}" alt="Your photo">` : ph);
const ov = () =>
  layers()
    .map(
      (l) =>
        `<div class="gl" style="left:${POS[l.t][0]}%;top:${
          POS[l.t][1]
        }%;width:${POS[l.t][2]}%">${im(l)}</div>`
    )
    .join("");
function render(w) {
  $("#before").innerHTML = base();
  $("#after").innerHTML = base() + (w ? ov() : "");
  fit();
}
function fit() {
  $$(".gl").forEach((e) => {
    e.style.setProperty("--s", $("#size").value / 100);
    e.style.setProperty("--y", $("#mv").value);
  });
  $("#sv").textContent = $("#size").value + "%";
}
$("#pk").innerHTML = Object.entries(C)
  .map(([k, v]) => `<button data-k="${k}" title="${v.n}">${im(v)}</button>`)
  .join("");
function put(it) {
  const s = slot(it.t);
  if (s == "dress") sel = { dress: it };
  else {
    delete sel.dress;
    sel[s] = it;
  }
}
function pick(k) {
  put(C[k]);
  active = k;
  $$("#pk button").forEach((b) => b.classList.toggle("sel", b.dataset.k == k));
  render(true);
}
$("#pk").onclick = (e) => {
  const b = e.target.closest("button");
  if (b) pick(b.dataset.k);
};
$("#up").onchange = (e) => {
  const f = e.target.files[0];
  if (f)
    rd(f, (d) => {
      photo = d;
      render(!!layers().length);
      $("#msg").textContent = "Photo loaded. Now pick a garment.";
    });
};
$("#cg").onchange = (e) => {
  const f = e.target.files[0];
  if (f)
    rd(f, (d) => {
      put({ t: $("#ct").value, s: d, n: "My garment" });
      active = null;
      render(true);
      $("#msg").textContent = "Your garment added.";
    });
};
$("#samp").onclick = () => {
  photo = null;
  render(!!layers().length);
};
$("#gen").onclick = () => {
  if (!layers().length) {
    $("#msg").textContent = "Please pick a garment first.";
    return;
  }
  render(true);
  if (innerWidth <= 780)
    $("#ba").scrollIntoView({ behavior: "smooth", block: "center" });
};
$("#clr").onclick = () => {
  sel = {};
  active = null;
  $$("#pk button").forEach((b) => b.classList.remove("sel"));
  render(false);
};
$("#size").oninput = $("#mv").oninput = fit;
$("#sl").oninput = (e) => {
  $("#after").style.clipPath = `inset(0 0 0 ${e.target.value}%)`;
  $("#bar").style.left = e.target.value + "%";
};
const img = (src) =>
  new Promise((r) => {
    const i = new Image();
    i.onload = () => r(i);
    i.onerror = () => r(null);
    i.src = src;
  });
$("#dl").onclick = async () => {
  const W = 600,
    H = 800,
    c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d");
  const gr = x.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, "#d8efe0");
  gr.addColorStop(1, "#b5dcc4");
  x.fillStyle = gr;
  x.fillRect(0, 0, W, H);
  const b = await img(
    photo || "data:image/svg+xml;charset=utf-8," + encodeURIComponent(MQ)
  );
  if (b) {
    const k = Math.max(W / (b.width || 300), H / (b.height || 400)),
      w = b.width * k,
      h = b.height * k;
    x.drawImage(b, (W - w) / 2, (H - h) / 2, w, h);
  }
  const s = $("#size").value / 100,
    yo = ($("#mv").value / 100) * H;
  for (const l of layers()) {
    const i = await img(l.s);
    const [a, tp, wd] = POS[l.t],
      w = (wd / 100) * W,
      w2 = w * s;
    if (i) {
      x.shadowColor = "rgba(0,0,0,.3)";
      x.shadowBlur = 10;
      x.drawImage(
        i,
        (a / 100) * W + (w - w2) / 2,
        (tp / 100) * H + yo,
        w2,
        (w2 * i.height) / i.width
      );
    }
  }
  const a = document.createElement("a");
  a.download = "try-clothy-look.png";
  try {
    a.href = c.toDataURL("image/png");
    a.click();
  } catch (e) {
    $("#msg").textContent = "Download blocked by the browser for this photo.";
  }
};
$("#sv2").onclick = () => {
  const L = layers();
  if (!L.length) {
    $("#msg").textContent = "Pick a garment first.";
    return;
  }
  L.forEach((l) => {
    const k = Object.keys(C).find((k) => C[k] === l);
    items.push(k ? { id: k } : l);
  });
  save();
  drawW();
  $("#msg").textContent = "Saved to your Almirah ✓";
};
/* almirah */
const get = (i) => (i.id ? C[i.id] : i);
let items = store.get(
    "tcl2",
    [
      "shirt0",
      "sweater0",
      "jacket1",
      "shirt4",
      "dress2",
      "dress1",
      "pants1",
      "pants3",
    ].map((id) => ({ id }))
  ),
  flt = "All";
const save = () =>
  store.set(
    "tcl2",
    items.filter((i) => i.id || i.s.length < 900000)
  );
$("#ft").innerHTML = ["All", "Tops", "Dresses", "Bottoms"]
  .map((c) => `<button class="${c == flt ? "on" : ""}">${c}</button>`)
  .join("");
$("#ft").onclick = (e) => {
  if (e.target.tagName == "BUTTON") {
    flt = e.target.textContent;
    $$("#ft button").forEach((b) => b.classList.toggle("on", b == e.target));
    drawW();
  }
};
const HANG =
  '<svg class="hgr" viewBox="0 0 64 36" aria-hidden="true"><path d="M32 13V9c0-2.4 2.3-3.6 4-2.5 1.6 1.1 1.3 3.4-.5 4.1" fill="none" stroke="#9aa5a1" stroke-width="1.7" stroke-linecap="round"/><path d="M32 13 5 29c-2 1.2-1.1 3.6 1.2 3.6h51.6c2.3 0 3.2-2.4 1.2-3.6Z" fill="#7a2e2a"/></svg>';
let vis = [],
  cur = 0;
function drawW() {
  vis = items
    .map((i, x) => [get(i), x])
    .filter(([i]) => flt == "All" || CAT[i.t] == flt);
  $("#in").innerHTML = vis.length
    ? vis
        .map(
          ([i, x], n) =>
            `<div class="h" data-x="${x}" style="--i:${n}" tabindex="0" role="button" aria-label="${
              i.n
            }"><div class="hg">${HANG}${im(i)}</div></div>`
        )
        .join("")
    : '<p class="note empty">Nothing here yet. Add a piece below.</p>';
  $("#cnt").textContent =
    items.length + (items.length == 1 ? " piece" : " pieces");
  $("#ams").innerHTML = ["Tops", "Dresses", "Bottoms"]
    .map(
      (c) =>
        `<div class="card cat num"><h3>${
          items.filter((i) => CAT[get(i).t] == c).length
        }</h3><p>${c} in your almirah</p></div>`
    )
    .join("");
  cap(-1);
}
function cap(x) {
  if (x < 0) {
    $("#cpn").innerHTML = "&nbsp;";
    $("#cpm").textContent = "Hover a piece to see it up close";
    return;
  }
  const i = get(items[x]);
  $("#cpn").textContent = i.n;
  $("#cpm").textContent = CAT[i.t] + " · click to open";
}
$("#in").onmouseover = (e) => {
  const h = e.target.closest(".h");
  if (h) cap(+h.dataset.x);
};
$("#in").onmouseleave = () => cap(-1);
$("#in").onfocusin = (e) => {
  const h = e.target.closest(".h");
  if (h) cap(+h.dataset.x);
};
$("#in").onkeydown = (e) => {
  if (e.key == "Enter" || e.key == " ") {
    const h = e.target.closest(".h");
    if (h) {
      e.preventDefault();
      openD(+h.dataset.x);
    }
  }
};
$("#in").onclick = (e) => {
  const h = e.target.closest(".h");
  if (h) openD(+h.dataset.x);
};
function renderD() {
  const [i] = vis[cur],
    p = (n) => String(n).padStart(2, "0");
  $("#dim").style.opacity = 0;
  setTimeout(() => {
    $("#dim").innerHTML = HANG + im(i);
    $("#dim").style.opacity = 1;
  }, 120);
  $("#dnum").textContent = p(cur + 1) + " / " + p(vis.length);
  $("#dn").textContent = i.n;
  $("#dd").textContent = CAT[i.t] + " in your almirah.";
}
function openD(x) {
  cur = Math.max(
    0,
    vis.findIndex((v) => v[1] == x)
  );
  renderD();
  $("#ov").classList.add("on");
  $("#dx").focus();
}
function closeD() {
  $("#ov").classList.remove("on");
}
function step(d) {
  if (!vis.length) return;
  cur = (cur + d + vis.length) % vis.length;
  renderD();
}
$("#dx").onclick = closeD;
$("#dp").onclick = () => step(-1);
$("#dnx").onclick = () => step(1);
$("#ov").onclick = (e) => {
  if (e.target.id == "ov") closeD();
};
addEventListener("keydown", (e) => {
  if (!$("#ov").classList.contains("on")) return;
  if (e.key == "Escape") closeD();
  if (e.key == "ArrowLeft") step(-1);
  if (e.key == "ArrowRight") step(1);
});
addEventListener("hashchange", closeD);
$("#dtry").onclick = () => {
  const x = vis[cur][1],
    i = items[x];
  closeD();
  go("tryon");
  setTimeout(() => {
    if (i.id) pick(i.id);
    else {
      put(i);
      active = null;
      render(true);
    }
  }, 50);
};
$("#drm").onclick = () => {
  items.splice(vis[cur][1], 1);
  save();
  drawW();
  if (!vis.length) {
    closeD();
    return;
  }
  cur = Math.min(cur, vis.length - 1);
  renderD();
};
/* auto background removal for uploaded photos */
function cutBg(src) {
  return new Promise((res) => {
    const I = new Image();
    I.onload = () => {
      try {
        const k = Math.min(1, 480 / Math.max(I.width, I.height)),
          w = Math.max(1, Math.round(I.width * k)),
          h = Math.max(1, Math.round(I.height * k)),
          c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const x = c.getContext("2d", { willReadFrequently: true });
        x.drawImage(I, 0, 0, w, h);
        const D = x.getImageData(0, 0, w, h),
          d = D.data;
        const px = (a, b) => (b * w + a) * 4,
          cs = [
            [0, 0],
            [w - 1, 0],
            [0, h - 1],
            [w - 1, h - 1],
          ].map(([a, b]) => {
            const o = px(a, b);
            return [d[o], d[o + 1], d[o + 2], d[o + 3]];
          });
        if (cs.some((q) => q[3] < 250)) {
          res(src);
          return;
        }
        const m = [0, 1, 2].map((j) => cs.reduce((s, q) => s + q[j], 0) / 4);
        if (
          cs.some(
            (q) =>
              Math.abs(q[0] - m[0]) +
                Math.abs(q[1] - m[1]) +
                Math.abs(q[2] - m[2]) >
              60
          )
        ) {
          res(src);
          return;
        }
        const T = 60,
          seen = new Uint8Array(w * h),
          st = [];
        const ok = (o) =>
          Math.abs(d[o] - m[0]) +
            Math.abs(d[o + 1] - m[1]) +
            Math.abs(d[o + 2] - m[2]) <
          T;
        const push = (a, b) => {
          const n = b * w + a;
          if (a < 0 || b < 0 || a >= w || b >= h || seen[n]) return;
          if (!ok(n * 4)) return;
          seen[n] = 1;
          st.push(n);
        };
        for (let a = 0; a < w; a++) {
          push(a, 0);
          push(a, h - 1);
        }
        for (let b = 0; b < h; b++) {
          push(0, b);
          push(w - 1, b);
        }
        while (st.length) {
          const n = st.pop(),
            a = n % w,
            b = (n - a) / w;
          push(a + 1, b);
          push(a - 1, b);
          push(a, b + 1);
          push(a, b - 1);
        }
        let cnt = 0;
        for (let n = 0; n < w * h; n++)
          if (seen[n]) {
            d[n * 4 + 3] = 0;
            cnt++;
          }
        /* soften the edge */
        for (let n = 0; n < w * h; n++) {
          if (seen[n]) continue;
          const a = n % w,
            b = (n - a) / w;
          if (
            (a > 0 && seen[n - 1]) ||
            (a < w - 1 && seen[n + 1]) ||
            (b > 0 && seen[n - w]) ||
            (b < h - 1 && seen[n + w])
          )
            d[n * 4 + 3] = 150;
        }
        if (cnt < w * h * 0.04) {
          res(src);
          return;
        }
        x.putImageData(D, 0, 0);
        let o = c.toDataURL("image/webp", 0.88);
        if (o.indexOf("image/webp") < 0) o = c.toDataURL("image/png");
        res(o);
      } catch (e) {
        res(src);
      }
    };
    I.onerror = () => res(src);
    I.src = src;
  });
}
$("#ad").onclick = () => {
  const f = $("#af").files[0];
  if (!f) {
    $("#am").textContent = "Please choose a garment photo first.";
    return;
  }
  $("#am").textContent = "Removing background…";
  rd(f, async (d) => {
    const s = await cutBg(d);
    items.push({
      n: $("#an").value.trim() || "New item",
      t: $("#at").value,
      s,
    });
    save();
    $("#an").value = "";
    $("#af").value = "";
    $("#am").textContent = "Added to your rail ✓";
    flt = "All";
    $$("#ft button").forEach((b, i) => b.classList.toggle("on", !i));
    drawW();
  });
};
/* lookbook */
const OC = {
  Casual: [
    ["College day", "Relaxed and easy for classes.", ["tee1", "pants1"]],
    ["Weekend walk", "Fresh and simple.", ["sweater0", "pants3"]],
  ],
  Office: [
    ["Smart formal", "Sharp layers for meetings.", ["shirt5", "pants2"]],
    ["Soft formal", "Calm and confident.", ["shirt6", "pants2"]],
  ],
  Party: [
    ["Evening glow", "Standout dress for the night.", ["dress1"]],
    ["Night out", "Classic and simple.", ["dress2"]],
  ],
  Wedding: [
    ["Garden ceremony", "Light and elegant.", ["dress0"]],
    ["Reception", "Rich colour for the evening.", ["dress3"]],
  ],
};
function look(o) {
  $("#lk").innerHTML = OC[o]
    .map(
      (l, i) =>
        `<div class="card look"><div class="r">${l[2]
          .map((k) => im(C[k]))
          .join("")}</div><h3>${l[0]}</h3><p class="note">${
          l[1]
        }</p><button class="btn ghost" data-o="${o}" data-i="${i}">Try this look</button></div>`
    )
    .join("");
  $$("#tb button").forEach((b) => b.classList.toggle("on", b.textContent == o));
}
$("#tb").innerHTML = Object.keys(OC)
  .map((o) => `<button>${o}</button>`)
  .join("");
$("#tb").onclick = (e) => {
  if (e.target.tagName == "BUTTON") look(e.target.textContent);
};
$("#lk").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  sel = {};
  OC[b.dataset.o][+b.dataset.i][2].forEach((k) => put(C[k]));
  active = null;
  go("tryon");
  setTimeout(() => render(true), 50);
};
$("#shop").innerHTML = Object.entries(C)
  .map(
    ([k, v]) =>
      `<div class="prod">${im(v)}<p><b>${
        v.n
      }</b></p><button class="btn ghost" data-k="${k}">Try on</button></div>`
  )
  .join("");
$("#shop").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  go("tryon");
  setTimeout(() => pick(b.dataset.k), 50);
};
$("#cf").onsubmit = (e) => {
  e.preventDefault();
  const s = encodeURIComponent($("#cs").value + " – " + $("#cn").value),
    b = encodeURIComponent($("#cm").value + "\n\nFrom: " + $("#ce").value);
  $("#ok").textContent = "Thank you! Opening your email app…";
  location.href = `mailto:hello@tryclothy.com?subject=${s}&body=${b}`;
  e.target.reset();
};

/* home extras + samples */
const prodCard = (k, v) =>
  `<div class="prod">${im(v)}<p><b>${
    v.n
  }</b></p><button class="btn ghost" data-k="${k}">Try on</button></div>`;
$("#feat").innerHTML = ["shirt4", "dress2", "jacket1", "pants1"]
  .map((k) => prodCard(k, C[k]))
  .join("");
$("#feat").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  go("tryon");
  setTimeout(() => pick(b.dataset.k), 50);
};
$("#bn").innerHTML = ["sweater0", "jacket1", "shirt5"]
  .map((k) => im(C[k]))
  .join("");
$("#bn2").innerHTML = ["dress1", "shirt4", "pants3"]
  .map((k) => im(C[k]))
  .join("");
const OS = {
  Casual: "College and weekends",
  Office: "Meetings and formal days",
  Party: "Nights out",
  Wedding: "Ceremony and reception",
};
$("#occ").innerHTML = Object.keys(OC)
  .map((o) => `<button data-o="${o}"><b>${o}</b><span>${OS[o]}</span></button>`)
  .join("");
$("#occ").onclick = (e) => {
  const b = e.target.closest("button");
  if (b) {
    go("lookbook");
    look(b.dataset.o);
  }
};
function applyLook(o, i) {
  sel = {};
  OC[o][i][2].forEach((k) => put(C[k]));
  active = null;
  $$("#pk button").forEach((b) => b.classList.remove("sel"));
  render(true);
  $("#msg").textContent = "Sample outfit applied. Slide the bar to compare.";
}
$("#ts").innerHTML = Object.entries(OC)
  .flatMap(([o, L]) =>
    L.map(
      (l, i) =>
        `<div class="card look"><div class="r">${l[2]
          .map((k) => im(C[k]))
          .join("")}</div><h3>${l[0]}</h3><p class="note">${o} · ${
          l[1]
        }</p><button class="btn ghost" data-o="${o}" data-i="${i}">Try this sample</button></div>`
    )
  )
  .join("");
$("#ts").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  applyLook(b.dataset.o, +b.dataset.i);
  const s = $("#tryon .studio");
  const bx = $("#ba");
  (innerWidth <= 780 ? bx : s).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/* custom glass dropdowns */
const ddm = document.createElement("div");
ddm.id = "ddm";
ddm.setAttribute("role", "listbox");
document.body.appendChild(ddm);
let ddBtn = null,
  ddSel = null,
  ddAct = -1;
function ddSync(s) {
  const b = s._b;
  if (b)
    b.textContent = s.options[s.selectedIndex]
      ? s.options[s.selectedIndex].text
      : "";
}
function ddClose() {
  ddm.classList.remove("open");
  if (ddBtn) ddBtn.setAttribute("aria-expanded", "false");
  ddBtn = null;
  ddSel = null;
}
function ddOpen(b, s) {
  ddClose();
  ddBtn = b;
  ddSel = s;
  ddAct = s.selectedIndex;
  ddm.innerHTML = [...s.options]
    .map(
      (o, i) =>
        `<div class="di${
          i == s.selectedIndex ? " sel" : ""
        }" role="option" data-i="${i}">${o.text}</div>`
    )
    .join("");
  const r = b.getBoundingClientRect();
  ddm.style.width = r.width + "px";
  ddm.style.left =
    Math.max(6, Math.min(r.left, innerWidth - r.width - 6)) + "px";
  ddm.classList.add("open");
  const h = Math.min(ddm.scrollHeight, 260),
    below = innerHeight - r.bottom;
  if (below < h + 14 && r.top > below) {
    ddm.style.top = "auto";
    ddm.style.bottom = innerHeight - r.top + 6 + "px";
  } else {
    ddm.style.bottom = "auto";
    ddm.style.top = r.bottom + 6 + "px";
  }
  b.setAttribute("aria-expanded", "true");
  const sel = ddm.querySelector(".sel");
  if (sel) ddm.scrollTop = sel.offsetTop - 60;
}
function ddPick(i) {
  if (!ddSel) return;
  ddSel.selectedIndex = i;
  ddSel.dispatchEvent(new Event("change", { bubbles: true }));
  ddSync(ddSel);
  const b = ddBtn;
  ddClose();
  if (b) b.focus();
}
$$("select").forEach((s) => {
  s.classList.add("nat");
  const w = document.createElement("div");
  w.className = "dd";
  s.parentNode.insertBefore(w, s);
  const b = document.createElement("button");
  b.type = "button";
  b.className = "ddb";
  b.setAttribute("aria-haspopup", "listbox");
  b.setAttribute("aria-expanded", "false");
  w.appendChild(b);
  w.appendChild(s);
  s._b = b;
  ddSync(s);
  b.onclick = () => (ddBtn === b ? ddClose() : ddOpen(b, s));
  b.onkeydown = (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key) && ddBtn !== b) {
      e.preventDefault();
      ddOpen(b, s);
    }
  };
});
ddm.onclick = (e) => {
  const d = e.target.closest(".di");
  if (d) ddPick(+d.dataset.i);
};
ddm.onmousemove = (e) => {
  const d = e.target.closest(".di");
  if (d) {
    ddAct = +d.dataset.i;
    $$("#ddm .di").forEach((x) => x.classList.toggle("act", x == d));
  }
};
document.addEventListener("mousedown", (e) => {
  if (ddBtn && !e.target.closest("#ddm") && !e.target.closest(".ddb"))
    ddClose();
});
document.addEventListener(
  "touchstart",
  (e) => {
    if (ddBtn && !e.target.closest("#ddm") && !e.target.closest(".ddb"))
      ddClose();
  },
  { passive: true }
);
addEventListener(
  "scroll",
  (e) => {
    if (ddBtn && !(e.target && e.target.id == "ddm")) ddClose();
  },
  true
);
addEventListener("resize", ddClose);
document.addEventListener("keydown", (e) => {
  if (!ddBtn) return;
  const n = ddSel.options.length;
  if (e.key == "Escape") {
    e.preventDefault();
    const b = ddBtn;
    ddClose();
    b.focus();
  } else if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    e.preventDefault();
    ddAct = (ddAct + (e.key == "ArrowDown" ? 1 : -1) + n) % n;
    $$("#ddm .di").forEach((x, i) => x.classList.toggle("act", i == ddAct));
    const a = ddm.querySelector(".act");
    if (a) a.scrollIntoView({ block: "nearest" });
  } else if (e.key == "Enter" || e.key == " ") {
    e.preventDefault();
    ddPick(ddAct);
  } else if (e.key == "Tab") ddClose();
});
document.addEventListener("reset", () =>
  setTimeout(() => $$("select").forEach(ddSync), 0)
);
/* footer: policies + newsletter */
const POL = {
  privacy: [
    "Privacy policy",
    "<p>Your photos are used only inside your browser to build the try-on preview. They are not uploaded to a server.</p><p>Your almirah is saved on your own device using browser storage. Clearing your browser data removes it.</p><p>When you use the contact form or the newsletter box, your email app opens with your message. We only receive what you choose to send.</p>",
  ],
  terms: [
    "Terms of use",
    "<p>Try-on previews are a guide. Colour, fit and fabric can look different in person.</p><p>Product images are for illustration. Only upload photos you have the right to use.</p><p>These terms may be updated from time to time.</p>",
  ],
  ship: [
    "Shipping and returns",
    '<p>Delivery options, timelines and return rules are confirmed with you for each order.</p><p>For help with sizes, exchanges or returns, email <a href="mailto:hello@tryclothy.com" style="color:var(--deep);font-weight:700">hello@tryclothy.com</a> with your order details and we will get back to you.</p>',
  ],
};
function openP(k) {
  $("#pc").innerHTML = "<h2>" + POL[k][0] + "</h2>" + POL[k][1];
  $("#pop").classList.add("on");
}
function closeP() {
  $("#pop").classList.remove("on");
}
$("#px").onclick = closeP;
$("#pop").onclick = (e) => {
  if (e.target.id == "pop") closeP();
};
addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeP();
});
$("#nl").onsubmit = (e) => {
  e.preventDefault();
  const m = $("#nle").value;
  $("#nlm").textContent = "Thank you! Opening your email app…";
  location.href =
    "mailto:hello@tryclothy.com?subject=" +
    encodeURIComponent("Newsletter signup") +
    "&body=" +
    encodeURIComponent("Please add me to the Try Clothy newsletter: " + m);
  e.target.reset();
};
render(false);
drawW();
look("Casual");
route();
