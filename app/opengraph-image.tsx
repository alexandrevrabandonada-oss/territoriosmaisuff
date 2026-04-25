import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff8ea",
          color: "#06395d",
          padding: 64,
          fontFamily: "Arial",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -80,
            right: -80,
            bottom: -120,
            height: 260,
            background: "#06395d",
            borderRadius: "50% 50% 0 0"
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 900 }}>
            UFF<span style={{ color: "#d65c2f" }}>+</span>Território
          </div>
          <div
            style={{
              background: "#d65c2f",
              color: "#fff8ea",
              padding: "14px 20px",
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 900
            }}
          >
            28/04 · 18h · Praça Brasil
          </div>
        </div>
        <div style={{ maxWidth: 960, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#0f6848", fontSize: 28, fontWeight: 900, letterSpacing: 2 }}>
            EMENDA PARTICIPATIVA DE R$ 1 MILHÃO
          </div>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.92 }}>
            Vote no Observatório Popular do Médio Paraíba
          </div>
          <div style={{ maxWidth: 860, color: "#14313a", fontSize: 32, fontWeight: 800, lineHeight: 1.25 }}>
            Qualquer pessoa presente pode votar. Ambiente, dados, cultura e ação popular.
          </div>
        </div>
        <div style={{ display: "flex", color: "#fff8ea", fontSize: 28, fontWeight: 900 }}>
          territoriosmaisuff.vercel.app/votar
        </div>
      </div>
    ),
    size
  );
}
