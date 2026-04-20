import { useState, type JSX } from "react";
import { PRODUCTS } from "./containers/Product";
/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
// interface Product {
//   id: number;
//   cat: string;
//   featured?: boolean;
//   name: string;
//   brand: string;
//   model: string;
//   price: number;
//   stock: boolean;
//   desc: string;
//   specs: Record<string, string>;
// }

interface CartItem extends Product {
  qty: number;
}

type ModalType = "enquiry" | "checkout" | null;

/* ═══════════════════════════════════════════════════════════
   DATA LAYER — swap fetch() / API call here in production
   ═══════════════════════════════════════════════════════════ */
const BRAND = {
  nameJa: "高精密",
  name: "Kaisen Tools",
  tagline: "Japanese Precision Engineering · Singapore",
  email: "enquiries@koseiprecision.com.sg",
  phone: "+65 6234 5678",
  address: "10 Ubi Crescent, #04-88 Ubi TechPark, Singapore 408564",
  uen: "202XXXXXXX",
  gst: "MX-XXXXXXX",
};

// const PRODUCTS: Product[] = [
//   {
//     id: 1, cat: "Micrometers", featured: true,
//     name: "Digimatic Outside Micrometer", brand: "Mitutoyo", model: "MDC-25MX",
//     price: 485, stock: true,
//     desc: "Digital outside micrometer with 0.001mm resolution and absolute encoder. IP65 rated for workshop environments. SPC data output via RS-232C for statistical process control integration.",
//     specs: { Range: "0–25 mm", Resolution: "0.001 mm", Accuracy: "±0.001 mm", Protection: "IP65", Output: "SPC / RS-232C" },
//   },
//   {
//     id: 2, cat: "Micrometers",
//     name: "Bore Micrometer Set", brand: "Mitutoyo", model: "368-917",
//     price: 1240, stock: true,
//     desc: "5-piece inside micrometer set for accurate bore and internal diameter measurement. Includes fitted case with calibration certificate.",
//     specs: { Range: "50–300 mm", Resolution: "0.001 mm", Accuracy: "±0.003 mm", Contents: "5-piece set", Certificate: "Included" },
//   },
//   {
//     id: 3, cat: "Calipers", featured: true,
//     name: "Absolute Digimatic Caliper", brand: "Mitutoyo", model: "500-196-30",
//     price: 320, stock: true,
//     desc: "IP67-rated digital vernier caliper with absolute-scale encoder. No re-zeroing required at power-on. Includes data output port for SPC integration.",
//     specs: { Range: "0–150 mm", Resolution: "0.01 mm", Accuracy: "±0.02 mm", Protection: "IP67", Origin: "Absolute" },
//   },
//   {
//     id: 4, cat: "Calipers",
//     name: "Long Jaw Vernier Caliper", brand: "Niigata Seiki", model: "SK-LJ300",
//     price: 185, stock: true,
//     desc: "300mm vernier caliper with extended 100mm jaw depth for measuring deep recesses, channels, and internal features. Stainless steel construction.",
//     specs: { Range: "0–300 mm", Resolution: "0.02 mm", "Jaw Depth": "100 mm", Material: "Stainless Steel" },
//   },
//   {
//     id: 5, cat: "Gauges",
//     name: "Dial Test Indicator", brand: "Mitutoyo", model: "513-404-10E",
//     price: 275, stock: false,
//     desc: "Lever-type dial test indicator ideal for machine setups, surface alignment, concentricity and run-out inspection. Dovetail mounting for universal holders.",
//     specs: { Range: "±0.14 mm", Graduation: "0.001 mm", Accuracy: "±0.003 mm", Mounting: "Dovetail" },
//   },
//   {
//     id: 6, cat: "Gauges", featured: true,
//     name: "Digimatic Height Gauge", brand: "Mitutoyo", model: "192-631-10",
//     price: 890, stock: true,
//     desc: "600mm digital height gauge for precision layout marking and dimensional inspection on surface plates. IP67 rated with SPC output.",
//     specs: { Range: "0–600 mm", Resolution: "0.001 mm", Accuracy: "±0.015 mm", Protection: "IP67", Output: "SPC / RS-232C" },
//   },
//   {
//     id: 7, cat: "Surface Plates",
//     name: "Granite Surface Plate Grade A", brand: "Shinto", model: "SP-630A",
//     price: 2100, stock: true,
//     desc: "630×400×80mm Grade A black granite surface plate. Low thermal expansion coefficient. Supplied with fabricated steel stand and JIS-compliant calibration certificate.",
//     specs: { Dimensions: "630×400×80 mm", Grade: "Grade A (JIS B7513)", Material: "Black Granite", Flatness: "0.006 mm", Certificate: "JIS Calibration" },
//   },
//   {
//     id: 8, cat: "Torque Tools", featured: true,
//     name: "Digital Torque Wrench 100Nm", brand: "Tohnichi", model: "DQLZ100N4-S",
//     price: 680, stock: true,
//     desc: "100Nm digital torque wrench with peak-hold mode, buzzer and LED alert at target torque. Internal memory for 50 measurements. JCSS traceable calibration certificate.",
//     specs: { Range: "20–100 Nm", Accuracy: "±3%", Drive: "1/2 inch square", Display: "Digital LCD", Memory: "50 readings", Certificate: "JCSS" },
//   },
//   {
//     id: 9, cat: "Torque Tools",
//     name: "Cam-Over Torque Screwdriver Set", brand: "Tohnichi", model: "RTD12CN2-S",
//     price: 420, stock: true,
//     desc: "Preset cam-over torque screwdriver set. Safety cam-over mechanism prevents over-torquing. 6-piece interchangeable blade set with carry case included.",
//     specs: { Range: "1.2–12 Nm", Accuracy: "±6%", Mechanism: "Cam-over", Blades: "6-piece set" },
//   },
// ];

