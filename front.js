const availableProducts = [
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
  {
    id: 7,
    name: 'Native Eggplant (Talong)',
    price: '₱40/kg',
    img: 'images/talong.webp',
    seller: 'Mang Tomas',
    location: 'RTR',
    cat: 'Vegetable',
  },
  {
    id: 8,
    name: 'Grapes (Uvas)',
    price: '₱50/kg',
    img: 'images/grapes.jpg',
    seller: 'Aling Rosa',
    location: 'Kitcharao',
    cat: 'Root Crop',
  },
  {
    id: 9,
    name: 'Ginger (Luya)',
    price: '₱90/kg',
    img: 'images/luya.webp',
    seller: 'Mang Lito',
    location: 'Las Nieves',
    cat: 'Spice',
  },
  {
    id: 10,
    name: 'Bitter Gourd (Ampalaya)',
    price: '₱55/kg',
    img: 'images/ampalaya.png',
    seller: 'Aling Tess',
    location: 'Tubay',
    cat: 'Vegetable',
  },
  {
    id: 11,
    name: 'Long String Beans (Sitaw)',
    price: '₱30/bundle',
    img: 'images/batong.webp',
    seller: 'Farmer Rico',
    location: 'Jabonga',
    cat: 'Vegetable',
  },
  {
    id: 12,
    name: 'Native Papaya',
    price: '₱35/kg',
    img: 'images/papaya.jpg',
    seller: 'Mang Nestor',
    location: 'Butuan City',
    cat: 'Fruit',
  },
]

function loadFrontProducts() {
  const grid = document.getElementById('featured-grid')
  if (!grid) return

  grid.innerHTML = availableProducts
    .map(
      (product) => `
        <div class="product-card">
            <div class="card-img-container">
                <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Fresh+Produce'">
                <div class="location-tag">
                    <i data-lucide="map-pin" style="width:10px; height:10px;"></i> ${product.location}
                </div>
            </div>
            <div class="card-name">${product.name}</div>
            <div class="card-seller">By ${product.seller} • <span class="cat-label">${product.cat}</span></div>
            <div class="card-price">${product.price}</div>
            <button class="btn-buy" onclick="openModal('loginModal')">
                Order Fresh
            </button>
        </div>
    `,
    )
    .join('')

  // IMPORTANT: You must call this after updating innerHTML to render the icons
  if (window.lucide) {
    lucide.createIcons()
  }
}

document.addEventListener('DOMContentLoaded', loadFrontProducts)

// Function to open modal
function openAuthModal(tab = 'login') {
  document.getElementById('authModal').style.display = 'flex'
  switchTab(tab)
}

// Function to close modal
function closeAuthModal() {
  document.getElementById('authModal').style.display = 'none'
}

// Switch between Login and Sign Up tabs
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm')
  const signupForm = document.getElementById('signupForm')
  const loginBtn = document.getElementById('tab-login')
  const signupBtn = document.getElementById('tab-signup')

  if (tab === 'login') {
    loginForm.style.display = 'block'
    signupForm.style.display = 'none'
    loginBtn.classList.add('active')
    signupBtn.classList.remove('active')
  } else {
    loginForm.style.display = 'none'
    signupForm.style.display = 'block'
    loginBtn.classList.remove('active')
    signupBtn.classList.add('active')
  }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById('authModal')
  if (event.target == modal) {
    closeAuthModal()
  }
}

// Generic function to open any modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex'
  lucide.createIcons() // Ensure the X icon renders
}

// Generic function to close any modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none'
}

// Logic to switch between them
function openSignupFromLogin() {
  closeModal('loginModal')
  openModal('signupModal')
}

function openLoginFromSignup() {
  closeModal('signupModal')
  openModal('loginModal')
}

// Close modal if user clicks outside the box
window.onclick = function (event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.style.display = 'none'
  }
}

// This is a simplified version of your product generation logic
function loadProducts() {
  const grid = document.getElementById('featured-grid')

  // Example product data (usually comes from your array)
  const products = [
    { id: 1, name: 'Fresh Mango', price: '₱120' },
    // ... other products
  ]

  grid.innerHTML = products
    .map(
      (p) => `
        <div class="product-card">
            <button class="btn-buy" onclick="handleQuickBuy()">Buy Now</button>
        </div>
    `,
    )
    .join('')
}

