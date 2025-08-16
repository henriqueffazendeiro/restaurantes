// ========================================
// Menu Component - Vanilla JavaScript Implementation
// Based on React component provided by user
// ========================================

const CATEGORIES = [
  { id: "entradas", label: "Entradas" },
  { id: "peixe", label: "Peixe" },
  { id: "carne", label: "Carne" },
  { id: "vegetariano", label: "Vegetariano" },
  { id: "sobremesas", label: "Sobremesas" },
  { id: "vinhos", label: "Vinhos" },
];

const DISHES = [
  {
    id: "ravioli",
    name: "Ravioli de Abóbora",
    price: 21,
    category: "vegetariano",
    desc: "Massa fresca, abóbora assada, noz, queijo de cabra caramelizado, molho cítrico",
    spicy: 0,
    veggie: true,
    chef: true,
    img: "https://images.unsplash.com/photo-1604908176997-431652b36ba3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "robalo",
    name: "Arroz de Robalo",
    price: 28,
    category: "peixe",
    desc: "Robalo, arroz carolino, coentros, algas e salicórnia",
    spicy: 0,
    veggie: false,
    chef: false,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "polvo",
    name: "Polvo à Casa",
    price: 22,
    category: "peixe",
    desc: "Patanisca de polvo, arroz de tomate, maionese de tinta de choco",
    spicy: 0,
    veggie: false,
    chef: false,
    img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721ade?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "atum",
    name: "Lombo de Atum",
    price: 22,
    category: "peixe",
    desc: "Atum braseado, legumes salteados, molho verde, crocante de limão",
    spicy: 0,
    veggie: false,
    chef: true,
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "peixegalo",
    name: "Peixe Galo",
    price: 23.5,
    category: "peixe",
    desc: "Filete frito, salada russa, molho de manteiga e alcaparras",
    spicy: 0,
    veggie: false,
    chef: false,
    img: "https://images.unsplash.com/photo-1604908554049-21e3fd1ca16b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "wellington",
    name: '"Wellington" de Leitão',
    price: 24,
    category: "carne",
    desc: "Massa quebrada, leitão, duxelles, salada de espinafre baby, tomate cereja",
    spicy: 0,
    veggie: false,
    chef: false,
    img: "https://images.unsplash.com/photo-1606756790138-26105d93b44d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "entrecote",
    name: "Entrecôte (250g)",
    price: 27,
    category: "carne",
    desc: "Novilho, batata frita e molho marrare",
    spicy: 0,
    veggie: false,
    chef: false,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "mousse",
    name: "Mousse de Chocolate",
    price: 6,
    category: "sobremesas",
    desc: "Chocolate 70%, flor de sal e azeite",
    spicy: 0,
    veggie: true,
    chef: false,
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "vinho",
    name: "Vinho Branco da Casa",
    price: 14,
    category: "vinhos",
    desc: "Aromas cítricos e boa acidez",
    spicy: 0,
    veggie: true,
    chef: false,
    img: "https://images.unsplash.com/photo-1514361892635-6b07e31e75d4?q=80&w=1200&auto=format&fit=crop",
  },
];

// Utility functions
function formatPrice(price) {
  return price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function createTag(text) {
  return `<span class="dish-tag">${text}</span>`;
}

function createDishCard(dish, isModal = false) {
  const categoryLabel = CATEGORIES.find((c) => c.id === dish.category)?.label || "";
  const tags = [];
  
  if (dish.veggie) tags.push(createTag("🌱 Veggie"));
  if (dish.spicy > 0) tags.push(createTag("🌶️ " + "🌶️".repeat(dish.spicy)));
  tags.push(createTag(categoryLabel));

  if (isModal) {
    return `
      <div class="modal-dish-card">
        <img src="${dish.img}" alt="${dish.name}" class="modal-dish-image" loading="lazy">
        <div class="modal-dish-content">
          <div class="modal-dish-header">
            <h4 class="modal-dish-name">${dish.name}</h4>
            <span class="modal-dish-price">${formatPrice(dish.price)}</span>
          </div>
          <p class="modal-dish-desc">${dish.desc}</p>
          <div class="modal-dish-tags">${tags.join("")}</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="dish-card">
      <div class="dish-image-container">
        <img src="${dish.img}" alt="${dish.name}" class="dish-image" loading="lazy">
        ${dish.chef ? '<div class="chef-special">⭐ Chef\'s Special</div>' : ''}
      </div>
      <div class="dish-content">
        <div class="dish-header">
          <h3 class="dish-name">${dish.name}</h3>
          <span class="dish-price">${formatPrice(dish.price)}</span>
        </div>
        <p class="dish-desc">${dish.desc}</p>
        <div class="dish-tags">${tags.join("")}</div>
      </div>
    </div>
  `;
}

function renderHighlights() {
  const highlightsContainer = document.getElementById("menu-highlights");
  if (!highlightsContainer) return;

  const highlights = DISHES.slice(0, 6);
  highlightsContainer.innerHTML = highlights.map(dish => createDishCard(dish)).join("");
}

function renderModalDishes(filteredDishes = DISHES) {
  const modalDishesContainer = document.getElementById("menu-modal-dishes");
  if (!modalDishesContainer) return;

  modalDishesContainer.innerHTML = filteredDishes.map(dish => createDishCard(dish, true)).join("");
}

function filterDishes(searchTerm) {
  return DISHES.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function initializeMenuComponent() {
  // Render initial highlights
  renderHighlights();
  
  // Get modal elements
  const modal = document.getElementById("menu-modal-overlay");
  const openModalBtns = document.querySelectorAll("#open-menu-modal, #open-menu-modal-2");
  const closeModalBtn = document.getElementById("menu-modal-close");
  const searchInput = document.getElementById("menu-search");

  // Open modal functionality
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      renderModalDishes();
    });
  });

  // Close modal functionality
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeModalBtn.addEventListener("click", closeModal);

  // Close modal when clicking backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    const filteredDishes = filterDishes(searchTerm);
    renderModalDishes(filteredDishes);
  });
}

// Initialize when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMenuComponent);
} else {
  initializeMenuComponent();
}

// Self-tests (simple validation)
(function runSelfTests() {
  try {
    console.assert(Array.isArray(DISHES), "DISHES deve ser um array");
    console.assert(DISHES.length >= 6, "Devem existir pelo menos 6 pratos");
    const six = DISHES.slice(0, 6);
    console.assert(six.length === 6, "A grelha deve mostrar 6 pratos");
    six.forEach((d) => {
      console.assert(typeof d.id === "string" && d.id, "Prato sem id válido");
      console.assert(typeof d.name === "string" && d.name, "Prato sem name válido");
      console.assert(typeof d.price === "number", "Preço deve ser number");
      console.assert(typeof d.img === "string" && d.img, "Prato sem imagem válida");
    });
    console.log("Menu component self-tests passed ✅");
  } catch (e) {
    console.warn("Self-tests falharam:", e);
  }
})();