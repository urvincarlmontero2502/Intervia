const availableProducts = [
  {
    id: 101,
    name: 'Fresh Native Ginger (Luya)',
    price: '₱120/kg',
    img: 'images/ginger2.jpg',
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
// --- RENDER MARKETPLACE (WITH ADD TO BASKET BUTTON) ---
function displayMarketplace() {
  const grid = document.getElementById('homeProductGrid')
  if (!grid) return

  grid.innerHTML = availableProducts
    .map((product) => {
      const displayPrice = product.price.startsWith('₱') ? product.price : `₱${product.price}`

      // Escape the product object to pass it safely as a string
      const productData = JSON.stringify(product).replace(/"/g, '&quot;')

      return `
        <div class="product-card">
            <div class="card-img-container">
                <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Fresh+Produce'">
                <div class="location-tag">
                    <i data-lucide="map-pin" style="width:10px; height:10px;"></i> ${product.location}
                </div>
            </div>
            <div class="card-name">${product.name}</div>
            <div class="card-seller">By ${product.seller} • <span class="cat-label">${product.cat}</span></div>
            <div class="card-price">${displayPrice}</div>

            <button class="btn-buy" onclick="openQtyModal(${productData})">
                <i data-lucide="shopping-basket"></i> Add to Basket
            </button>
        </div>
      `
    })
    .join('')

  if (window.lucide) lucide.createIcons()
}

// --- POST MODAL LOGIC ---
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

function handlePostHarvest(event) {
  event.preventDefault()
  const btn = document.getElementById('post-submit-btn')
  const originalText = btn.innerText

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

  setTimeout(() => {
    availableProducts.unshift(newProduct)
    displayMarketplace()
    closePostModal()
    document.getElementById('postHarvestForm').reset()
    btn.innerText = originalText
    btn.disabled = false
  }, 1200)
}

// --- NAVIGATION ---
function showMarketplace() {
  document.getElementById('myshopSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'
  document.getElementById('marketplaceSection').style.display = 'block'

  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  document.getElementById('nav-marketplace').classList.add('active')

  displayMarketplace()
}

function showMyShop() {
  document.getElementById('marketplaceSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'
  const shopSection = document.getElementById('myshopSection')
  if (shopSection) shopSection.style.display = 'block'

  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  const navBtn = document.getElementById('nav-myshop')
  if (navBtn) navBtn.classList.add('active')

  renderMyShop()
}

function renderMyShop() {
  const shopGrid = document.getElementById('myShopGrid')
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

function deleteProduct(id) {
  if (confirm('Are you sure you want to remove this listing?')) {
    const index = availableProducts.findIndex((p) => p.id === id)
    if (index > -1) {
      availableProducts.splice(index, 1)
      renderMyShop()
      displayMarketplace()
    }
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('sidebarOverlay')
  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')
  lucide.createIcons()
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  displayMarketplace()
  if (window.lucide) lucide.createIcons()
})

// --- NAVIGATION: SHOW ACCOUNT CENTER ---
function showAccountCenter() {
  // 1. Hide other sections
  const marketplace = document.getElementById('marketplaceSection')
  const myShop = document.getElementById('myshopSection')
  const account = document.getElementById('accountCenter')

  if (marketplace) marketplace.style.display = 'none'
  if (myShop) myShop.style.display = 'none'

  // 2. Show Account Center
  if (account) account.style.display = 'block'

  // 3. Update Sidebar Active State
  document.querySelectorAll('.menu-item').forEach((item) => {
    item.classList.remove('active')
  })

  // If your account link in the sidebar has id="nav-account"
  const accBtn = document.getElementById('nav-account')
  if (accBtn) accBtn.classList.add('active')

  // Refresh icons
  if (window.lucide) lucide.createIcons()

  // Scroll to top for a better user experience
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- LOGOUT LOGIC ---
function handleLogout(event) {
  if (event) event.preventDefault()
  if (confirm('Are you sure you want to logout?')) {
    localStorage.clear()
    window.location.href = 'index.html'
  }
}

let basket = [] // Ensure this is defined at the top of your script

function addToBasketDirectly(productId) {
  // Find the product in your data array
  const product = availableProducts.find((p) => p.id === productId)

  if (product) {
    // Check if it's already in the basket
    const existingItem = basket.find((item) => item.id === productId)

    if (existingItem) {
      existingItem.selectedQty += 1
    } else {
      // Add as new item with quantity 1
      basket.push({
        ...product,
        selectedQty: 1,
      })
    }

    // Update the Sidebar Cart UI
    updateCartUI()

    // Optional: Auto-open the sidebar cart so the user sees it was added
    toggleCart()
  }
}

let currentProduct = null
let cart = [] // Your cart array
let myOrders = []

function openQtyModal(product) {
  currentProduct = product

  // Fill modal with product details
  document.getElementById('qty-prod-name').innerText = product.name
  document.getElementById('qty-prod-price').innerText = product.price
  document.getElementById('qty-prod-img').src = product.img

  // Reset quantity input to 1
  document.getElementById('qty-input').value = 1

  // Show the modal
  document.getElementById('qtyModal').style.display = 'flex'
  if (window.lucide) lucide.createIcons()
}

function closeQtyModal() {
  document.getElementById('qtyModal').style.display = 'none'
}

function adjustQty(amount) {
  const input = document.getElementById('qty-input')
  let newVal = parseInt(input.value) + amount
  if (newVal < 1) newVal = 1
  input.value = newVal
}

// THIS PART WAS MOVED INSIDE A FUNCTION TO PREVENT ERRORS
function confirmAdd() {
  const qtyInput = document.getElementById('qty-input')
  if (!qtyInput) return

  const quantity = parseInt(qtyInput.value)

  if (currentProduct) {
    // We use 'cart' as your primary array
    const existingItem = cart.find((item) => item.id === currentProduct.id)

    if (existingItem) {
      existingItem.selectedQty += quantity
    } else {
      cart.push({
        ...currentProduct,
        selectedQty: quantity,
      })
    }

    // Check if the UI update function exists before calling it
    if (typeof updateCartUI === 'function') {
      updateCartUI()
    }

    closeQtyModal()
    currentProduct = null
  }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Render
  displayMarketplace()

  // Link the confirm button here safely
  const confirmBtn = document.getElementById('confirmAddBtn')
  if (confirmBtn) {
    confirmBtn.onclick = confirmAdd
  }

  // 3. Initialize Lucide icons
  if (window.lucide) lucide.createIcons()
})

// Handle the "Add" button inside the modal
document.getElementById('confirmAddBtn').onclick = () => {
  const quantity = parseInt(document.getElementById('qty-input').value)

  if (currentProduct) {
    const existingItem = cart.find((item) => item.id === currentProduct.id)

    if (existingItem) {
      existingItem.selectedQty += quantity
    } else {
      cart.push({
        ...currentProduct,
        selectedQty: quantity,
      })
    }

    updateCartUI() // Updates your basket drawer
    closeQtyModal()
    currentProduct = null
  }
}

// --- CART DRAWER CONTROLS ---

function toggleCart() {
  const drawer = document.getElementById('cartDrawer')
  const overlay = document.getElementById('sidebarOverlay')

  if (drawer) {
    drawer.classList.toggle('active')
    // Optional: show overlay if you want the background to dim
    if (overlay) overlay.classList.toggle('active')
  }
}

function updateCartUI() {
  const container = document.getElementById('cartItemsList')
  const countLabel = document.getElementById('cartCountLabel')
  const badge = document.getElementById('cart-badge')

  if (!container) return

  // 1. Update Badge and Header Count
  const totalItems = cart.reduce((sum, item) => sum + item.selectedQty, 0)
  if (countLabel) countLabel.innerText = `${totalItems} ITEMS`
  if (badge) badge.innerText = totalItems

  // 2. Handle Empty State
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-msg" style="text-align: center; padding: 40px 20px;">
        <i data-lucide="shopping-basket" style="width:48px; height:48px; margin-bottom: 10px; opacity: 0.3;"></i>
        <p style="color: #666;">Your basket is empty</p>
      </div>`
    if (window.lucide) lucide.createIcons()
    calculateTotals() // Reset totals to 0
    return
  }

  // 3. Render Cart Items
  container.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item" style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #eee;">
      <img src="${item.img}" class="cart-item-img" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/50'">
      <div class="cart-item-info" style="flex: 1;">
        <div class="cart-item-name" style="font-weight: 600; font-size: 0.9rem;">${item.name}</div>
        <div class="cart-item-meta" style="font-size: 0.8rem; color: #777;">By ${item.seller}</div>
        <div class="cart-item-qty-price" style="margin-top: 4px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; font-weight: 700;">${item.price}</span>
          <span style="font-size: 0.8rem; background: #f0f0f0; padding: 2px 8px; border-radius: 4px;">Qty: ${item.selectedQty}</span>
        </div>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; padding: 5px;">
        <i data-lucide="trash-2" style="width:16px;"></i>
      </button>
    </div>
  `,
    )
    .join('')

  if (window.lucide) lucide.createIcons()
  calculateTotals()
}

// --- CALCULATION LOGIC ---

function calculateTotals() {
  let subtotal = 0

  cart.forEach((item) => {
    // Extract numbers from price string (e.g., "₱120/kg" -> 120)
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    subtotal += priceNum * item.selectedQty
  })

  const deliveryFee = cart.length > 0 ? 25.0 : 0
  const total = subtotal + deliveryFee

  // Update DOM
  const subtotalEl = document.getElementById('cartSubtotal')
  const totalEl = document.getElementById('cartTotalAmount')

  if (subtotalEl)
    subtotalEl.innerText = `₱${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  if (totalEl)
    totalEl.innerText = `₱${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id)
  updateCartUI()
}

function processCheckout() {
  if (cart.length === 0) {
    alert('Your basket is empty!')
    return
  }

  if (confirm('Confirm your order from Jabonga farmers?')) {
    // Add current cart items to myOrders
    cart.forEach((item) => {
      myOrders.push({
        ...item,
        orderDate: new Date().toLocaleString(),
        orderId: Date.now() + Math.floor(Math.random() * 1000),
      })
    })

    alert("Order placed successfully! Check 'My Orders' for updates.")

    // Clear the cart
    cart = []
    updateCartUI()
    toggleCart()

    // Optionally, refresh My Orders section if visible
    if (document.getElementById('myOrdersSection').style.display === 'block') {
      renderMyOrders()
    }
  }
}
function showMyOrders() {
  // Hide other sections
  document.getElementById('marketplaceSection').style.display = 'none'
  document.getElementById('myshopSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'

  // Show My Orders section
  document.getElementById('myOrdersSection').style.display = 'block'

  // Update sidebar active state
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  document.getElementById('nav-myorders').classList.add('active')

  renderMyOrders()
}

function renderMyOrders() {
  const ordersGrid = document.getElementById('myOrdersGrid')
  if (!ordersGrid) return

  if (myOrders.length === 0) {
    ordersGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No orders yet.</p>`
    return
  }

  ordersGrid.innerHTML = myOrders
    .map(
      (order) => `
    <div class="product-card">
      <div class="card-img-container">
        <img src="${order.img}" class="product-img" onerror="this.src='https://via.placeholder.com/150'">
        <div class="category-tag">Processing</div>
      </div>
      <div class="card-content">
        <div class="card-name">${order.name}</div>
        <div class="card-seller">Qty: ${order.selectedQty}</div>
        <div class="card-price">₱${(parseFloat(order.price.replace(/[^0-9.]/g, '')) * order.selectedQty).toLocaleString()}</div>
      </div>
    </div>
  `,
    )
    .join('')

  if (window.lucide) lucide.createIcons()
}

function toggleMessagePopup(event) {
  // 1. Prevent click from reaching the 'document' listener below
  event.stopPropagation()

  const popup = document.getElementById('messageDropdown')
  const isOpening = popup.classList.toggle('show')

  // 2. Render content if opening
  if (isOpening) {
    const list = document.getElementById('messengerList')
    const chats = [
      { name: 'Farmer Ben', msg: 'The carrots are ready!', time: '1h', initial: 'B' },
      { name: 'Lola Eva', msg: 'Fresh ginger available.', time: '2h', initial: 'E' },
      { name: 'CSU SITeS Members', msg: 'Meeting scheduled.', time: '3h', initial: 'C' },
    ]

    list.innerHTML = chats
      .map(
        (chat) => `
      <div class="m-chat-item">
        <div class="m-avatar">${chat.initial}</div>
        <div class="m-info">
          <div class="m-name">${chat.name}</div>
          <div class="m-msg">${chat.msg} · ${chat.time}</div>
        </div>
      </div>
    `,
      )
      .join('')

    // Re-initialize Lucide icons if any were added
    if (window.lucide) lucide.createIcons()
  }
}

// 3. Close the popup if you click anywhere else on the page
document.addEventListener('click', (e) => {
  const popup = document.getElementById('messageDropdown')
  if (popup && !popup.contains(e.target)) {
    popup.classList.remove('show')
  }
})

function filterCategory(category, element) {
  // 1. Update UI: Remove 'active' class from all chips and add to the clicked one
  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.classList.remove('active')
  })
  element.classList.add('active')

  // 2. Filter the data
  let filteredProducts
  if (category === 'All') {
    filteredProducts = availableProducts
  } else {
    // This matches the 'cat' property in your availableProducts array
    filteredProducts = availableProducts.filter((product) => product.cat === category)
  }

  // 3. Re-render the grid with the filtered list
  renderFilteredMarketplace(filteredProducts)
}

function renderFilteredMarketplace(productsToDisplay) {
  const grid = document.getElementById('homeProductGrid')
  if (!grid) return

  if (productsToDisplay.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found in this category.</p>`
    return
  }

  grid.innerHTML = productsToDisplay
    .map((product) => {
      const displayPrice = product.price.startsWith('₱') ? product.price : `₱${product.price}`
      const productData = JSON.stringify(product).replace(/"/g, '&quot;')

      return `
      <div class="product-card">
          <div class="card-img-container">
              <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Fresh+Produce'">
              <div class="location-tag">
                  <i data-lucide="map-pin" style="width:10px; height:10px;"></i> ${product.location}
              </div>
          </div>
          <div class="card-name">${product.name}</div>
          <div class="card-seller">By ${product.seller} • <span class="cat-label">${product.cat}</span></div>
          <div class="card-price">${displayPrice}</div>
          <button class="btn-buy" onclick="openQtyModal(${productData})">
              <i data-lucide="shopping-basket"></i> Add to Basket
          </button>
      </div>
    `
    })
    .join('')

  if (window.lucide) lucide.createIcons()
}

function handleSearch() {
  const query = document.getElementById('mainSearch').value.toLowerCase()
  const filtered = availableProducts.filter(
    (p) => p.name.toLowerCase().includes(query) || p.seller.toLowerCase().includes(query),
  )
  renderFilteredMarketplace(filtered)
}
