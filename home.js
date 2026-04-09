const availableProducts = [
  {
    id: 101,
    name: 'Fresh Native Ginger (Luya)',
    price: '₱120/kg',
    img: 'images/ginger2.jpg', // Ensure this path is correct or use a URL
    seller: 'Juan2026',
    location: 'Jabonga',
    cat: 'Spice',
  },
  {
    id: 102,
    name: 'Okra',
    price: '₱40/pack',
    img: 'images/okra.jpg',
    seller: 'Juan2026',
    location: 'Jabonga',
    cat: 'Vegetable',
  },
  {
    id: 103,
    name: 'Red Onions (sibuyas)',
    price: '₱180/kg',
    img: 'images/sibuyas.jpg',
    seller: 'Juan2026',
    location: 'Jabonga',
    cat: 'Vegetable',
  },
  {
    id: 1,
    name: 'Sweet Potato (Kamote)',
    price: '₱80/kg',
    img: 'images/sweet_potato.jpg',
    seller: 'Mang Jun',
    location: 'Jabonga',
    cat: 'Fruit',
  },
  {
    id: 2,
    name: 'Banana (Saba)',
    price: '₱45/bundle',
    img: 'images/saba.webp',
    seller: 'Aling Nena',
    location: 'Kitcharao',
    cat: 'Fruit',
  },
  {
    id: 3,
    name: 'Carabao Mango',
    price: '₱140/kg',
    img: 'images/Mango.jpg',
    seller: 'Tatay Mario',
    location: 'Butuan City',
    cat: 'Fruit',
  },
  {
    id: 4,
    name: 'Carrots',
    price: '₱75/kg',
    img: 'images/carrot.jpg',
    seller: 'Farmer Ben',
    location: 'Santiago',
    cat: 'Vegetable',
  },
  {
    id: 5,
    name: 'Siling Labuyo',
    price: '₱150/kg',
    img: 'images/laboyo.jpg',
    seller: 'Lola Eva',
    location: 'Jabonga',
    cat: 'Spice',
  },

  {
    id: 6,
    name: 'Fresh Calamansi',
    price: '₱60/kg',
    img: 'images/calamansi.webp',
    seller: 'Kuya Jomar',
    location: 'Magallanes',
    cat: 'Fruit',
  },
]

// --- RENDER MARKETPLACE ---
function displayMarketplace() {
  const grid = document.getElementById('homeProductGrid')
  if (!grid) return

  grid.innerHTML = availableProducts
    .map((product) => {
      const displayPrice = product.price.startsWith('₱') ? product.price : `₱${product.price}`
      return `
        <div class="product-card">
            <div class="card-img-container">
                <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Fresh+Produce'">
                <div class="location-tag">
                    <i data-lucide="map-pin" style="width:10px; height:10px;"></i> ${product.location}
                </div>
            </div>
            <div class="card-name">${product.name}</div>
            <div class="card-seller">
                By ${product.seller} • <span class="cat-label">${product.cat}</span>
            </div>
            <div class="card-price">${displayPrice}</div>
            <button class="btn-buy" onclick="addToBasket(${product.id})">
                Add to Basket
            </button>
        </div>
      `
    })
    .join('')

  if (window.lucide) lucide.createIcons()
}

// --- MODAL LOGIC ---
function openPostModal() {
  const modal = document.getElementById('postModal')
  if (modal) {
    modal.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }
}

