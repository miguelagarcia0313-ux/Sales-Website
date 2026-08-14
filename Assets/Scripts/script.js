/* ======================================================
   STORE CONFIGURATION
   Update these values to change the store name and
   phone number throughout the site.
====================================================== */
const STORE_CONFIG = {
  name: "Johnny's Shop",
  phone: "999 123 4567",       // Displayed in the UI
  phoneLink: "+529991234567"   // Used by the tel: link, including country code
};

/* ======================================================
   PRODUCTS
   Add new items using this simple format:
   { name: "Product name", price: 12.50, category: "Category", image: "image-url" }
====================================================== */
const PRODUCTS = [
  // Shirts
  {
    name: "Magellan Outdoors Men's Laguna Madre T-shirt",
    price: 35.99,
    category: "Shirts",
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
    colors: [
      { name: "Red", hex: "#D64545", image: "https://placehold.co/500x500/D64545/FFF7EA?text=V-Neck" },
      { name: "White", hex: "#FFFFFF", image: "https://placehold.co/500x500/FFFFFF/2B2118?text=V-Neck" },
      { name: "Navy", hex: "#1a3a52", image: "https://placehold.co/500x500/1a3a52/FFF7EA?text=V-Neck" }
    ]
  },
  // Shoes
  {
    name: "Running Sneakers",
    price: 89.99,
    category: "Shoes",
    colors: [
      { name: "Red", hex: "#D64545", image: "https://placehold.co/500x500/D64545/FFF7EA?text=Running+Shoes" },
      { name: "White", hex: "#FFFFFF", image: "https://placehold.co/500x500/FFFFFF/2B2118?text=Running+Shoes" },
      { name: "Black", hex: "#2B2118", image: "https://placehold.co/500x500/2B2118/FFF7EA?text=Running+Shoes" },
      { name: "Gray", hex: "#808080", image: "https://placehold.co/500x500/808080/FFF7EA?text=Running+Shoes" }
    ]
  },
  {
    name: "Casual Canvas Shoes",
    price: 64.99,
    category: "Shoes",
    colors: [
      { name: "Red", hex: "#D64545", image: "https://placehold.co/500x500/D64545/FFF7EA?text=Canvas+Shoes" },
      { name: "Teal", hex: "#2F8F7B", image: "https://placehold.co/500x500/2F8F7B/FFF7EA?text=Canvas+Shoes" },
      { name: "Navy", hex: "#1a3a52", image: "https://placehold.co/500x500/1a3a52/FFF7EA?text=Canvas+Shoes" }
    ]
  },
  // Accessories
  {
    name: "Adjustable Baseball Cap",
    price: 22.99,
    category: "Accessories",
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

// Apply the store configuration to the header and phone link
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

// Format a number as a price with two decimals
function formatPrice(price) {
  return price.toFixed(2);
}

// Create the category chips from the available products
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

// Update which chip appears active without rebuilding all chips
function updateActiveChip() {
  const chips = categoryChips.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.textContent === activeCategory);
  });
}

// Filter products by the active category and search text
function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  
  // Use the first color as default
  const defaultColor = product.colors[0];
  const hasMultipleColors = product.colors && product.colors.length > 1;

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
      <div class="price-tag">
        <span class="amount">$${formatPrice(product.price)}</span>
        <span class="currency">MXN</span>
      </div>
    </div>
  `;

  // Add color selection functionality
  if (hasMultipleColors) {
    const colorBubbles = card.querySelectorAll('.color-bubble');
    const productImage = card.querySelector('.product-image');
    
    colorBubbles.forEach(bubble => {
      bubble.addEventListener('click', () => {
        const colorIndex = parseInt(bubble.dataset.colorIndex);
        const selectedColor = product.colors[colorIndex];
        
        // Update image
        productImage.src = selectedColor.image;
        productImage.alt = `${product.name} in ${selectedColor.name}`;
        
        // Update active state
        colorBubbles.forEach(b => b.classList.remove('active'));
        bubble.classList.add('active');
      });
    });
  }

  return card;
}

// Render the product cards grouped by category
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

// Listen for input in the search box
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  renderProducts();
});

// Initial load
renderCategoryChips();
renderProducts();