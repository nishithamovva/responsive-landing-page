document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('messages-tbody');
    const totalCount = document.getElementById('total-count');
    const searchInput = document.getElementById('search-input');
    const emptyState = document.getElementById('empty-state');
    const toast = document.getElementById('toast');

    let messages = [];

    // Load data from localStorage
    function loadMessages() {
        const data = localStorage.getItem('landingMessages');
        if (data) {
            messages = JSON.parse(data);
            // Sort by newest first
            messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            messages = [];
        }
        renderMessages(messages);
    }

    function renderMessages(dataToRender) {
        tbody.innerHTML = '';
        totalCount.textContent = messages.length;

        if (dataToRender.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            dataToRender.forEach(msg => {
                const tr = document.createElement('tr');
                
                const dateObj = new Date(msg.createdAt);
                const dateStr = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;

                tr.innerHTML = `
                    <td>${dateStr}</td>
                    <td>${escapeHTML(msg.name)}</td>
                    <td><a href="mailto:${escapeHTML(msg.email)}" style="color:var(--accent-blue)">${escapeHTML(msg.email)}</a></td>
                    <td>${escapeHTML(msg.phone)}</td>
                    <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHTML(msg.message)}">
                        ${escapeHTML(msg.message)}
                    </td>
                    <td>
                        <button class="btn-delete" data-id="${msg.id}">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    // Handle Delete
    tbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const id = e.target.getAttribute('data-id');
            if(confirm('Are you sure you want to delete this message?')) {
                messages = messages.filter(msg => msg.id !== id);
                localStorage.setItem('landingMessages', JSON.stringify(messages));
                loadMessages();
                showToast('Message deleted successfully');
            }
        }
    });

    // Handle Search
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = messages.filter(msg => 
            msg.name.toLowerCase().includes(term) || 
            msg.email.toLowerCase().includes(term)
        );
        renderMessages(filtered);
    });

    // Helper: Escape HTML to prevent XSS (since we read from user input)
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Toast helper
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Init
    loadMessages();
});
