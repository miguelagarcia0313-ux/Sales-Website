/* ======================================================
   CONFIGURACIÓN DE LA TIENDA
   Actualiza estos valores para cambiar el nombre de la tienda
   y el número de teléfono en todo el sitio.
====================================================== */
const STORE_CONFIG = {
  name: "Johnny's Shop",
  phone: "832-484-9161",       // Se muestra en la interfaz
  phoneLink: "+18324849161"   // Usado por el enlace tel:, incluye código de país
};

/* ======================================================
   PRODUCTOS
   Añade nuevos elementos usando este formato simple:
   { name: "Nombre del producto", price: 12.50, category: "Categoría", image: "url-imagen" }
====================================================== */
const PRODUCTS = [
  // Camisetas
  {
    name: "Magellan Outdoors Men's Laguna Madre T-shirt",
    price: 35.99,
    category: "Shirts",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    availableSizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Red", hex: "#fcf8f8", image: "https://academy.scene7.com/is/image/academy/20379448?$pdp-gallery-ng$" },
      { name: "Blue", hex: "#2F8F7B", image: "https://academy.scene7.com/is/image/academy/20379446?$pdp-gallery-ng$" },
      { name: "Yellow", hex: "#F4B740", image: "https://academy.scene7.com/is/image/academy/21695713?$pdp-gallery-ng$" },
      { name: "Black", hex: "#2B2118", image: "https://academy.scene7.com/is/image/academy/21568629?$pdp-gallery-ng$" }
    ]
  },
  {
    name: "V-Neck T-Shirt",
    price: 24.99,
    category: "Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["M", "L"],
    colors: [
      { name: "Red", hex: "#D64545", image: "https://placehold.co/500x500/D64545/FFF7EA?text=V-Neck" },
      { name: "White", hex: "#FFFFFF", image: "https://placehold.co/500x500/FFFFFF/2B2118?text=V-Neck" },
      { name: "Navy", hex: "#1a3a52", image: "https://placehold.co/500x500/1a3a52/FFF7EA?text=V-Neck" }
    ]
  },
  // Zapatos
  {
    name: "Running Sneakers",
    price: 89.99,
    category: "Shoes",
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    availableSizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Red", hex: "#00ff0d", image: "https://www.shoepalace.com/cdn/shop/files/b5b673f3e6cdda91c2d4682061ae98af_2048x2048.jpg?v=1778514600&title=jordan-if4396-103-air-jordan-3-retro-sail-and-university-red-mens-lifestyle-shoes-sail-black-university-red-pale-ivory" },
      { name: "White", hex: "#FFFFFF", image: "https://placehold.co/500x500/FFFFFF/2B2118?text=Running+Shoes" },
      { name: "Black", hex: "#2B2118", image: "https://placehold.co/500x500/2B2118/FFF7EA?text=Running+Shoes" },
      { name: "Gray", hex: "#808080", image: "https://placehold.co/500x500/808080/FFF7EA?text=Running+Shoes" }
    ]
  },
  {
    name: "Casual Canvas Shoes",
    price: 64.99,
    category: "Shoes",
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    availableSizes: ["6", "8", "10"],
    colors: [
      { name: "Red", hex: "#D64545", image: "https://placehold.co/500x500/D64545/FFF7EA?text=Canvas+Shoes" },
      { name: "Teal", hex: "#2F8F7B", image: "https://placehold.co/500x500/2F8F7B/FFF7EA?text=Canvas+Shoes" },
      { name: "Navy", hex: "#1a3a52", image: "https://placehold.co/500x500/1a3a52/FFF7EA?text=Canvas+Shoes" }
    ]
  },
  // Accesorios
  {
    name: "Adjustable Baseball Cap",
    price: 22.99,
    category: "Accessories",
    sizes: ["One Size"],
    availableSizes: ["One Size"],
    colors: [
      { name: "Red", hex: "#D64545", image: "https://placehold.co/500x500/D64545/FFF7EA?text=Baseball+Cap" },
      { name: "Black", hex: "#2B2118", image: "https://placehold.co/500x500/2B2118/FFF7EA?text=Baseball+Cap" },
      { name: "Navy", hex: "#1a3a52", image: "https://placehold.co/500x500/1a3a52/FFF7EA?text=Baseball+Cap" }
    ]
  },
  {
    name: "Cotton Crew Socks Pack",
    price: 16.99,
    category: "Accessories",
    sizes: ["S", "M", "L"],
    availableSizes: ["S", "L"],
    colors: [
      { name: "Red", hex: "#D64545", image: "https://placehold.co/500x500/D64545/FFF7EA?text=Socks+3-Pack" },
      { name: "Black", hex: "#2B2118", image: "https://placehold.co/500x500/2B2118/FFF7EA?text=Socks+3-Pack" },
      { name: "Gray", hex: "#808080", image: "https://placehold.co/500x500/808080/FFF7EA?text=Socks+3-Pack" },
      { name: "White", hex: "#FFFFFF", image: "https://placehold.co/500x500/FFFFFF/2B2118?text=Socks+3-Pack" }
    ]
  }
];

