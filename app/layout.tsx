import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IPASS | ระบบจัดการสอบเขียนโปรแกรม",
  description: "เข้าสู่ระบบและสมัครสมาชิกเพื่อใช้งานระบบสอบเขียนโปรแกรม IPASS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="th"><body>{children}</body></html>;
}
