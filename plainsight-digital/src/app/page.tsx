"use client";

import { useState } from "react";

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with Next.js, React, and TypeScript.",
    icon: "🌐",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform mobile applications with Flutter and native performance.",
    icon: "📱",
    tech: ["Flutter", "Dart", "Firebase", "SQLite"],
  },
  {
    title: "Backend & APIs",
    description: "Robust backend systems, REST APIs, and database architecture.",
    icon: "⚙️",
    tech: ["Python", "FastAPI", "PostgreSQL", "Supabase"],
  },
  {
    title: "Desktop Software",
    description: "High-performance desktop applications with modern C++ and GPU acceleration.",
    icon: "🖥️",
    tech: ["C++17", "OpenGL", "CMake", "Windows API"],
  },
];

const projects = [
  {
    title: "Aestra",
    tagline: "Digital Audio Workstation",
    description: "A next-gen DAW built from scratch with ultra-low latency audio, GPU-accelerated UI, and professional-grade 64-bit processing.",
    tech: ["C++17", "OpenGL", "ASIO", "CMake"],
    status: "Active Development",
    link: "https://aestra-website.vercel.app",
  },
  {
    title: "LifeOS",
    tagline: "Personal Operating System",
    description: "A privacy-first personal data management system. Sync notes, finances, and life data across devices with a Flutter mobile UI and FastAPI backend.",
    tech: ["Flutter", "FastAPI", "SQLite", "Markdown"],
    status: "In Development",
    link: null,
  },
];

export default function Home() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center font-bold text-xl">
              PS
            </div>
            <span className="text-slate-400 font-medium tracking-wide">PlainSight Digital</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            We build digital solutions<br />
            <span className="text-cyan-400">that work.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-8">
            A boutique development studio crafting modern web, mobile, and desktop applications 
            with clean code and intentional design.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#services" 
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Our Services
            </a>
            <a 
              href="#work" 
              className="px-6 py-3 border border-slate-700 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              See Our Work
            </a>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From web apps to desktop software, we deliver solutions across the full stack.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeService === index
                  ? "border-cyan-500/50 bg-slate-800/50"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
              }`}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-slate-400 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((t) => (
                      <span 
                        key={t} 
                        className="px-3 py-1 text-sm bg-slate-800 rounded-full text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A selection of what we&apos;ve been building. Real projects, real code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition-all duration-300 ${project.link ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
                  {project.status}
                </span>
              </div>
              <p className="text-purple-400 font-medium mb-3">{project.tagline}</p>
              <p className="text-slate-400 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span 
                    key={t} 
                    className="px-3 py-1 text-sm bg-slate-800/80 rounded-full text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.link && (
                <div className="mt-4 text-cyan-400 text-sm font-medium flex items-center gap-1">
                  Visit site →
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 text-center">
          <p className="text-slate-400 mb-4">
            Want to see more? Let&apos;s talk about your project.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built with intention,<br />
              <span className="text-cyan-400">delivered with care.</span>
            </h2>
            <p className="text-slate-400 mb-6">
              PlainSight Digital is a development studio focused on quality over quantity. 
              We take on select projects and give them the attention they deserve.
            </p>
            <p className="text-slate-400 mb-6">
              No bloat. No unnecessary complexity. Just clean, efficient code that does 
              exactly what it needs to do — and does it well.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-cyan-400">100%</div>
                <div className="text-sm text-slate-500">Custom Code</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">Modern</div>
                <div className="text-sm text-slate-500">Tech Stack</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">Direct</div>
                <div className="text-sm text-slate-500">Communication</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4">Our Approach</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-slate-300">Transparent process with regular updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-slate-300">Clean, maintainable codebase</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-slate-300">Performance-first development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-slate-300">You own everything we build</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Build Something</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Have a project in mind? We&apos;d love to hear about it. 
            Reach out and let&apos;s discuss how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@plainsight.dev"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              hello@plainsight.dev
            </a>
            <a
              href="https://wa.me/254750192512"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-slate-600 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center font-bold text-sm">
                PS
              </div>
              <span className="text-slate-400">PlainSight Digital</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 PlainSight Digital. Built with intention.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