/* ======================================================
   NO ES NECESARIO EDITAR NADA DEBAJO DE ESTA LÍNEA
====================================================== */

// Aplicar la configuración de la tienda al encabezado y enlace telefónico
document.title = STORE_CONFIG.name;
document.getElementById('store-name').textContent = STORE_CONFIG.name;
document.getElementById('phone-number').textContent = STORE_CONFIG.phone;
document.getElementById('phone-link').href = `tel:${STORE_CONFIG.phoneLink}`;

const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categoryChips = document.getElementById('category-chips');
const emptyMessage = document.getElementById('empty-message');

let activeCategory = 'Todos';
let searchTerm = '';
let cart = []; // Array del carrito para almacenar artículos

  // Dar formato a un número como precio con dos decimales
function formatPrice(price) {
  return price.toFixed(2);
}

// Crear las fichas de categoría a partir de los productos disponibles
function renderCategoryChips() {
  const categories = ['Todos', ...new Set(PRODUCTS.map(p => p.category))];

  categoryChips.innerHTML = '';

  categories.forEach(category => {
    const chip = document.createElement('button');
    chip.classList.add('chip');
    chip.textContent = category;
    if (category === activeCategory) chip.classList.add('active');

    chip.addEventListener('click', () => {
      activeCategory = category;
      renderProducts();
      updateActiveChip();
    });

    categoryChips.appendChild(chip);
  });
}

// Actualizar qué ficha aparece activa sin reconstruir todas las fichas
function updateActiveChip() {
  const chips = categoryChips.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.textContent === activeCategory);
  });
}

// Filtrar productos por la categoría activa y texto de búsqueda
function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function createProductCard(product, productIndex) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  
  // Usar el primer color como predeterminado
  const defaultColor = product.colors[0];
  const hasMultipleColors = product.colors && product.colors.length > 1;
  const hasSizes = product.sizes && product.sizes.length > 0;
  let selectedColorIndex = 0;
  let selectedSize = product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : null;

  card.innerHTML = `
    <div class="product-image-wrap">
      <img src="${defaultColor.image}" alt="${product.name} in ${defaultColor.name}" class="product-image">
    </div>
    ${hasMultipleColors ? `
      <div class="color-selector">
        ${product.colors.map((color, index) => `
          <button class="color-bubble ${index === 0 ? 'active' : ''}" 
                  style="background-color: ${color.hex}" 
                  title="${color.name}"
                  data-color-index="${index}"
                  aria-label="${color.name}">
          </button>
        `).join('')}
      </div>
    ` : ''}
    <div class="product-body">
      <div class="product-category">${product.category}</div>
      <p class="product-description">${product.name}</p>
      ${hasSizes ? `
        <div class="size-selector">
          <label class="size-label">Talla:</label>
          <div class="size-options">
            ${product.sizes.map(size => `
              <button class="size-button ${product.availableSizes.includes(size) ? 'available' : 'unavailable'} ${selectedSize === size ? 'selected' : ''}"
                      data-size="${size}"
                      ${product.availableSizes.includes(size) ? '' : 'disabled'}
                      aria-label="Talla ${size}">
                ${size}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <div class="price-tag">
        <span class="amount">$${formatPrice(product.price)}</span>
        <span class="currency">MXN</span>
      </div>
      <button class="add-to-cart-btn">Agregar al carrito</button>
    </div>
  `;

  // Agregar funcionalidad de selección de color
  if (hasMultipleColors) {
    const colorBubbles = card.querySelectorAll('.color-bubble');
    const productImage = card.querySelector('.product-image');
    
    colorBubbles.forEach(bubble => {
      bubble.addEventListener('click', () => {
        selectedColorIndex = parseInt(bubble.dataset.colorIndex);
        const selectedColor = product.colors[selectedColorIndex];
        
        // Actualizar imagen
        productImage.src = selectedColor.image;
        productImage.alt = `${product.name} in ${selectedColor.name}`;
        
        // Actualizar estado activo
        colorBubbles.forEach(b => b.classList.remove('active'));
        bubble.classList.add('active');
      });
    });
  }

  // Agregar funcionalidad de selección de talla
  if (hasSizes) {
    const sizeButtons = card.querySelectorAll('.size-button');
    sizeButtons.forEach(button => {
      button.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('selected'));
        button.classList.add('selected');
        selectedSize = button.dataset.size;
      });
    });
  }

  // Botón Agregar al carrito
  const addToCartBtn = card.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    if (hasSizes && !selectedSize) {
      alert('Por favor, selecciona una talla');
      return;
    }
    const selectedColor = product.colors[selectedColorIndex];
    addToCart(product, selectedColor, selectedSize);
  });

  return card;
}

