/* ============================================
   Dodge — simple canvas game
   ============================================ */

import { submitScore, getTopScores } from "./firebase.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// --- Game State ---
const state = {
  phase: "idle", // "idle" | "playing" | "over"
  player: { x: W / 2, y: H - 50, size: 28, speed: 5 },
  obstacles: [],
  score: 0,
  startTime: 0,
  spawnTimer: 0,
  spawnInterval: 60, // frames between spawns
  fallSpeed: 2.6,
  keys: { left: false, right: false },
  submitted: false,
  rafId: null,
};

function reset() {
  state.player.x = W / 2;
  state.obstacles = [];
  state.score = 0;
  state.spawnTimer = 0;
  state.spawnInterval = 60;
  state.fallSpeed = 2.6;
  state.startTime = performance.now();
  state.submitted = false;
  document.getElementById("submit-score").disabled = false;
  document.getElementById("submit-status").textContent = "";
  document.getElementById("player-name").value = "";
}

function start() {
  reset();
  state.phase = "playing";
  document.getElementById("game-start").hidden = true;
  document.getElementById("game-over").hidden = true;
  cancelAnimationFrame(state.rafId);
  state.rafId = requestAnimationFrame(loop);
}

function gameOver() {
  state.phase = "over";
  cancelAnimationFrame(state.rafId);
  document.getElementById("final-score").textContent = state.score;
  document.getElementById("game-over").hidden = false;
}

// --- Update / Draw ---
function update() {
  // Player movement
  const p = state.player;
  if (state.keys.left) p.x -= p.speed;
  if (state.keys.right) p.x += p.speed;
  p.x = Math.max(p.size / 2, Math.min(W - p.size / 2, p.x));

  // Spawn obstacles
  state.spawnTimer++;
  if (state.spawnTimer >= state.spawnInterval) {
    state.spawnTimer = 0;
    const size = 24 + Math.random() * 44;
    state.obstacles.push({
      x: Math.random() * (W - size),
      y: -size,
      w: size,
      h: size,
    });
  }

  // Move obstacles
  for (const ob of state.obstacles) ob.y += state.fallSpeed;
  state.obstacles = state.obstacles.filter((ob) => ob.y < H + 60);

  // Collision (AABB)
  const px = p.x - p.size / 2;
  const py = p.y - p.size / 2;
  const ps = p.size;
  for (const ob of state.obstacles) {
    if (
      px < ob.x + ob.w &&
      px + ps > ob.x &&
      py < ob.y + ob.h &&
      py + ps > ob.y
    ) {
      gameOver();
      return;
    }
  }

  // Score & difficulty
  state.score = Math.floor((performance.now() - state.startTime) / 100);
  state.spawnInterval = Math.max(18, 60 - state.score / 60);
  state.fallSpeed = 2.6 + state.score / 150;
}

function draw() {
  // Background with subtle grid
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Obstacles
  for (const ob of state.obstacles) {
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
    ctx.strokeStyle = "#fca5a5";
    ctx.lineWidth = 2;
    ctx.strokeRect(ob.x + 1, ob.y + 1, ob.w - 2, ob.h - 2);
  }

  // Player
  const p = state.player;
  ctx.fillStyle = "#60a5fa";
  ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  ctx.strokeStyle = "#bfdbfe";
  ctx.lineWidth = 2;
  ctx.strokeRect(p.x - p.size / 2 + 1, p.y - p.size / 2 + 1, p.size - 2, p.size - 2);

  // HUD
  document.getElementById("score").textContent = state.score;
}

function loop() {
  if (state.phase !== "playing") return;
  update();
  if (state.phase !== "playing") return; // update may have ended game
  draw();
  state.rafId = requestAnimationFrame(loop);
}

// --- Input: Keyboard ---
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    state.keys.left = true;
    e.preventDefault();
  }
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    state.keys.right = true;
    e.preventDefault();
  }
  if (e.key === " " && state.phase !== "playing") {
    e.preventDefault();
    start();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    state.keys.left = false;
  }
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    state.keys.right = false;
  }
});

// --- Input: Touch ---
function touchHandler(e) {
  if (state.phase !== "playing") return;
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  if (!touch) {
    state.keys.left = false;
    state.keys.right = false;
    return;
  }
  const relX = touch.clientX - rect.left;
  if (relX < rect.width / 2) {
    state.keys.left = true;
    state.keys.right = false;
  } else {
    state.keys.right = true;
    state.keys.left = false;
  }
}

canvas.addEventListener("touchstart", touchHandler, { passive: false });
canvas.addEventListener("touchmove", touchHandler, { passive: false });
canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  state.keys.left = false;
  state.keys.right = false;
}, { passive: false });

// --- Buttons ---
document.getElementById("start-btn").addEventListener("click", start);
document.getElementById("restart-btn").addEventListener("click", start);

document.getElementById("submit-score").addEventListener("click", async () => {
  if (state.submitted) return;
  const nameEl = document.getElementById("player-name");
  const statusEl = document.getElementById("submit-status");
  const btn = document.getElementById("submit-score");

  const name = (nameEl.value || "Anonymous").trim().slice(0, 10);
  btn.disabled = true;
  statusEl.textContent = "Submitting...";
  const ok = await submitScore(name, state.score);
  if (ok) {
    state.submitted = true;
    statusEl.textContent = "Submitted!";
    loadLeaderboard();
  } else {
    btn.disabled = false;
    statusEl.textContent = "Failed. Firestore 설정을 확인하세요.";
  }
});

// --- Leaderboard ---
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function loadLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  list.innerHTML = '<li class="leaderboard-empty">Loading...</li>';
  const scores = await getTopScores(10);
  if (scores.length === 0) {
    list.innerHTML = '<li class="leaderboard-empty">아직 점수가 없습니다. 첫 기록에 도전하세요!</li>';
    return;
  }
  list.innerHTML = scores
    .map(
      (s, i) =>
        `<li><span class="rank">#${i + 1}</span><span class="name">${escapeHtml(s.name)}</span><span class="score">${s.score}</span></li>`
    )
    .join("");
}

// --- Init ---
draw();
loadLeaderboard();
