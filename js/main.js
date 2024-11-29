function showRegister() {
    document.getElementById('register-container').style.display = 'block';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('home-container').style.display = 'none';
}

function showLogin() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('home-container').style.display = 'none';
}

function register() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !password) {
        showModal('Please fill all fields!', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showModal('Invalid email format!', 'error');
        return;
    }

    if (localStorage.getItem(email)) {
        showModal('Email already exists!', 'error'); 
        return;
    }

    const user = { name, password };
    localStorage.setItem(email, JSON.stringify(user)); 
    showModal('Registration successful!', 'success'); 
    showLogin();
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showModal('Please fill all fields!', 'error');  
        return;
    }

    const user = JSON.parse(localStorage.getItem(email)); 

    if (!user) {
        showModal('Incorrect Email or Password!', 'error'); 
        return;
    }

    if (user.password !== password) {
        showModal('Incorrect Email or Password!', 'error'); 
        return;
    }

    sessionStorage.setItem('user', user.name); 
    showHome(user.name); 
}

function showHome(userName) {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('home-container').style.display = 'block';

    document.getElementById('user-name').textContent = userName;
}

function logout() {
    sessionStorage.removeItem('user'); 
    showLogin(); 
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showModal(message, type = 'success') {
    const modalBody = document.getElementById('alertModalBody');
    modalBody.textContent = message;  

    
    modalBody.className = 'modal-body';  
    modalBody.classList.add(type);  

    const alertModal = new bootstrap.Modal(document.getElementById('alertModal')); 
    alertModal.show(); 
}

window.onload = () => {
    const userName = sessionStorage.getItem('user');
    if (userName) {
        showHome(userName);
    } else {
        showLogin();
    }
};
