
import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, useInView } from "framer-motion";

const COMPANY = {
  name: "JH MARINE.Inc",
  phone: "+82-10-6430-8197",
  email: "jhmarine@jhmarine.kr",
  addressEN: "8, Samsan-Ro 392 Beon-Gil, Nam-Gu, Ulsan, 44716 Korea",
  addressKR: "울산광역시 남구 삼산로 392번길 8",
};

const TEXT = {
  ko: {
    nav: { about: "회사 소개", services: "서비스", network: "네트워크", pricing: "견적 문의", contact: "문의" },
    hero: {
      badge: "신뢰받는 글로벌 해양 파트너",
      h1a: "바다를 잇고, 선원을 돕다",
      h1b: "선원교대 · 숙박 · 의료 · 선용품 공급",
      p: "24/7 대응과 KPI 기반 운영으로 체계적인 현장 실행을 보장합니다.",
      secondary: "왜 JH MARINE 인가요?",
    },
    kpiTitle: "신뢰를 만드는 지표",
    kpis: [
      { label: "만족도", value: 97, suffix: "%" },
      { label: "연간 교대", value: 1200, suffix: "+" },
      { label: "국가", value: 14, suffix: "+" },
    ],
    aboutTitle: "회사 소개",
    aboutP: "표준 운용 매뉴얼과 실시간 리포팅으로 선주/운영사의 리스크와 시간을 줄입니다.",
    aboutCards: [
      { title: "신뢰와 안전", desc: "ISPS/IMO 기준 준수" },
      { title: "글로벌 네트워크", desc: "14개국 이상 파트너사 연계" },
      { title: "24/7 운영", desc: "연중무휴 현장 대응" },
    ],
    servicesTitle: "서비스",
    services: [
      { title: "크루 매니지먼트", desc: "입국·비자·이동 전 과정 관리" },
      { title: "숙박 & 케어", desc: "호텔·식사·교통 종합 코디네이션" },
      { title: "의료 동반", desc: "응급 이송 및 병원 연계" },
      { title: "선용품 공급", desc: "선용품 공급, 보세운송 서비스" },
    ],
    networkTitle: "네트워크",
    networkP: "글로벌 항만·공항 네트워크를 통해 선박과 선원을 연결합니다.",
    networkCards: [
      { title: "14+개 국가", desc: "아시아·유럽 전역 서비스 네트워크" },
      { title: "연 1200+ 교대", desc: "만족도 97% 이상" },
      { title: "글로벌 레퍼런스", desc: "울산 항만 내 주요 선박 대리점과 협업" },
    ],
    pricingTitle: "즉시 견적",
    pricingP: "항만, ETA, 인원을 알려주시면 바로 산출합니다.",
    form: { port: "항만", eta: "ETA (YYYY-MM-DD)", headcount: "교대 인원", notes: "요청사항 (선택)", submit: "견적 요청" },
    contactTitle: "문의",
    contactP1: "항만·ETA·인원 등을 남겨주시면 빠르게 회신드립니다.",
    toggleLbl: "EN/KR",
    whyLong: "저희 JH MARINE 은 현장에서의 실시간 보고 체계와 변수에 따른 신속한 일정 조율로 운영 됩니다. 저희는 울산 항만에서의 축적된 경험을 바탕으로 선원교대 숙박 · 의료 · 선용품 공급(보세운송 포함)을 원웨이로 연결하고, 각 단계마다 체계화된 체크리스트 관리로 리스크를 선제적으로 관리합니다. 공항 픽업부터 호텔 숙박, 의료 서비스, 선박 승선까지 모든 동선을 사전에 시뮬레이션 하고, 돌발 상황에 대비한 백업 플랜을 준비합니다. 또한 실시간 보고 채널을 통해 진행 현황을 투명하게 공유하며 선주/운영사/대리점이 빠른 의사결정을 내릴 수 있도록 지원합니다. 울산 내 병원 · 호텔 · 대리점과의 파트너십을 바탕으로 합리적인 가격과 양질의 서비스를 제공하며, 24시간 대응 가능토록 운영 중 입니다. 무엇보다 선원의 안전과 편의를 우선으로 두고 세부 동선과 휴식, 식단까지 세심히 챙기며, 일정 지연 최소화의 비용 절감을 동시에 누릴 수 있습니다. 결과적으로 JH MARINE 은 울산 항만의 최고 품질의 서비스와 균형을 지키는 믿을 수 있는 현장 파트너 입니다.",
  },
  en: {
    nav: { about: "About", services: "Services", network: "Network", pricing: "Get Quote", contact: "Contact" },
    hero: {
      badge: "Trusted Global Marine Partner",
      h1a: "Connecting Oceans, Empowering Crews",
      h1b: "Crew Change · Accommodation · Medical · Ship Supply",
      p: "We deliver KPI-driven operations with 24/7 response.",
      secondary: "Why JH MARINE?",
    },
    kpiTitle: "Numbers that Build Trust",
    kpis: [
      { label: "Satisfaction", value: 97, suffix: "%" },
      { label: "Crew/yr", value: 1200, suffix: "+" },
      { label: "Countries", value: 14, suffix: "+" },
    ],
    aboutTitle: "About Us",
    aboutP: "Our SOPs and real-time reporting reduce owner/manager risk and port time.",
    aboutCards: [
      { title: "Reliability & Safety", desc: "ISPS/IMO compliant" },
      { title: "Global Network", desc: "Partners in 14+ countries" },
      { title: "24/7 Operation", desc: "Always-on field response" },
    ],
    servicesTitle: "Services",
    services: [
      { title: "Crew Management", desc: "End-to-end arrivals, visa, logistics" },
      { title: "Accommodation & Care", desc: "Hotels, meals, transport coordination" },
      { title: "Medical Escort", desc: "Emergency escort & hospital liaison" },
      { title: "Ship Supply", desc: "Ship supply & bonded transport service" },
    ],
    networkTitle: "Network",
    networkP: "We connect ships and crews through a global network of ports and airports.",
    networkCards: [
      { title: "14+ Countries", desc: "Active across Asia and Europe" },
      { title: "1200+ Crew/yr", desc: "Satisfaction 97%+" },
      { title: "References", desc: "Working with key ship agencies in Ulsan Port" },
    ],
    pricingTitle: "Instant Quote",
    pricingP: "Tell us your port, ETA and headcount — we'll estimate immediately.",
    form: { port: "Port", eta: "ETA (YYYY-MM-DD)", headcount: "Headcount", notes: "Notes (optional)", submit: "Request Quote" },
    contactTitle: "Contact",
    contactP1: "Leave your request and we'll reply quickly.",
    toggleLbl: "EN/KR",
    whyLong: "Choose JH MARINE for proven on‑the‑ground execution and predictable quality...",
  },
} as const;

