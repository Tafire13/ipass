import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../auth";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <a href="/" className="brand-lockup" aria-label="IPASS">
          <span className="brand-symbol" aria-hidden="true">&lt;/&gt;</span>
          <span className="brand-copy"><strong>IPASS</strong><small>ระบบจัดการสอบเขียนโปรแกรม</small></span>
        </a>
        <SignOutButton />
      </header>
      <section className="dashboard-welcome">
        <span className="dashboard-check" aria-hidden="true">✓</span>
        <p className="dashboard-eyebrow">GOOGLE ACCOUNT CONNECTED</p>
        <h1>เข้าสู่ระบบสำเร็จ</h1>
        <p className="dashboard-description">ยินดีต้อนรับสู่ IPASS</p>
        <div className="account-card">
          <span className="account-avatar" aria-hidden="true">{session.user.name?.charAt(0) ?? "S"}</span>
          <span><strong>{session.user.name ?? "ผู้ใช้ IPASS"}</strong><small>{session.user.email}</small></span>
          <span className="account-verified">ยืนยันด้วย Google</span>
        </div>
        <p className="dashboard-note">พื้นที่นี้เตรียมไว้สำหรับหน้าระบบสอบของคุณ</p>
      </section>
      <footer className="dashboard-footer">© 2026 IPASS · มหาวิทยาลัยมหาสารคาม</footer>
    </main>
  );
}
