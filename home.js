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
      const productData = JSON.stringify(product).replace(/"/g, '&quot;')
      const escapedName = product.name.replace(/'/g, "\\'") // ADD THIS

      return `
        <div class="product-card">
            <div class="card-img-container"
                 onclick="inspectImage('${product.img}', '${escapedName}')"
                 style="cursor: zoom-in;">   <!-- ADD THIS -->
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
// 3. UPDATED NAVIGATION (To prevent "My Orders" or "Lightbox" appearing everywhere)
function showMarketplace() {
  // Hide every other major section
  document.getElementById('myOrdersSection').style.display = 'none'
  document.getElementById('myshopSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'
  document.getElementById('marketValuesSection').style.display = 'none' // Added Fix

  // Also ensure the lightbox is closed when switching tabs
  closeLightbox()

  document.getElementById('marketplaceSection').style.display = 'block'

  // Sidebar active state
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  document.getElementById('nav-marketplace').classList.add('active')

  renderProducts()
}

function updateSidebarActive(activeId) {
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  const activeItem = document.getElementById(activeId)
  if (activeItem) activeItem.classList.add('active')

  // Auto-close sidebar on mobile after clicking
  if (window.innerWidth < 768) toggleSidebar()
}

function showMyShop() {
  // Hide everything else
  document.getElementById('marketplaceSection').style.display = 'none'
  document.getElementById('myOrdersSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'
  document.getElementById('marketValuesSection').style.display = 'none' // Added Fix

  const shopSection = document.getElementById('myshopSection')
  shopSection.style.display = 'block'

  // Update Sidebar UI
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
  document.getElementById('nav-myshop').classList.add('active')

  // Load the data
  renderMyShop()
}

function deleteProduct(productId) {
  // Confirm with the user first
  if (confirm('Are you sure you want to remove this listing?')) {
    // Find the index of the product in your availableProducts array
    const productIndex = availableProducts.findIndex((p) => p.id === productId)

    if (productIndex !== -1) {
      // Remove it from the array
      availableProducts.splice(productIndex, 1)

      // Refresh the My Shop display
      renderMyShop()

      // Also refresh the Marketplace so it's gone from there too
      if (typeof loadMarketplaceProducts === 'function') {
        loadMarketplaceProducts()
      }

      alert('Listing removed successfully.')
    }
  }
}

function editProduct(productId) {
  // 1. Find the product data
  const product = availableProducts.find((p) => p.id === productId)
  if (!product) return

  // 2. Open the modal (using your existing modal function)
  openModal('postModal')

  // 3. Fill the form with current values
  // Ensure these IDs match your actual <input> IDs in the HTML
  document.getElementById('itemName').value = product.name
  document.getElementById('itemCategory').value = product.cat
  // Strip '₱' if it exists to keep the number input clean
  document.getElementById('itemPrice').value = product.price.replace('₱', '')

  // 4. Change the Modal UI to "Edit Mode"
  const modalTitle = document.querySelector('#postModal h2')
  if (modalTitle) modalTitle.innerText = 'Update Harvest'

  const submitBtn = document.getElementById('submitProductBtn')
  if (submitBtn) {
    submitBtn.innerText = 'Save Changes'
    // Change the function it calls when clicked
    submitBtn.onclick = function () {
      saveEdit(productId)
    }
  }
}

let currentEditId = null // Variable to keep track of what we are editing

function editProduct(productId) {
  // 1. Find the product
  const product = availableProducts.find((p) => p.id === productId)
  if (!product) return

  currentEditId = productId // Save the ID for the save function

  // 2. Open the Modal
  document.getElementById('postModal').style.display = 'flex'

  // 3. Fill the inputs using your specific IDs
  document.getElementById('post-name').value = product.name
  document.getElementById('post-price').value = product.price
  document.getElementById('post-cat').value = product.cat

  // 4. Change UI text to "Update" instead of "Post"
  document.querySelector('.modal-title').innerText = 'Update Listing'
  const submitBtn = document.querySelector('#postHarvestForm button[type="submit"]')
  submitBtn.innerText = 'Save Changes'

  // 5. Change the form behavior to "Save" instead of "Create"
  const form = document.getElementById('postHarvestForm')
  form.onsubmit = function (e) {
    e.preventDefault()
    saveProductEdit()
  }
}

function resetPostModal() {
  const modalTitle = document.querySelector('#postModal h2')
  if (modalTitle) modalTitle.innerText = 'Post Harvest'

  const submitBtn = document.getElementById('submitProductBtn')
  if (submitBtn) {
    submitBtn.innerText = 'Post Product'
    submitBtn.onclick = handleNewPost // Point back to your original post function
  }
}

function saveProductEdit() {
  const index = availableProducts.findIndex((p) => p.id === currentEditId)

  if (index !== -1) {
    // Update the array with new values
    availableProducts[index].name = document.getElementById('post-name').value
    availableProducts[index].price = document.getElementById('post-price').value
    availableProducts[index].cat = document.getElementById('post-cat').value

    // Close and Refresh
    closePostModal()
    renderMyShop()

    // Reset form for next use
    resetPostForm()
    alert('Listing updated!')
  }
}

// Helper to switch the modal back to "Post New Harvest" mode
function resetPostForm() {
  const form = document.getElementById('postHarvestForm')
  form.reset()
  form.onsubmit = handlePostHarvest // Point back to your original create function
  document.querySelector('.modal-title').innerText = 'Post New Harvest'
  document.querySelector('#postHarvestForm button[type="submit"]').innerText = 'Post Product'
  currentEditId = null
}

// Reset function to turn the modal back into a "New Post" form
function resetPostModal() {
  const modalTitle = document.querySelector('#postModal h2')
  if (modalTitle) modalTitle.innerText = 'Post Harvest'

  const submitBtn = document.getElementById('submitProductBtn')
  if (submitBtn) {
    submitBtn.innerText = 'Post Product'
    submitBtn.onclick = handleNewPost // Point back to your original post function
  }
}

function renderMyShop() {
  const shopGrid = document.getElementById('myShopGrid')
  const myProducts = availableProducts.filter((p) => p.seller === 'Juan2026')

  if (myProducts.length === 0) {
    shopGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">You haven't posted any harvests yet.</p>`
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
        <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
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

  document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto'
}

// --- NAVIGATION: SHOW ACCOUNT CENTER ---
function showAccountCenter() {
  // Hide ALL other sections
  document.getElementById('marketplaceSection').style.display = 'none'
  document.getElementById('myOrdersSection').style.display = 'none'
  document.getElementById('myshopSection').style.display = 'none'
  document.getElementById('marketValuesSection').style.display = 'none'

  // Show Account Center
  document.getElementById('accountCenter').style.display = 'block'

  // Update sidebar active state
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))
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
  document.getElementById('marketValuesSection').style.display = 'none' // Added Fix

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
    ordersGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light);">You haven't placed any orders yet.</p>`
    return
  }

  ordersGrid.innerHTML = myOrders
    .map((order) => {
      // 1. Calculate the total price for this order
      const numericPrice = parseFloat(order.price.replace(/[^0-9.]/g, '')) || 0
      const totalPrice = (numericPrice * order.selectedQty).toLocaleString()

      // 2. Escape the name for the lightbox
      const escapedName = order.name.replace(/'/g, "\\'")

      return `
    <div class="product-card">
      <div class="card-img-container"
           onclick="inspectImage('${order.img}', '${escapedName}')"
           style="cursor: zoom-in;">
        <img src="${order.img}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Harvest'">
        <div class="status-tag" style="background: var(--accent)">Processing</div>
      </div>
      <div class="card-content">
        <div class="card-name">${order.name}</div>
        <div class="card-seller">Quantity: <b>${order.selectedQty}</b></div>
        <div class="card-price">₱${totalPrice}</div>

        <button class="btn-buy" style="margin-top: 10px; background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0;">
          Track Order
        </button>
      </div>
    </div>
  `
    })
    .join('')

  if (window.lucide) lucide.createIcons()
}

