import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";

function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is LeadDesk Mini?",
      a: "LeadDesk Mini is a dedicated lead management CRM and helpdesk system. It enables high-growth teams to capture prospect inquiries, visualize sales pipelines with Kanban boards, score leads by budget and urgency, and log collaborative agent notes.",
    },
    {
      q: "How does the Lead Intake workflow function?",
      a: "When a prospect submits an inquiry through our optimized web intake form, the lead is instantaneously validated and routed directly to the authenticated Admin CRM dashboard in real-time.",
    },
    {
      q: "Can I manage lead stages with Kanban workflows?",
      a: "Yes! LeadDesk Mini provides both a structured Data Table and a dynamic Visual Kanban board. You can transition leads seamlessly across 'New', 'Contacted', 'Qualified', and 'Lost' stages with a single click.",
    },
    {
      q: "Can I export our CRM records to CSV?",
      a: "Absolutely. The Admin dashboard includes a 1-click CSV export feature that downloads all filtered or complete lead records, including contact information, budgets, urgency levels, and notes.",
    },
    {
      q: "How secure is the platform?",
      a: "Admin accounts and sensitive data are guarded with industry-standard bcrypt password hashing and stateless JSON Web Tokens (JWT) for secure authentication.",
    },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Instant Lead Capture",
      desc: "Zero-latency intake form with client & server validation, budget segmentation, and automated urgency classification.",
    },
    {
      icon: "📋",
      title: "Visual Kanban Pipeline",
      desc: "Stage-by-stage sales funnel visibility. Move prospects between New, Contacted, Qualified, and Lost with 1-click controls.",
    },
    {
      icon: "🎯",
      title: "Smart Lead Scoring",
      desc: "Prioritize high-value prospects with customizable budget tiers and urgency flags (Urgent, High, Medium, Low).",
    },
    {
      icon: "💬",
      title: "Team Activity Notes",
      desc: "Keep a transparent chronological timeline of agent calls, demo feedback, and internal deal commentary.",
    },
    {
      icon: "📥",
      title: "1-Click CSV Export",
      desc: "Export your entire customer pipeline to CSV spreadsheets instantly for reporting, Excel, or external CRM sync.",
    },
    {
      icon: "🔒",
      title: "Enterprise JWT Security",
      desc: "Role-based authenticated admin dashboard with encrypted session tokens and protected REST endpoints.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Trust & Metrics Strip */}
      <section className="trust-metrics-section">
        <div className="trust-metrics-grid">
          <div className="metric-item">
            <div className="metric-number">99.8%</div>
            <div className="metric-label">Inquiry Delivery SLA</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">&lt; 15 min</div>
            <div className="metric-label">Avg. Response Time</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">4.9 / 5.0</div>
            <div className="metric-label">Client Satisfaction</div>
          </div>
          <div className="metric-item">
            <div className="metric-number">$4.2M+</div>
            <div className="metric-label">Pipeline Tracked</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features-section">
        <div className="section-title-wrap">
          <span className="section-tag">Core Capabilities</span>
          <h2>Engineered for High-Velocity Sales Teams</h2>
          <p>
            Everything you need to turn raw website visitors into qualified, high-paying clients without bloated enterprise complexity.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-box">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Workflow Section */}
      <section className="workflow-section" id="workflow-section">
        <div className="workflow-container">
          <div className="section-title-wrap">
            <span className="section-tag">Streamlined Pipeline</span>
            <h2>How LeadDesk Mini Accelerates Conversions</h2>
            <p>A simple, repeatable 3-step engine to ensure no valuable inquiry slips through the cracks.</p>
          </div>

          <div className="workflow-grid">
            <div className="workflow-card">
              <span className="step-badge">STAGE 01</span>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📥</div>
              <h3>1. Ingest & Classify</h3>
              <p>
                Prospective clients submit their project scope, budget range, and urgency level via the streamlined intake form.
              </p>
            </div>

            <div className="workflow-card">
              <span className="step-badge">STAGE 02</span>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎯</div>
              <h3>2. Triage & Engage</h3>
              <p>
                Sales specialists review high-priority leads in Kanban columns, log call notes, and schedule discovery demos.
              </p>
            </div>

            <div className="workflow-card">
              <span className="step-badge">STAGE 03</span>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🚀</div>
              <h3>3. Qualify & Convert</h3>
              <p>
                Advance verified buyers to Qualified status, export data to CSV, and finalize deal agreements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <LeadForm />

      {/* FAQ Section */}
      <section className="faq-section" id="faq-section">
        <div className="section-title-wrap">
          <span className="section-tag">Frequently Asked</span>
          <h2>Common Questions</h2>
          <p>Everything you need to know about LeadDesk Mini and our lead management pipeline.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.q}</span>
                <span>{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="cta-banner-card">
          <h2>Ready to Supercharge Your Sales Pipeline?</h2>
          <p>
            Join forward-thinking teams using LeadDesk Mini to capture, qualify, and convert more leads every single day.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact-section" className="btn-primary-cta">
              Get Started Today →
            </a>
            <a href="/login" className="btn-secondary-cta" style={{ background: "rgba(255,255,255,0.1)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
              Access Admin CRM
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;