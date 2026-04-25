"use client";

import { useMemo, useState } from "react";
import { whatsappGroupUrl } from "./share-content";
import { ShareTools } from "./share-tools";

type FrontKey = "saude" | "monitoramento" | "circular" | "memoria";

const fronts: Record<
  FrontKey,
  {
    title: string;
    short: string;
    objective: string;
    deliveries: string[];
    impact: string;
    color: string;
  }
> = {
  saude: {
    title: "Saúde, poluição e dados públicos",
    short: "Dados para tornar visível o que o território sente no corpo.",
    objective:
      "Organizar informações públicas, evidências locais e indicadores socioambientais para apoiar leitura crítica sobre saúde, poluição e desigualdade territorial.",
    deliveries: [
      "Painel público com indicadores prioritários",
      "Boletins de leitura territorial",
      "Protocolos de busca, checagem e devolutiva dos dados"
    ],
    impact:
      "Mais capacidade pública para formular perguntas, disputar prioridades e acompanhar responsabilidades institucionais.",
    color: "blue"
  },
  monitoramento: {
    title: "Monitoramento ambiental comunitário",
    short: "Método, formação e escuta para acompanhar sinais do ambiente.",
    objective:
      "Formar moradores, estudantes e lideranças para registrar percepções, ocorrências e evidências ambientais com metodologia simples, segura e replicável.",
    deliveries: [
      "Oficinas territoriais de monitoramento",
      "Roteiros de campo e mapas participativos",
      "Rede comunitaria de observadores"
    ],
    impact:
      "O conhecimento local deixa de ser tratado como relato disperso e passa a compor uma base pública de acompanhamento.",
    color: "green"
  },
  circular: {
    title: "Compostagem, resíduos e economia solidária",
    short: "Pilotos vivos para transformar resíduos em aprendizagem e renda.",
    objective:
      "Implantar experiências demonstrativas de compostagem, reciclagem, educação ambiental e economia circular em parceria com equipamentos públicos e grupos locais.",
    deliveries: [
      "Pilotos de compostagem comunitaria",
      "Rotas educativas sobre resíduos e reciclagem",
      "Articulação com catadores, escolas e coletivos"
    ],
    impact:
      "Menos desperdício, mais formação prática e uma agenda ambiental ligada ao trabalho, ao cuidado e ao cotidiano.",
    color: "orange"
  },
  memoria: {
    title: "Memória, cultura e incidência pública",
    short: "Narrar o território com sua própria voz e devolver conhecimento.",
    objective:
      "Construir acervo, atividades culturais, comunicação popular e momentos de devolutiva pública para que o projeto produza pertencimento e incidência.",
    deliveries: [
      "Acervo de memoria socioambiental",
      "Mostras, rodas, publicações e materiais educativos",
      "Agenda pública de devolutivas e incidência"
    ],
    impact:
      "A dimensão cultural fortalece a mobilização e impede que a agenda ambiental seja reduzida a planilhas ou relatórios.",
    color: "terracotta"
  }
};

const phases = [
  {
    period: "Meses 1-6",
    title: "Arranque público e desenho comum",
    text: "instalação da governança, escutas territoriais, pactuação metodológica, plano de comunicação e seleção dos primeiros territórios-piloto."
  },
  {
    period: "Meses 7-12",
    title: "Formação, dados e primeiros pilotos",
    text: "oficinas, organização dos indicadores, roteiros de campo, início da infraestrutura digital e implantação das primeiras experiências demonstrativas."
  },
  {
    period: "Meses 13-18",
    title: "Expansão territorial e devolutivas",
    text: "ampliação das frentes, boletins públicos, atividades culturais, ajustes dos pilotos e consolidação da rede comunitária de monitoramento."
  },
  {
    period: "Meses 19-24",
    title: "Sistematização e legado replicável",
    text: "publicação da metodologia, acervo, avaliação pública, plano de continuidade e entrega de uma base acumulativa para novas parcerias."
  }
];

const budget = [
  ["Território e formação", 28, "oficinas, bolsas, mobilização, escutas e devolutivas"],
  ["Monitoramento e pilotos", 24, "equipamentos, materiais, compostagem e ações demonstrativas"],
  ["Equipe, pesquisa e dados", 22, "coordenação, bolsistas, indicadores, boletins e sistematização"],
  ["Cultura e comunicação", 14, "acervo, memória, materiais públicos e incidência"],
  ["Infraestrutura digital", 12, "plataforma, hospedagem, segurança e continuidade"]
];