const CATS = ["All", "Micrometers", "Calipers", "Gauges", "Surface Plates", "Torque Tools"];

/* ═══════════════════════════════
   SVG PRODUCT ILLUSTRATIONS
   ═══════════════════════════════ */
const ProductVisual = ({ cat }: { cat: string }) => {
  const nv = "#0D2040", rd = "#C41230", gd = "#B8924A";
  const visuals: Record<string, JSX.Element> = {
    Micrometers: (
      <svg viewBox="0 0 160 100" style={{ width: "100%", height: "100%" }}>
        <path d="M18,28 L18,72 Q18,76 22,76 L42,76 L42,55 L88,55 L88,76 L108,76 Q112,76 112,72 L112,28 Q112,24 108,24 L88,24 L88,45 L42,45 L42,24 L22,24 Q18,24 18,28Z" fill="none" stroke={nv} strokeWidth="2.5" opacity="0.35" />
        <rect x="112" y="46" width="40" height="8" rx="1.5" fill={nv} opacity="0.25" />
        <rect x="112" y="47" width="38" height="6" rx="1" fill={nv} opacity="0.4" />
        <rect x="134" y="38" width="20" height="24" rx="3" fill={nv} opacity="0.12" stroke={nv} strokeWidth="1" style={{ strokeOpacity: 0.3 }} />
        {[0, 1, 2, 3, 4].map(i => <line key={i} x1="134" y1={42 + i * 4} x2="154" y2={42 + i * 4} stroke={nv} strokeWidth="0.6" opacity="0.35" />)}
        <line x1="42" y1="50" x2="88" y2="50" stroke={rd} strokeWidth="1.5" opacity="0.7" />
        <circle cx="65" cy="50" r="2" fill={rd} opacity="0.5" />
        <text x="90" y="100" fontSize="8" fill={nv} fontFamily="monospace" opacity="0.3" fontStyle="italic">0.001mm</text>
      </svg>
    ),
    Calipers: (
      <svg viewBox="0 0 160 100" style={{ width: "100%", height: "100%" }}>
        <rect x="8" y="44" width="144" height="12" rx="2" fill={nv} opacity="0.15" />
        <rect x="8" y="22" width="9" height="38" rx="1.5" fill={nv} opacity="0.38" />
        <rect x="8" y="60" width="9" height="20" rx="1.5" fill={nv} opacity="0.32" />
        <rect x="72" y="22" width="9" height="38" rx="1.5" fill={nv} opacity="0.38" />
        <rect x="72" y="60" width="9" height="20" rx="1.5" fill={nv} opacity="0.32" />
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={i} x1={10 + i * 10} y1="44" x2={10 + i * 10} y2={i % 5 === 0 ? 39 : 41} stroke={nv} strokeWidth="0.8" opacity="0.45" />
        ))}
        <line x1="17" y1="50" x2="72" y2="50" stroke={rd} strokeWidth="1" strokeDasharray="3,2" opacity="0.65" />
        <rect x="98" y="40" width="40" height="18" rx="2" fill="white" stroke={nv} strokeWidth="1" opacity="0.7" />
        <text x="118" y="52" fontSize="8" fill={nv} fontFamily="monospace" textAnchor="middle" fontWeight="500" opacity="0.85">25.48</text>
        <rect x="155" y="28" width="6" height="22" rx="1" fill={nv} opacity="0.2" />
      </svg>
    ),
    Gauges: (
      <svg viewBox="0 0 160 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="80" cy="48" r="36" fill="white" stroke={nv} strokeWidth="2" opacity="0.35" />
        <circle cx="80" cy="48" r="33" fill="none" stroke={nv} strokeWidth="0.5" opacity="0.15" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const r1 = i % 6 === 0 ? 22 : i % 3 === 0 ? 24 : 26;
          return <line key={i} x1={80 + Math.cos(a) * r1} y1={48 + Math.sin(a) * r1} x2={80 + Math.cos(a) * 33} y2={48 + Math.sin(a) * 33} stroke={nv} strokeWidth={i % 6 === 0 ? 1.4 : 0.7} opacity="0.5" />;
        })}
        {[0, 6, 12, 18].map((idx, j) => {
          const a = (idx / 24) * Math.PI * 2 - Math.PI / 2;
          return <text key={idx} x={80 + Math.cos(a) * 19} y={48 + Math.sin(a) * 19 + 3} fontSize="6" fill={nv} textAnchor="middle" opacity="0.6">{j * 25}</text>;
        })}
        <line x1="80" y1="48" x2={80 + Math.cos(-Math.PI / 2 + 1.1) * 26} y2={48 + Math.sin(-Math.PI / 2 + 1.1) * 26} stroke={rd} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <circle cx="80" cy="48" r="3.5" fill={nv} opacity="0.5" />
        <circle cx="80" cy="48" r="1.5" fill="white" />
        <rect x="76" y="84" width="8" height="12" rx="1.5" fill={nv} opacity="0.25" />
      </svg>
    ),
    "Surface Plates": (
      <svg viewBox="0 0 160 100" style={{ width: "100%", height: "100%" }}>
        <rect x="12" y="26" width="136" height="38" rx="3" fill={nv} opacity="0.1" stroke={nv} strokeWidth="1.5" style={{ strokeOpacity: 0.3 }} />
        <rect x="12" y="26" width="136" height="5" rx="1" fill={nv} opacity="0.18" />
        {Array.from({ length: 7 }).map((_, i) => <line key={`v${i}`} x1={28 + i * 18} y1="31" x2={28 + i * 18} y2="64" stroke={nv} strokeWidth="0.5" opacity="0.18" />)}
        {Array.from({ length: 3 }).map((_, i) => <line key={`h${i}`} x1="12" y1={36 + i * 10} x2="148" y2={36 + i * 10} stroke={nv} strokeWidth="0.5" opacity="0.18" />)}
        <rect x="22" y="64" width="18" height="22" rx="1.5" fill={nv} opacity="0.18" />
        <rect x="120" y="64" width="18" height="22" rx="1.5" fill={nv} opacity="0.18" />
        <circle cx="80" cy="45" r="4" fill="none" stroke={rd} strokeWidth="1.5" opacity="0.7" />
      </svg>
    ),
    "Torque Tools": (
      <svg viewBox="0 0 160 100" style={{ width: "100%", height: "100%" }}>
        <rect x="6" y="40" width="82" height="18" rx="9" fill={nv} opacity="0.18" />
        <rect x="86" y="33" width="26" height="32" rx="3" fill={nv} opacity="0.28" stroke={nv} strokeWidth="1" style={{ strokeOpacity: 0.25 }} />
        <rect x="112" y="43" width="16" height="12" rx="1.5" fill={nv} opacity="0.38" />
        <rect x="128" y="46" width="20" height="6" rx="1" fill={nv} opacity="0.25" />
        <rect x="32" y="41" width="34" height="16" rx="2" fill="white" stroke={nv} strokeWidth="0.8" opacity="0.8" />
        <text x="49" y="51" fontSize="7.5" fill={nv} fontFamily="monospace" textAnchor="middle" fontWeight="500" opacity="0.9">25.0 Nm</text>
        <path d="M92,18 Q115,10 128,34" fill="none" stroke={rd} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.55" />
        <polygon points="128,34 122,27 132,28" fill={rd} opacity="0.55" />
        <line x1="6" y1="49" x2="88" y2="49" stroke={gd} strokeWidth="0.6" opacity="0.25" />
      </svg>
    ),
  };
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {visuals[cat] ?? visuals["Gauges"]}
    </div>
  );
};

