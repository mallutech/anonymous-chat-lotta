const socket = io("http://localhost:3000"); // Update to your backend

document.getElementById("startBtn").onclick = () => {
  const gender = document.getElementById("gender").value;
  socket.emit("join", gender);
  document.getElementById("chatArea").classList.remove("hidden");
};

document.getElementById("sendBtn").onclick = () => {
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if (msg) {
    socket.emit("message", msg);
    appendMessage(`You: ${msg}`);
    input.value = "";
  }
};

socket.on("matched", () => appendMessage("✅ Connected to a stranger!"));
socket.on("message", msg => appendMessage(`Stranger: ${msg}`));
socket.on("partner-disconnected", () => appendMessage("❌ Stranger disconnected."));

function appendMessage(msg) {
  const box = document.getElementById("chatBox");
  box.innerHTML += `<div>${msg}</div>`;
  box.scrollTop = box.scrollHeight;
    }
