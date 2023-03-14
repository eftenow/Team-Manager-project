const url = 'http://localhost:3030/users';

const endpoitns = {
    'login': '/users/login',
    'logout': '/users/logout',
    'register': '/users/register'
}

function setUserData(user) {
    localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
    localStorage.setItem('username', JSON.stringify(user.username));
    localStorage.setItem('email', JSON.stringify(user.email));
    localStorage.setItem('_id', JSON.stringify(user._id));

}

export function getAccessToken() {
    return JSON.parse(localStorage.getItem('accessToken'));
};

export function getUserId() {
    return JSON.parse(localStorage.getItem('_id'));
}

export async function login(email, password) {
    const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        setUserData(data);
    } else {
        return data.message;
    }
};


export async function register(username, email, password) {
    const response = await fetch(`${url}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        setUserData(data);

    } else {
        return data.message;
    }

}

export async function logout() {
    const accessToken = getAccessToken();

    let response = await fetch(url + endpoitns.logout, {
        method: 'GET',
        headers: { 'X-Authorization': accessToken }
    })

    if (response.ok) {
        localStorage.clear();
    } else {
        throw new Error();
    }

};

export function getUser() {
    return JSON.parse(localStorage.getItem('username'));
}