// Renderizar las tarjetas de productos agrupadas por categoría
function renderProducts() {
  const filtered = getFilteredProducts();

  productGrid.innerHTML = '';
  emptyMessage.hidden = filtered.length > 0;

  if (filtered.length === 0) {
    return;
  }

  const groupedProducts = filtered.reduce((groups, product) => {
    if (!groups[product.category]) {
      groups[product.category] = [];
    }
    groups[product.category].push(product);
    return groups;
  }, {});

  const categoriesToRender = activeCategory === 'Todos'
    ? Object.keys(groupedProducts)
    : [activeCategory];

  categoriesToRender.forEach(category => {
    const section = document.createElement('section');
    section.className = 'category-section';

    const header = document.createElement('div');
    header.className = 'category-header';

    const title = document.createElement('h2');
    title.className = 'category-title';
    title.textContent = category;

    const count = document.createElement('span');
    count.className = 'category-count';
    count.textContent = `${groupedProducts[category].length} ${groupedProducts[category].length === 1 ? 'Producto' : 'Productos'}`;

    header.appendChild(title);
    header.appendChild(count);

    const productsWrap = document.createElement('div');
    productsWrap.className = 'section-products';

    groupedProducts[category].forEach(product => {
      productsWrap.appendChild(createProductCard(product));
    });

    section.appendChild(header);
    section.appendChild(productsWrap);
    productGrid.appendChild(section);
  });
}

// ===== FUNCIONES DEL CARRITO =====
function addToCart(product, color, size = null) {
  const cartItem = {
    name: product.name,
    color: color.name,
    size: size,
    price: product.price,
    quantity: 1
  };
  
  // Verificar si el artículo ya existe en el carrito
  const existingItem = cart.find(item => 
    item.name === product.name && 
    item.color === color.name && 
    item.size === size
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(cartItem);
  }
  
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  
  cartCount.textContent = cart.length;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    return;
  }
  
  let total = 0;
  cartItems.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-color">Color: ${item.color}</div>
          ${item.size ? `<div class="cart-item-size">Talla: ${item.size}</div>` : ''}
          <div class="cart-item-price">$${formatPrice(item.price)} x ${item.quantity} = $${formatPrice(itemTotal)}</div>
        </div>
        <button class="remove-item-btn" data-index="${index}">Eliminar</button>
      </div>
    `;
  }).join('');
  
  cartItems.innerHTML += `
    <div class="cart-total">
      <strong>Total: $${formatPrice(total)}</strong>
    </div>
    <button id="send-whatsapp-btn" class="send-whatsapp-btn">Enviar por WhatsApp</button>
  `;
  
  // Agregar oyentes de botón de eliminación
  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      removeFromCart(parseInt(e.target.dataset.index));
    });
  });
  
  // Agregar oyente del botón WhatsApp
  document.getElementById('send-whatsapp-btn').addEventListener('click', sendCartToWhatsApp);
}

function sendCartToWhatsApp() {
  if (cart.length === 0) {
    alert('¡Tu carrito está vacío!');
    return;
  }
  
  let message = `🛍️ *Pedido de Johnny's Shop*\n\n`;
  let total = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${index + 1}. ${item.name}\n   Color: ${item.color}\n`;
    if (item.size) {
      message += `   Talla: ${item.size}\n`;
    }
    message += `   $${formatPrice(item.price)} x ${item.quantity} = $${formatPrice(itemTotal)}\n\n`;
  });
  
  message += `💰 *Total: $${formatPrice(total)}*\n\n`;
  message += `Por favor, confirma este pedido. ¡Gracias! 😊`;
  
  const whatsappLink = `https://wa.me/${STORE_CONFIG.phoneLink}?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
}

// Escuchar entrada en el cuadro de búsqueda
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  renderProducts();
});

// Funcionalidad del modal del carrito
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
  cartModal.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('open');
});

// Cerrar modal al hacer clic fuera
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('open');
  }
});

// Carga inicial
renderCategoryChips();
renderProducts();