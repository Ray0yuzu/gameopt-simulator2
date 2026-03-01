import React, { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════
//  ADSENSE COMPONENT
//  ⚠️ data-ad-slot の値は AdSense管理画面で発行した
//     広告ユニットIDに書き換えてください
// ═══════════════════════════════════════════════════
function AdBanner({ slot = "XXXXXXXXXX", format = "auto", style = {} }) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (_) {}
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "16px 0", minHeight: 90, ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  SNS SHARE COMPONENT
// ═══════════════════════════════════════════════════
function ShareBar({ gpu, cpu, fps, game }) {
  const siteUrl = "https://gameopt.vercel.app/";
  const text = gpu && game
    ? `【PCゲーム診断】${gpu} + ${cpu} で ${game} が約${fps}fps！あなたの構成はいくつ？`
    : "PCゲーム最適設定シミュレーター 2026 — GPU別fps予測・ボトルネック診断（無料）";

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}&hashtags=PCゲーム,fps診断,GPU`;
  const lineUrl    = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(siteUrl + "?ref=line")}`;

  return (
    <div style={{
      display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
      padding: "12px 16px", background: "rgba(163,255,18,.04)",
      border: "1px solid rgba(163,255,18,.14)", borderRadius: 4, marginBottom: 12
    }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, color: "var(--mu)", textTransform: "uppercase" }}>
        📣 結果をシェア
      </span>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.14)",
        borderRadius: 3, padding: "6px 12px",
        fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700,
        letterSpacing: 1, color: "#e7e9ea", textDecoration: "none",
        transition: "all .18s"
      }}>
        𝕏 Twitter/Xでシェア
      </a>
      <a href={lineUrl} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: "rgba(6,199,85,.1)", border: "1px solid rgba(6,199,85,.35)",
        borderRadius: 3, padding: "6px 12px",
        fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700,
        letterSpacing: 1, color: "#06c755", textDecoration: "none",
        transition: "all .18s"
      }}>
        LINE でシェア
      </a>
      <button
        onClick={() => { navigator.clipboard?.writeText(siteUrl); }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "rgba(163,255,18,.06)", border: "1px solid rgba(163,255,18,.22)",
          borderRadius: 3, padding: "6px 12px",
          fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700,
          letterSpacing: 1, color: "var(--g)", cursor: "pointer",
          transition: "all .18s"
        }}
      >
        🔗 URLをコピー
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  GPU DATABASE  ─ RTX 3060 = score 48 = REFERENCE
// ═══════════════════════════════════════════════════
const GPUS = [
  // RTX 50 ─ DLSS4 / FSR4
  { id:"rtx5090",    name:"RTX 5090",          score:160, vram:32, dlss4:true,  dlss:true,  fsr4:true,  fsr:true,  gen:"RTX 50シリーズ", kw:["5090"] },
  { id:"rtx5080",    name:"RTX 5080",          score:132, vram:16, dlss4:true,  dlss:true,  fsr4:true,  fsr:true,  gen:"RTX 50シリーズ", kw:["5080"] },
  { id:"rtx5070ti",  name:"RTX 5070 Ti",       score:115, vram:16, dlss4:true,  dlss:true,  fsr4:true,  fsr:true,  gen:"RTX 50シリーズ", kw:["5070 ti","5070ti"] },
  { id:"rtx5070",    name:"RTX 5070",          score:100, vram:12, dlss4:true,  dlss:true,  fsr4:true,  fsr:true,  gen:"RTX 50シリーズ", kw:["rtx 5070 "] },
  { id:"rtx5060ti",  name:"RTX 5060 Ti",       score:82,  vram:16, dlss4:true,  dlss:true,  fsr4:true,  fsr:true,  gen:"RTX 50シリーズ", kw:["5060 ti","5060ti"] },
  { id:"rtx5060",    name:"RTX 5060",          score:68,  vram:8,  dlss4:true,  dlss:true,  fsr4:true,  fsr:true,  gen:"RTX 50シリーズ", kw:["rtx 5060 "] },
  // RTX 40
  { id:"rtx4090",    name:"RTX 4090",          score:100, vram:24, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["4090"] },
  { id:"rtx4080s",   name:"RTX 4080 Super",    score:93,  vram:16, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["4080 super","4080super"] },
  { id:"rtx4080",    name:"RTX 4080",          score:88,  vram:16, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["rtx 4080 "] },
  { id:"rtx4070tis", name:"RTX 4070 Ti Super", score:83,  vram:16, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["4070 ti super","4070tis"] },
  { id:"rtx4070ti",  name:"RTX 4070 Ti",       score:76,  vram:12, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["4070 ti ","4070ti "] },
  { id:"rtx4070s",   name:"RTX 4070 Super",    score:72,  vram:12, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["4070 super"] },
  { id:"rtx4070",    name:"RTX 4070",          score:66,  vram:12, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["rtx 4070 "] },
  { id:"rtx4060ti",  name:"RTX 4060 Ti",       score:57,  vram:8,  dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["4060 ti","4060ti"] },
  { id:"rtx4060",    name:"RTX 4060",          score:50,  vram:8,  dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 40シリーズ", kw:["rtx 4060 "] },
  // RTX 30
  { id:"rtx3090ti",  name:"RTX 3090 Ti",       score:86,  vram:24, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["3090 ti","3090ti"] },
  { id:"rtx3090",    name:"RTX 3090",          score:80,  vram:24, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["rtx 3090 "] },
  { id:"rtx3080ti",  name:"RTX 3080 Ti",       score:76,  vram:12, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["3080 ti","3080ti"] },
  { id:"rtx3080",    name:"RTX 3080",          score:70,  vram:10, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["rtx 3080 "] },
  { id:"rtx3070ti",  name:"RTX 3070 Ti",       score:64,  vram:8,  dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["3070 ti","3070ti"] },
  { id:"rtx3070",    name:"RTX 3070",          score:60,  vram:8,  dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["rtx 3070 "] },
  { id:"rtx3060ti",  name:"RTX 3060 Ti",       score:55,  vram:8,  dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["3060 ti","3060ti"] },
  // ★ REFERENCE — RTX 3060 12GB
  { id:"rtx3060",    name:"RTX 3060",          score:48,  vram:12, dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["rtx 3060 "] },
  { id:"rtx3050",    name:"RTX 3050",          score:36,  vram:8,  dlss4:false, dlss:true,  fsr4:false, fsr:true,  gen:"RTX 30シリーズ", kw:["rtx 3050 "] },
  // GTX 16
  { id:"gtx1660s",   name:"GTX 1660 Super",    score:30,  vram:6,  dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 16シリーズ", kw:["1660 super","1660s"] },
  { id:"gtx1660ti",  name:"GTX 1660 Ti",       score:28,  vram:6,  dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 16シリーズ", kw:["1660 ti","1660ti"] },
  { id:"gtx1660",    name:"GTX 1660",          score:24,  vram:6,  dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 16シリーズ", kw:["gtx 1660 "] },
  { id:"gtx1650",    name:"GTX 1650",          score:16,  vram:4,  dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 16シリーズ", kw:["1650"] },
  // GTX 10
  { id:"gtx1080ti",  name:"GTX 1080 Ti",       score:34,  vram:11, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 10シリーズ", kw:["1080 ti","1080ti"] },
  { id:"gtx1080",    name:"GTX 1080",          score:26,  vram:8,  dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 10シリーズ", kw:["gtx 1080 "] },
  { id:"gtx1070",    name:"GTX 1070",          score:20,  vram:8,  dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 10シリーズ", kw:["1070"] },
  { id:"gtx1060",    name:"GTX 1060",          score:14,  vram:6,  dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"GTX 10シリーズ", kw:["1060"] },
  // Radeon 9000 (2026)
  { id:"rx9070xt",   name:"RX 9070 XT",        score:102, vram:16, dlss4:false, dlss:false, fsr4:true,  fsr:true,  gen:"Radeon 9000 (2026)", kw:["9070 xt","9070xt"] },
  { id:"rx9070",     name:"RX 9070",           score:88,  vram:16, dlss4:false, dlss:false, fsr4:true,  fsr:true,  gen:"Radeon 9000 (2026)", kw:["rx 9070 "] },
  // Radeon 7000
  { id:"rx7900xtx",  name:"RX 7900 XTX",       score:92,  vram:24, dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 7000", kw:["7900 xtx","7900xtx"] },
  { id:"rx7900xt",   name:"RX 7900 XT",        score:82,  vram:20, dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 7000", kw:["7900 xt ","7900xt "] },
  { id:"rx7800xt",   name:"RX 7800 XT",        score:64,  vram:16, dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 7000", kw:["7800 xt","7800xt"] },
  { id:"rx7700xt",   name:"RX 7700 XT",        score:56,  vram:12, dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 7000", kw:["7700 xt","7700xt"] },
  { id:"rx7600",     name:"RX 7600",           score:44,  vram:8,  dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 7000", kw:["rx 7600"] },
  // Radeon 6000
  { id:"rx6950xt",   name:"RX 6950 XT",        score:74,  vram:16, dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 6000", kw:["6950 xt","6950xt"] },
  { id:"rx6800xt",   name:"RX 6800 XT",        score:66,  vram:16, dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 6000", kw:["6800 xt","6800xt"] },
  { id:"rx6700xt",   name:"RX 6700 XT",        score:52,  vram:12, dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 6000", kw:["6700 xt","6700xt"] },
  { id:"rx6600",     name:"RX 6600",           score:35,  vram:8,  dlss4:false, dlss:false, fsr4:false, fsr:true,  gen:"Radeon 6000", kw:["rx 6600"] },
  // Apple Silicon
  { id:"m4max",      name:"Apple M4 Max",      score:72,  vram:48, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["m4 max"] },
  { id:"m4pro",      name:"Apple M4 Pro",      score:54,  vram:24, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["m4 pro"] },
  { id:"m4",         name:"Apple M4",          score:40,  vram:16, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["apple m4"] },
  { id:"m3max",      name:"Apple M3 Max",      score:60,  vram:40, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["m3 max"] },
  { id:"m3pro",      name:"Apple M3 Pro",      score:44,  vram:18, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["m3 pro"] },
  { id:"m3",         name:"Apple M3",          score:34,  vram:10, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["apple m3"] },
  { id:"m2max",      name:"Apple M2 Max",      score:48,  vram:32, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["m2 max"] },
  { id:"m1max",      name:"Apple M1 Max",      score:38,  vram:32, dlss4:false, dlss:false, fsr4:false, fsr:false, gen:"Apple Silicon", kw:["m1 max"] },
];

// ═══════════════════════════════════════════════════
//  CPU DATABASE
// ═══════════════════════════════════════════════════
const CPUS = [
  { id:"cu9_380k",   name:"Core Ultra 9 380K",  score:118, cores:24, gen:"Intel Ultra 300 (2026)" },
  { id:"cu7_360k",   name:"Core Ultra 7 360K",  score:106, cores:20, gen:"Intel Ultra 300 (2026)" },
  { id:"cu5_340k",   name:"Core Ultra 5 340K",  score:90,  cores:14, gen:"Intel Ultra 300 (2026)" },
  { id:"cu9_285k",   name:"Core Ultra 9 285K",  score:108, cores:24, gen:"Intel Ultra 200" },
  { id:"cu7_265k",   name:"Core Ultra 7 265K",  score:96,  cores:20, gen:"Intel Ultra 200" },
  { id:"cu5_245k",   name:"Core Ultra 5 245K",  score:83,  cores:14, gen:"Intel Ultra 200" },
  { id:"i9_14900k",  name:"Core i9-14900K",     score:100, cores:24, gen:"Intel 14世代" },
  { id:"i7_14700k",  name:"Core i7-14700K",     score:90,  cores:20, gen:"Intel 14世代" },
  { id:"i5_14600k",  name:"Core i5-14600K",     score:78,  cores:14, gen:"Intel 14世代" },
  { id:"i9_13900k",  name:"Core i9-13900K",     score:96,  cores:24, gen:"Intel 13世代" },
  { id:"i7_13700k",  name:"Core i7-13700K",     score:85,  cores:16, gen:"Intel 13世代" },
  { id:"i5_13600k",  name:"Core i5-13600K",     score:74,  cores:14, gen:"Intel 13世代" },
  { id:"i9_12900k",  name:"Core i9-12900K",     score:88,  cores:16, gen:"Intel 12世代" },
  { id:"i7_12700k",  name:"Core i7-12700K",     score:80,  cores:12, gen:"Intel 12世代" },
  { id:"i5_12600k",  name:"Core i5-12600K",     score:68,  cores:10, gen:"Intel 12世代" },
  { id:"i5_12400",   name:"Core i5-12400",      score:58,  cores:6,  gen:"Intel 12世代" },
  { id:"i7_10700k",  name:"Core i7-10700K",     score:60,  cores:8,  gen:"Intel 10世代" },
  { id:"i5_10400",   name:"Core i5-10400",      score:44,  cores:6,  gen:"Intel 10世代" },
  { id:"r9_9950x",   name:"Ryzen 9 9950X",      score:112, cores:16, gen:"AMD Ryzen 9000" },
  { id:"r9_9900x",   name:"Ryzen 9 9900X",      score:102, cores:12, gen:"AMD Ryzen 9000" },
  { id:"r7_9800x3d", name:"Ryzen 7 9800X3D",    score:110, cores:8,  gen:"AMD Ryzen 9000" },
  { id:"r7_9700x",   name:"Ryzen 7 9700X",      score:88,  cores:8,  gen:"AMD Ryzen 9000" },
  { id:"r5_9600x",   name:"Ryzen 5 9600X",      score:76,  cores:6,  gen:"AMD Ryzen 9000" },
  { id:"r9_7950x3d", name:"Ryzen 9 7950X3D",    score:104, cores:16, gen:"AMD Ryzen 7000" },
  { id:"r9_7950x",   name:"Ryzen 9 7950X",      score:96,  cores:16, gen:"AMD Ryzen 7000" },
  { id:"r7_7800x3d", name:"Ryzen 7 7800X3D",    score:100, cores:8,  gen:"AMD Ryzen 7000" },
  { id:"r7_7700x",   name:"Ryzen 7 7700X",      score:82,  cores:8,  gen:"AMD Ryzen 7000" },
  { id:"r5_7600x",   name:"Ryzen 5 7600X",      score:72,  cores:6,  gen:"AMD Ryzen 7000" },
  { id:"r9_5950x",   name:"Ryzen 9 5950X",      score:88,  cores:16, gen:"AMD Ryzen 5000" },
  { id:"r7_5800x3d", name:"Ryzen 7 5800X3D",    score:90,  cores:8,  gen:"AMD Ryzen 5000" },
  { id:"r5_5600x",   name:"Ryzen 5 5600X",      score:64,  cores:6,  gen:"AMD Ryzen 5000" },
  { id:"r5_5600",    name:"Ryzen 5 5600",       score:60,  cores:6,  gen:"AMD Ryzen 5000" },
  { id:"r9_3900x",   name:"Ryzen 9 3900X",      score:68,  cores:12, gen:"AMD Ryzen 3000" },
  // ★ CPU Reference ≈ Ryzen 5 3600
  { id:"r5_3600",    name:"Ryzen 5 3600",       score:48,  cores:6,  gen:"AMD Ryzen 3000" },
  { id:"m4max_c",    name:"Apple M4 Max",       score:98,  cores:16, gen:"Apple Silicon" },
  { id:"m4_c",       name:"Apple M4",           score:72,  cores:10, gen:"Apple Silicon" },
  { id:"m3max_c",    name:"Apple M3 Max",       score:88,  cores:16, gen:"Apple Silicon" },
  { id:"m3_c",       name:"Apple M3",           score:62,  cores:8,  gen:"Apple Silicon" },
  { id:"m2max_c",    name:"Apple M2 Max",       score:78,  cores:12, gen:"Apple Silicon" },
];

// ═══════════════════════════════════════════════════
//  RESOLUTION OPTIONS
// ═══════════════════════════════════════════════════
//  mult   = GPU load multiplier vs 1080p baseline
//  A higher mult = more GPU work = lower fps
const RESOLUTIONS = [
  { id:"4k",    label:"4K",    desc:"3840×2160", mult:2.50, vramM:1.5 },
  { id:"1440p", label:"1440p", desc:"2560×1440", mult:1.43, vramM:1.2 },
  { id:"1080p", label:"1080p", desc:"1920×1080", mult:1.00, vramM:1.0 },
  { id:"900p",  label:"900p",  desc:"1600×900",  mult:0.83, vramM:0.85 },
  { id:"720p",  label:"720p",  desc:"1280×720",  mult:0.67, vramM:0.70 },
];

// ═══════════════════════════════════════════════════
//  ASPECT RATIO OPTIONS
// ═══════════════════════════════════════════════════
//  gpuMult = additional GPU load factor
//  fps43   = competitive stretch bonus (+20% fps)
const ASPECTS = [
  { id:"16_9", label:"16:9",  sub:"標準",            gpuMult:1.00, fps43:false },
  { id:"21_9", label:"21:9",  sub:"ウルトラワイド",   gpuMult:1.30, fps43:false },
  { id:"32_9", label:"32:9",  sub:"スーパーUW",       gpuMult:1.60, fps43:false },
  { id:"4_3",  label:"4:3",   sub:"競技用引き伸ばし", gpuMult:0.80, fps43:true  },
];

// ═══════════════════════════════════════════════════
//  QUALITY PRESETS
// ═══════════════════════════════════════════════════
const PRESETS = [
  { id:"ultra",  label:"最高 + レイトレ", icon:"💎", qMult:0.45, rtOn:true,  vramM:1.6 },
  { id:"high",   label:"高設定",         icon:"🔥", qMult:0.65, rtOn:false, vramM:1.2 },
  { id:"medium", label:"中設定",         icon:"⚡", qMult:0.85, rtOn:false, vramM:0.9 },
  { id:"low",    label:"低設定 (競技)",  icon:"🏆", qMult:1.00, rtOn:false, vramM:0.6 },
];

// ═══════════════════════════════════════════════════
//  GAME DATABASE
//  baseFPS = fps @ 1080p / low / RTX 3060 (score 48)
// ═══════════════════════════════════════════════════
const REF_GPU = 48;   // RTX 3060 score
const REF_CPU = 64;   // "solid mid-range" CPU ref

const GAME_CATS = [
  { id:"fps", label:"FPS / シューター", col:"#a3ff12", games:[
    { id:"apex",     name:"Apex Legends",       emoji:"🏆", baseFPS:180, cpuW:0.35, vramN:4,  hasRT:false, comp:true,  fpsTarget:240, desc:"中軽量バトルロイヤル",  priority:false },
    { id:"valorant", name:"Valorant",            emoji:"🎯", baseFPS:450, cpuW:0.50, vramN:3,  hasRT:false, comp:true,  fpsTarget:240, desc:"軽量タクティカルFPS",  priority:false },
    { id:"ow2",      name:"Overwatch 2",         emoji:"🦸", baseFPS:240, cpuW:0.35, vramN:4,  hasRT:false, comp:true,  fpsTarget:144, desc:"ヒーローシューター",    priority:false },
    { id:"cs2",      name:"Counter-Strike 2",   emoji:"💣", baseFPS:300, cpuW:0.50, vramN:4,  hasRT:false, comp:true,  fpsTarget:300, desc:"CPU依存大・軽量FPS",    priority:false },
    { id:"cod_mw3",  name:"CoD: MW3",           emoji:"🔫", baseFPS:110, cpuW:0.30, vramN:8,  hasRT:true,  comp:true,  fpsTarget:144, desc:"中量FPS・レイトレ対応", priority:false },
  ]},
  { id:"aaa", label:"AAAアクション / RPG", col:"#ff6ec7", games:[
    { id:"mhwilds",   name:"Monster Hunter Wilds",emoji:"🐉", baseFPS:65,  cpuW:0.35, vramN:10, hasRT:true,  comp:false, fpsTarget:60, desc:"★ 最優先・2025最重量タイトル", priority:true,
      rtx50_4k:true, refNote:"RTX 4060 + フレーム生成で 1080p/60fps（公式推奨）" },
    { id:"cyberpunk", name:"Cyberpunk 2077",      emoji:"🌆", baseFPS:90,  cpuW:0.25, vramN:12, hasRT:true,  comp:false, fpsTarget:60, desc:"超重量オープンワールドRPG",    priority:false },
    { id:"elden",     name:"Elden Ring",          emoji:"⚔️", baseFPS:150, cpuW:0.30, vramN:6,  hasRT:false, comp:false, fpsTarget:60, desc:"中量アクションRPG",            priority:false },
    { id:"ff14",      name:"FF14 黄金のレガシー", emoji:"⚜️", baseFPS:160, cpuW:0.30, vramN:5,  hasRT:false, comp:false, fpsTarget:60, desc:"中量MMORPG",                   priority:false },
    { id:"genshin",   name:"原神",               emoji:"🌸", baseFPS:230, cpuW:0.35, vramN:4,  hasRT:false, comp:false, fpsTarget:60, desc:"軽中量オープンワールド",        priority:false },
  ]},
  { id:"light", label:"軽量 / シム / その他", col:"#00cfff", games:[
    { id:"msfs",     name:"MSFS 2024",           emoji:"✈️", baseFPS:55,  cpuW:0.45, vramN:12, hasRT:false, comp:false, fpsTarget:60, desc:"超重量フライトシム",     priority:false },
    { id:"cities2",  name:"Cities: Skylines II", emoji:"🏙️", baseFPS:60,  cpuW:0.55, vramN:8,  hasRT:false, comp:false, fpsTarget:60, desc:"超CPU依存都市建設",      priority:false },
    { id:"palworld", name:"Palworld",            emoji:"🦊", baseFPS:100, cpuW:0.35, vramN:6,  hasRT:false, comp:false, fpsTarget:60, desc:"中量サバイバルクラフト", priority:false },
    { id:"minecraft",name:"Minecraft (影Mod)",   emoji:"⛏️", baseFPS:120, cpuW:0.45, vramN:6,  hasRT:true,  comp:false, fpsTarget:60, desc:"シェーダー使用時中量",  priority:false },
    { id:"sf6",      name:"Street Fighter 6",    emoji:"🥊", baseFPS:360, cpuW:0.30, vramN:3,  hasRT:false, comp:true,  fpsTarget:60, desc:"軽量格闘ゲーム",        priority:false },
  ]},
];
const ALL_GAMES = GAME_CATS.flatMap(c => c.games);

// ═══════════════════════════════════════════════════
//  CORE FPS ENGINE
// ═══════════════════════════════════════════════════
function calcFPS({ gpu, cpu, memory, game, resId, aspectId, presetId, aiBoost }) {
  const res    = RESOLUTIONS.find(r => r.id === resId)    || RESOLUTIONS[2];
  const aspect = ASPECTS.find(a => a.id === aspectId)     || ASPECTS[0];
  const preset = PRESETS.find(p => p.id === presetId)     || PRESETS[1];

  // 1 ── GPU / CPU blended performance ratio vs reference
  const gpuRatio = gpu.score / REF_GPU;
  const cpuRatio = cpu.score / REF_CPU;
  const blended  = gpuRatio * (1 - game.cpuW) + cpuRatio * game.cpuW;

  // 2 ── Start from calibrated baseFPS at 1080p / low / RTX 3060
  let fps = game.baseFPS * blended;

  // 3 ── Quality preset multiplier
  fps *= preset.qMult;

  // 4 ── RT surcharge (only ultra preset + RT-capable game)
  if (preset.rtOn && game.hasRT) fps *= 0.65;

  // 5 ── Resolution load penalty  (divide = more load = lower fps)
  fps /= res.mult;

  // 6 ── Aspect ratio GPU load  (divide = higher gpuMult = lower fps)
  fps /= aspect.gpuMult;

  // 7 ── 4:3 competitive stretch bonus  +20% fps
  if (aspect.fps43) fps *= 1.20;

  // 8 ── RAM penalty
  if (memory < 16) fps *= 0.90;
  if (memory < 8)  fps *= 0.80;

  // 9 ── VRAM check
  const vramReq = game.vramN * preset.vramM * res.vramM * (aspect.id === "21_9" ? 1.10 : aspect.id === "32_9" ? 1.20 : 1.0);
  const vramWarn = vramReq > gpu.vram;
  if (vramWarn) fps *= Math.max(0.5, gpu.vram / vramReq);

  // 10 ── AI upscaling boost
  if (aiBoost) {
    if (gpu.dlss4 || gpu.fsr4) fps *= 2.5;
    else if (gpu.dlss || gpu.fsr) fps *= 1.4;
  }

  fps = Math.min(Math.max(Math.round(fps), 1), 999);

  const target = game.comp ? game.fpsTarget : 60;
  const ratio  = fps / target;
  const grade  = ratio >= 1.1 ? "S" : ratio >= 0.85 ? "A" : ratio >= 0.60 ? "B" : "C";

  // Tips
  const aiLabel = gpu.dlss4 ? "DLSS 4" : gpu.fsr4 ? "FSR 4" : gpu.dlss ? "DLSS" : gpu.fsr ? "FSR" : null;
  const tips = [];
  if (aiBoost && aiLabel) tips.push(`${aiLabel} AI補完 有効 ─ ${gpu.dlss4 || gpu.fsr4 ? "最大2.5倍" : "1.4倍"}フレームブースト`);
  else if (aiLabel)       tips.push(`${aiLabel}を有効にするとfpsがさらに向上します`);
  if (aspect.fps43)       tips.push("🏆 4:3 競技引き伸ばし — fps +20% ブースト適用");
  if (aspect.id === "21_9" || aspect.id === "32_9") tips.push(`📐 ${aspect.sub}による追加GPU負荷 (×${aspect.gpuMult}) 反映済み`);
  if (vramWarn)           tips.push(`⚠️ VRAM不足: 必要 ${vramReq.toFixed(1)}GB > 搭載 ${gpu.vram}GB — 性能低下中`);
  if (memory < 16)        tips.push("⚠️ RAM 16GB未満 — パフォーマンス低下の恐れ");
  if (game.refNote)       tips.push(`📋 公式基準: ${game.refNote}`);
  if (game.rtx50_4k && gpu.gen === "RTX 50シリーズ" && resId === "4k") tips.push("🐉 RTX 50 × 4K ─ 120fps+ 達成可能！");

  return { fps, grade, target, vramWarn, vramReq: Math.ceil(vramReq), rtOn: preset.rtOn && game.hasRT, tips };
}

// ═══════════════════════════════════════════════════
//  BOTTLENECK ENGINE
// ═══════════════════════════════════════════════════
function calcBN(gpu, cpu) {
  const total = gpu.score + cpu.score;
  const bal   = (gpu.score / total) * 100;
  const type  = bal > 60 ? "cpu" : bal < 40 ? "gpu" : "balanced";
  const lost  = type === "balanced" ? 0 : Math.min(Math.round(Math.abs(bal - (type === "cpu" ? 60 : 40)) * 1.1), 42);
  return { bal, type, lost };
}

// ═══════════════════════════════════════════════════
//  HARDWARE AUTO-DETECT
//  ─ Enhanced: explicit RTX 3060 → 12GB VRAM branch
// ═══════════════════════════════════════════════════
async function autoDetect() {
  const out = { gpuRaw: null, cores: null, method: "none" };
  try {
    out.cores = navigator.hardwareConcurrency || null;

    // 1. WebGPU (most accurate)
    if (navigator.gpu) {
      const adapter = await navigator.gpu.requestAdapter().catch(() => null);
      if (adapter) {
        const info = await adapter.requestAdapterInfo().catch(() => null);
        if (info?.description) { out.gpuRaw = info.description; out.method = "webgpu"; }
      }
    }

    // 2. WebGL fallback via WEBGL_debug_renderer_info
    if (!out.gpuRaw) {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const raw = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (raw) { out.gpuRaw = raw; out.method = "webgl"; }
        }
      }
    }
  } catch (_) {}
  return out;
}

// ─ Match GPU string → GPU ID
//   Special-case: "RTX 3060" (no "Ti") → rtx3060 (12GB VRAM model)
function matchGPU(raw) {
  if (!raw) return null;

  // Normalise: pad with spaces so keyword boundaries are clean
  const s = " " + raw.toLowerCase()
    .replace(/nvidia geforce /g, "")
    .replace(/amd radeon /g, "")
    .replace(/\//g, " ")
    + " ";

  // ── Explicit RTX 3060 disambiguation ──────────────────
  // If string contains "3060 ti" → rtx3060ti (8GB)
  // If string contains "3060" without "ti" → rtx3060 (12GB) ← as requested
  if (/ 3060 ti/.test(s) || /3060ti/.test(s)) return "rtx3060ti";
  if (/ 3060/.test(s))                         return "rtx3060";   // always 12GB model

  // ── General keyword match (longest keyword first) ─────
  const sorted = [...GPUS].sort((a, b) => {
    const maxA = Math.max(...a.kw.map(k => k.length));
    const maxB = Math.max(...b.kw.map(k => k.length));
    return maxB - maxA;
  });
  for (const gpu of sorted) {
    for (const kw of gpu.kw) {
      if (s.includes(kw.toLowerCase())) return gpu.id;
    }
  }
  return null;
}

function matchCPU(cores) {
  if (!cores) return null;
  const tbl = [[32,"r9_9950x"],[24,"cu9_285k"],[20,"cu7_265k"],[16,"r9_7950x"],[12,"r9_7900x"],[10,"i7_12700k"],[8,"r7_7700x"],[6,"r5_7600x"]];
  return (tbl.find(([c]) => cores >= c) || [, "r5_5600"])[1];
}

// ═══════════════════════════════════════════════════
//  UPGRADE SUGGESTIONS
// ═══════════════════════════════════════════════════
const GPU_UPG = [
  { max:25,  name:"RTX 4060",        q:"RTX+4060+グラフィックボード",   price:"¥38,000〜" },
  { max:50,  name:"RTX 4070",        q:"RTX+4070+グラフィックボード",   price:"¥58,000〜" },
  { max:72,  name:"RX 9070 XT",      q:"RX+9070+XT+グラフィックボード", price:"¥80,000〜" },
  { max:90,  name:"RTX 4080 Super",  q:"RTX+4080+Super",               price:"¥110,000〜" },
  { max:115, name:"RTX 5070 Ti",     q:"RTX+5070+Ti",                  price:"¥145,000〜" },
  { max:999, name:"RTX 5080 / 5090", q:"RTX+5080",                     price:"¥175,000〜" },
];
const CPU_UPG = [
  { max:55,  name:"Ryzen 5 9600X",   q:"Ryzen+5+9600X",   price:"¥30,000〜" },
  { max:72,  name:"Core i5-14600K",  q:"Core+i5+14600K",  price:"¥38,000〜" },
  { max:90,  name:"Ryzen 7 9800X3D", q:"Ryzen+7+9800X3D", price:"¥60,000〜" },
  { max:999, name:"Ryzen 9 9950X",   q:"Ryzen+9+9950X",   price:"¥85,000〜" },
];
const getUpg = (arr, s) => arr.find(u => s < u.max) || arr[arr.length - 1];

// ═══════════════════════════════════════════════════
//  GRADE CONFIG
// ═══════════════════════════════════════════════════
const GC = { S:"#a3ff12", A:"#39e500", B:"#ffcc00", C:"#ff4455" };
const GG = { S:"0 0 14px #a3ff1266", A:"0 0 12px #39e50066", B:"0 0 12px #ffcc0066", C:"0 0 12px #ff445566" };

// ═══════════════════════════════════════════════════
//  CSS
// ═══════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Exo+2:wght@400;600;700&display=swap');
:root{
  --g:#a3ff12;--gd:#6dcc00;--gg:rgba(163,255,18,.16);
  --bg:#0b0c0e;--bg2:#111418;--bg3:#181c22;
  --pan:rgba(16,20,25,.97);
  --b:rgba(163,255,18,.12);--bh:rgba(163,255,18,.36);
  --txt:#cad3e4;--mu:#49596e;
  --pink:#ff6ec7;--cyan:#00cfff;--ora:#ff9340;--red:#ff4455;--gold:#ffd060;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg);color:var(--txt);font-family:'Exo 2',sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased;}
.app{min-height:100vh;background:
  radial-gradient(ellipse 120% 30% at 50% -4%,rgba(163,255,18,.042) 0%,transparent 55%),
  radial-gradient(ellipse 60% 25% at 90% 100%,rgba(0,207,255,.025) 0%,transparent 50%),
  var(--bg);}

/* ── TOPBAR ── */
.tb{position:sticky;top:0;z-index:200;height:50px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;background:rgba(11,12,14,.97);border-bottom:1px solid var(--b);backdrop-filter:blur(18px);}
.logo{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:800;letter-spacing:4px;color:var(--g);text-transform:uppercase;}
.logo em{color:var(--txt);font-style:normal;font-weight:300;}
.vc{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--mu);border:1px solid rgba(163,255,18,.1);padding:3px 8px;}

/* ── WIZARD ── */
.wiz{padding:16px 24px 2px;max-width:860px;margin:0 auto;}
.wt{display:flex;align-items:center;}
.wn{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;min-width:0;}
.wc{width:34px;height:34px;border-radius:50%;border:2px solid var(--b);background:var(--bg3);display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;color:var(--mu);transition:all .32s cubic-bezier(.16,1,.3,1);z-index:2;flex-shrink:0;}
.wc.act{border-color:var(--g);color:var(--g);background:rgba(163,255,18,.09);box-shadow:0 0 12px var(--gg);}
.wc.done{border-color:var(--gd);background:rgba(163,255,18,.12);color:var(--g);}
.wl{font-family:'JetBrains Mono',monospace;font-size:7.5px;letter-spacing:1.2px;color:var(--mu);text-transform:uppercase;text-align:center;line-height:1.3;transition:color .28s;padding:0 2px;}
.wn.act .wl{color:var(--g);}
.wline{flex:1;height:1px;background:var(--b);transition:background .35s;max-width:72px;margin-bottom:20px;}
.wline.done{background:linear-gradient(90deg,var(--gd),var(--b));}

/* ── LAYOUT ── */
.wrap{max-width:860px;margin:0 auto;padding:20px 16px 72px;}
.page{animation:pIn .28s cubic-bezier(.16,1,.3,1) both;}
@keyframes pIn{from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:none;}}

/* ── CARD ── */
.card{background:var(--pan);border:1px solid var(--b);border-radius:5px;padding:18px 22px;margin-bottom:12px;position:relative;overflow:hidden;}
.card::before{content:'';position:absolute;inset:0 0 auto;height:1px;background:linear-gradient(90deg,transparent,var(--bh),transparent);}
.ch{font-family:'Barlow Condensed',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:4px;color:var(--g);text-transform:uppercase;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.ch::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--b),transparent);}
.pt{font-family:'Barlow Condensed',sans-serif;font-size:clamp(22px,4.5vw,36px);font-weight:800;letter-spacing:.4px;margin-bottom:3px;}
.ps{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--mu);letter-spacing:2px;margin-bottom:16px;}
.hl{color:var(--g);}

/* ── DETECT ── */
.det{width:100%;background:rgba(0,207,255,.055);border:1px solid rgba(0,207,255,.25);border-radius:4px;padding:11px 16px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:3.5px;color:var(--cyan);cursor:pointer;transition:all .2s;text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:7px;margin-bottom:12px;}
.det:hover:not(:disabled){background:rgba(0,207,255,.11);box-shadow:0 0 16px rgba(0,207,255,.14);}
.det:disabled{opacity:.4;cursor:not-allowed;}
.dm{font-family:'JetBrains Mono',monospace;font-size:9.5px;padding:7px 10px;border-radius:3px;margin-bottom:11px;line-height:1.6;letter-spacing:.3px;}
.ok{color:var(--g);background:rgba(163,255,18,.055);border:1px solid rgba(163,255,18,.16);}
.wn2{color:var(--gold);background:rgba(255,208,96,.05);border:1px solid rgba(255,208,96,.16);}
.er{color:var(--red);background:rgba(255,68,85,.05);border:1px solid rgba(255,68,85,.16);}

/* ── FIELDS ── */
.f2{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:11px;}
@media(max-width:520px){.f2{grid-template-columns:1fr;}}
.fb label{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;display:block;margin-bottom:5px;}
.sw{position:relative;}
.sw::after{content:'▾';position:absolute;right:9px;top:50%;transform:translateY(-50%);color:var(--g);font-size:10px;pointer-events:none;}
select{width:100%;background:rgba(163,255,18,.03);border:1px solid rgba(163,255,18,.15);border-radius:3px;color:var(--txt);padding:9px 28px 9px 11px;font-family:'Exo 2',sans-serif;font-size:13px;font-weight:600;appearance:none;cursor:pointer;transition:border .16s;}
select:focus{outline:none;border-color:var(--g);box-shadow:0 0 0 2px var(--gg);}
select option,optgroup{background:#111418;color:var(--txt);}

/* ── MEMORY ── */
.mg{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;}
.mb{background:rgba(163,255,18,.03);border:1px solid rgba(163,255,18,.11);border-radius:3px;padding:8px;cursor:pointer;text-align:center;font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;color:var(--mu);transition:all .16s;}
.mb.on{border-color:var(--g);color:var(--g);background:rgba(163,255,18,.07);box-shadow:0 0 8px var(--gg);}

/* ── CHIPS ── */
.chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px;padding:8px 10px;background:rgba(0,0,0,.2);border:1px solid rgba(163,255,18,.06);border-radius:3px;}
.chip{font-family:'JetBrains Mono',monospace;font-size:8.5px;padding:2px 7px;border-radius:2px;border:1px solid rgba(163,255,18,.22);color:var(--g);}
.cd4{border-color:rgba(100,200,255,.45);color:#64c8ff;background:rgba(100,200,255,.05);}
.cdl{border-color:rgba(167,139,250,.38);color:#a78bfa;}
.cf4{border-color:rgba(255,147,64,.48);color:var(--ora);background:rgba(255,147,64,.05);}
.cfs{border-color:rgba(251,146,60,.35);color:#fb923c;}
.cw{border-color:rgba(255,68,85,.28);color:var(--red);}

/* ── GENRE TILES ── */
.gg3{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;}
@media(max-width:460px){.gg3{grid-template-columns:1fr;}}
.gtile{background:rgba(163,255,18,.025);border:1px solid rgba(163,255,18,.09);border-radius:4px;padding:16px 12px;cursor:pointer;text-align:center;transition:all .2s;position:relative;overflow:hidden;}
.gtile:hover{border-color:rgba(163,255,18,.28);background:rgba(163,255,18,.05);}
.gtile.on{border-color:var(--g);background:rgba(163,255,18,.08);box-shadow:0 0 12px var(--gg);}
.gtile.on::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--g);}
.gi{font-size:26px;margin-bottom:7px;}
.gname2{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;letter-spacing:1px;text-transform:uppercase;}
.gtile.on .gname2{color:var(--g);}
.gsub{font-family:'JetBrains Mono',monospace;font-size:7.5px;color:var(--mu);margin-top:2px;}

/* ── GAME TILES ── */
.ctabs{display:flex;gap:4px;margin-bottom:11px;flex-wrap:wrap;}
.ctab{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;padding:5px 12px;border:1px solid rgba(163,255,18,.13);background:transparent;color:var(--mu);cursor:pointer;transition:all .16s;text-transform:uppercase;}
.ctab.on{border-color:var(--g);color:var(--g);background:rgba(163,255,18,.07);}
.gameg{display:grid;grid-template-columns:repeat(auto-fill,minmax(152px,1fr));gap:6px;margin-bottom:10px;}
.gm{background:rgba(163,255,18,.02);border:1px solid rgba(163,255,18,.08);border-radius:3px;padding:9px 11px;cursor:pointer;text-align:left;transition:all .16s;position:relative;overflow:hidden;}
.gm:hover{border-color:rgba(163,255,18,.26);}
.gm.on{border-color:var(--g);background:rgba(163,255,18,.07);}
.gm.pri{border-color:rgba(255,147,64,.28);}
.gm.pri.on{border-color:var(--ora);background:rgba(255,147,64,.07);}
.gm.on::before,.gm.pri.on::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;}
.gm.on::before{background:var(--g);}
.gm.pri.on::before{background:var(--ora);}
.gck{position:absolute;top:4px;right:6px;font-size:9px;color:var(--g);font-weight:900;opacity:0;}
.gm.on .gck{opacity:1;}
.gm.pri.on .gck{color:var(--ora);}
.gbdg{font-family:'JetBrains Mono',monospace;font-size:7px;color:var(--ora);letter-spacing:2px;text-transform:uppercase;margin-bottom:2px;}
.gnm{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;color:var(--txt);margin-bottom:1px;}
.gds{font-family:'JetBrains Mono',monospace;font-size:7.5px;color:var(--mu);}
.sc{font-family:'JetBrains Mono',monospace;font-size:8.5px;color:var(--g);padding:3px 8px;background:rgba(163,255,18,.07);border:1px solid rgba(163,255,18,.15);border-radius:2px;}

/* ── RESOLUTION ── */
.resg{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:8px;}
@media(max-width:460px){.resg{grid-template-columns:repeat(3,1fr);}}
.rb{background:rgba(163,255,18,.025);border:1px solid rgba(163,255,18,.09);border-radius:3px;padding:10px 5px;cursor:pointer;text-align:center;transition:all .16s;}
.rb:hover{border-color:rgba(163,255,18,.28);}
.rb.on{border-color:var(--g);background:rgba(163,255,18,.08);box-shadow:0 0 8px var(--gg);}
.rl{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;color:var(--txt);}
.rb.on .rl{color:var(--g);}
.rs{font-family:'JetBrains Mono',monospace;font-size:6.5px;color:var(--mu);margin-top:2px;}
.rm{font-family:'JetBrains Mono',monospace;font-size:7px;color:rgba(163,255,18,.4);margin-top:2px;}

/* ── ASPECT ── */
.aspg{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px;}
.ab{background:rgba(163,255,18,.025);border:1px solid rgba(163,255,18,.09);border-radius:3px;padding:10px 5px;cursor:pointer;text-align:center;transition:all .16s;}
.ab:hover{border-color:rgba(163,255,18,.28);}
.ab.on{border-color:var(--g);background:rgba(163,255,18,.07);}
.ab.comp.on{border-color:var(--gold);background:rgba(255,208,96,.07);}
.al{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;color:var(--txt);}
.ab.on .al{color:var(--g);}
.ab.comp.on .al{color:var(--gold);}
.as{font-family:'JetBrains Mono',monospace;font-size:6.5px;color:var(--mu);margin-top:2px;}

/* ── PRESET ── */
.preg{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:8px;}
@media(max-width:440px){.preg{grid-template-columns:repeat(2,1fr);}}
.pb{background:rgba(163,255,18,.025);border:1px solid rgba(163,255,18,.09);border-radius:3px;padding:12px 6px;cursor:pointer;text-align:center;transition:all .18s;position:relative;}
.pb:hover{border-color:rgba(163,255,18,.28);}
.pb.on{border-color:var(--g);background:rgba(163,255,18,.08);}
.pb.on::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--g);}
.pbi{font-size:19px;margin-bottom:4px;}
.pbl{font-family:'Barlow Condensed',sans-serif;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;}
.pb.on .pbl{color:var(--g);}

/* ── AI BOOST ── */
.air{display:flex;align-items:center;gap:10px;padding:10px 13px;background:rgba(100,200,255,.04);border:1px solid rgba(100,200,255,.17);border-radius:4px;cursor:pointer;transition:all .18s;margin-top:8px;user-select:none;}
.air:hover{background:rgba(100,200,255,.08);}
.air.on{border-color:#64c8ff;background:rgba(100,200,255,.09);}
.tog{width:32px;height:17px;background:rgba(255,255,255,.07);border-radius:9px;position:relative;transition:background .2s;flex-shrink:0;}
.tog.on{background:linear-gradient(90deg,#64c8ff,var(--g));}
.tog::after{content:'';position:absolute;top:2.5px;left:2.5px;width:12px;height:12px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.4);}
.tog.on::after{transform:translateX(15px);}
.ain{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:.5px;}
.ais{font-family:'JetBrains Mono',monospace;font-size:7.5px;color:var(--mu);margin-top:1px;}

/* ── PRIORITY ── */
.priog{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.priob{background:rgba(163,255,18,.025);border:1px solid rgba(163,255,18,.1);border-radius:4px;padding:14px;cursor:pointer;text-align:center;transition:all .2s;}
.priob:hover{border-color:rgba(163,255,18,.28);}
.priob.sp{border-color:var(--g);background:rgba(163,255,18,.07);box-shadow:0 0 12px var(--gg);}
.priob.sv{border-color:var(--pink);background:rgba(255,110,199,.06);box-shadow:0 0 12px rgba(255,110,199,.12);}
.pricon{font-size:20px;margin-bottom:5px;}
.prn{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:2px;}
.prs{font-family:'JetBrains Mono',monospace;font-size:7.5px;color:var(--mu);}

/* ── NAV ── */
.nav{display:flex;gap:8px;margin-top:5px;}
.bb{background:transparent;border:1px solid rgba(163,255,18,.19);border-radius:3px;padding:11px 18px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:3px;color:var(--mu);cursor:pointer;transition:all .16s;text-transform:uppercase;}
.bb:hover{color:var(--txt);border-color:rgba(163,255,18,.4);}
.bn{flex:1;background:linear-gradient(135deg,rgba(163,255,18,.09),rgba(163,255,18,.04));border:1px solid var(--g);border-radius:3px;padding:12px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;letter-spacing:3.5px;color:var(--g);cursor:pointer;transition:all .26s;text-transform:uppercase;position:relative;overflow:hidden;}
.bn:hover:not(:disabled){background:linear-gradient(135deg,rgba(163,255,18,.17),rgba(163,255,18,.08));box-shadow:0 0 22px rgba(163,255,18,.2);transform:translateY(-1px);}
.bn:disabled{opacity:.26;cursor:not-allowed;}
.shine{position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(163,255,18,.06),transparent);transition:left .45s;}
.bn:hover .shine{left:100%;}

/* ── BOTTLENECK ── */
.bnw{border-radius:5px;padding:16px 20px;margin-bottom:12px;}
.bnbal{background:rgba(163,255,18,.03);border:1px solid rgba(163,255,18,.15);}
.bncpu{background:rgba(255,68,85,.03);border:1px solid rgba(255,68,85,.24);}
.bngpu{background:rgba(255,147,64,.03);border:1px solid rgba(255,147,64,.22);}
.bnhd{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;margin-bottom:14px;}
.grow{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
.gsw{position:relative;width:112px;height:112px;flex-shrink:0;}
.gct{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.gpct{font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:900;line-height:1;}
.gsl{font-family:'JetBrains Mono',monospace;font-size:7px;color:var(--mu);letter-spacing:2px;margin-top:1px;}
.gleg{flex:1;min-width:140px;}
.gbarr{margin-bottom:8px;}
.gbarl{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--mu);margin-bottom:3px;}
.gtrk{height:5px;background:rgba(255,255,255,.04);border-radius:3px;overflow:hidden;}
.gfil{height:100%;border-radius:3px;transition:width 1.2s cubic-bezier(.16,1,.3,1);}
.zoner{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:7px;color:rgba(73,89,110,.5);margin-top:6px;}
.bnmsg{font-family:'JetBrains Mono',monospace;font-size:9.5px;line-height:1.75;padding:8px 11px;border-radius:3px;margin-top:10px;letter-spacing:.25px;}
.bmbal{color:var(--g);background:rgba(163,255,18,.04);border-left:2px solid var(--g);}
.bmcpu{color:var(--red);background:rgba(255,68,85,.04);border-left:2px solid var(--red);}
.bmgpu{color:var(--ora);background:rgba(255,147,64,.04);border-left:2px solid var(--ora);}

/* ── UPGRADE ── */
.upgw{border:1px solid rgba(255,110,199,.17);background:rgba(255,110,199,.02);border-radius:5px;padding:14px 17px;margin-bottom:12px;}
.upgh{font-family:'Barlow Condensed',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:4px;color:var(--pink);text-transform:uppercase;margin-bottom:11px;display:flex;align-items:center;gap:7px;}
.upgh::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(255,110,199,.2),transparent);}
.upgg{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
@media(max-width:440px){.upgg{grid-template-columns:1fr;}}
.upgi{background:rgba(0,0,0,.26);border:1px solid rgba(255,255,255,.05);border-radius:3px;padding:11px;}
.upgt{font-family:'JetBrains Mono',monospace;font-size:7.5px;letter-spacing:1.5px;color:var(--mu);text-transform:uppercase;margin-bottom:3px;}
.upgn{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;color:var(--txt);margin-bottom:2px;}
.upgp{font-family:'JetBrains Mono',monospace;font-size:8.5px;color:var(--mu);margin-bottom:7px;}
.amz{display:inline-flex;align-items:center;gap:4px;background:rgba(255,153,0,.07);border:1px solid rgba(255,153,0,.26);border-radius:2px;padding:5px 10px;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:1px;color:#ff9900;text-decoration:none;transition:all .16s;}
.amz:hover{background:rgba(255,153,0,.14);box-shadow:0 0 9px rgba(255,153,0,.15);}

/* ── FPS COMPARE CHART ── */
.chart-wrap{margin-bottom:14px;}
.chart-lbl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;margin-bottom:8px;display:block;}
.chart{display:flex;align-items:flex-end;gap:4px;height:64px;padding:0 2px;position:relative;}
.bar-col{display:flex;flex-direction:column;align-items:center;gap:2px;flex:1;min-width:0;}
.bar-val{font-family:'JetBrains Mono',monospace;font-size:7px;margin-bottom:1px;}
.bar-b{width:100%;border-radius:2px 2px 0 0;min-height:2px;transition:height .9s cubic-bezier(.16,1,.3,1);}
.bar-em{font-size:10px;margin-top:2px;}
.target-line{position:absolute;left:0;right:0;border-top:1px dashed rgba(255,255,255,.1);}
.target-lbl{font-family:'JetBrains Mono',monospace;font-size:7px;color:rgba(255,255,255,.2);position:absolute;right:2px;}

/* ── RESULT CARD ── */
.rcard{background:var(--pan);border-radius:5px;margin-bottom:9px;overflow:hidden;border:1px solid rgba(163,255,18,.08);animation:rin .36s cubic-bezier(.16,1,.3,1) both;opacity:0;}
@keyframes rin{from{opacity:0;transform:translateY(9px);}to{opacity:1;transform:none;}}
.rh{display:flex;align-items:center;gap:11px;padding:11px 14px;background:rgba(0,0,0,.2);border-bottom:1px solid rgba(255,255,255,.04);}
.gr{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:900;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:3px;border:2px solid currentColor;flex-shrink:0;}
.rtitle{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;line-height:1.2;margin-bottom:1px;}
.rgame{font-family:'JetBrains Mono',monospace;font-size:8.5px;color:var(--mu);}
.rbody{padding:11px 14px;}
.rdet{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--mu);margin-bottom:7px;line-height:1.6;}
.fpsrow{margin-bottom:6px;}
.fpsl{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:8.5px;color:var(--mu);margin-bottom:3px;}
.fpstrk{height:3px;background:rgba(255,255,255,.04);border-radius:2px;overflow:hidden;}
.fpsf{height:100%;border-radius:2px;transition:width 1s ease;}
.vw{display:flex;align-items:flex-start;gap:5px;font-family:'JetBrains Mono',monospace;font-size:8.5px;color:var(--red);padding:5px 8px;background:rgba(255,68,85,.06);border:1px solid rgba(255,68,85,.2);border-radius:3px;margin:6px 0;}
.rtbdg{display:inline-flex;align-items:center;gap:3px;font-family:'JetBrains Mono',monospace;font-size:7.5px;padding:2px 6px;border:1px solid var(--pink);color:var(--pink);border-radius:2px;margin-top:4px;}
.mhbdg{display:inline-flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:8.5px;padding:4px 9px;border:1px solid rgba(255,147,64,.42);color:var(--ora);background:rgba(255,147,64,.07);border-radius:3px;margin-top:5px;}
.tips{display:flex;flex-direction:column;gap:3px;margin-top:7px;}
.tip{font-family:'JetBrains Mono',monospace;font-size:8.5px;color:var(--g);padding:3px 7px;background:rgba(163,255,18,.05);border-left:2px solid var(--g);}
.rf{display:flex;border-top:1px solid rgba(255,255,255,.04);}
.rst{flex:1;display:flex;flex-direction:column;align-items:center;padding:8px 5px;border-right:1px solid rgba(255,255,255,.04);}
.rst:last-child{border-right:none;}
.rv{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;}
.rk{font-family:'JetBrains Mono',monospace;font-size:6.5px;color:var(--mu);letter-spacing:1.5px;margin-top:1px;text-transform:uppercase;}

/* ── META ── */
.meta{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--mu);margin-bottom:12px;padding:8px 11px;background:rgba(0,0,0,.17);border-radius:3px;border:1px solid rgba(163,255,18,.05);line-height:1.8;}
.slbl{font-family:'JetBrains Mono',monospace;font-size:7.5px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;display:block;margin-bottom:6px;}
.blink{display:inline-block;width:6px;height:11px;background:var(--g);animation:bl 1s step-end infinite;vertical-align:middle;margin-left:3px;}
@keyframes bl{0%,100%{opacity:1;}50%{opacity:0;}}
.note{font-family:'JetBrains Mono',monospace;font-size:8px;color:var(--mu);line-height:1.6;margin-top:8px;}
`;

// ═══════════════════════════════════════════════════
//  RADIAL GAUGE  (SVG arc)
// ═══════════════════════════════════════════════════
function RadialGauge({ bal, gn, gs, cn, cs, type }) {
  const r = 42, cx = 56, cy = 56, sw = -218, sp = 256, maxS = 170;
  const gc = type === "cpu" ? "#ff4455" : type === "gpu" ? "#ff9340" : "#a3ff12";
  const pt = (deg, rad) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a) };
  };
  const arc = (s, e) => {
    const a = pt(s, r), b = pt(e, r), lg = e - s > 180 ? 1 : 0;
    return `M${a.x} ${a.y} A${r} ${r} 0 ${lg} 1 ${b.x} ${b.y}`;
  };
  const fillEnd = sw + (bal / 100) * sp;
  return (
    <div className="grow">
      <div className="gsw">
        <svg width="112" height="112" viewBox="0 0 112 112" overflow="visible">
          <path d={arc(sw, sw + sp)} fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="7" strokeLinecap="round"/>
          <path d={arc(sw, fillEnd)} fill="none" stroke={gc} strokeWidth="7" strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${gc}88)` }}/>
          {[40, 60].map(p => {
            const a = pt(sw + (p / 100) * sp, r), b = pt(sw + (p / 100) * sp, r + 6);
            return <line key={p} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,.17)" strokeWidth="1.5"/>;
          })}
          <text x="8"  y="100" fill="rgba(73,89,110,.5)" fontFamily="JetBrains Mono" fontSize="7" letterSpacing="1">GPU</text>
          <text x="83" y="100" fill="rgba(73,89,110,.5)" fontFamily="JetBrains Mono" fontSize="7" letterSpacing="1">CPU</text>
        </svg>
        <div className="gct">
          <div className="gpct" style={{ color: gc }}>{Math.round(bal)}<span style={{ fontSize: 12 }}>%</span></div>
          <div className="gsl">GPU比率</div>
        </div>
      </div>
      <div className="gleg">
        <div className="gbarr">
          <div className="gbarl"><span>GPU</span><span style={{ color: "#a3ff12" }}>{gn} — {gs}pt</span></div>
          <div className="gtrk"><div className="gfil" style={{ width: `${(gs / maxS) * 100}%`, background: "linear-gradient(90deg,#a3ff1244,#a3ff12)" }}/></div>
        </div>
        <div className="gbarr">
          <div className="gbarl"><span>CPU</span><span style={{ color: "#00cfff" }}>{cn} — {cs}pt</span></div>
          <div className="gtrk"><div className="gfil" style={{ width: `${(cs / maxS) * 100}%`, background: "linear-gradient(90deg,#00cfff44,#00cfff)" }}/></div>
        </div>
        <div className="zoner">
          <span>▲ GPU不足</span>
          <span style={{ color: "rgba(163,255,18,.28)" }}>良好</span>
          <span>CPU不足 ▲</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  PAGE 1 — SPEC INPUT
// ═══════════════════════════════════════════════════
function Page1({ s, set, onNext }) {
  const [det, setDet] = useState(false);
  const [dMsg, setDMsg] = useState(null);
  const gpu = GPUS.find(g => g.id === s.gpu);
  const cpu = CPUS.find(c => c.id === s.cpu);
  const gpuGens = [...new Set(GPUS.map(g => g.gen))];
  const cpuGens = [...new Set(CPUS.map(c => c.gen))];

  const handleDet = async () => {
    setDet(true); setDMsg(null);
    const hw = await autoDetect();
    const mg = matchGPU(hw.gpuRaw);
    const mc = matchCPU(hw.cores);
    const msgs = [];
    if (mg) { set("gpu", mg); msgs.push(`GPU: ${GPUS.find(g => g.id === mg)?.name} (VRAM: ${GPUS.find(g => g.id === mg)?.vram}GB)`); }
    else if (hw.gpuRaw) msgs.push(`GPU文字列取得済み (DBマッチなし): ${hw.gpuRaw.slice(0, 42)}`);
    if (mc) { set("cpu", mc); msgs.push(`CPU: ${hw.cores}コア → ${CPUS.find(c => c.id === mc)?.name} (推定)`); }
    const ok = mg || mc;
    setDMsg({
      t: ok ? "ok" : hw.gpuRaw ? "warn" : "err",
      text: msgs.length ? msgs.join(" ／ ") + (hw.method ? ` [${hw.method}]` : "") : "自動検出できませんでした。手動で選択してください。"
    });
    setDet(false);
  };

  const bn = gpu && cpu ? calcBN(gpu, cpu) : null;

  return (
    <div className="page">
      <div className="pt">スペック <span className="hl">確認</span><span className="blink"/></div>
      <div className="ps">// PAGE 01 — HARDWARE CONFIGURATION</div>

      <div className="card">
        <div className="ch">🔍 自動スペック取得</div>
        <button className="det" onClick={handleDet} disabled={det}>
          {det ? "⚙️ スキャン中..." : "🖥️  PCスペックを自動取得する"}
        </button>
        {dMsg && <div className={`dm ${dMsg.t === "ok" ? "ok" : dMsg.t === "warn" ? "wn2" : "er"}`}>
          {dMsg.t === "ok" ? "✓ " : "△ "}{dMsg.text}
        </div>}
        <p className="note">
          WebGPU API → WEBGL_debug_renderer_info の順に試行します。<br/>
          「RTX 3060」が検出された場合は VRAM 12GB モデルとして自動認識されます（RTX 3060 Ti と明確に区別）。
        </p>
      </div>

      <div className="card">
        <div className="ch">⚡ GPU / CPU 手動選択</div>
        <div className="f2">
          <div className="fb">
            <label>グラフィックカード (GPU)</label>
            <div className="sw">
              <select value={s.gpu} onChange={e => set("gpu", e.target.value)}>
                <option value="">-- GPU を選択 --</option>
                {gpuGens.map(gen => (
                  <optgroup key={gen} label={`── ${gen} ──`}>
                    {GPUS.filter(g => g.gen === gen).map(g => (
                      <option key={g.id} value={g.id}>{g.name} ({g.vram}GB VRAM)</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
          <div className="fb">
            <label>プロセッサー (CPU)</label>
            <div className="sw">
              <select value={s.cpu} onChange={e => set("cpu", e.target.value)}>
                <option value="">-- CPU を選択 --</option>
                {cpuGens.map(gen => (
                  <optgroup key={gen} label={`── ${gen} ──`}>
                    {CPUS.filter(c => c.gen === gen).map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.cores}コア)</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="fb" style={{ marginBottom: 0 }}>
          <label>メモリ (RAM)</label>
          <div className="mg">
            {[8, 16, 32, 64].map(m => (
              <button key={m} className={`mb ${s.memory === m ? "on" : ""}`} onClick={() => set("memory", m)}>
                {m}<span style={{ fontSize: 10 }}> GB</span>
              </button>
            ))}
          </div>
        </div>
        {(gpu || cpu) && (
          <div className="chips">
            {gpu && (<>
              <span className="chip">VRAM: {gpu.vram}GB</span>
              <span className="chip">GPU: {gpu.score}pt</span>
              {gpu.dlss4 && <span className="chip cd4">✦ DLSS 4</span>}
              {!gpu.dlss4 && gpu.dlss && <span className="chip cdl">✓ DLSS</span>}
              {gpu.fsr4  && <span className="chip cf4">✦ FSR 4</span>}
              {!gpu.fsr4 && gpu.fsr && <span className="chip cfs">✓ FSR</span>}
              {!gpu.dlss && !gpu.fsr && <span className="chip cw">✗ アップスケーリング非対応</span>}
            </>)}
            {cpu && (<>
              <span className="chip">CPU: {cpu.score}pt</span>
              <span className="chip">{cpu.cores}コア</span>
            </>)}
          </div>
        )}
      </div>

      {bn && (
        <div className={`bnw ${bn.type === "balanced" ? "bnbal" : bn.type === "cpu" ? "bncpu" : "bngpu"}`}>
          <div className="bnhd" style={{ color: bn.type === "balanced" ? "var(--g)" : bn.type === "cpu" ? "var(--red)" : "var(--ora)" }}>
            {bn.type === "balanced" ? "⚖️  バランス良好" : bn.type === "cpu" ? "⚠️  CPUボトルネック検出" : "⚠️  GPUボトルネック検出"}
          </div>
          <RadialGauge bal={bn.bal} gn={gpu.name} gs={gpu.score} cn={cpu.name} cs={cpu.score} type={bn.type}/>
          <div className={`bnmsg ${bn.type === "balanced" ? "bmbal" : bn.type === "cpu" ? "bmcpu" : "bmgpu"}`}>
            {bn.type === "balanced" && `> Balance = ${Math.round(bn.bal)}% ─ 良好（40〜60%）。両パーツの性能を最大発揮できています。`}
            {bn.type === "cpu"      && `> Balance = ${Math.round(bn.bal)}% (> 60%) ─ CPUボトルネック！GPU性能を最大 ${bn.lost}% 引き出せていません。`}
            {bn.type === "gpu"      && `> Balance = ${Math.round(bn.bal)}% (< 40%) ─ GPU不足！CPU性能の最大 ${bn.lost}% が無駄になっています。`}
          </div>
        </div>
      )}

      <div className="nav">
        <button className="bn" disabled={!s.gpu || !s.cpu} onClick={onNext}>
          <span className="shine"/>PAGE 2: ゲーム選択 →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  PAGE 2 — GENRE + TITLE SELECTION
// ═══════════════════════════════════════════════════
const GENRES = [
  { id:"fps",   label:"FPS",            icon:"🔫", sub:"競技系シューター",       col:"#a3ff12" },
  { id:"aaa",   label:"AAAアクション",  icon:"⚔️", sub:"重量級RPG・アクション",  col:"#ff6ec7" },
  { id:"light", label:"軽量 / シム",    icon:"🏙️", sub:"シム・格ゲー・インディ",  col:"#00cfff" },
];

function Page2({ s, set, onNext, onBack }) {
  const [cat, setCat] = useState("all");
  const toggle = id => set("games", s.games.includes(id) ? s.games.filter(g => g !== id) : [...s.games, id]);

  const visibleCats = cat === "all" ? GAME_CATS : GAME_CATS.filter(c => c.id === cat);

  return (
    <div className="page">
      <div className="pt">ゲーム <span className="hl">選択</span></div>
      <div className="ps">// PAGE 02 — GENRE & TITLE SELECTION</div>

      <div className="card">
        <div className="ch">🎮 ジャンル絞り込み</div>
        <div className="gg3">
          {GENRES.map(g => (
            <div key={g.id}
              className={`gtile ${s.genre === g.id ? "on" : ""}`}
              style={s.genre === g.id ? { borderColor: g.col, boxShadow: `0 0 12px ${g.col}33` } : {}}
              onClick={() => { const next = s.genre === g.id ? "" : g.id; set("genre", next); setCat(next || "all"); }}>
              <div className="gi">{g.icon}</div>
              <div className="gname2" style={s.genre === g.id ? { color: g.col } : {}}>{g.label}</div>
              <div className="gsub">{g.sub}</div>
              {s.genre === g.id && <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:g.col }}/>}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="ch">🗂  タイトル選択（複数可）</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:6 }}>
          <div className="ctabs">
            {[["all","ALL"],["fps","FPS"],["aaa","AAA"],["light","シム"]].map(([id,lbl]) => (
              <button key={id} className={`ctab ${cat === id ? "on" : ""}`} onClick={() => setCat(id)}>{lbl}</button>
            ))}
          </div>
          {s.games.length > 0 && <span className="sc">{s.games.length} タイトル選択中</span>}
        </div>
        {visibleCats.map(c => (
          <div key={c.id} style={{ marginBottom: 13 }}>
            {cat === "all" && (
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:3, color:c.col, textTransform:"uppercase", marginBottom:7 }}>{c.label}</div>
            )}
            <div className="gameg">
              {c.games.map(g => (
                <button key={g.id} className={`gm ${s.games.includes(g.id) ? "on" : ""} ${g.priority ? "pri" : ""}`} onClick={() => toggle(g.id)}>
                  <span className="gck">✓</span>
                  {g.priority && <div className="gbdg">★ 最優先</div>}
                  <div className="gnm">{g.emoji} {g.name}</div>
                  <div className="gds">{g.desc}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="nav">
        <button className="bb" onClick={onBack}>← BACK</button>
        <button className="bn" disabled={s.games.length === 0} onClick={onNext}>
          <span className="shine"/>PAGE 3: ターゲット設定 →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  PAGE 3 — TARGET / QUALITY SETTINGS
// ═══════════════════════════════════════════════════
function Page3({ s, set, onNext, onBack }) {
  const gpu = GPUS.find(g => g.id === s.gpu);
  const aiEligible = gpu && (gpu.dlss4 || gpu.fsr4 || gpu.dlss || gpu.fsr);
  const aiLabel = gpu?.dlss4 ? "DLSS 4 MultiFrameGen (RTX 50専用)" : gpu?.fsr4 ? "FSR 4 AI補完" : gpu?.dlss ? "DLSS フレーム生成" : gpu?.fsr ? "FSR フレーム生成" : "";

  return (
    <div className="page">
      <div className="pt">ターゲット <span className="hl">設定</span></div>
      <div className="ps">// PAGE 03 — RESOLUTION / ASPECT / QUALITY</div>

      {/* Resolution */}
      <div className="card">
        <div className="ch">🖥️  解像度</div>
        <span className="slbl">解像度を選択（左: 高負荷・右: 軽量）</span>
        <div className="resg">
          {RESOLUTIONS.map(r => (
            <button key={r.id} className={`rb ${s.res === r.id ? "on" : ""}`} onClick={() => set("res", r.id)}>
              <div className="rl">{r.label}</div>
              <div className="rs">{r.desc}</div>
              <div className="rm">×{r.mult.toFixed(2)} 負荷</div>
            </button>
          ))}
        </div>
      </div>

      {/* Aspect */}
      <div className="card">
        <div className="ch">📐 アスペクト比</div>
        <div className="aspg">
          {ASPECTS.map(a => (
            <button key={a.id} className={`ab ${a.fps43 ? "comp" : ""} ${s.aspect === a.id ? "on" : ""}`} onClick={() => set("aspect", a.id)}>
              <div className="al">{a.label}</div>
              <div className="as">{a.sub}</div>
              {a.fps43
                ? <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:7, color:"var(--gold)", marginTop:2 }}>fps +20%🏆</div>
                : <div className="as" style={{ color:"rgba(163,255,18,.38)", marginTop:2 }}>GPU ×{a.gpuMult}</div>
              }
            </button>
          ))}
        </div>
        {s.aspect === "4_3" && (
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, color:"var(--gold)", padding:"6px 9px", background:"rgba(255,208,96,.05)", border:"1px solid rgba(255,208,96,.18)", borderRadius:3, marginTop:5 }}>
            🏆 4:3 競技引き伸ばし設定 ─ GPU負荷 ×0.8（軽減）＋ fps計算に +20% ブーストを適用します
          </div>
        )}
      </div>

      {/* Preset */}
      <div className="card">
        <div className="ch">💎 画質プリセット</div>
        <div className="preg">
          {PRESETS.map(p => (
            <button key={p.id} className={`pb ${s.preset === p.id ? "on" : ""}`} onClick={() => set("preset", p.id)}>
              <div className="pbi">{p.icon}</div>
              <div className="pbl">{p.label}</div>
            </button>
          ))}
        </div>
        {aiEligible && (
          <div className={`air ${s.aiBoost ? "on" : ""}`} onClick={() => set("aiBoost", !s.aiBoost)}>
            <div className={`tog ${s.aiBoost ? "on" : ""}`}/>
            <div>
              <div className="ain" style={{ color: s.aiBoost ? (gpu?.dlss4 || gpu?.fsr4 ? "#64c8ff" : "#a78bfa") : "var(--txt)" }}>
                {s.aiBoost ? "✦ AI補完 有効" : "AI補完 (フレーム生成) — OFF"} ─ {aiLabel}
              </div>
              <div className="ais">{gpu?.dlss4 || gpu?.fsr4 ? "有効時: fps予測を最大2.5倍ブースト (MultiFrameGen)" : "有効時: fps予測を1.4倍ブースト"}</div>
            </div>
          </div>
        )}
      </div>

      {/* Priority */}
      <div className="card">
        <div className="ch">🎯 最適化方針</div>
        <div className="priog">
          <button className={`priob ${s.priority === "performance" ? "sp" : ""}`} onClick={() => set("priority", "performance")}>
            <div className="pricon">⚡</div>
            <div className="prn" style={{ color: s.priority === "performance" ? "var(--g)" : "var(--txt)" }}>パフォーマンス</div>
            <div className="prs">高FPS / 競技設定重視</div>
          </button>
          <button className={`priob ${s.priority === "visual" ? "sv" : ""}`} onClick={() => set("priority", "visual")}>
            <div className="pricon">✨</div>
            <div className="prn" style={{ color: s.priority === "visual" ? "var(--pink)" : "var(--txt)" }}>見た目重視</div>
            <div className="prs">60fps固定 / 最高画質</div>
          </button>
        </div>
      </div>

      <div className="nav">
        <button className="bb" onClick={onBack}>← BACK</button>
        <button className="bn" disabled={!s.priority} onClick={onNext}>
          <span className="shine"/>診断を実行する →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  PAGE 4 — RESULTS
// ═══════════════════════════════════════════════════
function FPSChart({ diags, resId, presetId }) {
  if (diags.length < 2) return null;
  const maxFPS = Math.max(...diags.map(d => d.r.fps), 30);
  const H = 52;
  return (
    <div className="chart-wrap">
      <span className="chart-lbl">fps 比較チャート（選択タイトル）</span>
      <div className="chart" style={{ height: H + 24 }}>
        {diags.map(({ game, r }) => {
          const pct = Math.min(r.fps / maxFPS, 1);
          const gc  = GC[r.grade];
          return (
            <div key={game.id} className="bar-col">
              <div className="bar-val" style={{ color: gc }}>{r.fps}</div>
              <div className="bar-b" style={{ height: Math.max(pct * H, 2), background: `linear-gradient(to top, ${gc}44, ${gc})` }}/>
              <div className="bar-em">{game.emoji}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Page4({ s, onBack, onReset }) {
  const gpu    = GPUS.find(g => g.id === s.gpu);
  const cpu    = CPUS.find(c => c.id === s.cpu);
  const bn     = calcBN(gpu, cpu);
  const resObj = RESOLUTIONS.find(r => r.id === s.res) || RESOLUTIONS[2];
  const aspObj = ASPECTS.find(a => a.id === s.aspect)  || ASPECTS[0];
  const preObj = PRESETS.find(p => p.id === s.preset)  || PRESETS[1];

  const diags = s.games.map(id => {
    const game = ALL_GAMES.find(g => g.id === id);
    return { game, r: calcFPS({ gpu, cpu, memory: s.memory, game, resId: s.res, aspectId: s.aspect, presetId: s.preset, aiBoost: s.aiBoost }) };
  });

  const showUpg = bn.type !== "balanced";
  const gpuUpg  = bn.type === "gpu" ? getUpg(GPU_UPG, gpu.score) : null;
  const cpuUpg  = bn.type === "cpu" ? getUpg(CPU_UPG, cpu.score) : null;
  const aiLabel = gpu.dlss4 ? "DLSS 4" : gpu.fsr4 ? "FSR 4" : gpu.dlss ? "DLSS" : gpu.fsr ? "FSR" : null;

  return (
    <div className="page">
      <div className="pt">診断 <span className="hl">結果</span></div>
      <div className="ps">// PAGE 04 — FINAL ANALYSIS</div>

      {/* Summary */}
      <div className="card">
        <div className="ch">📋 構成サマリー</div>
        <div className="meta">
          GPU: <span style={{ color:"#a3ff12" }}>{gpu.name}</span> ({gpu.vram}GB VRAM, {gpu.score}pt) ／ CPU: <span style={{ color:"#00cfff" }}>{cpu.name}</span> ({cpu.score}pt) ／ RAM: {s.memory}GB<br/>
          解像度: <span style={{ color:"var(--gold)" }}>{resObj.label} ({resObj.desc})</span> ／ 比率: <span style={{ color:"var(--gold)" }}>{aspObj.label} {aspObj.sub}</span> ／ 画質: <span style={{ color:"var(--gold)" }}>{preObj.label}</span><br/>
          {aiLabel && <span>AI補完: <span style={{ color: s.aiBoost ? "#64c8ff" : "var(--mu)" }}>{s.aiBoost ? `${aiLabel} 有効` : `${aiLabel} 無効`}</span> ／ </span>}
          方針: {s.priority === "performance" ? "⚡ パフォーマンス重視" : "✨ 見た目重視"}
        </div>
        <FPSChart diags={diags} resId={s.res} presetId={s.preset}/>
      </div>

      {/* Bottleneck */}
      <div className={`bnw ${bn.type === "balanced" ? "bnbal" : bn.type === "cpu" ? "bncpu" : "bngpu"}`}>
        <div className="bnhd" style={{ color: bn.type === "balanced" ? "var(--g)" : bn.type === "cpu" ? "var(--red)" : "var(--ora)" }}>
          {bn.type === "balanced" ? "⚖️  ボトルネック診断：バランス良好"
           : bn.type === "cpu"    ? "⚠️  ボトルネック診断：CPU側"
           :                        "⚠️  ボトルネック診断：GPU側"}
        </div>
        <RadialGauge bal={bn.bal} gn={gpu.name} gs={gpu.score} cn={cpu.name} cs={cpu.score} type={bn.type}/>
        <div className={`bnmsg ${bn.type === "balanced" ? "bmbal" : bn.type === "cpu" ? "bmcpu" : "bmgpu"}`}>
          {bn.type === "balanced" && `> Balance = ${Math.round(bn.bal)}% ─ 良好（40〜60%）。GPU・CPU両方の性能をフル活用できています。`}
          {bn.type === "cpu"      && `> Balance = ${Math.round(bn.bal)}% (> 60%) ─ CPUボトルネック発生！GPUの性能を最大 ${bn.lost}% 引き出せていません。CPUのアップグレードを推奨します。`}
          {bn.type === "gpu"      && `> Balance = ${Math.round(bn.bal)}% (< 40%) ─ GPUボトルネック発生！CPU性能の最大 ${bn.lost}% が無駄になっています。GPUのアップグレードを推奨します。`}
        </div>
      </div>

      {/* Upgrade */}
      {showUpg && (
        <div className="upgw">
          <div className="upgh">🛒 アップグレード推奨パーツ</div>
          <div className="upgg">
            {gpuUpg && (
              <div className="upgi">
                <div className="upgt">GPU アップグレード先</div>
                <div className="upgn">{gpuUpg.name}</div>
                <div className="upgp">{gpuUpg.price}</div>
                <a className="amz" href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(gpuUpg.q)}`} target="_blank" rel="noopener noreferrer">🛒 Amazonで検索</a>
              </div>
            )}
            {cpuUpg && (
              <div className="upgi">
                <div className="upgt">CPU アップグレード先</div>
                <div className="upgn">{cpuUpg.name}</div>
                <div className="upgp">{cpuUpg.price}</div>
                <a className="amz" href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(cpuUpg.q)}`} target="_blank" rel="noopener noreferrer">🛒 Amazonで検索</a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SNS Share */}
      <ShareBar
        gpu={gpu?.name}
        cpu={cpu?.name}
        fps={diags[0]?.r?.fps}
        game={diags[0]?.game?.name}
      />

      {/* AdSense — 結果ページ上部 */}
      <AdBanner slot="1111111111" />

      {/* Per-game results */}
      <div className="card">
        <div className="ch">🎮 ゲーム別 fps 予測</div>
        {diags.map(({ game, r }, i) => {
          const gc  = GC[r.grade];
          const gg  = GG[r.grade];
          const tgt = game.comp ? game.fpsTarget : 60;
          const fpsR = Math.min((r.fps / tgt) * 100, 100);
          return (
            <div key={game.id} className="rcard" style={{ animationDelay:`${i * 0.065}s`, borderColor:`${gc}20` }}>
              <div className="rh">
                <div className="gr" style={{ color:gc, boxShadow:gg, borderColor:gc }}>{r.grade}</div>
                <div style={{ flex:1 }}>
                  <div className="rtitle" style={{ color:gc }}>{game.emoji} {game.name}</div>
                  <div className="rgame">{resObj.label} / {aspObj.label} / {preObj.icon} {preObj.label}{aspObj.fps43 ? " / 🏆競技4:3" : ""}</div>
                </div>
              </div>
              <div className="rbody">
                <div className="rdet">
                  推定 fps: <strong style={{ color:gc, fontFamily:"'Barlow Condensed',sans-serif", fontSize:15 }}>{r.fps}</strong>
                  　目標: {tgt}fps
                  　{r.fps >= tgt ? <span style={{ color:"var(--g)" }}>✓ 達成</span> : <span>目標比 {Math.round((r.fps / tgt) * 100)}%</span>}
                </div>
                <div className="fpsrow">
                  <div className="fpsl"><span>FPS達成率</span><span style={{ color:gc }}>{r.fps}fps / {tgt}fps</span></div>
                  <div className="fpstrk"><div className="fpsf" style={{ width:`${fpsR}%`, background:`linear-gradient(90deg,${gc}44,${gc})` }}/></div>
                </div>
                {r.vramWarn && (
                  <div className="vw">⚠️ VRAM不足: 必要 {r.vramReq}GB &gt; 搭載 {gpu.vram}GB ─ カクつきの可能性</div>
                )}
                {r.rtOn && <div className="rtbdg">🌟 レイトレーシング有効</div>}
                {game.rtx50_4k && gpu.gen === "RTX 50シリーズ" && s.res === "4k" && (
                  <div className="mhbdg">🐉 RTX 50 × 4K ─ 120fps+ 達成可能！</div>
                )}
                {r.tips.length > 0 && (
                  <div className="tips">{r.tips.map((t, ti) => <div key={ti} className="tip">&gt; {t}</div>)}</div>
                )}
              </div>
              <div className="rf">
                <div className="rst"><div className="rv" style={{ color:gc }}>{resObj.label}</div><div className="rk">解像度</div></div>
                <div className="rst"><div className="rv" style={{ color:gc }}>{r.fps}fps</div><div className="rk">フレーム</div></div>
                <div className="rst"><div className="rv" style={{ color:gc, fontSize:11 }}>{preObj.label.replace(" + レイトレ","")}</div><div className="rk">画質</div></div>
                <div className="rst"><div className="rv" style={{ color: r.vramWarn ? GC.C : gc }}>{gpu.vram}GB</div><div className="rk">VRAM</div></div>
                {aspObj.fps43 && <div className="rst"><div className="rv" style={{ color:"var(--gold)" }}>+20%</div><div className="rk">4:3競技</div></div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="nav">
        <button className="bb" onClick={onBack}>← 設定に戻る</button>
        <button className="bn" onClick={onReset}><span className="shine"/>↺ 最初からやり直す</button>
      </div>

      {/* AdSense — 結果ページ下部 */}
      <AdBanner slot="2222222222" style={{ marginTop: 8 }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════
const INIT_STATE = {
  gpu:"", cpu:"", memory:16,
  games:[], genre:"",
  priority:"performance",
  res:"1080p", aspect:"16_9", preset:"high",
  aiBoost:false
};

export default function App() {
  const [page, setPage] = useState(0);
  const [s, setS] = useState({ ...INIT_STATE });

  const set   = (k, v) => setS(p => ({ ...p, [k]: v }));
  const next  = ()     => { setPage(p => p + 1); window.scrollTo({ top:0 }); };
  const back  = ()     => { setPage(p => p - 1); window.scrollTo({ top:0 }); };
  const reset = ()     => { setS({ ...INIT_STATE }); setPage(0); window.scrollTo({ top:0 }); };

  const PAGES = [
    { label:"スペック確認",    sub:"HARDWARE" },
    { label:"ゲーム選択",      sub:"TITLES"   },
    { label:"画質設定",        sub:"QUALITY"  },
    { label:"診断結果",        sub:"RESULTS"  },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* ─ Top Bar ─ */}
        <nav className="tb">
          <div className="logo">GAME<em>OPT</em></div>
          <span className="vc">v6.0 · 2026 EDITION</span>
        </nav>

        {/* ─ Wizard Progress Bar ─ */}
        <div className="wiz">
          <div className="wt">
            {PAGES.map((pg, i) => (
              <React.Fragment key={i}>
                <div className={`wn ${page === i ? "act" : ""} ${page > i ? "done" : ""}`}>
                  <div className={`wc ${page === i ? "act" : ""} ${page > i ? "done" : ""}`}>
                    {page > i ? "✓" : i + 1}
                  </div>
                  <div className="wl">
                    {pg.label}<br/>
                    <span style={{ opacity:.45, fontSize:6 }}>{pg.sub}</span>
                  </div>
                </div>
                {i < PAGES.length - 1 && (
                  <div className={`wline ${page > i ? "done" : ""}`}/>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ─ Page Content ─ */}
        <div className="wrap">
          {page === 0 && <Page1 s={s} set={set} onNext={next}/>}
          {page === 1 && <Page2 s={s} set={set} onNext={next} onBack={back}/>}
          {page === 2 && <Page3 s={s} set={set} onNext={next} onBack={back}/>}
          {page === 3 && <Page4 s={s} onBack={back} onReset={reset}/>}
        </div>

        {/* ─ Footer ─ */}
        <footer style={{
          borderTop: "1px solid rgba(163,255,18,.1)",
          background: "rgba(11,12,14,.98)",
          padding: "24px 24px 32px"
        }}>
          {/* AdSense — フッターバナー（横長） */}
          <AdBanner slot="3333333333" format="horizontal" style={{ marginBottom: 20 }} />

          <div style={{
            maxWidth: 860, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12
          }}>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize: 15, fontWeight: 800, letterSpacing: 3, color: "var(--g)" }}>
                GAME<span style={{ color:"var(--txt)", fontWeight: 300 }}>OPT</span>
              </div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize: 9, color: "var(--mu)", marginTop: 4, letterSpacing: 1 }}>
                PCゲーム最適設定シミュレーター 2026 Edition
              </div>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize: 8, color: "var(--mu)", textAlign: "right", lineHeight: 1.9 }}>
              <div>※ fps予測は参考値です。実際の値とは異なる場合があります</div>
              <div>© 2026 GameOpt Simulator. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
