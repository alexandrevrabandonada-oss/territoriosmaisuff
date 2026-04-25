import type { Metadata } from "next";
import { voteUrl, whatsappGroupUrl } from "../share-content";
import { ShareTools } from "../share-tools";

export const metadata: Metadata = {
  title: "Como votar no UFF + Território | 28/04, Praça Brasil",
  description:
    "Página rápida para mobilizar votos no UFF + Território na emenda participativa de R$ 1 milhão.",
  openGraph: {
    title: "Dia 28 eu voto UFF + Território",
    description:
      "Votação pública da emenda participativa: 28 de abril de 2026, às 18h, na Praça Brasil. Qualquer pessoa presente pode votar.",
    url: voteUrl,
    type: "website",
    locale: "pt_BR"
  }
};

export default function VotePage() {
  return (
    <main>
      <section className="quick-vote-hero">
        <div className="quick-vote-mark">UFF<span>+</span>Território</div>
        <p className="eyebrow">Página rápida de mobilização</p>
        <h1>Dia 28, vote no UFF + Território.</h1>
        <p>
          A votação pública da emenda participativa de R$ 1 milhão acontece em
          <strong> 28 de abril de 2026, às 18h, na Praça Brasil, em Volta Redonda.</strong>
          {" "}
          O projeto mais votado recebe o recurso.
        </p>
        <div className="quick-vote-actions">
          <a href={whatsappGroupUrl} target="_blank" rel="noreferrer">Entrar no grupo</a>
          <a href="#compartilhar">Compartilhar agora</a>
        </div>
      </section>

      <section className="quick-vote-facts" aria-label="Resumo da votação">
        <article>
          <span>01</span>
          <strong>Qualquer pessoa presente pode votar.</strong>
          <p>Não é uma votação online. O voto acontece presencialmente na Praça Brasil.</p>
        </article>
        <article>
          <span>02</span>
          <strong>A presença decide a emenda.</strong>
          <p>Glauber Braga escolherá o projeto vencedor conforme a votação popular do dia.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Nosso projeto é público e territorial.</strong>
          <p>Universidade, dados, ambiente, cultura, compostagem, memória e ação popular.</p>
        </article>
      </section>

      <ShareTools compact />
    </main>
  );
}