type Lang = keyof typeof TEXT;
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "ko", setLang: () => {} });
const useLang = () => useContext(LangCtx);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className="", ...props }) => (
  <button className={"inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition " + className} {...props} />
);
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className="", ...props }) => (
  <div className={"rounded-2xl border bg-white " + className} {...props} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Navbar(){
  const { lang, setLang } = useLang();
  const t = TEXT[lang];
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y > lastY.current + 6 && y > 80) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const next = lang === "ko" ? "en" : "ko";
  const smoothTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;
    const y = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 bg-white/80 backdrop-blur-md shadow ${hidden? "-translate-y-full":"translate-y-0"}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <a href="#top" onClick={(e)=>{e.preventDefault(); smoothTo("#top");}} className="flex items-center gap-3">
          <img src="/jhmarine-logo.png" alt="JH MARINE" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" onClick={(e)=>{e.preventDefault(); smoothTo("#about");}} className="text-sm hover:text-sky-600">{t.nav.about}</a>
          <a href="#services" onClick={(e)=>{e.preventDefault(); smoothTo("#services");}} className="text-sm hover:text-sky-600">{t.nav.services}</a>
          <a href="#fleet" onClick={(e)=>{e.preventDefault(); smoothTo("#fleet");}} className="text-sm hover:text-sky-600">{t.nav.network}</a>
          <a href="#pricing" onClick={(e)=>{e.preventDefault(); smoothTo("#pricing");}} className="text-sm hover:text-sky-600">{t.nav.pricing}</a>
          <a href="#contact" onClick={(e)=>{e.preventDefault(); smoothTo("#contact");}} className="text-sm hover:text-sky-600">{t.nav.contact}</a>
          <button onClick={()=>setLang(next as Lang)} className="text-sm border rounded-2xl px-3 py-1 hover:bg-blue-50">{next.toUpperCase()}</button>
        </div>
      </div>
    </div>
  );
}

