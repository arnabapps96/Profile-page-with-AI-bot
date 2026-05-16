'use client';
import { useState, useEffect, useRef } from 'react';
import Chatbot, { ChatInterface } from '@/components/Chatbot';
import PersonalSection from '@/components/PersonalSection';

const Counter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract numeric part, prefix and suffix
  const numericMatch = value.match(/[\d.]+/);
  const numericPart = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = value.split(numericMatch ? numericMatch[0] : "")[0] || "";
  const suffix = value.split(numericMatch ? numericMatch[0] : "")[1] || "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = numericPart;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // outExpo easing
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplayValue(ease * end);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, numericPart]);

  return (
    <div ref={ref} style={{ display: 'inline-block' }}>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        maximumFractionDigits: numericPart % 1 === 0 ? 0 : 1,
        minimumFractionDigits: numericPart % 1 === 0 ? 0 : 1
      })}
      {suffix}
    </div>
  );
};

const data = {
  profile: {
    name: "Arnab Mitra",
    title: "Strategy & Operations Lead • Travel Fanatic • Coffee Addict",
    bio: "I specialize in closing the gap between high-level strategy and ground-level execution, driving ownership and ₹100Cr+ impact through AI and deep analytics."
  },
  experience: [
    {
      company: "Lemon Tree Hotels",
      role: "Strategy & Operations Lead",
      period: "Apr 2025 — Present",
      desc: "Bridging the gap between corporate strategy and ground-level execution. I own the digital transformation roadmap, scaling the systems that empower our teams and drive real-world commercial value across the portfolio."
    },
    {
      company: "Boston Consulting Group (BCG)",
      role: "Management Consultant",
      period: "May 2022 — Mar 2025",
      desc: "Solving high-stakes puzzles for global leaders. I transformed complex consumer data into growth playbooks, helping multi-billion dollar brands identify their next big opportunities in competitive markets."
    },
    {
      company: "JP Morgan & Chase",
      role: "Quantitative Research Analyst",
      period: "June 2018 — July 2020",
      desc: "Mastering the mathematics of risk. I engineered the high-precision engines that power real-time trading decisions, focusing on extreme accuracy where every single basis point counts."
    }
  ],
  impact: [
    {
      number: "₹100 Cr+",
      title: "Commercial Value",
      client: "Indian Mid-market Hospitality",
      desc: "Annual impact delivered through multi-product value engineering and digital transformation initiatives."
    },
    {
      number: "$100M+",
      title: "Growth Opportunity",
      client: "Global Leading F&B Brand",
      desc: "Incremental revenue unlocked for global leaders through strategic brand positioning and market entry."
    },
    {
      number: "₹50 Cr+",
      title: "Cost Optimization",
      client: "Indian leading formal wear label",
      desc: "Annual savings realized by re-engineering product design, sourcing, and high-stakes vendor negotiations."
    },
    {
      number: "90%+",
      title: "Process Adoption",
      client: "Indian Mid-market Hospitality",
      desc: "Digital transformation success for enterprise-scale CRM implementations across 200+ power users."
    },
    {
      number: "1.5x",
      title: "Sales Coverage",
      client: "Leading Alco-Beverage Brand",
      desc: "Operational scale achieved by redesigning beat plans and sales architecture across 10+ key markets."
    },
    {
      number: "30%",
      title: "Faster Risk Delivery",
      client: "Global Investment Bank",
      desc: "Re-designed exposure calculation for 5 instruments, along with robust risk reporting framework"
    },


  ],
  skills: [
    { category: "Strategy", items: ["Digital Transformation", "Go-to-Market (GTM)", "Value Engineering", "Pricing Strategy", "Process Automation"] },
    { category: "Stakeholder Management", items: ["C-suite Management", "Cross-functional Execution", "Data-driven Prioritization", "Executive Storytelling"] },
    { category: "Analytics", items: ["Advanced Python", "Statistical Modeling", "Risk Analytics", "Tableau & Power BI", "Algorithmic Optimization"] },
    { category: "Tools & Technology", items: ["Salesforce CRM", "WebEngage", "JIRA & Confluence", "SQL & Python", "Slack Automations"] }
  ],
  testimonials: [
    {
      name: "Naman Kamra",
      title: "Strategic Initiatives @ Lemon Tree | Ex-Bain",
      date: "May 2026",
      relation: "Naman reported to Arnab directly",
      quote: "Arnab stands out for his structured thinking and strong execution. He breaks down complex problems into actionable steps and ensures consistent follow-through. His approach to decision-making is grounded in data, which improves both speed and accuracy."
    },
    {
      name: "Akshat Rawat",
      title: "Strategy & Operations @ Lemon Tree Hotels",
      date: "April 2026",
      relation: "Akshat reported to Arnab directly",
      quote: "Arnab approaches new projects with a level of enthusiasm and structure that is both motivating and effective. Rather than just driving execution, he invests in understanding the brief fully and brings clarity to the team working with him."
    },
    {
      name: "Prianshu Chatterjee",
      title: "Data Scientist @ Ebay India | Ex-Lead DS @ Lemon Tree",
      date: "April 2026",
      relation: "Prianshu worked as a co-lead on the same team",
      quote: "Have worked with Arnab across two companies and many intense use cases. His eye for rigour and sense of value unlock is an amazing asset. Very analytically oriented and hardworking individual who is also a fun colleague and pleasure to interact with."
    },
    {
      name: "Sayan Mondal",
      title: "Consulting Analyst @ Accenture | Ex-Strategy @ Lemon Tree",
      date: "April 2026",
      relation: "Sayan reported to Arnab directly",
      quote: "Arnab is an exceptional manager and a great mentor. I was constantly impressed by his ability to handle multiple workstreams in parallel. Arnab took a genuine interest in my professional growth, providing candid feedback."
    },
    {
      name: "Ankur Singh",
      title: "Senior Manager, Strategy & Transformation @ Lemon Tree",
      date: "April 2026",
      relation: "Ankur reported to Arnab directly",
      quote: "Arnab stands out because he combines clear strategic thinking with strong execution. He does not just focus on getting a project over the line. He looks at the larger operating model and puts better systems in place."
    },
    {
      name: "Sarath Mutnuru",
      title: "SWE @ Rubrik | Ex-JP Morgan Services",
      date: "April 2026",
      relation: "Sarath was senior to Arnab",
      quote: "He is a very quick learner with a keen sense of curiosity and ownership towards the projects. He has proven to be a dependable asset to our team by accomplishing the tasks in both quality and time."
    }
  ]
};

