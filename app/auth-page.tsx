"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState, type FormEvent } from "react";

type AuthMode = "login" | "register";

function BrandMark() {
  return (
    <div className="brand-lockup" aria-label="IPASS ระบบจัดการสอบเขียนโปรแกรม">
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M7 8.5h18v15H7z" stroke="currentColor" strokeWidth="1.8" />
          <path d="m12 13 3 3-3 3m6 0h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="23.5" cy="8.5" r="2.5" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-copy">
        <strong>IPASS</strong>
        <small>ระบบจัดการสอบเขียนโปรแกรม</small>
      </span>
    </div>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 8.5 5 8.5 7a8.8 8.8 0 0 1-2.3 3.1M6.1 6.1C3.9 7.7 2.5 10.4 2.5 12c0 2 3.3 7 9.5 7 1 0 2-.2 2.9-.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M2.5 12s3.3-7 9.5-7 9.5 7 9.5 7-3.3 7-9.5 7-9.5-7-9.5-7Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function PasswordField({
  id,
  label,
  autoComplete,
}: {
  id: string;
  label: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap has-action">
        <svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4.5" y="10" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <input id={id} name={id} type={visible ? "text" : "password"} autoComplete={autoComplete} placeholder="อย่างน้อย 8 ตัวอักษร" minLength={8} required />
        <button className="icon-button" type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}>
          <EyeIcon visible={visible} />
        </button>
      </div>
    </div>
  );
}

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const isRegister = mode === "register";
  const [notice, setNotice] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error === "AccessDenied") {
      setNotice("บัญชี Google นี้ไม่ได้รับอนุญาต กรุณาใช้บัญชี @msu.ac.th");
    } else if (error) {
      setNotice("เข้าสู่ระบบด้วย Google ไม่สำเร็จ กรุณาลองอีกครั้งหรือตรวจสอบการตั้งค่า");
    }
  }, []);

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setGoogleLoading(false);
      setNotice("ไม่สามารถเชื่อมต่อ Google ได้ กรุณาลองใหม่อีกครั้ง");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").toLowerCase();
    if (!email.endsWith("@msu.ac.th")) {
      setNotice("กรุณาใช้อีเมลมหาวิทยาลัยที่ลงท้ายด้วย @msu.ac.th");
      return;
    }
    if (isRegister && data.get("password") !== data.get("confirm-password")) {
      setNotice("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    setNotice("แบบฟอร์มพร้อมแล้ว แต่ระบบบัญชียังไม่ได้เชื่อมต่อกับเซิร์ฟเวอร์");
  }

  return (
    <main className="auth-shell">
      <header className="site-header">
        <Link href="/" className="brand-link" aria-label="IPASS หน้าหลัก"><BrandMark /></Link>
        <div className="header-meta"><span className="status-dot" />ระบบสอบออนไลน์ <span className="header-divider" />มหาวิทยาลัยมหาสารคาม</div>
      </header>

      <section className="auth-layout" aria-label={isRegister ? "สมัครสมาชิก IPASS" : "เข้าสู่ระบบ IPASS"}>
        <div className="intro-panel">
          <div className="intro-grid" aria-hidden="true" />
          <div className="intro-content">
            <span className="eyebrow"><span className="eyebrow-mark">01</span> LEARN · PRACTICE · PASS</span>
            <h1>พื้นที่สอบ<br /><span>ที่พร้อมให้คุณ</span><br />คิดได้เต็มที่</h1>
            <p className="intro-description">ฝึกฝนทักษะการเขียนโปรแกรมและทำข้อสอบในสภาพแวดล้อมที่ออกแบบมาเพื่อการเรียนรู้</p>
            <div className="feature-list">
              <div className="feature-item"><span className="feature-icon">&lt;/&gt;</span><span><strong>เขียนโค้ดได้ในที่เดียว</strong><small>พร้อมพื้นที่ส่งคำตอบอย่างเป็นระบบ</small></span></div>
              <div className="feature-item"><span className="feature-icon feature-icon-shield">✓</span><span><strong>ผลสอบเป็นส่วนตัว</strong><small>ดูข้อมูลของคุณได้อย่างปลอดภัย</small></span></div>
            </div>
          </div>
          <div className="code-card" aria-hidden="true">
            <div className="code-card-top"><div className="window-dots"><i /><i /><i /></div><span>solution.py</span><span className="code-language">PY</span></div>
            <div className="code-lines"><span><b>01</b><code><em>def</em> <strong>solve</strong>(n):</code></span><span><b>02</b><code>&nbsp;&nbsp;<em>return</em> n * <i>2</i></code></span><span><b>03</b><code></code></span><span><b>04</b><code><u># ready to submit</u></code></span></div>
            <div className="code-card-foot"><span><i /> ตรวจสอบคำตอบ</span><span>Python 3</span></div>
          </div>
          <span className="intro-orbit orbit-one" aria-hidden="true" /><span className="intro-orbit orbit-two" aria-hidden="true" />
          <div className="intro-footer"><span>IPASS · MSU</span><span>เรียนรู้ได้ทุกวัน</span></div>
        </div>

        <div className="form-panel">
          <div className="form-heading">
            <span className="form-kicker">{isRegister ? "เริ่มต้นใช้งาน" : "ยินดีต้อนรับกลับ"}</span>
            <h2>{isRegister ? "สร้างบัญชีใหม่" : "เข้าสู่ระบบ"}</h2>
            <p>{isRegister ? "กรอกข้อมูลเพื่อเริ่มใช้งานระบบสอบ IPASS" : "เข้าสู่บัญชีมหาวิทยาลัยเพื่อไปต่อ"}</p>
          </div>

          <nav className="auth-tabs" aria-label="บัญชีผู้ใช้">
            <Link href="/" aria-current={!isRegister ? "page" : undefined} className={!isRegister ? "auth-tab active" : "auth-tab"}>เข้าสู่ระบบ</Link>
            <Link href="/register" aria-current={isRegister ? "page" : undefined} className={isRegister ? "auth-tab active" : "auth-tab"}>สมัครสมาชิก</Link>
          </nav>

          <button className="google-button" type="button" onClick={handleGoogleSignIn} disabled={googleLoading}>
            <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/><path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"/></svg>
            {googleLoading ? "กำลังเชื่อมต่อ Google…" : "ดำเนินการต่อด้วย Google"}
          </button>
          <div className="form-divider"><span>หรือใช้อีเมลและรหัสผ่าน</span></div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && <div className="field-group"><label htmlFor="full-name">ชื่อ–นามสกุล</label><div className="input-wrap"><svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg><input id="full-name" name="full-name" type="text" autoComplete="name" placeholder="ชื่อ นามสกุล" required /></div></div>}
            <div className="field-group"><label htmlFor="email">อีเมลมหาวิทยาลัย</label><div className="input-wrap"><svg className="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg><input id="email" name="email" type="email" autoComplete="email" placeholder="name@msu.ac.th" required /></div><span className="field-hint">ใช้บัญชีอีเมล @msu.ac.th</span></div>
            <PasswordField id="password" label="รหัสผ่าน" autoComplete={isRegister ? "new-password" : "current-password"} />
            {isRegister ? <PasswordField id="confirm-password" label="ยืนยันรหัสผ่าน" autoComplete="new-password" /> : <div className="form-options"><label className="remember-option"><input type="checkbox" name="remember" /><span>จดจำฉันไว้</span></label><button type="button" className="text-button" onClick={() => setNotice("หากลืมรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ")}>ลืมรหัสผ่าน?</button></div>}
            <button className="submit-button" type="submit">{isRegister ? "สร้างบัญชี" : "เข้าสู่ระบบ"}<span aria-hidden="true">→</span></button>
            <p className="secure-note"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2.5 16 5v4.8c0 3.7-2.5 6.3-6 7.7-3.5-1.4-6-4-6-7.7V5l6-2.5Z" stroke="currentColor" strokeWidth="1.4" /><path d="m7.5 9.8 1.7 1.7 3.5-3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>ข้อมูลบัญชีของคุณได้รับการปกป้อง</p>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>

          <p className="switch-prompt">{isRegister ? "มีบัญชีอยู่แล้ว?" : "ยังไม่มีบัญชี?"} <Link href={isRegister ? "/" : "/register"}>{isRegister ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</Link></p>
          <div className="form-footer"><span>© 2026 IPASS</span><span>สำหรับการศึกษา · MSU</span></div>
        </div>
      </section>
      <footer className="mobile-footer">ระบบจัดการสอบเขียนโปรแกรม · มหาวิทยาลัยมหาสารคาม</footer>
    </main>
  );
}
