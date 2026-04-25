import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://territoriosmaisuff.vercel.app"),
  title: "UFF + Território | Observatório Popular do Médio Paraíba",
  description:
    "Conhecimento enraizado no território: ambiente, dados, cultura e ação popular no Médio Paraíba.",
  openGraph: {
    title: "UFF + Território",
    description:
      "Observatório Popular do Médio Paraíba: universidade pública, território, dados, cultura e ação popular.",
    type: "website",
    locale: "pt_BR"
  },
  twitter: {
    card: "summary_large_image",
    title: "UFF + Território",
    description:
      "Conhecimento enraizado no território. Ambiente, dados, cultura e ação popular."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