function Hero(){
  const { lang } = useLang();
  const t = TEXT[lang].hero;
  const why = (TEXT as any)[lang].whyLong;
  const [open, setOpen] = useState(false);
  return (
    <section id="top" className="pt-28 pb-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-8 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs">{t.badge}</div>
          <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight">
            {t.h1a}
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600"> {t.h1b}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-700">{TEXT[lang].hero.p}</p>
          <div className="mt-8">
            <Button
              className="group rounded-2xl border-2 border-sky-400/70 text-sky-800 bg-white hover:bg-blue-50/70 px-6 py-3 relative overflow-hidden shadow-[0_8px_24px_rgba(2,132,199,0.18)]"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="why-jh"
            >
              <span className="relative"> {t.secondary}</span>
            </Button>
          </div>
          <motion.div
            id="why-jh"
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 rounded-2xl border border-blue-200 bg-white/80 p-5 text-sm leading-7 text-neutral-800 shadow-sm">
              {why}
            </div>
          </motion.div>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="md:col-span-5 grid grid-cols-2 gap-4">
          {TEXT[lang].services.map((f) => (
            <Card key={f.title} className="border border-blue-100 bg-white/80 shadow-sm hover:shadow-md transition p-4">
              <div className="text-base font-semibold">{f.title}</div>
              <div className="text-sm text-neutral-600">{f.desc}</div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({children}:{children: React.ReactNode}){
  return <h2 className="text-4xl font-extrabold text-center">{children}</h2>
}

function Section({id, children, className=""}:{id?:string, children:React.ReactNode, className?:string}){
  return <section id={id} className={"py-24 "+className}><div className="max-w-7xl mx-auto px-4">{children}</div></section>
}

function KPIs(){
  const { lang } = useLang();
  const t = TEXT[lang];
  const ref = useRef<HTMLDivElement|null>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [vals, setVals] = useState([0,0,0]);
  useEffect(()=>{
    if(!inView) return;
    const start = performance.now(), dur = 1200;
    let raf=0;
    const step=(tms:number)=>{
      const p = Math.min(1, (tms-start)/dur);
      setVals(t.kpis.map(k=>Math.round(k.value*p)) as any);
      if(p<1) raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(raf);
  }, [inView, t.kpis]);
  return (
    <Section className="bg-white">
      <div ref={ref}></div>
      <SectionTitle>{t.kpiTitle}</SectionTitle>
      <div className="mt-8 grid grid-cols-3 gap-6 text-center">
        {t.kpis.map((k, i)=>(
          <div key={k.label} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6">
            <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
              {vals[i]}<span className="text-2xl align-super">{k.suffix}</span>
            </div>
            <div className="mt-2 text-sm text-neutral-700">{k.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function About(){
  const { lang } = useLang();
  const t = TEXT[lang];
  return (
    <Section id="about" className="bg-white">
      <SectionTitle>{t.aboutTitle}</SectionTitle>
      <p className="mt-4 text-center text-neutral-600 max-w-3xl mx-auto">{t.aboutP}</p>
    </Section>
  )
}

function Services(){
  const { lang } = useLang();
  const t = TEXT[lang];
  return (
    <Section id="services" className="bg-blue-50">
      <SectionTitle>{t.servicesTitle}</SectionTitle>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {t.services.map((srv)=>(
          <Card key={srv.title} className="border border-blue-100 bg-white shadow-md hover:shadow-lg transition-all p-5">
            <div className="text-lg font-semibold">{srv.title}</div>
            <div className="text-sm text-neutral-700 mt-1">{srv.desc}</div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Fleet(){
  const { lang } = useLang();
  const t = TEXT[lang];
  return (
    <Section id="fleet" className="bg-white">
      <SectionTitle>{t.networkTitle}</SectionTitle>
      <p className="mt-4 text-center text-neutral-600 max-w-3xl mx-auto">{t.networkP}</p>
    </Section>
  )
}

function Pricing(){
  const { lang } = useLang();
  const t = TEXT[lang];
  return (
    <Section id="pricing" className="bg-white">
      <SectionTitle>{t.pricingTitle}</SectionTitle>
      <p className="text-center text-neutral-600 mt-2">{t.pricingP}</p>
    </Section>
  )
}

function Contact(){
  const { lang } = useLang();
  const t = TEXT[lang];
  return (
    <Section id="contact" className="bg-white">
      <SectionTitle>{t.contactTitle}</SectionTitle>
      <p className="text-center text-neutral-600 mt-2">{t.contactP1}</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Card className="border-blue-100 p-5"><div className="font-semibold">Phone</div><a href={`tel:${COMPANY.phone}`} className="text-sky-700">{COMPANY.phone}</a></Card>
        <Card className="border-blue-100 p-5"><div className="font-semibold">Email</div><a href={`mailto:${COMPANY.email}`} className="text-sky-700">{COMPANY.email}</a></Card>
        <Card className="border-blue-100 p-5"><div className="font-semibold">Address</div><div className="text-sm text-neutral-700">{COMPANY.addressEN}</div><div className="text-sm text-neutral-500">{COMPANY.addressKR}</div></Card>
      </div>
    </Section>
  )
}

export default function App(){
  const [lang, setLang] = useState<Lang>("ko");
  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <Hero />
        <KPIs />
        <About />
        <Services />
        <Fleet />
        <Pricing />
        <Contact />
      </div>
    </LangCtx.Provider>
  )
}