function FlowLines() {
  return (
    <svg className="flow-lines" viewBox="0 0 1200 420" aria-hidden="true">
      <path d="M-20 126 C 132 190 242 54 394 124 S 662 199 824 116 1054 102 1220 164" />
      <path d="M-10 170 C 156 116 258 168 430 164 S 700 80 884 164 1086 214 1220 120" />
      <path d="M-20 296 C 130 238 254 316 408 278 S 650 206 790 276 1076 332 1220 246" />
      <path d="M36 76 C 198 24 306 74 452 72 S 734 18 894 70 1080 48 1190 84" />
      <circle cx="318" cy="112" r="18" />
      <circle cx="485" cy="132" r="16" />
      <circle cx="648" cy="88" r="15" />
      <circle cx="925" cy="154" r="24" />
      <circle cx="800" cy="284" r="17" />
      <circle cx="1088" cy="236" r="20" />
    </svg>
  );
}

function Hillscape() {
  return (
    <svg className="hillscape" viewBox="0 0 1200 270" preserveAspectRatio="none" aria-hidden="true">
      <path className="hill hill-green" d="M0 126 C 130 52 240 70 348 138 C 470 214 572 114 704 136 C 830 156 904 224 1200 98 L1200 270 L0 270 Z" />
      <path className="hill hill-orange" d="M150 180 C 332 74 514 82 646 170 C 796 270 908 68 1200 58 L1200 270 L150 270 Z" />
      <path className="river" d="M690 190 C 764 126 850 164 902 124 C 944 92 1006 86 1114 98 C 1040 134 1012 184 1078 228 C 958 228 826 236 690 190 Z" />
      <path className="deep" d="M0 206 C 190 174 315 218 472 202 C 684 180 806 246 1200 196 L1200 270 L0 270 Z" />
    </svg>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function Home() {
  const [activeFront, setActiveFront] = useState<FrontKey>("saude");
  const [activePhase, setActivePhase] = useState(0);
  const front = fronts[activeFront];
  const total = useMemo(() => budget.reduce((sum, [, value]) => sum + Number(value), 0), []);

  return (
    <main>
      <section className="hero" id="inicio">
        <FlowLines />
        <header className="nav">
          <a className="brand" href="#inicio" aria-label="UFF mais Território">
            <strong>UFF<span>+</span>Território</strong>
            <small>Médio Paraíba</small>
          </a>
          <nav aria-label="Seções principais">
            <a href="#votacao">Votação</a>
            <a href="#frentes">Frentes</a>
            <a href="#governanca">Governança</a>
          </nav>
          <a className="nav-cta" href={whatsappGroupUrl} target="_blank" rel="noreferrer">
            Entrar no grupo
          </a>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Emenda participativa de R$ 1 milhão</p>
            <h1>
              UFF + Território
              <span>Observatório Popular do Médio Paraíba</span>
            </h1>
            <p className="hero-lead">
              Este é o projeto que vamos apresentar na votação pública da emenda participativa. No dia
              <strong> 28 de abril de 2026, às 18h, na Praça Brasil</strong>, o projeto mais votado recebe
              R$ 1 milhão para sair do papel.
            </p>
            <div className="hero-actions">
              <a href={whatsappGroupUrl} target="_blank" rel="noreferrer">Entrar no grupo de mobilização</a>
              <a href="#votacao">Como votar no dia 28</a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Mensagem central do programa">
            <div className="stamp">Ambiente + Dados + Cultura + Ação Popular</div>
            <div className="map-card vote-card">
              <div className="map-rings" />
              <p className="vote-date">28 abr. 2026 · 18h</p>
              <h2>Praça Brasil, Volta Redonda</h2>
              <p>
                Qualquer pessoa pode votar presencialmente. Glauber Braga escolherá a proposta vencedora
                conforme a votação popular do dia.
              </p>
            </div>
          </aside>
        </div>
        <Hillscape />
      </section>

      <section className="vote-callout section" id="votacao">
        <div className="vote-callout-copy">
          <span>Votação aberta</span>
          <h2>Dia 28, a proposta precisa virar presença.</h2>
          <p>
            A emenda participativa será decidida por voto popular presencial. Vamos apresentar o UFF + Território
            como projeto para receber R$ 1 milhão e iniciar o Observatório Popular do Médio Paraíba.
          </p>
        </div>
        <div className="vote-steps" aria-label="Informações da votação">
          <article>
            <strong>Quando</strong>
            <p>28 de abril de 2026, às 18h.</p>
          </article>
          <article>
            <strong>Onde</strong>
            <p>Praça Brasil, Volta Redonda.</p>
          </article>
          <article>
            <strong>Quem vota</strong>
            <p>Qualquer pessoa presente pode votar.</p>
          </article>
          <article>
            <strong>Como ajudar</strong>
            <p>Entre no grupo, convide mais gente e ajude a organizar a presença no dia.</p>
          </article>
        </div>
        <a className="share-whatsapp" href={whatsappGroupUrl} target="_blank" rel="noreferrer">
          Participar do grupo no WhatsApp
        </a>
      </section>

      <ShareTools />

      <section className="intro section" id="programa">
        <SectionHeader
          eyebrow="O que é o programa"
          title="Uma plataforma pública de pesquisa, formação e ação territorial."
          text="O UFF + Território não nasce como uma ação isolada. Ele articula universidade, gestão administrativa qualificada e coexecução popular para produzir dados, metodologia, pilotos, memória e incidência pública."
        />
        <div className="intro-grid">
          {[
            ["Universidade pública", "coordena ciência, metodologia, formação e sistematização."],
            ["Território organizado", "define prioridades, mobiliza atores e devolve conhecimento para a vida real."],
            ["Dados com sentido público", "transformam indicadores em leitura acessível e ferramenta de disputa democrática."],
            ["Pilotos e legado", "deixam experiências, acervo, rede e infraestrutura para continuidade."]
          ].map(([title, text]) => (
            <article className="signal" key={title}>
              <span />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why section" id="importa">
        <div className="why-copy">
          <SectionHeader
            eyebrow="Por que isso importa"
            title="O território já produz sinais. Falta organizar uma escuta pública à altura deles."
            text="No Médio Paraíba, especialmente em Volta Redonda, ambiente e saúde não podem ser lidos separados de história industrial, rios, bairros, trabalho, mobilidade, escolas, cultura e desigualdade."
          />
          <p>
            Quando dados públicos, monitoramento comunitário e memória territorial caminham juntos, a agenda
            socioambiental ganha lastro: deixa de ser denúncia solta, relatório fechado ou promessa abstrata.
            Passa a ser método, formação, evidência, pertencimento e capacidade de incidência.
          </p>
        </div>
        <div className="territory-board">
          <div>Rio Paraíba do Sul</div>
          <div>Saúde coletiva</div>
          <div>Memória operária</div>
          <div>Escolas e coletivos</div>
          <div>Resíduos e compostagem</div>
          <div>Dados públicos</div>
        </div>
      </section>

      <section className="fronts section" id="frentes">
        <SectionHeader
          eyebrow="Quatro frentes integradas"
          title="Cada frente tem autonomia, mas o impacto nasce da conexão."
          text="A página permite explorar objetivos, entregas e impactos esperados. O sistema foi pensado para formar gente, produzir evidência, ativar pilotos e devolver conhecimento ao território."
        />
        <div className="fronts-layout">
          <div className="front-tabs" role="tablist" aria-label="Frentes do projeto">
            {(Object.keys(fronts) as FrontKey[]).map((key) => (
              <button
                className={activeFront === key ? "active" : ""}
                key={key}
                onClick={() => setActiveFront(key)}
                role="tab"
                aria-selected={activeFront === key}
              >
                <span className={`dot ${fronts[key].color}`} />
                {fronts[key].title}
              </button>
            ))}
          </div>
          <article className={`front-detail ${front.color}`}>
            <p className="front-kicker">{front.short}</p>
            <h3>{front.title}</h3>
            <div className="front-columns">
              <div>
                <strong>Objetivo</strong>
                <p>{front.objective}</p>
              </div>
              <div>
                <strong>Entregas</strong>
                <ul>
                  {front.deliveries.map((delivery) => (
                    <li key={delivery}>{delivery}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="impact">
              <strong>Impacto esperado</strong>
              <p>{front.impact}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="governance section" id="governanca">
        <SectionHeader
          eyebrow="Como o programa funciona"
          title="Governança compartilhada, com papéis claros e coexecução real."
          text="O arranjo institucional precisa ser simples de entender e forte o suficiente para sustentar pesquisa, contrato, território e devolutiva pública."
        />
        <div className="governance-diagram">
          <article>
            <span>UFF</span>
            <h3>Coordenação acadêmica e científica</h3>
            <p>desenho metodológico, orientação de bolsistas, análise de dados, pesquisa aplicada e sistematização pública.</p>
          </article>
          <article>
            <span>FEC</span>
            <h3>Gestão administrativa, financeira e contratual</h3>
            <p>segurança jurídica, execução financeira, compras, prestação de contas e suporte operacional ao convênio.</p>
          </article>
          <article className="association">
            <span>Associação Popular pela Sustentabilidade</span>
            <h3>Coexecutora territorial e comunitária</h3>
            <p>
              mobilização territorial, educação ambiental popular, articulação com escolas, coletivos, lideranças
              e equipamentos públicos, apoio aos pilotos, devolutivas e coordenação executiva da frente de memória,
              cultura e incidência socioambiental.
            </p>
          </article>
        </div>
      </section>

      <section className="existing section" id="bases">
        <div className="paper-band">
          <SectionHeader
            eyebrow="O que já existe e será ampliado"
            title="A proposta parte de experiência social, não de uma tela vazia."
            text="Já há capacidades políticas, metodológicas e comunitárias que podem ganhar escala, organização e permanência pública."
          />
          <div className="base-list">
            <p>
              Experiências como o CESCOLA podem ser incorporadas e fortalecidas como base de educação ambiental,
              mobilização e produção de conhecimento com escolas e territórios.
            </p>
            <p>
              A infraestrutura digital futura deve funcionar como base expansível: organiza dados, memória,
              materiais, boletins e devolutivas. Tecnologia entra como meio de permanência e acesso, não como fim.
            </p>
          </div>
        </div>
      </section>

      <section className="timeline section" id="cronograma">
        <SectionHeader
          eyebrow="Cronograma de 24 meses"
          title="Quatro fases para sair da pactuação e chegar ao legado."
          text="O projeto combina arranque público, formação, pilotos, expansão e sistematização, com entregas visíveis ao longo do caminho."
        />
        <div className="timeline-track">
          {phases.map((phase, index) => (
            <button
              className={activePhase === index ? "active" : ""}
              key={phase.period}
              onClick={() => setActivePhase(index)}
              aria-pressed={activePhase === index}
            >
              <span>{phase.period}</span>
              <strong>{phase.title}</strong>
            </button>
          ))}
        </div>
        <article className="phase-detail">
          <span>{phases[activePhase].period}</span>
          <h3>{phases[activePhase].title}</h3>
          <p>{phases[activePhase].text}</p>
        </article>
      </section>

      <section className="budget section" id="orcamento">
        <SectionHeader
          eyebrow="Orçamento preliminar"
          title="Investimento orientado por território, formação, monitoramento, cultura e legado."
          text="A divisão abaixo é uma leitura preliminar para comunicar prioridades. Ela evita tratar tecnologia como vitrine: a infraestrutura digital sustenta memória, dados e acesso público."
        />
        <div className="budget-grid">
          <div className="budget-visual" aria-label="Distribuição preliminar do orçamento">
            {budget.map(([label, value]) => (
              <div key={label} style={{ "--size": `${Number(value) * 2.2}px` } as React.CSSProperties}>
                <strong>{value}%</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="budget-list">
            {budget.map(([label, value, desc]) => (
              <article key={label}>
                <span>{value}%</span>
                <div>
                  <h3>{label}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
            <p className="total">Total de referência: {total}% distribuído por blocos de prioridade.</p>
          </div>
        </div>
      </section>

      <section className="legacy section" id="legado">
        <SectionHeader
          eyebrow="Legado"
          title="Ao final, fica mais que um projeto: fica capacidade pública instalada."
          text="O UFF + Território deve entregar metodologia replicável, rede fortalecida, acervo, equipe formada, pilotos vivos e uma base pública acumulativa para novas agendas."
        />
        <div className="legacy-grid">
          {["Metodologia replicável", "Rede territorial fortalecida", "Acervo e memória", "Equipe e bolsistas formados", "Pilotos vivos", "Base pública acumulativa"].map((item) => (
            <article key={item}>
              <span />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta section" id="cta">
        <FlowLines />
        <div>
          <p className="eyebrow">Votar, compartilhar, mobilizar</p>
          <h2>Para ganhar a emenda, o território precisa ocupar a Praça Brasil.</h2>
          <p>
            No dia 28 de abril de 2026, às 18h, qualquer pessoa pode votar. Compartilhe a proposta,
            entre no grupo de mobilização e ajude o Observatório Popular do Médio Paraíba a disputar
            R$ 1 milhão para ambiente, dados, cultura e ação popular.
          </p>
          <div className="hero-actions">
            <a href={whatsappGroupUrl} target="_blank" rel="noreferrer">Entrar no grupo</a>
            <a href="#programa">Rever a proposta</a>
          </div>
        </div>
      </section>
    </main>
  );
}
