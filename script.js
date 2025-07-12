document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const modal = document.getElementById('item-modal');
    const showModalBtn = document.getElementById('show-modal-btn');
    const closeBtn = document.querySelector('.close-btn');
    const itemForm = document.getElementById('item-form');
    const itemsGrid = document.getElementById('items-grid');
    const homeLink = document.getElementById('home-link');
    const lostLink = document.getElementById('lost-link');
    const foundLink = document.getElementById('found-link');
    const sectionTitle = document.querySelector('main h2');

    // --- State (in Georgian) ---
    let items = [
        { name: 'დამტენი', location: 'BTU-ს A კორპუსი', type: 'ნაპოვნია', image: 'images/BTU-IMAGE-1.jpg' },
        { name: 'პირადობა', location: 'ბიბლიოთეკა', type: 'ნაპოვნია', image: 'images/BTU-IMAGE-2.jpg' },
        { name: 'ყურსასმენი', location: 'კაფეტერია', type: 'დაკარგულია', image: 'images/BTU-IMAGE-3.jpg' },
        { name: 'სამაჯური', location: '401 ოთახი', type: 'ნაპოვნია', image: 'images/BTU-IMAGE-4.jpg' },
    ];

    // --- Functions ---

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

    // Handle form submission
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemLocation = document.getElementById('item-location').value;
        const itemType = document.getElementById('item-type').value;
        const itemImageInput = document.getElementById('item-image');

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

        if (itemImageInput.files[0]) {
            reader.readAsDataURL(itemImageInput.files[0]);
        }
    });

    // Navigation link event listeners
    homeLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('all'); });
    lostLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('დაკარგულია'); });
    foundLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('ნაპოვნია'); });

    // --- Initial Render ---
    renderItems('ნაპოვნია'); // Initially show 'found' items
});
