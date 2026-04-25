"use client";

import { useMemo, useRef, useState } from "react";
import { cardLines, shareMessages, voteUrl } from "./share-content";

type Format = "story" | "feed" | "tiktok";

const formats: Record<Format, { label: string; width: number; height: number }> = {
  story: { label: "Story 9:16", width: 1080, height: 1920 },
  feed: { label: "Feed 1:1", width: 1080, height: 1080 },
  tiktok: { label: "TikTok/Reels", width: 1080, height: 1920 }
};

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
      return;
    }
    line = testLine;
  });

  if (line) {
    lines.push(line);
  }

  return lines;
}

function drawShareCard(canvas: HTMLCanvasElement, headline: string, format: Format) {
  const { width, height } = formats[format];
  const scale = 2;
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width / scale}px`;
  canvas.style.height = `${height / scale}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.fillStyle = "#fff8ea";
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.36;
  ctx.fillStyle = "#14313a";
  for (let y = 0; y < height; y += 18) {
    for (let x = 0; x < width; x += 18) {
      ctx.fillRect(x, y, 1, 1);
    }
  }
  ctx.globalAlpha = 1;

  const drawFlow = (color: string, y: number, offset: number) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-60, y);
    ctx.bezierCurveTo(220, y + 120 + offset, 360, y - 150, 560, y);
    ctx.bezierCurveTo(750, y + 130, 900, y - 70, 1140, y + 20);
    ctx.stroke();
  };

  drawFlow("#24824b", 240, 0);
  drawFlow("#d65c2f", 330, -40);
  drawFlow("#dcc6a5", 420, 30);

  [
    ["#24824b", 210, 300, 42],
    ["#064b78", 470, 250, 34],
    ["#d65c2f", 720, 190, 30],
    ["#24824b", 910, 350, 48]
  ].forEach(([color, x, y, r]) => {
    ctx.fillStyle = color as string;
    ctx.beginPath();
    ctx.arc(Number(x), Number(y), Number(r), 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#064b78";
  ctx.font = "900 112px Arial";
  ctx.fillText("UFF", 82, height < 1300 ? 170 : 650);
  ctx.fillStyle = "#d65c2f";
  ctx.fillText("+", 322, height < 1300 ? 170 : 650);
  ctx.fillStyle = "#24824b";
  ctx.fillText("Território", 408, height < 1300 ? 170 : 650);

  ctx.fillStyle = "#14313a";
  ctx.font = "900 70px Arial";
  const headlineY = height < 1300 ? 330 : 850;
  wrapText(ctx, headline, width - 150).slice(0, 4).forEach((line, index) => {
    ctx.fillText(line, 82, headlineY + index * 80);
  });

  const bandY = height < 1300 ? 620 : 1220;
  ctx.fillStyle = "#d65c2f";
  ctx.fillRect(82, bandY, 420, 92);
  ctx.fillStyle = "#24824b";
  ctx.fillRect(502, bandY, width - 584, 92);
  ctx.fillStyle = "#fff8ea";
  ctx.font = "900 42px Arial";
  ctx.fillText("28/04 · 18h", 112, bandY + 60);
  ctx.fillText("Praça Brasil", 542, bandY + 60);

  const baseY = height < 1300 ? 790 : 1420;
  ctx.fillStyle = "#14313a";
  ctx.font = "800 42px Arial";
  wrapText(
    ctx,
    "Qualquer pessoa presente pode votar. O projeto mais votado recebe R$ 1 milhão.",
    width - 164
  ).forEach((line, index) => {
    ctx.fillText(line, 82, baseY + index * 56);
  });

  ctx.fillStyle = "#06395d";
  ctx.beginPath();
  ctx.moveTo(0, height - 190);
  ctx.bezierCurveTo(240, height - 260, 390, height - 90, 620, height - 160);
  ctx.bezierCurveTo(820, height - 220, 940, height - 150, width, height - 250);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();

  ctx.fillStyle = "#fff8ea";
  ctx.font = "900 34px Arial";
  ctx.fillText("territoriosmaisuff.vercel.app/votar", 82, height - 82);
}

export function ShareTools({ compact = false }: { compact?: boolean }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [headline, setHeadline] = useState(cardLines[0]);
  const [format, setFormat] = useState<Format>("story");
  const [copied, setCopied] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentMessage = shareMessages[messageIndex].text;
  const whatsappShareUrl = useMemo(
    () => `https://wa.me/?text=${encodeURIComponent(currentMessage)}`,
    [currentMessage]
  );

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1800);
  }

  async function shareSite() {
    const payload = {
      title: "Vote UFF + Território",
      text: "Dia 28/04, às 18h, na Praça Brasil: votação da emenda participativa de R$ 1 milhão.",
      url: voteUrl
    };

    if (navigator.share) {
      await navigator.share(payload);
      return;
    }

    await copy(`${payload.text}\n${payload.url}`, "link");
  }

  function downloadCard() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    drawShareCard(canvas, headline, format);
    const link = document.createElement("a");
    link.download = `uff-territorio-${format}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <section className={compact ? "share-lab compact" : "share-lab"} id="compartilhar">
      <div className="share-lab-copy">
        <span>Kit de mobilização</span>
        <h2>Compartilhar precisa ser tão fácil quanto votar.</h2>
        <p>
          Use textos prontos, envie no WhatsApp ou gere um card em PNG para Story, Feed, Reels e TikTok.
          A mensagem central é simples: dia 28, às 18h, a Praça Brasil decide.
        </p>
        <div className="share-actions">
          <button type="button" onClick={shareSite}>Compartilhar link</button>
          <a href={whatsappShareUrl} target="_blank" rel="noreferrer">Enviar no WhatsApp</a>
          <button type="button" onClick={() => copy(currentMessage, "texto")}>
            {copied === "texto" ? "Texto copiado" : "Copiar texto"}
          </button>
        </div>
      </div>

      <div className="share-message-panel">
        <div className="message-tabs" role="tablist" aria-label="Textos de compartilhamento">
          {shareMessages.map((message, index) => (
            <button
              key={message.label}
              className={messageIndex === index ? "active" : ""}
              type="button"
              onClick={() => setMessageIndex(index)}
              role="tab"
              aria-selected={messageIndex === index}
            >
              {message.label}
            </button>
          ))}
        </div>
        <p>{currentMessage}</p>
      </div>

      <div className="card-generator">
        <div>
          <span>Gerador de card</span>
          <h3>Escolha a frase e baixe a arte.</h3>
        </div>
        <div className="card-controls">
          <label>
            Frase
            <select value={headline} onChange={(event) => setHeadline(event.target.value)}>
              {cardLines.map((line) => (
                <option key={line} value={line}>
                  {line}
                </option>
              ))}
            </select>
          </label>
          <label>
            Formato
            <select value={format} onChange={(event) => setFormat(event.target.value as Format)}>
              {(Object.keys(formats) as Format[]).map((key) => (
                <option key={key} value={key}>
                  {formats[key].label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={downloadCard}>Baixar PNG</button>
        </div>
        <div className={`poster-preview ${format}`}>
          <div className="poster-brand">UFF<span>+</span>Território</div>
          <strong>{headline}</strong>
          <p>28/04 · 18h · Praça Brasil</p>
          <small>Qualquer pessoa presente pode votar.</small>
        </div>
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
    </section>
  );
}
