import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerCraft - 职业模拟沙盒",
  description: "AI 驱动的像素风职业模拟沙盒",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