function renderProducts() {
  const grid = document.getElementById('marketplace-grid')
  if (!grid) return

  grid.innerHTML = availableProducts
    .map((product) => {
      // Escape the name so single quotes don't break the HTML
      const escapedName = product.name.replace(/'/g, "\\'")
      const productData = JSON.stringify(product).replace(/"/g, '&quot;')

      return `
      <div class="product-card">
        <div class="card-img-container"
             onclick="inspectImage('${product.img}', '${escapedName}')"
             style="cursor: zoom-in;">
          <img src="${product.img}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Fresh+Harvest'">
          <div class="category-tag">${product.cat}</div>
        </div>

        <div class="card-content">
          <div class="card-name">${product.name}</div>
          <div class="card-seller">
            <i data-lucide="user" style="width:12px; height:12px; display:inline-block;"></i>
            ${product.seller} • ${product.location}
          </div>
          <div class="card-price">${product.price}</div>

          <button class="btn-buy" onclick="openQtyModal(${productData})">
            <i data-lucide="shopping-basket"></i> Add to Basket
          </button>
        </div>
      </div>
    `
    })
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
      const escapedName = product.name.replace(/'/g, "\\'") // ADD THIS

      return `
      <div class="product-card">
          <div class="card-img-container"
               onclick="inspectImage('${product.img}', '${escapedName}')"
               style="cursor: zoom-in;">   <!-- ADD THIS -->
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

function previewImage(event) {
  const reader = new FileReader()
  const accountImage = document.getElementById('userProfileImage')
  const sidebarImage = document.getElementById('sidebarAvatar') // New Target
  const defaultIcon = document.getElementById('defaultUserIcon')

  reader.onload = function () {
    if (reader.readyState === 2) {
      const newSrc = reader.result

      // Update Account Center photo
      if (accountImage) {
        accountImage.src = newSrc
        accountImage.style.display = 'block'
      }

      // Update Sidebar footer photo
      if (sidebarImage) {
        sidebarImage.src = newSrc
      }

      // Hide icon if it was showing
      if (defaultIcon) defaultIcon.style.display = 'none'
    }
  }

  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0])
  }
}

function inspectImage(imgSrc, productName) {
  const lightbox = document.getElementById('imageLightbox')
  const fullImg = document.getElementById('inspectedImage')
  const caption = document.getElementById('lightboxCaption')

  if (!lightbox || !fullImg) return

  fullImg.src = imgSrc
  // Use innerHTML in case you want to style the name later
  caption.innerHTML = `<b>${productName}</b>`

  lightbox.style.display = 'flex'
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  const lightbox = document.getElementById('imageLightbox')
  if (lightbox) {
    lightbox.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

function previewImage(event) {
  const reader = new FileReader()
  const accountImage = document.getElementById('userProfileImage')
  const sidebarImage = document.getElementById('sidebarAvatar') // Target the sidebar img
  const defaultIcon = document.getElementById('defaultUserIcon')

  reader.onload = function () {
    if (reader.readyState === 2) {
      const newSrc = reader.result

      // 1. Update the Account Center main photo
      if (accountImage) {
        accountImage.src = newSrc
        accountImage.style.display = 'block'
      }

      // 2. Update the Sidebar avatar photo
      if (sidebarImage) {
        sidebarImage.src = newSrc
      }

      // 3. Hide default icon if present
      if (defaultIcon) defaultIcon.style.display = 'none'
    }
  }

  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0])
  }
}

const localMarketData = [
  // ROOT CROPS & SPICES
  {
    item: 'Native Ginger',
    price: '₱115',
    unit: 'per kg',
    status: 'Rising',
    icon: 'trending-up',
    color: '#e11d48',
  },
  {
    item: 'Red Onions',
    price: '₱170',
    unit: 'per kg',
    status: 'Falling',
    icon: 'trending-down',
    color: '#16a34a',
  },
  {
    item: 'Sweet Potato (Kamote)',
    price: '₱75',
    unit: 'per kg',
    status: 'Rising',
    icon: 'trending-up',
    color: '#e11d48',
  },
  {
    item: 'Garlic (Ahos)',
    price: '₱140',
    unit: 'per kg',
    status: 'Stable',
    icon: 'minus',
    color: '#64748b',
  },

  // FRUITS & REBENTADOR
  {
    item: 'Saba Banana',
    price: '₱45',
    unit: 'per bundle',
    status: 'Stable',
    icon: 'minus',
    color: '#64748b',
  },
  {
    item: 'Carabao Mango',
    price: '₱120',
    unit: 'per kg',
    status: 'Falling',
    icon: 'trending-down',
    color: '#16a34a',
  },
  {
    item: 'Calamansi',
    price: '₱85',
    unit: 'per kg',
    status: 'Rising',
    icon: 'trending-up',
    color: '#e11d48',
  },

  // VEGETABLES
  {
    item: 'Eggplant (Talong)',
    price: '₱60',
    unit: 'per kg',
    status: 'Stable',
    icon: 'minus',
    color: '#64748b',
  },
  {
    item: 'Ampalaya',
    price: '₱95',
    unit: 'per kg',
    status: 'Rising',
    icon: 'trending-up',
    color: '#e11d48',
  },
  {
    item: 'String Beans (Batong)',
    price: '₱35',
    unit: 'per bundle',
    status: 'Falling',
    icon: 'trending-down',
    color: '#16a34a',
  },
  {
    item: 'Pechay',
    price: '₱25',
    unit: 'per tie',
    status: 'Stable',
    icon: 'minus',
    color: '#64748b',
  },

  // STAPLES
  {
    item: 'Local Rice (Ganador)',
    price: '₱54',
    unit: 'per kg',
    status: 'Stable',
    icon: 'minus',
    color: '#64748b',
  },
  {
    item: 'Local Rice (V16)',
    price: '₱48',
    unit: 'per kg',
    status: 'Stable',
    icon: 'minus',
    color: '#64748b',
  },
]

function showMarketValues() {
  // Hide everything else
  document.getElementById('marketplaceSection').style.display = 'none'
  document.getElementById('myOrdersSection').style.display = 'none'
  document.getElementById('accountCenter').style.display = 'none'
  document.getElementById('myshopSection').style.display = 'none' // FIX: Hide My Shop

  // Show Market Values
  document.getElementById('marketValuesSection').style.display = 'block'

  // Update Sidebar UI
  document.querySelectorAll('.menu-item').forEach((item) => item.classList.remove('active'))

  const navBtn = document.getElementById('nav-marketvalues')
  if (navBtn) navBtn.classList.add('active')

  renderMarketValues()
}

function renderMarketValues() {
  const grid = document.getElementById('marketValuesGrid')
  if (!grid) return

  grid.innerHTML = localMarketData
    .map(
      (data) => `
    <div class="product-card" style="border-left-color: ${data.color} !important;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 0.7rem; color: #64748b; font-weight: bold; text-transform: uppercase;">Product</span>
          <h2 style="font-size: 1.1rem; margin: 0; color: #1e293b;">${data.item}</h2>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 1.4rem; font-weight: 800; color: #166534;">${data.price}</span>
          <span style="font-size: 0.8rem; color: #64748b; display: block;">${data.unit}</span>
        </div>
      </div>

      <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; gap: 5px; color: ${data.color}; font-size: 0.8rem; font-weight: bold;">
        <i data-lucide="${data.icon}" style="width: 14px;"></i>
        ${data.status.toUpperCase()}
      </div>
    </div>
  `,
    )
    .join('')

  if (window.lucide) lucide.createIcons()
}