export default function Home() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section id="about" className="container hero">
        <div className="fade-up">
          <div className="chat-avatar" style={{ width: '80px', height: '80px', marginBottom: '2rem' }}>
            <img
              src="/profile.jpeg"
              alt="Arnab Mitra"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span className="label">Based in Gurugram, India</span>
          <h1 className="hero-title">{data.profile.name}</h1>
          <p className="hero-subtitle" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--muted)',
            letterSpacing: '0.02em',
            lineHeight: 1.5
          }}>
            <span style={{ color: 'var(--foreground)', fontWeight: 700 }}>Strategy & Operations Lead</span>
            <span className="hide-mobile" style={{ opacity: 0.3, fontWeight: 300 }}>|</span>
            <span>Travel Fanatic</span>
            <span className="hide-mobile" style={{ opacity: 0.3, fontWeight: 300 }}>|</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Coffee Addict</span>
          </p>
          <h2 style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            marginBottom: '2.5rem',
            fontWeight: 500,
            maxWidth: '900px',
            lineHeight: 1.5,
            fontFamily: 'var(--font-serif)',
            color: 'var(--foreground)',
            opacity: 0.95
          }}>
            “In God I trust; for everything else, I <span style={{ color: 'var(--accent)', fontWeight: 700 }}>build trust through data.</span>”
          </h2>
          <p className="hero-description">{data.profile.bio}</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/cv.pdf" download className="btn btn-primary">Download CV</a>
            <a href="mailto:arnab.apps96@gmail.com" className="btn btn-outline">Get in touch</a>
          </div>
        </div>
      </section>

      {/* Operating Principles Section */}
      <section id="principles" className="section" style={{ background: '#fdfcfb', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="label">The Core DNA</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '4rem' }}>How I Drive High-Stakes Impact</h2>
          <div className="principle-grid">
            <div className="principle-card fade-up">
              <span className="principle-icon">⚖️</span>
              <h3>High-Trust, High-Rigor</h3>
              <p>High-autonomy leadership combined with rigorous, data-driven auditing to ensure zero slippage in high-stakes environments.</p>
            </div>
            <div className="principle-card fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="principle-icon">📊</span>
              <h3>Data-Backed Conviction</h3>
              <p>Moving beyond intuition. Every strategic bet is validated by deep, predictive analytics and real-world market signals.</p>
            </div>
            <div className="principle-card fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="principle-icon">🚀</span>
              <h3>Ownership x Execution</h3>
              <p>Strategy is just a slide deck until it’s operationalized. I own the entire outcome, from the first node of planning to the final mile of delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section container">
        <span className="label">The Career Narrative</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '4rem' }}>A Track Record of Ownership & Delivery</h2>
        <div className="work-grid">
          {data.experience.map((exp, i) => (
            <div key={i} className="work-item fade-up" style={{ animationDelay: `${0.2 * i}s` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}>
                  <img
                    src={`https://www.google.com/s2/favicons?sz=128&domain=${exp.company.toLowerCase().includes('lemon') ? 'lemontreehotels.com' :
                      exp.company.toLowerCase().includes('boston') ? 'bcg.com' :
                        'jpmorgan.com'
                      }`}
                    alt={exp.company}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '10px',
                      zIndex: 2
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: 'var(--accent)',
                    background: '#f8fafc',
                    zIndex: 1
                  }}>
                    {exp.company.charAt(0)}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--foreground)', lineHeight: 1.2 }}>{exp.company}</h4>
                  <p style={{ fontSize: '0.75rem', margin: 0, color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.period}</p>
                </div>
              </div>
              <h3 style={{ fontSize: '1.3rem', marginTop: '0.5rem' }}>{exp.role}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--muted)' }}>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value & Impact Section */}
      <section id="impact" className="section container">
        <div style={{ marginBottom: '4rem' }}>
          <span className="label">Quantified Results</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>Data-Backed Success Stories</h2>
        </div>
        <div className="impact-grid">
          {data.impact.map((item, i) => (
            <div key={i} className="impact-card fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="impact-mast">{item.client}</div>
              <div className="impact-content">
                <div className="impact-number">
                  <Counter value={item.number} />
                </div>
                <h3 className="impact-title">{item.title}</h3>
                <p className="impact-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="section container" style={{ background: '#fdfcfb', borderTop: '1px solid var(--border)' }}>
        <span className="label">The Perspective</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, marginBottom: '4rem' }}>
          Sink or swim, but <span style={{ color: 'var(--accent)' }}>Technology will take over.</span> I choose to build the ship.
        </h2>
        <div className="fade-up">
          <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '700px' }}>
            In an era of rapid disruption, strategy without technological leverage is obsolete. I build resilient systems that combine human judgment with machine intelligence.
          </p>
        </div>
      </section>

      {/* Passion Projects Section */}
      <section id="projects" className="section container">
        <span className="label">The Innovation Lab</span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '4rem' }}>Beyond the Day Job</h2>
        <div className="projects-wrapper">
          <div style={{ flex: 1, zIndex: 2 }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Active Development</span>
            <h3 style={{ fontSize: '2.5rem', color: '#fff', margin: '1rem 0' }}>Vitality: The AI Health OS</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Turbo-charging personalized wellness for high-performers. Vitality transforms static tracking into a predictive experience using a proprietary nutrition engine and customized LLM agents.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
              <li style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: 'var(--accent)', marginTop: '0.2rem' }}>✦</span>
                <span>
                  <span style={{ color: '#fff', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Smart Estimation</span>
                  Real-time macro analysis for 500+ meals with portion-aware calibration.
                </span>
              </li>
              <li style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: 'var(--accent)', marginTop: '0.2rem' }}>✦</span>
                <span>
                  <span style={{ color: '#fff', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Contextual Logic</span>
                  AI-powered adjustments for complex cooking styles and dietary preferences.
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                <span style={{ color: 'var(--accent)', marginTop: '0.2rem' }}>✦</span>
                <span>
                  <span style={{ color: '#fff', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Regional Precision</span>
                  Deep library of regional Indian meals calibrated for exact nutritional fidelity.
                </span>
              </li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.8rem' }}>Next.js</span>
              <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.8rem' }}>LangChain</span>
              <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.8rem' }}>TailwindCSS</span>
              <a 
                href="https://vitality-health-app-ruby.vercel.app/" 
                target="_blank" 
                className="btn" 
                style={{ 
                  background: 'var(--accent)', 
                  color: '#fff', 
                  padding: '0.5rem 1.25rem', 
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontWeight: 700,
                  marginLeft: '0.5rem'
                }}
              >
                Launch App ↗
              </a>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <div className="phone-mockup">
              {/* Dynamic Island / Notch */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70px',
                height: '22px',
                background: '#000',
                borderRadius: '12px',
                zIndex: 10,
                border: '1px solid rgba(255,255,255,0.1)'
              }}></div>

              {/* Screen Content */}
              <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: '#fff' }} className="hide-scrollbar">
                <img
                  src="/vitality_real_dashboard.png"
                  alt="Vitality Dashboard"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
          {/* Decorative background element */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.1, zIndex: 1 }}></div>
        </div>
      </section>

      {/* Toolkit Section */}
      <section id="skills" className="section" style={{ background: '#fff' }}>
        <div className="container">
          <span className="label">The Operational Arsenal</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '4rem' }}>The Toolkit I Use to Scale</h2>
          <div className="toolkit-grid">
            {data.skills.map((skill, i) => (
              <div key={i} className="toolkit-card fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <h3>{skill.category}</h3>
                <ul>
                  {skill.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Interviewer Section */}
      <section id="ai-twin" className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="interviewer-grid">
            <div className="fade-up">
              <span className="label">The Digital Twin</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.1 }}>
                Interview <span style={{ color: 'var(--accent)' }}>My AI.</span>
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                To save you time, I’ve built a digital version of myself grounded in my real-world experience at BCG, Lemon Tree, and JP Morgan. 
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, marginTop: '0.2rem', fontWeight: 800 }}>1</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>Ask about specific project outcomes or strategic frameworks.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, marginTop: '0.2rem', fontWeight: 800 }}>2</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>Get instant answers on my background, skills, and availability.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--foreground)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0, marginTop: '0.2rem', fontWeight: 800 }}>3</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>Limit of 3 prompts per session—let's keep it efficient!</p>
                </div>
              </div>
            </div>
            <div className="fade-up" style={{ animationDelay: '0.2s' }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '32px', 
                border: '1px solid var(--border)', 
                height: '550px', 
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <ChatInterface />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <span className="label">Social Proof</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '4rem' }}>What the People I Lead Say</h2>
          <div className="testimonial-grid">
            {data.testimonials.map((t, i) => (
              <div key={i} className="fade-up" style={{
                animationDelay: `${0.1 * i}s`,
                background: '#fff',
                padding: '2.5rem',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div>
                  <div style={{ color: 'var(--accent)', fontSize: '1.5rem', fontFamily: 'serif', marginBottom: '1rem', opacity: 0.3 }}>“</div>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem', /* Matching work experience font size */
                    lineHeight: 1.6,
                    color: 'var(--foreground)',
                    marginBottom: '2rem'
                  }}>
                    {t.quote}
                  </p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.2rem', fontSize: '0.9rem', fontWeight: 700 }}>{t.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.25rem' }}>{t.title}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontStyle: 'italic', opacity: 0.8 }}>{t.relation} • {t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Talk Section */}
      <section id="contact" className="section" style={{ background: '#fdfcfb', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="fade-up contact-card">
            <span className="label">Let's Connect</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', marginBottom: '1.5rem', color: 'var(--foreground)', lineHeight: 1.1 }}>
              From Strategy to <span style={{ color: 'var(--accent)' }}>Execution.</span>
            </h2>
            <p style={{ maxWidth: '700px', marginBottom: '3.5rem', color: 'var(--muted)', fontSize: '1.15rem', lineHeight: 1.6 }}>
              I’m ready to move beyond the slide deck. I’m looking for high-ownership leadership roles where I can drive initiatives from inception to impact and deliver tangible, long-term value.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/cv.pdf" download className="btn" style={{
                background: 'var(--foreground)',
                color: '#fff',
                padding: '1.25rem 2.5rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: '12px'
              }}>Download CV</a>
              <a href="https://www.linkedin.com/in/arnab-mitra96/" target="_blank" className="btn" style={{
                background: 'var(--accent)',
                color: '#fff',
                padding: '1.25rem 2.5rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: '12px'
              }}>LinkedIn</a>
              <a href="mailto:arnab.apps96@gmail.com" className="btn" style={{
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                padding: '1.25rem 2.5rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: '12px'
              }}>Email Me</a>
            </div>
          </div>
        </div>
      </section>
      <PersonalSection />
      <Chatbot />
    </main>
  )
}
