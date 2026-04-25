import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://territoriosmaisuff.vercel.app"),
  title: "Vote UFF + Território | Emenda Participativa de R$ 1 milhão",
  description:
    "Dia 28 de abril de 2026, às 18h, na Praça Brasil: votação pública da emenda participativa para o Observatório Popular do Médio Paraíba.",
  openGraph: {
    title: "Vote UFF + Território na emenda participativa",
    description:
      "Qualquer pessoa pode votar no dia 28 de abril de 2026, às 18h, na Praça Brasil. O projeto mais votado recebe R$ 1 milhão.",
    type: "website",
    locale: "pt_BR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vote UFF + Território",
    description:
      "Votação pública em 28/04/2026, às 18h, na Praça Brasil. Ambiente, dados, cultura e ação popular."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
