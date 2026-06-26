"use client";

import { useEffect, useRef } from "react";
import { Sora, Inter } from "next/font/google";
import "./sitereport.css";

/* Sora (display) + Inter (body), self-hosted at build time. The rest of the
   site declares these families but never loads them; loading them here (scoped
   to this page via CSS variables) keeps the page faithful to sitereport.html
   without touching the shared layout. */
const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

/* =========================================================================
   DEMO REQUEST BACKEND HOOK  ← finish this later.
   Leave FORM_ENDPOINT = "" to run in front-end-only mode
   (validates + shows success, logs the email to the console).
   When the backend is ready, set FORM_ENDPOINT to a URL that accepts
   { email } and emails the invite code + 3-day start link.
   ========================================================================= */
const FORM_ENDPOINT = ""; // e.g. "https://api.threshold-technologies.com/sitereport/demo-request"

export default function SiteReportView() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel);

    /* ---- report sheet self-generates ---- */
    const report = q("#sr-report");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finishReport = () => {
      const s = q("#sr-repState");
      if (s) {
        s.classList.add("done");
        s.innerHTML = '<span class="d"></span>Ready · SR-0426-12';
      }
    };
    let repTimer: number | undefined;
    if (report && !reduce) {
      report.classList.add("animate");
      repTimer = window.setTimeout(finishReport, 1900);
    } else {
      finishReport();
    }

    /* ---- demo modal ---- */
    const modal = q("#sr-modal");
    const form = q<HTMLFormElement>("#sr-demoForm");
    const emailInput = q<HTMLInputElement>("#sr-email");
    const err = q("#sr-err");
    const submitBtn = q<HTMLButtonElement>("#sr-submitBtn");
    const formState = q("#sr-formState");
    const okState = q("#sr-okState");
    const okEmail = q("#sr-okEmail");
    let lastFocus: HTMLElement | null = null;
    let keyBound = false;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "Tab" && modal?.classList.contains("open")) {
        let f = Array.from(
          modal.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])'),
        );
        f = f.filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const resetToForm = () => {
      formState?.classList.remove("hide");
      okState?.classList.remove("show");
      err?.classList.remove("show");
      emailInput?.classList.remove("bad");
      if (emailInput) emailInput.value = "";
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Request invite code <span class="arw">→</span>';
      }
    };
    const openModal = () => {
      lastFocus = document.activeElement as HTMLElement;
      modal?.classList.add("open");
      document.body.style.overflow = "hidden";
      resetToForm();
      window.setTimeout(() => emailInput?.focus(), 60);
      document.addEventListener("keydown", onKey);
      keyBound = true;
    };
    const closeModal = () => {
      modal?.classList.remove("open");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      keyBound = false;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const opener = target.closest("[data-demo-open]");
      if (opener && root.contains(opener)) {
        e.preventDefault();
        openModal();
        return;
      }
      const closer = target.closest("[data-demo-close]");
      if (closer && root.contains(closer)) {
        e.preventDefault();
        closeModal();
      }
    };
    document.addEventListener("click", onDocClick);

    const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const requestDemo = (email: string): Promise<unknown> => {
      if (FORM_ENDPOINT) {
        return fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, product: "sitereport-ai", demoDays: 3 }),
        }).then((r) => {
          if (!r.ok) throw new Error("bad status");
          return r;
        });
      }
      console.log("[SiteReport AI] demo request (no endpoint set):", email);
      return new Promise((res) => window.setTimeout(res, 600));
    };

    const showSuccess = (email: string) => {
      if (okEmail) okEmail.textContent = email;
      formState?.classList.add("hide");
      okState?.classList.add("show");
    };

    const onSubmit = (e: Event) => {
      e.preventDefault();
      const email = emailInput?.value.trim() ?? "";
      if (!validEmail(email)) {
        if (err) err.textContent = "Enter a valid email address.";
        err?.classList.add("show");
        emailInput?.classList.add("bad");
        emailInput?.focus();
        return;
      }
      err?.classList.remove("show");
      emailInput?.classList.remove("bad");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      requestDemo(email)
        .then(() => showSuccess(email))
        .catch(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Request invite code <span class="arw">→</span>';
          }
          if (err) err.textContent = "Something went wrong. Please try again.";
          err?.classList.add("show");
        });
    };
    const onEmailInput = () => {
      if (err?.classList.contains("show")) {
        err.classList.remove("show");
        emailInput?.classList.remove("bad");
      }
    };
    form?.addEventListener("submit", onSubmit);
    emailInput?.addEventListener("input", onEmailInput);

    return () => {
      if (repTimer) window.clearTimeout(repTimer);
      document.removeEventListener("click", onDocClick);
      if (keyBound) document.removeEventListener("keydown", onKey);
      form?.removeEventListener("submit", onSubmit);
      emailInput?.removeEventListener("input", onEmailInput);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={rootRef} className={`sr-page ${sora.variable} ${inter.variable}`}>
      {/* ================= HERO ================= */}
      <section className="hero">
        <svg className="portal" viewBox="0 0 360 360" fill="none" aria-hidden="true">
          <rect x="20" y="20" width="320" height="320" stroke="#A51632" strokeOpacity=".14" strokeWidth="1.5" />
          <rect x="62" y="62" width="236" height="278" stroke="#A51632" strokeOpacity=".22" strokeWidth="1.5" />
          <rect x="104" y="104" width="152" height="236" stroke="#A51632" strokeOpacity=".34" strokeWidth="1.5" />
          <rect x="146" y="150" width="68" height="190" stroke="#A51632" strokeOpacity=".5" strokeWidth="1.5" />
          <circle cx="180" cy="150" r="3.5" fill="#A51632" />
        </svg>
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-left">
              <span className="label blue">
                DiSam <span className="sep">▸</span> SiteReport AI
              </span>
              <h1>
                Walk the site.
                <br />
                The report <em>writes itself.</em>
              </h1>
              <p className="lede">
                Capture photos and notes on the walk. SiteReport AI turns them into a{" "}
                <b>structured, dated, professional report</b> — daily log, inspection, progress, snags — ready before
                you reach the gate.
              </p>
              <div className="cta-row">
                <button className="sr-btn sr-btn-primary" data-demo-open="">
                  Request Demo <span className="arw">→</span>
                </button>
                <a className="sr-btn sr-btn-ghost" href="#how">
                  See how it works
                </a>
              </div>
              <span className="hero-status">
                <span className="dot"></span> 3-day demo · invite-code access
              </span>
            </div>

            <div className="sheet" id="sr-report" aria-hidden="true">
              <div className="sheet-bar">
                <span className="tag">SiteReport AI</span>
                <span className="state" id="sr-repState">
                  <span className="d"></span>Generating…
                </span>
              </div>
              <div className="sheet-head">
                <div className="field">
                  <div className="k">Project</div>
                  <div className="v">Marina Tower 04</div>
                </div>
                <div className="field">
                  <div className="k">Zone</div>
                  <div className="v">Level 12 · Core B</div>
                </div>
                <div className="field">
                  <div className="k">Date</div>
                  <div className="v">18 Jun 2026</div>
                </div>
                <div className="field">
                  <div className="k">Ref</div>
                  <div className="v">SR-0426-12</div>
                </div>
              </div>
              <div className="sheet-body">
                <div className="entry">
                  <div className="thumb"></div>
                  <div>
                    <div className="t">Blockwork — east partition complete</div>
                    <div className="s">
                      <span className="zone">L12-B</span> · 07:42 · progress logged
                    </div>
                  </div>
                </div>
                <div className="entry">
                  <div className="thumb"></div>
                  <div>
                    <div className="t">Snag: conduit clash at grid C4</div>
                    <div className="s">
                      <span className="zone">L12-B</span> · 08:05 · assigned to MEP
                    </div>
                  </div>
                </div>
                <div className="entry">
                  <div className="thumb"></div>
                  <div>
                    <div className="t">Safety: edge protection verified</div>
                    <div className="s">
                      <span className="zone">L12-B</span> · 08:20 · pass
                    </div>
                  </div>
                </div>
                <div className="progress">
                  <div className="lab">
                    <span>Zone progress</span>
                    <b id="sr-pPct">72%</b>
                  </div>
                  <div className="bar">
                    <i></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== STRIP ============== */}
      <div className="strip">
        <div className="wrap">
          <span>
            <span className="pin">●</span> Built for the GCC site
          </span>
          <span>
            <b>Daily logs</b>
          </span>
          <span>
            <b>Inspections</b>
          </span>
          <span>
            <b>Progress</b>
          </span>
          <span>
            <b>Snags &amp; defects</b>
          </span>
          <span>
            <b>Safety walks</b>
          </span>
          <span>
            English &amp; <b>العربية</b>
          </span>
        </div>
      </div>

      {/* ============== PROBLEM ============== */}
      <section className="sec">
        <div className="wrap">
          <span className="label grey" style={{ display: "block", marginBottom: "34px" }}>
            01 / The reality
          </span>
          <p className="statement">
            <em>Every evening, site teams rebuild the day from memory and a camera roll.</em> Reports land late, photos
            go unfiled, and the record is thin when it matters most. <b>SiteReport AI keeps the record as you walk.</b>
          </p>
        </div>
      </section>

      {/* ============== CAPABILITIES ============== */}
      <section className="sec" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="label blue num">02 / Capabilities</span>
            <h2 className="sec-title">Everything a site report needs, captured once.</h2>
          </div>
          <div className="caps">
            <div className="cap">
              <span className="label grey ix">C-01 / System</span>
              <h3>Capture on the walk</h3>
              <p>
                Photos, voice notes and observations, tagged to zone and time as you record them. Works offline; syncs
                when you&apos;re back in range.
              </p>
            </div>
            <div className="cap">
              <span className="label grey ix">C-02 / System</span>
              <h3>Reports in your format</h3>
              <p>
                Daily diary, inspection, progress, snags and safety — generated to the template your project already
                uses.
              </p>
            </div>
            <div className="cap">
              <span className="label grey ix">C-03 / System</span>
              <h3>Evidence on every line</h3>
              <p>Each entry is backed by a timestamped, located image. Nothing is &quot;he said&quot; — it&apos;s filed.</p>
            </div>
            <div className="cap">
              <span className="label grey ix">C-04 / System</span>
              <h3>Progress you can see</h3>
              <p>Percent complete by zone and trade, tracked day over day, so the programme story tells itself.</p>
            </div>
            <div className="cap">
              <span className="label grey ix">C-05 / System</span>
              <h3>Snags that get closed</h3>
              <p>Raise, assign and track defects from the same walk. Status follows the snag to sign-off.</p>
            </div>
            <div className="cap">
              <span className="label grey ix">C-06 / System</span>
              <h3>Sign-off &amp; export</h3>
              <p>Review, sign and export to PDF. Share with the client or push into the DiSam ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="sec" id="how" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="label blue num">03 / How it works</span>
            <h2 className="sec-title">From site walk to sign-off in three moves.</h2>
          </div>
          <div className="steps">
            <div className="step act">
              <span className="label blue sn">Step 01</span>
              <h3>Capture</h3>
              <p>Walk the zone. Snap, speak or note what you see — SiteReport AI tags location, time and trade automatically.</p>
            </div>
            <div className="step">
              <span className="label grey sn">Step 02</span>
              <h3>Generate</h3>
              <p>It drafts a structured report in your format — entries ordered, photos placed, progress calculated.</p>
            </div>
            <div className="step">
              <span className="label grey sn">Step 03</span>
              <h3>Sign-off &amp; send</h3>
              <p>Review, adjust, sign and export. The day is on record before you&apos;ve left the building.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== DEMO BAND ============== */}
      <section className="demo-band" id="demo">
        <svg className="portal2" viewBox="0 0 360 360" fill="none" aria-hidden="true">
          <rect x="20" y="20" width="320" height="320" stroke="var(--blue)" strokeOpacity=".25" strokeWidth="1.5" />
          <rect x="62" y="62" width="236" height="278" stroke="var(--blue)" strokeOpacity=".3" strokeWidth="1.5" />
          <rect x="104" y="104" width="152" height="236" stroke="var(--blue)" strokeOpacity=".4" strokeWidth="1.5" />
          <rect x="146" y="150" width="68" height="190" stroke="var(--blue)" strokeOpacity=".6" strokeWidth="1.5" />
          <circle cx="180" cy="150" r="3.5" fill="var(--blue)" />
        </svg>
        <div className="wrap demo-inner">
          <div>
            <span className="label blue">
              DiSam <span className="sep">▸</span> SiteReport AI
            </span>
            <h2>
              Try it on your <em>own site</em>
              <br />
              for three days.
            </h2>
            <p className="copy">
              Request a demo and we&apos;ll email you an invite code with a link to start. Run SiteReport AI on a live
              walk — your project, your format — and see the report write itself.
            </p>
            <div className="demo-meta">
              <span className="chip">
                <b>3</b> days full access
              </span>
              <span className="chip">Invite-code entry</span>
              <span className="chip">No card required</span>
            </div>
          </div>
          <div className="demo-card">
            <div className="step-line">
              <span className="n">01</span>
              <div>
                <div className="h">Request your demo</div>
                <div className="d">Drop your email below.</div>
              </div>
            </div>
            <div className="step-line">
              <span className="n">02</span>
              <div>
                <div className="h">Get your invite code</div>
                <div className="d">We email a code and a start link.</div>
              </div>
            </div>
            <div className="step-line">
              <span className="n">03</span>
              <div>
                <div className="h">Run it for 3 days</div>
                <div className="d">Full access on your own site.</div>
              </div>
            </div>
            <button className="sr-btn sr-btn-primary" data-demo-open="">
              Request Demo <span className="arw">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= DEMO MODAL ================= */}
      <div className="modal" id="sr-modal" role="dialog" aria-modal="true" aria-labelledby="sr-mTitle">
        <div className="modal-back" data-demo-close=""></div>
        <div className="modal-card">
          <div className="modal-top">
            <span className="tag">
              <b>SiteReport AI</b> · 3-day demo
            </span>
            <button className="modal-close" data-demo-close="" aria-label="Close">
              ✕
            </button>
          </div>
          <div className="modal-body">
            <div className="form-state" id="sr-formState">
              <h3 id="sr-mTitle">
                Request your <em>invite code</em>
              </h3>
              <p className="sub">
                Tell us where to send it. We&apos;ll email your invite code and a link to start your 3-day demo on your
                own site.
              </p>
              <form id="sr-demoForm" noValidate>
                <div className="field-group">
                  <label htmlFor="sr-email">Work email</label>
                  <input
                    id="sr-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                  <div className="err" id="sr-err">
                    Enter a valid email address.
                  </div>
                </div>
                <button className="sr-btn sr-btn-primary" type="submit" id="sr-submitBtn">
                  Request invite code <span className="arw">→</span>
                </button>
              </form>
              <p className="fine">
                By requesting a demo you agree to be contacted about SiteReport AI.
                <br />
                One code per email · access ends automatically after 3 days.
              </p>
            </div>
            <div className="ok-state" id="sr-okState">
              <div className="ok-ring">✓</div>
              <h3>Request received.</h3>
              <p>
                We&apos;ve logged <b id="sr-okEmail">your email</b>. Your <b>invite code</b> and start link are on their
                way — check your inbox (and spam) shortly.
              </p>
              <p className="fine" style={{ marginTop: "18px" }}>
                Your 3-day demo begins the moment you redeem the code.
              </p>
              <button
                className="sr-btn sr-btn-ghost"
                data-demo-close=""
                style={{ width: "100%", justifyContent: "center", marginTop: "20px" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