// THE LINKING LOGIC
function handleQuickBuy() {
  // Check if the user is logged in (for now, we assume they aren't)
  // So we trigger the login modal
  openModal('loginModal')
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex'
  document.body.style.overflow = 'hidden' // Prevents background scrolling
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none'
  document.body.style.overflow = 'auto' // Re-enables scrolling
}

// Logic to switch between Login and Signup inside the modals
function openSignupFromLogin() {
  closeModal('loginModal')
  openModal('signupModal')
}

function openLoginFromSignup() {
  closeModal('signupModal')
  openModal('loginModal')
}

// Close modal if user clicks outside the white box
window.onclick = function (event) {
  if (event.target.className === 'modal-overlay') {
    event.target.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

function handleLogin(event) {
  event.preventDefault()

  // 1. Get the button and apply centering styles
  const btn = event.submitter || event.target.querySelector('button[type="submit"]')
  const originalText = btn.innerHTML

  // Apply centering logic
  btn.style.display = 'flex'
  btn.style.alignItems = 'center'
  btn.style.justifyContent = 'center'
  btn.style.gap = '10px'

  // Set the loading state
  btn.innerText = 'Authenticating...'
  btn.style.opacity = '0.7'
  btn.disabled = true

  // 2. Simulate a network delay
  setTimeout(() => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', 'Juan2026')

    // 3. Redirect to the dashboard
    window.location.href = 'home.html'
  }, 1500)
}

// Open/Close functions
function openPostModal() {
  document.getElementById('postModal').style.display = 'flex'
  document.body.style.overflow = 'hidden'
}

function closePostModal() {
  document.getElementById('postModal').style.display = 'none'
  document.body.style.overflow = 'auto'
}

// Handle the Form Submission
function handlePostHarvest(event) {
  event.preventDefault()

  const btn = document.getElementById('post-submit-btn')
  btn.innerText = 'Listing...'
  btn.disabled = true

  // 1. Create the new product object
  const newProduct = {
    id: Date.now(), // Unique ID
    name: document.getElementById('post-name').value,
    price: document.getElementById('post-price').value,
    img:
      document.getElementById('post-img').value ||
      'https://via.placeholder.com/400x300?text=Fresh+Harvest',
    seller: 'Juan2026', // Uses the current user
    location: 'Jabonga',
    cat: document.getElementById('post-cat').value,
  }

  // 2. Add to your existing products array
  availableProducts.unshift(newProduct) // Adds to the beginning of the list

  // 3. Simulate delay then update UI
  setTimeout(() => {
    closePostModal()
    renderProducts() // Re-runs your existing grid logic

    // Reset button
    btn.innerText = 'List Harvest'
    btn.disabled = false
    document.getElementById('postHarvestForm').reset()

    alert('Harvest listed successfully!')
  }, 1200)
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

// PHOTO INSPECT FUNCTIONS
function inspectImage(imgSrc, productName) {
  const lightbox = document.getElementById('imageLightbox')
  const img = document.getElementById('inspectedImage')
  const caption = document.getElementById('lightboxCaption')

  if (!lightbox || !img) return

  img.src = imgSrc
  caption.innerText = productName

  lightbox.style.display = 'flex'
  document.body.style.overflow = 'hidden'
}

function closeLightbox(event) {
  // Only close if clicking the overlay background (not the image)
  if (event && event.target !== event.currentTarget) {
    // Clicked on the image or caption - don't close
    if (event.target.id === 'inspectedImage' || event.target.id === 'lightboxCaption') {
      return
    }
  }

  const lightbox = document.getElementById('imageLightbox')
  if (lightbox) {
    lightbox.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

function loadFrontProducts() {
  const grid = document.getElementById('featured-grid')
  if (!grid) return

  grid.innerHTML = availableProducts
    .map((product) => {
      const escapedName = product.name.replace(/'/g, "\\'")

      return `
        <div class="product-card">
            <div class="card-img-container"
                 onclick="inspectImage('${product.img}', '${escapedName}')"
                 style="cursor: zoom-in;">
                <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/400x300?text=Fresh+Produce'">
                <div class="location-tag">
                    <i data-lucide="map-pin" style="width:10px; height:10px;"></i> ${product.location}
                </div>
            </div>
            <div class="card-name">${product.name}</div>
            <div class="card-seller">By ${product.seller} • <span class="cat-label">${product.cat}</span></div>
            <div class="card-price">${product.price}</div>
            <button class="btn-buy" onclick="openModal('loginModal')">
                Order Fresh
            </button>
        </div>
    `
    })
    .join('')

  if (window.lucide) lucide.createIcons()
}
