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
        alert('Please fill all fields!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Invalid email format!');
        return;
    }

    if (localStorage.getItem(email)) {
        alert('Email already exists!');
        return;
    }

    const user = { name, password };
    localStorage.setItem(email, JSON.stringify(user)); 
    alert('Registration successful!');
    showLogin();
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please fill all fields!');
        return;
    }

    const user = JSON.parse(localStorage.getItem(email)); 

    if (!user) {
        alert('Email not registered!');
        return;
    }

    if (user.password !== password) {
        alert('Incorrect password!');
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

window.onload = () => {
    const userName = sessionStorage.getItem('user');
    if (userName) {
        showHome(userName);
    } else {
        showLogin();
    }
};
