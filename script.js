document.addEventListener('DOMContentLoaded', () => {
    // --- Login System Elements ---
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const mainContent = document.getElementById('main-content');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');

    // --- Main App DOM Elements ---
    const modal = document.getElementById('item-modal');
    const showModalBtn = document.getElementById('show-modal-btn');
    const closeBtn = document.querySelector('.close-btn');
    const itemForm = document.getElementById('item-form');
    const itemsGrid = document.getElementById('items-grid');
    const homeLink = document.getElementById('home-link');
    const lostLink = document.getElementById('lost-link');
    const foundLink = document.getElementById('found-link');
    const sectionTitle = document.querySelector('main h2');

    // --- State ---
    let items = [
        { name: 'დამტენი', location: 'BTU-ს A კორპუსი', type: 'დაკარგულია', image: 'BTU-IMAGE-1.jpg' },
        { name: 'პირადობა', location: 'ბიბლიოთეკა', type: 'ნაპოვნია', image: 'BTU-IMAGE-2.jpg' },
        { name: 'ყურსასმენი', location: 'კაფეტერია', type: 'დაკარგულია', image: 'BTU-IMAGE-3.jpg' },
        { name: 'სამაჯური', location: '401 ოთახი', type: 'ნაპოვნია', image: 'BTU-IMAGE-4.jpg' },
        { name: 'დამტენი', location: '310 ოთახი', type: 'დაკარგულია', image: 'BTU-IMAGE-5.jpg' },
        { name: 'ყურსასმენი', location: '104 ოთახი', type: 'ნაპოვნია', image: 'BTU-IMAGE-6.jpg' },
        { name: 'პომადა', location: '201 ოთახი', type: 'დაკარგულია', image: 'BTU-IMAGE-7.jpg' },
        { name: 'ბარათი', location: '309 ოთახი', type: 'ნაპოვნია', image: 'BTU-IMAGE-8.jpg' },
        { name: 'გასაღები', location: '304 ოთახი', type: 'დაკარგულია', image: 'BTU-IMAGE-9.jpg' },
        { name: 'გასაღები', location: '312 ოთახი', type: 'ნაპოვნია', image: 'BTU-IMAGE-10.jpg' },
    ];

    // --- Functions ---

    // Function to show the main application
    function showApp() {
        loginOverlay.style.display = 'none';
        mainContent.style.display = 'block';
        renderItems('ნაპოვნია'); // Initially show 'found' items
    }

    // Function to render items in the grid
    function renderItems(filter = 'all') {
        itemsGrid.innerHTML = ''; // Clear existing items

        let filteredItems = items;
        if (filter === 'დაკარგულია') {
            filteredItems = items.filter(item => item.type === 'დაკარგულია');
            sectionTitle.textContent = "დაკარგული ნივთები";
        } else if (filter === 'ნაპოვნია') {
            filteredItems = items.filter(item => item.type === 'ნაპოვნია');
            sectionTitle.textContent = "ნაპოვნი ნივთები";
        } else {
            sectionTitle.textContent = "ყველა ნივთი";
        }

        if (filteredItems.length === 0) {
            itemsGrid.innerHTML = '<p>სია ცარიელია.</p>';
            return;
        }

        filteredItems.forEach(item => {
            const itemCard = `
                <div class="item-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-card-content">
                        <h3>${item.name}</h3>
                        <p><strong>სტატუსი:</strong> <span style="color: ${item.type === 'ნაპოვნია' ? 'green' : 'red'}; text-transform: capitalize;">${item.type}</span></p>
                        <p><strong>ადგილმდებარეობა:</strong> ${item.location}</p>
                    </div>
                </div>
            `;
            itemsGrid.innerHTML += itemCard;
        });
    }

    // --- Event Listeners ---

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        if (!email.endsWith('@btu.edu.ge')) {
            loginError.textContent = 'გთხოვთ გამოიყენოთ BTU-ს ვალიდური იმეილი.';
            return;
        }
        if (password.length === 0) {
            loginError.textContent = 'გთხოვთ შეიყვანოთ პაროლი.';
            return;
        }

        // If validation passes
        loginError.textContent = '';
        sessionStorage.setItem('isLoggedIn', 'true'); // Remember user for the session
        showApp();
    });

    // Show modal
    showModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Hide modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission for adding new items
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemLocation = document.getElementById('item-location').value;
        const itemType = document.getElementById('item-type').value;
        const itemImageInput = document.getElementById('item-image');

        if (itemImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newItem = {
                    name: itemName,
                    location: itemLocation,
                    type: itemType,
                    image: e.target.result
                };

                items.unshift(newItem);
                renderItems(itemType); // Show the list where the new item belongs
                modal.style.display = 'none';
                itemForm.reset();
            };
            reader.readAsDataURL(itemImageInput.files[0]);
        }
    });

    // Navigation link event listeners
    homeLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('all'); });
    lostLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('დაკარგულია'); });
    foundLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('ნაპოვნია'); });

    // --- Initial Check ---
    // Check if the user is already logged in from a previous session
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        showApp();
    }
});