function closePostModal() {
  const modal = document.getElementById('postModal')
  if (modal) {
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

// --- HANDLE NEW POST ---
function handlePostHarvest(event) {
  event.preventDefault()

  const btn = document.getElementById('post-submit-btn')
  const originalText = btn.innerText

  // Show "Authenticating" style loading state
  btn.style.display = 'flex'
  btn.style.alignItems = 'center'
  btn.style.justifyContent = 'center'
  btn.innerText = 'Listing Harvest...'
  btn.disabled = true

  const newProduct = {
    id: Date.now(),
    name: document.getElementById('post-name').value,
    price: document.getElementById('post-price').value,
    img:
      document.getElementById('post-img').value ||
      'https://via.placeholder.com/400x300?text=Fresh+Harvest',
    seller: 'Juan2026',
    location: 'Jabonga',
    cat: document.getElementById('post-cat').value,
  }

  // Simulate network delay
  setTimeout(() => {
    availableProducts.unshift(newProduct) // Add to top of list
    displayMarketplace() // Refresh the grid
    closePostModal()

    // Reset form and button
    document.getElementById('postHarvestForm').reset()
    btn.innerText = originalText
    btn.disabled = false
  }, 1200)
}

// --- NAVIGATION & ACCOUNT ---
function showAccountCenter() {
  // 1. Hide everything else
  document.getElementById('marketplaceSection').style.display = 'none'
  document.getElementById('myshopSection').style.display = 'none'

  // 2. Show Account Center
  document.getElementById('accountCenter').style.display = 'block'

  // 3. Update Sidebar UI (Remove active from other menu items)
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))

  if (window.lucide) lucide.createIcons()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Example check for your showMarketplace function in home.js
function showMarketplace() {
  // 1. Hide everything else
  document.getElementById('myshopSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'

  // 2. Show Marketplace
  document.getElementById('marketplaceSection').style.display = 'block'

  // 3. Update Sidebar UI
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  document.getElementById('nav-marketplace').classList.add('active')

  displayMarketplace()
}

function handleLogout(event) {
  event.preventDefault()
  localStorage.clear()
  window.location.href = 'index.html'
}

function addToBasket(id) {
  const product = availableProducts.find((p) => p.id === id)
  alert(`${product.name} added to your basket!`)
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  displayMarketplace()
})

// Function to show My Shop
function showMyShop() {
  // 1. Hide everything else
  document.getElementById('marketplaceSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'

  // 2. Show My Shop
  const shopSection = document.getElementById('myshopSection')
  if (shopSection) shopSection.style.display = 'block'

  // 3. Update Sidebar UI
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  const navBtn = document.getElementById('nav-myshop')
  if (navBtn) navBtn.classList.add('active')

  renderMyShop()
}
// Function to render only Juan's products
function renderMyShop() {
  const shopGrid = document.getElementById('myShopGrid')
  // This line filters the array for ONLY your products
  const myProducts = availableProducts.filter((p) => p.seller === 'Juan2026')

  if (myProducts.length === 0) {
    shopGrid.innerHTML = `<p>You haven't posted any harvests yet.</p>`
    return
  }

  shopGrid.innerHTML = myProducts
    .map(
      (product) => `
    <div class="product-card">
      <div class="card-img-container">
        <img src="${product.img}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Harvest'">
        <div class="status-tag">Active</div>
      </div>
      <div class="card-name">${product.name}</div>
      <div class="card-price">${product.price}</div>
      <div class="shop-actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-delete" onclick="deleteProduct(${product.id})">Remove</button>
      </div>
    </div>
  `,
    )
    .join('')
}

// Delete functionality
function deleteProduct(id) {
  if (confirm('Are you sure you want to remove this listing from your shop?')) {
    const index = availableProducts.findIndex((p) => p.id === id)
    if (index > -1) {
      availableProducts.splice(index, 1) // Remove from data array

      // Refresh both views
      renderMyShop()
      displayMarketplace()

      // Alert user
      console.log('Product removed successfully.')
    }
  }
}

// --- BASKET LOGIC ---
let basket = []

function toggleCart() {
  const drawer = document.getElementById('cartDrawer')
  const overlay = document.getElementById('cartOverlay')

  if (drawer.classList.contains('open')) {
    drawer.classList.remove('open')
    setTimeout(() => {
      overlay.style.display = 'none'
    }, 400)
  } else {
    overlay.style.display = 'block'
    setTimeout(() => {
      drawer.classList.add('open')
    }, 10)
  }
}

function updateCartUI() {
  const list = document.getElementById('cartItemsList')
  const totalDisplay = document.getElementById('cartTotalAmount')
  const subtotalDisplay = document.getElementById('cartSubtotal')
  const countLabel = document.getElementById('cartCountLabel')

  // Update Item Count Label
  if (countLabel) {
    countLabel.innerText = `${basket.length} ${basket.length === 1 ? 'ITEM' : 'ITEMS'}`
  }

  if (basket.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:60px 0; color:#94a3b8; font-size:14px;">Your basket is empty</div>`
    if (subtotalDisplay) subtotalDisplay.innerText = '₱0.00'
    totalDisplay.innerText = '₱0.00'
    return
  }

  // Render Clean Items
  list.innerHTML = basket
    .map(
      (item, index) => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="item-info">
        <h5>${item.name}</h5>
        <p>${item.price}</p>
      </div>
      <button class="btn-remove-flat" onclick="removeFromBasket(${index})">
        <i data-lucide="trash-2" style="width:18px;"></i>
      </button>
    </div>
  `,
    )
    .join('')

  // Math logic
  const total = basket.reduce(
    (sum, item) => sum + (parseInt(item.price.replace(/[^0-9]/g, '')) || 0),
    0,
  )
  const formattedPrice = `₱${total.toLocaleString()}.00`

  if (subtotalDisplay) subtotalDisplay.innerText = formattedPrice
  totalDisplay.innerText = formattedPrice

  if (window.lucide) lucide.createIcons()
}

function processCheckout() {
  if (basket.length === 0) return

  const btn = document.querySelector('.btn-checkout')
  btn.innerText = 'Processing...'
  btn.disabled = true

  setTimeout(() => {
    alert('Order Successful! We have notified the farmers in Jabonga.')
    basket = []
    updateCartUI()
    toggleCart()
    btn.innerText = 'Secure Checkout'
    btn.disabled = false
  }, 1500)
}

function addToBasket(id) {
  const product = availableProducts.find((p) => p.id === id)
  if (product) {
    basket.push(product)
    updateCartUI()
    // Optional: toggleCart(); // Uncomment if you want it to pop open immediately
  }
}

function removeFromBasket(index) {
  basket.splice(index, 1)
  updateCartUI()
}

function addToBasket(id) {
  const product = availableProducts.find((p) => p.id === id)
  if (product) {
    basket.push(product)
    updateCartUI()
    toggleCart() // Automatically show the cart when an item is added
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('sidebarOverlay')

  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')

  // re-render icons inside sidebar (including X)
  lucide.createIcons()
}

document.getElementById('sidebarOverlay').addEventListener('click', toggleSidebar)

// Re-run icons to make sure the menu icon appears
if (window.lucide) {
  lucide.createIcons()
}

// CRITICAL: This ensures the menu icon actually appears
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons()
  }
})

// Close menu automatically when clicking a link (optional)
document.querySelectorAll('.menu-item').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) toggleSidebar()
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('sidebarOverlay')

  if (overlay) {
    overlay.addEventListener('click', toggleSidebar)
  }
})

lucide.createIcons()

function previewImage(event) {
  const file = event.target.files[0]
  const preview = document.getElementById('post-img-preview')

  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      preview.src = e.target.result
      preview.style.display = 'block'
    }
    reader.readAsDataURL(file)
  }
}
