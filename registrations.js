async function loadRegistrations() {
    try {
        const response = await fetch('/registrations');
        const data = await response.json();

        const tbody = document.querySelector('#registrationsTable tbody');
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = "<tr><td colspan='4'>No registrations yet</td></tr>";
            return;
        }

        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.fname}</td>
                <td>${entry.lname}</td>
                <td>${entry.email}</td>
                <td>${new Date(entry.timestamp).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading registrations:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadRegistrations);
