/* ======================================================
   STORE CONFIGURATION
   Update these values to change the store name and
   phone number throughout the site.
====================================================== */
const STORE_CONFIG = {
  name: "Lizzie's Mart",
  phone: "999 123 4567",       // Displayed in the UI
  phoneLink: "+529991234567"   // Used by the tel: link, including country code
};

/* ======================================================
   PRODUCTS
   Add new items using this simple format:
   { name: "Product name", price: 12.50, category: "Category", image: "image-url" }
====================================================== */
const PRODUCTS = [
//School Supplies
  {
    name: "Crayola 24 Crayones",
    image: "https://i5.walmartimages.com/seo/Crayola-Crayons-24-Count-Back-to-School-Supplies-Classroom-Supplies-Assorted-Classic-Colors-Gifts_7d903bb9-1913-4e85-ac7f-0519430d8e10.5bb5606f5158b0118d753c8fd09facbf.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
    price: 18.50,
    category: "Escuela"
  },
  {
    name: "Libreta Spiral",
    image: "https://i5.walmartimages.com/seo/Pen-Gear-Spiral-Notebook-Wide-Ruled-1-Subject-70-Pages-10-5-x-8-Red-57270_36275474-8a37-44e8-aad0-026544014632.17e7aec21d1469f705c0f3ae19a34fbf.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
    price: 45.00,
    category: "Escuela"
  },
  //Food and Beverage
  {
    name: "Agua embotellada",
    image: "https://placehold.co/500x500/2F8F7B/FFF7EA?text=Agua+600ml",
    price: 12.00,
    category: "Bebidas"
  },
  //Home
  {
    name: "Papel higiénico",
    image: "https://placehold.co/500x500/D64545/FFF7EA?text=Papel+Higienico",
    price: 28.00,
    category: "Hogar"
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

  card.innerHTML = `
    <div class="product-image-wrap">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-body">
      <div class="product-category">${product.category}</div>
      <p class="product-description">${product.name}</p>
      <div class="price-tag">
        <span class="amount">$${formatPrice(product.price)}</span>
        <span class="currency">MXN</span>
      </div>
    </div>
  `;

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