/* ═══════════
   ICONS
   ═══════════ */
const Ic = {
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Check: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>,
};

/* ═══════════════════════════════════════════════
   FORM FIELD HELPER
   ═══════════════════════════════════════════════ */
interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  defaultValue?: string;
  rows?: number;
}

const Field = ({ label, type = "text", placeholder, defaultValue, rows }: FieldProps) => (
  <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "0.65rem" }}>
    <span style={{ fontSize: "0.76rem", fontWeight: 500, color: "var(--tx)" }}>{label}</span>
    {rows
      ? <textarea rows={rows} placeholder={placeholder} style={{ padding: "0.58rem 0.72rem", border: "1px solid var(--br)", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", color: "var(--tx)", background: "var(--bg)", outline: "none", resize: "vertical", lineHeight: 1.6 }} />
      : <input type={type} placeholder={placeholder} defaultValue={defaultValue} style={{ padding: "0.58rem 0.72rem", border: "1px solid var(--br)", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", color: "var(--tx)", background: "var(--bg)", outline: "none" }} />
    }
  </label>
);

/* ═══════════════════════════════════════════════
   SUCCESS STATE
   ═══════════════════════════════════════════════ */
interface SuccessMsgProps {
  title: string;
  msg: string;
  onClose: () => void;
}

const SuccessMsg = ({ title, msg, onClose }: SuccessMsgProps) => (
  <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
    <div style={{ width: 58, height: 58, borderRadius: "50%", background: "#E8F5E9", color: "#2E7D32", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}><Ic.Check /></div>
    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", color: "var(--nv)", marginBottom: "0.5rem" }}>{title}</h3>
    <p style={{ fontSize: "0.875rem", color: "var(--mu)", lineHeight: 1.7, marginBottom: "1.75rem" }}>{msg}</p>
    <button onClick={onClose} style={{ padding: "0.72rem 2.5rem", background: "var(--nv)", color: "white", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>Close</button>
  </div>
);

/* ════════════════════════════════
   MAIN APP
   ════════════════════════════════ */
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [modal, setModal] = useState<ModalType>(null);
  const [enquiryProd, setEnquiryProd] = useState<Product | null>(null);
  const [selectedProd, setSelectedProd] = useState<Product | null>(null);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [enquiryDone, setEnquiryDone] = useState(false);

  const addToCart = (p: Product) => setCart(c => {
    const ex = c.find(i => i.id === p.id);
    return ex ? c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...c, { ...p, qty: 1 }];
  });
  const removeItem = (id: number) => setCart(c => c.filter(i => i.id !== id));
  const updateQty = (id: number, q: number) => q < 1 ? removeItem(id) : setCart(c => c.map(i => i.id === id ? { ...i, qty: q } : i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const filtered = activeCat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);

  const openEnquiry = (prod: Product | null = null) => { setEnquiryProd(prod); setEnquiryDone(false); setModal("enquiry"); };
  const closeModal = () => setModal(null);

  const hoverIn = (e: React.MouseEvent<HTMLButtonElement>, bg: string, color?: string) => {
    (e.currentTarget as HTMLButtonElement).style.background = bg;
    if (color) (e.currentTarget as HTMLButtonElement).style.color = color;
  };
  const hoverOut = (e: React.MouseEvent<HTMLButtonElement>, bg: string, color?: string) => {
    (e.currentTarget as HTMLButtonElement).style.background = bg;
    if (color) (e.currentTarget as HTMLButtonElement).style.color = color;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');
        :root{--nv:#0D2040;--nvl:#1A3A64;--rd:#C41230;--rdl:#E8294D;--bg:#F7F6F2;--sf:#FFFFFF;--br:#E4E2DB;--tx:#1A1A1A;--mu:#8A8880;--gd:#B8924A;}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased}
        a{color:inherit;text-decoration:none}
        button{font-family:'Outfit',sans-serif}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes fadeUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

        {/* ──── HEADER ──────────────────────────────────── */}
        <header style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--sf)", borderBottom: "1px solid var(--br)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", gap: "1.5rem", height: 68 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.7rem", fontWeight: 600, color: "var(--rd)", lineHeight: 1 }}>高精密</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--nv)", letterSpacing: "0.04em" }}>Kōsei Precision</div>
                <div style={{ fontSize: "0.58rem", color: "var(--mu)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Engineering Tools · Singapore</div>
              </div>
            </div>
            <nav style={{ display: "flex", gap: "0.1rem", marginLeft: "auto", alignItems: "center" }}>
              {["Products", "About"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ padding: "0.4rem 0.9rem", color: "var(--mu)", fontSize: "0.85rem", transition: "color .2s", cursor: "pointer" }}>{l}</a>
              ))}
              <button onClick={() => openEnquiry()} style={{ padding: "0.4rem 0.9rem", color: "var(--mu)", fontSize: "0.85rem", background: "none", border: "none", cursor: "pointer" }}>Enquire</button>
            </nav>
            <button onClick={() => setCartOpen(true)} aria-label="Open cart"
              style={{ position: "relative", padding: "0.55rem 0.85rem", background: "var(--nv)", border: "none", cursor: "pointer", color: "white", borderRadius: 3, display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 500, flexShrink: 0 }}>
              <Ic.Cart /><span>Cart</span>
              {cartCount > 0 && <span style={{ position: "absolute", top: -8, right: -8, background: "var(--rd)", color: "white", borderRadius: "50%", width: 20, height: 20, fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
            </button>
          </div>
        </header>

        {/* ──── HERO ────────────────────────────────────── */}
        <section style={{ background: "var(--nv)", color: "white", padding: "5.5rem 2rem 6rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(196,18,48,.13) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 200, height: 3, background: "linear-gradient(90deg, var(--rd), transparent)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gd)", marginBottom: "0.9rem" }}>Authorised Singapore Distributor</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.8rem,5.5vw,4.5rem)", fontWeight: 400, lineHeight: 1.06, marginBottom: "1.5rem", maxWidth: 600 }}>
              Japanese Precision<br />Engineering Tools
            </h1>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "rgba(255,255,255,.5)", marginBottom: "2.5rem", maxWidth: 480 }}>
              Mitutoyo · Tohnichi · Niigata Seiki · Shinto<br />
              Precision metrology and torque instruments trusted by manufacturers across Southeast Asia.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#products" style={{ padding: "0.75rem 2.2rem", background: "var(--rd)", color: "white", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.04em", display: "inline-block" }}>Browse Catalogue</a>
              <button onClick={() => openEnquiry()} style={{ padding: "0.75rem 2rem", background: "transparent", color: "white", border: "1px solid rgba(255,255,255,.25)", cursor: "pointer", fontSize: "0.85rem" }}>Request Quotation →</button>
            </div>
          </div>
        </section>

        {/* ──── TRUST STRIP ─────────────────────────────── */}
        <div style={{ background: "#0A1A33", padding: "1.1rem 2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {["ISO 9001 Certified Products", "Calibration Certificate Included", "Singapore Local Support", "Service & Warranty Coverage"].map((t, i, arr) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.65rem", color: "rgba(255,255,255,.6)", fontSize: "0.78rem", padding: "0.4rem 1.75rem", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
              <div style={{ width: 5, height: 5, background: "var(--gd)", borderRadius: "50%", flexShrink: 0 }} />
              {t}
            </div>
          ))}
        </div>

        {/* ──── PRODUCTS ────────────────────────────────── */}
        <section id="products" style={{ maxWidth: 1280, margin: "0 auto", padding: "4.5rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <p style={{ fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mu)", marginBottom: "0.25rem" }}>Catalogue</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.1rem", color: "var(--nv)", fontWeight: 500 }}>Precision Instruments</h2>
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setActiveCat(c)}
                  style={{ padding: "0.38rem 1.1rem", background: activeCat === c ? "var(--nv)" : "var(--sf)", border: `1px solid ${activeCat === c ? "var(--nv)" : "var(--br)"}`, cursor: "pointer", fontSize: "0.78rem", color: activeCat === c ? "white" : "var(--mu)" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.25rem" }}>
            {filtered.map(p => (
              <article key={p.id} onClick={() => setSelectedProd(p)}
                style={{ background: "var(--sf)", border: "1px solid var(--br)", cursor: "pointer", transition: "transform .2s,box-shadow .2s,border-color .2s", overflow: "hidden" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 36px rgba(13,32,64,.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
                <div style={{ position: "relative", background: "#EEECEA", height: 155, padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <ProductVisual cat={p.cat} />
                  <span style={{ position: "absolute", top: "0.65rem", left: "0.65rem", background: "white", border: "1px solid var(--br)", fontSize: "0.6rem", padding: "0.18rem 0.5rem", color: "var(--mu)", fontWeight: 500 }}>{p.brand}</span>
                  {p.featured && <span style={{ position: "absolute", top: "0.65rem", right: "0.65rem", background: "#F0EDE5", border: "1px solid #DDD8CC", fontSize: "0.6rem", padding: "0.18rem 0.55rem", color: "#7A6A3A", fontWeight: 500 }}>Featured</span>}
                  {!p.stock && <span style={{ position: "absolute", top: "0.65rem", right: "0.65rem", background: "#FEE2E2", color: "var(--rd)", fontSize: "0.6rem", padding: "0.18rem 0.5rem", fontWeight: 500 }}>Out of Stock</span>}
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mu)", marginBottom: "0.2rem" }}>{p.cat}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--nv)", lineHeight: 1.3, marginBottom: "0.15rem" }}>{p.name}</h3>
                  <p style={{ fontSize: "0.72rem", color: "var(--mu)", fontFamily: "monospace", marginBottom: "0.65rem" }}>{p.model}</p>
                  <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--nv)", marginBottom: "0.9rem" }}>SGD {p.price.toLocaleString()}</p>
                  <div style={{ display: "flex", gap: "0.5rem" }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEnquiry(p)}
                      style={{ flex: 1, padding: "0.5rem", background: "white", border: "1px solid var(--nv)", color: "var(--nv)", cursor: "pointer", fontSize: "0.74rem", fontWeight: 500 }}
                      onMouseEnter={e => hoverIn(e, "var(--nv)", "white")}
                      onMouseLeave={e => hoverOut(e, "white", "var(--nv)")}>Enquire</button>
                    <button disabled={!p.stock} onClick={() => addToCart(p)}
                      style={{ flex: 1, padding: "0.5rem", background: p.stock ? "var(--nv)" : "#CBD5E1", border: "none", color: "white", cursor: p.stock ? "pointer" : "not-allowed", fontSize: "0.74rem", fontWeight: 500 }}
                      onMouseEnter={e => { if (p.stock) hoverIn(e, "var(--nvl)"); }}
                      onMouseLeave={e => { if (p.stock) hoverOut(e, "var(--nv)"); }}>
                      {p.stock ? "Add to Cart" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ──── ABOUT ───────────────────────────────────── */}
        <section id="about" style={{ background: "var(--sf)", borderTop: "1px solid var(--br)", borderBottom: "1px solid var(--br)", padding: "4rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mu)", marginBottom: "0.5rem" }}>About Us</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", color: "var(--nv)", fontWeight: 500, marginBottom: "1.25rem", lineHeight: 1.15 }}>Authorised Distributor of Japanese Precision Tools</h2>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--mu)", marginBottom: "1rem" }}>We specialise in sourcing and distributing Japan-made precision metrology and torque instruments for Singapore's manufacturing, aerospace, and precision engineering sectors.</p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--mu)", marginBottom: "1.5rem" }}>All instruments are supplied with original manufacturer calibration certificates traceable to national standards.</p>
                <button onClick={() => openEnquiry()}
                  style={{ padding: "0.72rem 1.75rem", background: "var(--nv)", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}
                  onMouseEnter={e => hoverIn(e, "var(--nvl)")}
                  onMouseLeave={e => hoverOut(e, "var(--nv)")}>Get in Touch</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--br)" }}>
                {([["Mitutoyo", "Micrometers, Calipers, Height Gauges"], ["Tohnichi", "Torque Wrenches, Screwdrivers"], ["Niigata Seiki", "Calipers, Gauges, Rulers"], ["Shinto", "Surface Plates, Granite Tools"]] as [string, string][]).map(([b, d]) => (
                  <div key={b} style={{ background: "var(--bg)", padding: "1.5rem" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 600, color: "var(--nv)", marginBottom: "0.35rem" }}>{b}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--mu)", lineHeight: 1.6 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──── FOOTER ──────────────────────────────────── */}
        <footer style={{ background: "#08162A", color: "rgba(255,255,255,.45)", padding: "3.5rem 2rem 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr", gap: "2.5rem", paddingBottom: "2.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--rd)" }}>高精密</span>
                <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "rgba(255,255,255,.85)", letterSpacing: "0.04em" }}>Kōsei Precision</span>
              </div>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.75, color: "rgba(255,255,255,.38)", maxWidth: 260 }}>Japanese precision metrology and torque instruments for Singapore's engineering sector.</p>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 500 }}>Contact</p>
              {[BRAND.email, BRAND.phone, BRAND.address].map((t, i) => <p key={i} style={{ fontSize: "0.79rem", marginBottom: "0.32rem", lineHeight: 1.6 }}>{t}</p>)}
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 500 }}>Brands</p>
              {["Mitutoyo", "Tohnichi", "Niigata Seiki", "Shinto"].map(b => <p key={b} style={{ fontSize: "0.79rem", marginBottom: "0.3rem" }}>{b}</p>)}
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 500 }}>Services</p>
              {["Product Catalogue", "Request Quotation", "Calibration Services", "Technical Support"].map(l => (
                <p key={l} style={{ fontSize: "0.79rem", marginBottom: "0.3rem", cursor: "pointer" }}>{l}</p>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1rem 0", borderTop: "1px solid rgba(255,255,255,.07)", fontSize: "0.71rem", color: "rgba(255,255,255,.22)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <span>© 2025 Kōsei Precision Pte Ltd · UEN: {BRAND.uen} · GST Reg: {BRAND.gst}</span>
            <span>All prices in SGD, exclusive of 9% GST</span>
          </div>
        </footer>

        {/* ════════════════════════════════════════════════
            OVERLAYS
            ════════════════════════════════════════════════ */}

        {/* ──── CART DRAWER ──── */}
        {cartOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.52)", zIndex: 200, display: "flex", justifyContent: "flex-end" }} onClick={() => setCartOpen(false)}>
            <div style={{ width: 400, maxWidth: "100vw", background: "var(--sf)", height: "100%", display: "flex", flexDirection: "column", animation: "slideIn .25s ease" }} onClick={e => e.stopPropagation()}>
              <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--br)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: "var(--nv)" }}>Cart {cartCount > 0 && `(${cartCount})`}</h3>
                <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--mu)", padding: "0.2rem", display: "flex" }}><Ic.X /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1.5rem" }}>
                {cart.length === 0
                  ? <p style={{ textAlign: "center", color: "var(--mu)", padding: "3rem 0", fontSize: "0.875rem" }}>Your cart is empty.</p>
                  : cart.map(item => (
                    <div key={item.id} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid var(--br)", alignItems: "center" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--nv)", marginBottom: "0.1rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                        <p style={{ fontSize: "0.7rem", color: "var(--mu)", fontFamily: "monospace", marginBottom: "0.2rem" }}>{item.brand} · {item.model}</p>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--nv)" }}>SGD {(item.price * item.qty).toLocaleString()}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 26, height: 26, background: "var(--bg)", border: "1px solid var(--br)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: "var(--nv)" }}>−</button>
                        <span style={{ fontSize: "0.85rem", minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 26, height: 26, background: "var(--bg)", border: "1px solid var(--br)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: "var(--nv)" }}>+</button>
                      </div>
                    </div>
                  ))
                }
              </div>
              {cart.length > 0 && (
                <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--br)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 600, color: "var(--nv)", marginBottom: "0.5rem" }}>
                    <span>Subtotal (excl. GST)</span><span>SGD {cartTotal.toLocaleString()}</span>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "var(--mu)", lineHeight: 1.6, marginBottom: "0.85rem" }}>Prices are indicative. Formal quotation issued upon confirmation.</p>
                  <button onClick={() => { setCartOpen(false); setCheckoutDone(false); setModal("checkout"); }}
                    style={{ width: "100%", padding: "0.75rem", background: "var(--nv)", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}
                    onMouseEnter={e => hoverIn(e, "var(--nvl)")}
                    onMouseLeave={e => hoverOut(e, "var(--nv)")}>Proceed to Checkout</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ──── PRODUCT DETAIL MODAL ──── */}
        {selectedProd && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.52)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setSelectedProd(null)}>
            <div style={{ background: "var(--sf)", padding: "2rem", maxWidth: 700, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", animation: "fadeUp .22s ease", borderTop: "3px solid var(--nv)", display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.75rem", alignItems: "start" }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedProd(null)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--mu)", display: "flex" }}><Ic.X /></button>
              <div style={{ background: "#EEECEA", height: 220, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", flexShrink: 0 }}>
                <ProductVisual cat={selectedProd.cat} />
              </div>
              <div>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mu)", marginBottom: "0.2rem" }}>{selectedProd.cat}</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: "var(--nv)", marginBottom: "0.15rem" }}>{selectedProd.name}</h2>
                <p style={{ fontSize: "0.72rem", color: "var(--mu)", fontFamily: "monospace", marginBottom: "0.75rem" }}>{selectedProd.brand} · {selectedProd.model}</p>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.75, color: "var(--mu)", marginBottom: "1rem" }}>{selectedProd.desc}</p>
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "0.75rem" }}>
                  <tbody>
                    {Object.entries(selectedProd.specs).map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: "1px solid var(--br)" }}>
                        <td style={{ fontSize: "0.67rem", color: "var(--mu)", padding: "0.38rem 0.5rem 0.38rem 0", textTransform: "uppercase", letterSpacing: "0.06em", width: "38%" }}>{k}</td>
                        <td style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--nv)", padding: "0.38rem 0" }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--nv)", marginBottom: selectedProd.stock ? "0.85rem" : "0.4rem" }}>SGD {selectedProd.price.toLocaleString()}</p>
                {!selectedProd.stock && <p style={{ fontSize: "0.77rem", color: "var(--rd)", marginBottom: "0.85rem" }}>Currently out of stock — contact us for lead time.</p>}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => { setSelectedProd(null); openEnquiry(selectedProd); }}
                    style={{ flex: 1, padding: "0.55rem", background: "white", border: "1px solid var(--nv)", color: "var(--nv)", cursor: "pointer", fontSize: "0.78rem", fontWeight: 500 }}
                    onMouseEnter={e => hoverIn(e, "var(--nv)", "white")}
                    onMouseLeave={e => hoverOut(e, "white", "var(--nv)")}>Enquire</button>
                  <button disabled={!selectedProd.stock} onClick={() => { addToCart(selectedProd); setSelectedProd(null); setCartOpen(true); }}
                    style={{ flex: 1, padding: "0.55rem", background: selectedProd.stock ? "var(--nv)" : "#CBD5E1", border: "none", color: "white", cursor: selectedProd.stock ? "pointer" : "not-allowed", fontSize: "0.78rem", fontWeight: 500 }}>
                    {selectedProd.stock ? "Add to Cart" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ──── CHECKOUT MODAL ──── */}
        {modal === "checkout" && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.52)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={closeModal}>
            <div style={{ background: "var(--sf)", padding: "2rem", maxWidth: 820, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", animation: "fadeUp .22s ease", borderTop: "3px solid var(--nv)" }} onClick={e => e.stopPropagation()}>
              <button onClick={closeModal} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--mu)", display: "flex" }}><Ic.X /></button>
              {checkoutDone
                ? <SuccessMsg title="Order Submitted" msg="Thank you. Our team will send a formal quotation to your registered email within 1 business day. No payment has been collected." onClose={() => { closeModal(); setCart([]); }} />
                : <>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", color: "var(--nv)", marginBottom: "1.5rem" }}>Checkout</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "1rem" }}>
                    <div>
                      <p style={{ fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mu)", marginBottom: "0.75rem", fontWeight: 500 }}>Contact Details</p>
                      <Field label="Full Name" placeholder="Your full name" />
                      <Field label="Company / Organisation" placeholder="Company name" />
                      <Field label="Work Email" type="email" placeholder="email@company.com.sg" />
                      <Field label="Phone" type="tel" placeholder="+65 XXXX XXXX" />
                      <Field label="Delivery Address" placeholder="Singapore address" rows={2} />
                      <Field label="Notes / Special Requirements" placeholder="Calibration certs, delivery date..." rows={2} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mu)", marginBottom: "0.75rem", fontWeight: 500 }}>Order Summary</p>
                      {cart.map(i => (
                        <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", padding: "0.4rem 0", borderBottom: "1px solid var(--br)" }}>
                          <span style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.name} ×{i.qty}</span>
                          <span>SGD {(i.price * i.qty).toLocaleString()}</span>
                        </div>
                      ))}
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "0.45rem 0", borderBottom: "1px solid var(--br)" }}>
                        <span>Subtotal</span><span>SGD {cartTotal.toLocaleString()}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "0.45rem 0", borderBottom: "1px solid var(--br)" }}>
                        <span>GST (9%)</span><span>SGD {(cartTotal * 0.09).toFixed(2)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 600, color: "var(--nv)", padding: "0.55rem 0" }}>
                        <span>Estimated Total</span><span>SGD {(cartTotal * 1.09).toFixed(2)}</span>
                      </div>
                      <div style={{ background: "#F0EFE9", border: "1px solid var(--br)", padding: "0.85rem", marginTop: "0.75rem" }}>
                        <p style={{ fontSize: "0.75rem", color: "#5A5040", lineHeight: 1.65 }}>No payment is collected online. A formal quotation will be issued by our team.</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setCheckoutDone(true)}
                    style={{ padding: "0.75rem 2.5rem", background: "var(--nv)", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}
                    onMouseEnter={e => hoverIn(e, "var(--nvl)")}
                    onMouseLeave={e => hoverOut(e, "var(--nv)")}>Submit Order Request</button>
                </>
              }
            </div>
          </div>
        )}

        {/* ──── ENQUIRY MODAL ──── */}
        {modal === "enquiry" && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.52)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={closeModal}>
            <div style={{ background: "var(--sf)", padding: "2rem", maxWidth: 540, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", animation: "fadeUp .22s ease", borderTop: "3px solid var(--nv)" }} onClick={e => e.stopPropagation()}>
              <button onClick={closeModal} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--mu)", display: "flex" }}><Ic.X /></button>
              {enquiryDone
                ? <SuccessMsg title="Enquiry Sent" msg="Thank you. Our sales team will respond to your enquiry within 1 business day." onClose={closeModal} />
                : <>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", color: "var(--nv)", marginBottom: "1.25rem" }}>Product Enquiry</h3>
                  {enquiryProd && (
                    <div style={{ background: "#EEF2F8", borderLeft: "3px solid var(--nv)", padding: "0.6rem 0.85rem", fontSize: "0.8rem", color: "var(--nv)", marginBottom: "1.1rem", fontWeight: 500 }}>
                      {enquiryProd.brand} · {enquiryProd.name} <span style={{ fontFamily: "monospace", fontWeight: 400 }}>({enquiryProd.model})</span>
                    </div>
                  )}
                  <Field label="Full Name" placeholder="Your full name" />
                  <Field label="Company / Organisation" placeholder="Company name" />
                  <Field label="Work Email" type="email" placeholder="email@company.com.sg" />
                  <Field label="Phone" type="tel" placeholder="+65 XXXX XXXX" />
                  <Field label="Product(s) of Interest" defaultValue={enquiryProd ? `${enquiryProd.name} (${enquiryProd.model})` : ""} placeholder="e.g. Micrometers, Torque tools" />
                  <Field label="Message" rows={3} placeholder="Describe your application, quantity, or any technical questions." />
                  <button onClick={() => setEnquiryDone(true)}
                    style={{ width: "100%", padding: "0.75rem", background: "var(--nv)", color: "white", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}
                    onMouseEnter={e => hoverIn(e, "var(--nvl)")}
                    onMouseLeave={e => hoverOut(e, "var(--nv)")}>Send Enquiry</button>
                </>
              }
            </div>
          </div>
        )}

      </div>
    </>
  );
}
