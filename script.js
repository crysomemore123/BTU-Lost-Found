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


    // --- State ---
    // In a real app, this would come from a database.
    let items = [
        { name: 'Airpods', location: 'BTU Building A', type: 'found', image: 'https://via.placeholder.com/300x200.png?text=Airpods' },
        { name: 'Student ID Card', location: 'Library', type: 'found', image: 'https://via.placeholder.com/300x200.png?text=ID+Card' },
        { name: 'Black Backpack', location: 'Cafeteria', type: 'lost', image: 'https://via.placeholder.com/300x200.png?text=Backpack' },
        { name: 'Water Bottle', location: 'Gym', type: 'found', image: 'https://via.placeholder.com/300x200.png?text=Bottle' },
    ];

    // --- Functions ---

    // Function to render items in the grid
    function renderItems(filter = 'all') {
        itemsGrid.innerHTML = ''; // Clear existing items
        
        let filteredItems = items;
        if (filter === 'lost') {
            filteredItems = items.filter(item => item.type === 'lost');
            sectionTitle.textContent = "Lost Items";
        } else if (filter === 'found') {
            filteredItems = items.filter(item => item.type === 'found');
            sectionTitle.textContent = "Found Items";
        } else {
            sectionTitle.textContent = "All Items";
        }

        if (filteredItems.length === 0) {
            itemsGrid.innerHTML = '<p>No items to display.</p>';
            return;
        }

        filteredItems.forEach(item => {
            const itemCard = `
                <div class="item-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-card-content">
                        <h3>${item.name}</h3>
                        <p><strong>Status:</strong> <span style="color: ${item.type === 'found' ? 'green' : 'red'}; text-transform: capitalize;">${item.type}</span></p>
                        <p><strong>Location:</strong> ${item.location}</p>
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
                image: e.target.result // Use image data URL
            };

            items.unshift(newItem); // Add to the beginning of the array
            renderItems(); // Re-render all items
            modal.style.display = 'none'; // Hide modal
            itemForm.reset(); // Reset form fields
        };

        if (itemImageInput.files[0]) {
            reader.readAsDataURL(itemImageInput.files[0]);
        }
    });
    
    // Navigation link event listeners
    homeLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('all'); });
    lostLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('lost'); });
    foundLink.addEventListener('click', (e) => { e.preventDefault(); renderItems('found'); });


    // --- Initial Render ---
    renderItems('found'); // Initially show 'found' items
});