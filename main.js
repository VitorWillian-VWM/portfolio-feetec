/* ===============================
       MENU MOBILE
    ================================ */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.textContent = navLinks.classList.contains("active") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


/* ===============================
    CURSOR PERSONALIZADO
================================ */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

// posição do mouse
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

// animação suave do follower
function animate() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    follower.style.left = posX + "px";
    follower.style.top = posY + "px";

    requestAnimationFrame(animate);
}

animate();

// efeito ao passar em botão/link
const hoverElements = document.querySelectorAll("a, button");

hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        follower.style.transform = "translate(-50%, -50%) scale(1.8)";
        follower.style.borderColor = "#f59e0b";
    });

    el.addEventListener("mouseleave", () => {
        follower.style.transform = "translate(-50%, -50%) scale(1)";
        follower.style.borderColor = "#38bdf8";
    });
});

/* ===============================
    ORÇAMENTO VIA WHATSAPP
================================ */
const openBudgetModal = document.getElementById("openBudgetModal");
const closeBudgetModal = document.getElementById("closeBudgetModal");
const budgetModal = document.getElementById("budgetModal");
const budgetForm = document.getElementById("budgetForm");
const socialLinksArea = document.getElementById("socialLinksArea");
const addSocialLink = document.getElementById("addSocialLink");

openBudgetModal.addEventListener("click", () => {
  budgetModal.classList.add("active");
});

closeBudgetModal.addEventListener("click", () => {
  budgetModal.classList.remove("active");
});

addSocialLink.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "url";
  input.className = "social-link";
  input.placeholder = "Outro link de rede social";
  socialLinksArea.appendChild(input);
});

budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("clientName").value;
  const service = document.getElementById("serviceType").value;
  const company = document.getElementById("companyName").value;
  const problem = document.getElementById("problemDescription").value;

  const socialLinks = Array.from(document.querySelectorAll(".social-link"))
    .map(input => input.value)
    .filter(link => link.trim() !== "")
    .join("\n");

  const message = `
Olá, tenho interesse em solicitar um orçamento.

Nome: ${name}
Tipo de desenvolvimento: ${service}
Empresa/loja: ${company}

Redes sociais:
${socialLinks || "Não informado"}

Problema que desejo resolver:
${problem}
  `;

  const whatsappUrl = `https://wa.me/554497491861?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
});