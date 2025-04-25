function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function switchTheme(theme) {
    const linkElement = document.getElementById('theme-stylesheet');
    if (theme === 'dark') {
        linkElement.href = 'assets/themes/dark.css';
    } else {
        linkElement.href = 'assets/themes/light.css';
    }
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

function clearLocalStorage() {
    localStorage.clear();
}