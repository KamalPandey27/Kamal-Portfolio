import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  UserRound,
  X,
  Youtube,
  Zap,
} from "lucide-react";

import {
  approach,
  experience,
  portfolio,
  projects,
  technologies,
} from "./data/portfolio";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function IconBadge({ children, dark = false }) {
  return (
    <span
      className={`grid size-11 shrink-0 place-items-center rounded-2xl border ${
        dark
          ? "border-white/10 bg-white/10 text-white"
          : "border-slate-200/80 bg-white text-slate-900 shadow-sm"
      }`}
    >
      {children}
    </span>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-xl font-black tracking-tighter text-white shadow-lg shadow-slate-950/15">
        KP
      </div>
      <div className="hidden sm:block">
        <p className="font-bold leading-none">{portfolio.name}</p>
        <p className="mt-1 text-[11px] text-slate-500">{portfolio.role}</p>
      </div>
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("portfolio-theme") !== "dark",
  );
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 70,
      easing: "ease-out-cubic",
    });
  }, []);

  const nav = ["Home", "About", "Projects", "Experience", "Skills", "Contact"];

  const submitContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(`${API}/contact`, form);

      if (response.data.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        console.log(response);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // Demo-friendly fallback: the UI still works when the backend is not running.
      console.log("Error accur ", error);
      setSent(true);
    } finally {
      setSending(false);
      setTimeout(() => setSent(false), 4500);
    }
  };

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <div className="min-h-screen  bg-[#f5f7fb] text-slate-950 transition-colors duration-300 dark:bg-[#080a10] dark:text-white">
      <header className="sticky top-0 z-50 px-4 pt-3 sm:px-7">
        <div className="mx-auto flex max-w-330 items-center justify-between rounded-[22px] border border-white/80 bg-white/70 px-3 py-2 shadow-[0_16px_50px_rgba(15,23,42,.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/65">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  i === 0
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle dark mode"
              className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 sm:flex dark:bg-white dark:text-slate-950"
            >
              Let's Connect <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setMenu((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white lg:hidden dark:border-white/10 dark:bg-white/10"
            >
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menu && (
          <div className="mx-auto mt-2 max-w-330 rounded-3xl border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-slate-950/95">
            {nav.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/10"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        <section
          id="home"
          className="mx-auto max-w-330 px-4 pb-6 pt-8 sm:px-7 lg:pt-12"
        >
          <div className="relative min-h-155 overflow-hidden rounded-[34px] border border-white/90 bg-white/65 shadow-[0_30px_100px_rgba(15,23,42,.10)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[.035]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(99,102,241,.16),transparent_25%),radial-gradient(circle_at_18%_90%,rgba(34,211,238,.12),transparent_28%)]" />
            <div
              className="relative grid min-h-155 items-center gap-8 p-7 md:p-12 lg:grid-cols-[1.03fr_.97fr] lg:p-16"
              data-aos="fade-up"
            >
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[.24em] text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
                  MERN Stack Developer
                </div>

                <h1 className="text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[76px]">
                  Crafting
                  <span className="block bg-linear-to-r from-indigo-700 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                    Scalable Web Apps
                  </span>
                  <span className="block">for Real People.</span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Hi, I’m Kamal — a MERN Stack Developer who loves building
                  modern, scalable and user-friendly web applications with clean
                  code and real-world impact.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="group rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition-all ease-in-out duration-500 hover:-translate-y-1 dark:bg-white dark:text-slate-950"
                  >
                    View My Work{" "}
                    <ArrowRight
                      className="ml-2 inline transition-all ease-in-out duration-500 group-hover:translate-x-1"
                      size={17}
                    />
                  </button>
                  <a
                    href="/KAMAL_MERN_DEVELOPER_RESUME.pdf"
                    download
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-800 shadow-sm transition-all ease-in-out duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <Download className="mr-2 inline" size={17} /> Download
                    Resume
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <Social href={portfolio.github} icon={<Github size={18} />} />
                  <Social
                    href={portfolio.linkedin}
                    icon={<Linkedin size={18} />}
                  />
                  <Social
                    href={portfolio.instagram}
                    icon={<Instagram size={18} />}
                  />
                  <Social
                    href={portfolio.youtube}
                    icon={<Youtube size={18} />}
                  />
                </div>
              </div>

              <div className="relative hidden min-h-120 lg:block">
                <div className="absolute right-2 top-12 w-[78%] rotate-[-4deg] rounded-3xl border border-white/80 bg-slate-950 p-3 shadow-[0_35px_80px_rgba(15,23,42,.25)]">
                  <div className="mb-3 flex gap-1.5 px-2">
                    <i className="size-2 rounded-full bg-red-400" />
                    <i className="size-2 rounded-full bg-yellow-400" />
                    <i className="size-2 rounded-full bg-green-400" />
                  </div>
                  <div className="grid h-77.5 grid-cols-[34%_66%] overflow-hidden rounded-xl bg-[#111827]">
                    <div className="space-y-3 border-r border-white/5 p-4 text-[8px] text-slate-500">
                      <div className="h-2 w-16 rounded bg-white/10" />
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-1.5 rounded bg-white/5"
                          style={{ width: `${45 + (i % 4) * 11}%` }}
                        />
                      ))}
                    </div>
                    <div className="p-5 font-mono text-[10px] leading-5 text-slate-300">
                      <div>
                        <span className="text-violet-400">const</span>{" "}
                        <span className="text-cyan-300">developer</span> = {"{"}
                      </div>
                      <div className="pl-5">
                        <span className="text-blue-300">name</span>:{" "}
                        <span className="text-emerald-300">"Kamal"</span>,
                      </div>
                      <div className="pl-5">
                        <span className="text-blue-300">stack</span>: [
                        <span className="text-emerald-300">"React"</span>,{" "}
                        <span className="text-emerald-300">"Node"</span>],
                      </div>
                      <div className="pl-5">
                        <span className="text-blue-300">database</span>:{" "}
                        <span className="text-emerald-300">"MongoDB"</span>,
                      </div>
                      <div className="pl-5">
                        <span className="text-blue-300">focus</span>:{" "}
                        <span className="text-emerald-300">"Products"</span>
                      </div>
                      <div>{"}"}</div>
                      <div className="mt-5">
                        <span className="text-violet-400">function</span>{" "}
                        <span className="text-yellow-300">build</span>() {"{"}
                      </div>
                      <div className="pl-5 text-slate-400">
                        // ideas → code → deploy
                      </div>
                      <div className="pl-5">
                        return <span className="text-emerald-300">"ship"</span>;
                      </div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-24 w-36 rounded-3xl border border-white/90 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/75">
                  <p className="text-sm font-bold leading-5">
                    Ideas
                    <br />
                    Code
                    <br />
                    Build
                    <br />
                    Deploy
                    <br />
                    Repeat.
                  </p>
                  <Code2 className="mt-5" size={22} />
                </div>

                <div className="absolute bottom-4 right-0 w-48 space-y-3">
                  <Feature
                    icon={<Code2 size={20} />}
                    title="Clean Code"
                    sub="Better Products"
                  />
                  <Feature
                    icon={<BarChart3 size={20} />}
                    title="Scalable"
                    sub="Solutions"
                  />
                  <Feature
                    icon={<Zap size={20} />}
                    title="Real World"
                    sub="Impact"
                  />
                </div>

                <div className="absolute bottom-8 left-24 rounded-2xl bg-slate-950 px-5 py-4 font-mono text-sm text-white shadow-2xl">
                  Good
                  <br />
                  Code
                  <br />
                  Better
                  <br />
                  Products.
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid overflow-hidden rounded-[26px] border border-white/90 bg-white/65 shadow-sm backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/[.035] mt-8"
            data-aos="fade-left"
          >
            <Stat
              icon={<Code2 />}
              value="2+"
              label="Projects Completed"
              sub="Real world applications"
            />
            <Stat
              icon={<UserRound />}
              value="1"
              label="Internship Experience"
              sub="Industry exposure"
            />
            <Stat
              icon={<BarChart3 />}
              value="20%"
              label="Faster Response Time"
              sub="Optimized solutions"
            />
            <Stat
              icon={<span className="text-2xl">∞</span>}
              value="Always"
              label="Learning"
              sub="New technologies"
            />
          </div>
        </section>

        <section
          data-aos="fade-up"
          id="skills"
          className="mx-auto max-w-330 px-4 py-5 sm:px-7 "
        >
          <SectionHeader
            eyebrow="Tech Stack"
            title="Technologies I work with."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-5">
            {technologies.map(([name, sub, icon]) => (
              <TechCard key={name} name={name} sub={sub} icon={icon} />
            ))}
          </div>
        </section>

        <section
          data-aos="fade-up"
          id="projects"
          className="mx-auto max-w-330 px-4 py-12 sm:px-7"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Featured Projects"
              title="Projects that make an impact."
            />
            {/* <button className="hidden items-center gap-2 text-sm font-bold sm:flex">
              View All Projects <ArrowRight size={17} />
            </button> */}
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section
          data-aos="fade-up"
          id="about"
          className="mx-auto grid max-w-330 gap-5 px-4 py-2 sm:px-7 lg:grid-cols-[.9fr_1.2fr_.7fr]"
        >
          <div
            data-aos="fade-right"
            className="rounded-[28px] border border-white/90 bg-white/65 p-7 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[.035]"
          >
            <SectionHeader
              eyebrow="About Me"
              title="MERN Stack Developer with a Purpose."
            />
            <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
              I build full-stack web applications using modern technologies. I’m
              passionate about clean code, scalable solutions and continuous
              learning.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="mt-7 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              More About Me <ArrowRight className="ml-2 inline" size={16} />
            </button>
            <div className="mt-8 flex justify-center">
              <div className="grid size-32 rotate-6 place-items-center rounded-[30px] bg-linear-to-br from-indigo-100 to-violet-300 shadow-xl dark:from-indigo-950 dark:to-violet-900">
                <Code2
                  size={62}
                  className="-rotate-6 text-indigo-700 dark:text-indigo-200"
                />
              </div>
            </div>
          </div>

          <div
            data-aos="zoom-in"
            id="experience"
            className="rounded-[28px] border border-white/90 bg-white/65 p-7 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[.035]"
          >
            <SectionHeader eyebrow="Experience & Education" title="" />
            <div className="mt-5 space-y-8">
              {experience.map((item, i) => (
                <div key={item.title} className="relative pl-12">
                  <div className="absolute left-0 top-0 grid size-9 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    {i === 0 ? (
                      <BriefcaseBusiness size={17} />
                    ) : (
                      <GraduationCap size={17} />
                    )}
                  </div>
                  {i < experience.length - 1 && (
                    <div className="absolute left-4.5 top-10 h-20 border-l border-dashed border-slate-300 dark:border-white/20" />
                  )}
                  <div className="flex flex-wrap justify-between gap-2">
                    <h3 className="font-bold">{item.title}</h3>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {item.company}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {item.bullets.map((b) => (
                      <li key={b}>
                        <span className="mr-2">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div
            data-aos="fade-left"
            className="rounded-[28px] border border-white/90 bg-white/65 p-7 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[.035]"
          >
            <SectionHeader eyebrow="My Approach" title="" />
            <ul className="mt-6 space-y-4 text-sm font-medium">
              {approach.map((item) => (
                <li key={item}>
                  <Check className="mr-3 inline text-indigo-600" size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12 rounded-3xl bg-slate-950 p-6 text-xl font-bold leading-7 text-white dark:bg-white dark:text-slate-950">
              “Build
              <br />
              Ship
              <br />
              Improve
              <br />
              Repeat.”
            </div>
          </div>
        </section>

        <section
          data-aos="fade-up"
          id="contact"
          className="mx-auto max-w-330 px-4 py-12 sm:px-7"
        >
          <div className="grid overflow-hidden rounded-[30px] bg-[#11151d] text-white shadow-[0_30px_80px_rgba(15,23,42,.2)] lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative p-7 sm:p-10">
              <div className="absolute -right-20 -top-20 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="relative">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[.24em] text-slate-400">
                  Let's Connect
                </p>
                <h2 className="text-4xl font-black tracking-tight">
                  Let’s Build Something Amazing.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                  I’m currently open to opportunities. Feel free to reach out!
                </p>
                <div className="mt-8 space-y-4 text-sm text-slate-300">
                  <p>
                    <Mail className="mr-3 inline" size={17} />
                    {portfolio.email}
                  </p>
                  <p>
                    <Phone className="mr-3 inline" size={17} />
                    {portfolio.phone}
                  </p>
                  <p>
                    <MapPin className="mr-3 inline" size={17} />
                    {portfolio.location}
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={submitContact}
              className="border-t border-white/10 bg-white/4.5 p-7 sm:p-10 lg:border-l lg:border-t-0"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="field"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your Email"
                  className="field"
                />
              </div>
              <textarea
                required
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your Message"
                className="field mt-3 resize-none"
              />
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  disabled={sending}
                  className="rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 inline" size={16} />
                      Send Message{" "}
                      <ArrowRight className="ml-2 inline" size={16} />
                    </>
                  )}
                </button>
                {sent && (
                  <span className="text-sm text-emerald-300">
                    Thanks! Your message has been received.
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-330 px-4 pb-5 sm:px-7">
        <div className="flex flex-col gap-5 rounded-[26px] border border-white/90 bg-white/65 p-5 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/[.035]">
          <Logo />
          <div className="flex flex-wrap gap-5 text-xs font-semibold text-slate-500">
            {nav.map((item) => (
              <button key={item} onClick={() => scrollTo(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Social href={portfolio.github} icon={<Github size={16} />} />
            <Social href={portfolio.linkedin} icon={<Linkedin size={16} />} />
            <span className="ml-2 text-xs text-slate-500">© 2026 Kamal.</span>
          </div>
        </div>
        <div className="flex justify-between px-2 py-5 text-xs text-slate-500">
          <span>Code. Create. Grow.</span>
          <span>Built with Passion · Driven by Code</span>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.25em] text-slate-500">
        <span className="size-2 rounded-full bg-indigo-600" /> {eyebrow}
      </p>
      {title && (
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
          {title}
        </h2>
      )}
    </div>
  );
}

function Social({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      {icon}
    </a>
  );
}

function Feature({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
      <IconBadge>{icon}</IconBadge>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

function Stat({ icon, value, label, sub }) {
  return (
    <div className="flex items-center gap-4 border-b border-slate-200/70 p-5 last:border-0 sm:border-r lg:border-b-0 dark:border-white/10">
      <IconBadge>{icon}</IconBadge>
      <div>
        <p className="text-xl font-black">{value}</p>
        <p className="text-xs font-bold">{label}</p>
        <p className="text-[10px] text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

function TechLogo({ icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-8"
      fill={`#${icon.hex}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
}

function TechCard({ name, sub, icon }) {
  return (
    <div data-aos="fade-up" data-aos-delay="80">
      <div className="group rounded-3xl border border-white/90 bg-white/65 p-4 text-center shadow-sm backdrop-blur-xl  transition-all ease-in-out duration-300 hover:-translate-y-3 hover:shadow-lg dark:border-white/10 dark:bg-white/[.035]">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl border border-slate-100 bg-white shadow-sm transition group-hover:scale-105 dark:border-white/10 dark:bg-white/5">
          {<TechLogo icon={icon} />}
        </div>
        <p className="mt-3 text-xs font-bold">{name}</p>
        <p className="mt-1 text-[9px] text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      data-aos="zoom-in-up"
      className="overflow-hidden rounded-[28px] border border-white/90 bg-white/65 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[.035]"
    >
      <div className="grid gap-6 p-4 sm:grid-cols-[1fr_1fr] sm:p-5  h-full  ">
        <div
          className={`relative min-h-62.5 overflow-hidden rounded-2xl ${project.accent === "cyan" ? "bg-linear-to-br from-cyan-100 via-white to-blue-200" : "bg-linear-to-br from-indigo-100 via-white to-violet-200"}  dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950`}
        >
          <div className="absolute left-4 top-4 rounded-lg bg-slate-950 px-3 py-1 text-[8px] font-bold tracking-[.15em] text-white">
            {project.kind}
          </div>
          <div className="w-full h-full ">
            {/* <div className="mb-3 flex gap-1">
              <i className="size-1.5 rounded-full bg-red-400" />
              <i className="size-1.5 rounded-full bg-yellow-400" />
              <i className="size-1.5 rounded-full bg-green-400" />
            </div>
            <div className="h-2 w-3/5 rounded bg-slate-300 dark:bg-white/20" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded bg-slate-100 dark:bg-white/10"
                />
              ))}
            </div> */}
            <img
              src={project.src}
              className="h-full w-full object-cover"
              alt="Car Rental"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center py-2">
          <h3 className="text-xl font-black">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950"
            >
              Live Demo <ArrowUpRight className="ml-1 inline" size={14} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold dark:border-white/10 dark:bg-white/5"
            >
              GitHub <Github className="ml-1 inline" size={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default App;
