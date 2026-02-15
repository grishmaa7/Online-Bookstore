// Get current user
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    alert('Please login first!');
    window.location.href = 'login.html';
}

// Display user info
document.getElementById('user-name').textContent = currentUser.name;
document.getElementById('profile-name').textContent = currentUser.name;
document.getElementById('profile-email').textContent = currentUser.email;

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
});

// Update profile
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('update-name').value;
    const newPassword = document.getElementById('update-password').value;

    // Update in localStorage users array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => {
        if (user.email === currentUser.email) {
            return {
                ...user,
                name: newName || user.name,
                password: newPassword || user.password
            };
        }
        return user;
    });
    localStorage.setItem('users', JSON.stringify(users));

    // Update currentUser
    currentUser.name = newName || currentUser.name;
    currentUser.password = newPassword || currentUser.password;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alert('Profile updated successfully!');
    location.reload();
});
