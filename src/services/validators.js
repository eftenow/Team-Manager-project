
export function validateEmail() {
    let email = document.getElementById('email');
    let errorField = document.querySelector('.error');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errMsg = document.createElement('p');
    errMsg.id = 'wrong-email';
    let isValid = false;

    if (!emailRegex.test(email.value)) {
        errMsg.textContent = 'Invalid email input!';
        errorField.appendChild(errMsg);
    } else {
        isValid = true;

    };

    return isValid;
}

export function onFocusEmail() {
    try {
        document.getElementById('wrong-email').remove();
    } catch { }
}

export function onFocusUsername() {
    try {
        document.getElementById('wrong-username').remove();
    } catch { }
}


export function validateUsername() {
    let username = document.getElementById('username');
    let errorField = document.querySelector('.error');

    const errMsg = document.createElement('p');
    errMsg.id = 'wrong-username';
    let isValid = false;

    if (username.value.length < 3) {
        errMsg.textContent = 'Username has to be atleast 3 characters long!';
        errorField.appendChild(errMsg);

    } else {
        isValid = true;
    };
    return isValid;
}

export function validatePassword() {
    let errorField = document.querySelector('.error');
    let pass = document.getElementById('pass');
    const errMsg = document.createElement('p');
    errMsg.id = 'wrong-pass';
    let isValid = false;

    if (pass.value.length < 3) {
        errMsg.textContent = 'Password must to be atleast 3 characters long!';
        errorField.appendChild(errMsg);
    } else{
        isValid = true;
    };

    return isValid;
};

export function validateRepeatPass() {
    let pass = document.getElementById('pass');
    let rePass = document.getElementById('rePass');
    let errorField = document.querySelector('.error');

    const errMsg = document.createElement('p');
    errMsg.id = 'wrong-rePass';
    let isValid = false;


    if (pass.value != rePass.value) {
        errMsg.textContent = 'Passwords must match!';
        errorField.appendChild(errMsg);
    } else {
        isValid = true;

    };
    return isValid;
};

export function onFocusPassword() {
    try {
        document.getElementById('wrong-password').remove();
    } catch { }
}

export function onFocusRePass() {
    try {
        document.getElementById('wrong-rePass').remove();
    } catch { }
}

export function onFocusClearLoginForm(params) {
    try {
        document.getElementById('wrong-login').remove();
    } catch { }
}




export function registrationValidator(email, username, pass, rePass, errorField) {
    errorField.replaceChildren();
    let validEmail = validateEmail(email, errorField);
    let validUsername = validateUsername(username, errorField);
    let validPasswords = validateRepeatPass(pass, rePass, errorField);
    if (!validEmail || !validUsername || !validPasswords) {
        throw new Error();
    }
}




export function validateTeamName(teamName, errorField) {
    const errMsg = document.createElement('p');
    let isValid = false;

    if (teamName.length < 4) {
        errMsg.textContent = 'Team name has to be atleast 4 characters long!';
        errorField.appendChild(errMsg);
    } else {
        isValid = true;
        try {
            errorField.removeChild(errMsg);
        } catch { }
    }
    return isValid;
}

export function validateTeamLogoUrl(logoUrl, errorField) {
    const errMsg = document.createElement('p');
    let isValid = false;
    if (!logoUrl) {
        errMsg.textContent = 'Logo URL is a required field!';
        errorField.appendChild(errMsg);
    } else {
        isValid = true;
        try {
            errorField.removeChild(errMsg);
        } catch { }
    }
    return isValid;
}

export function validateTeamDescription(teamDescription, errorField) {
    const errMsg = document.createElement('p');
    let isValid = false;
    if (teamDescription.length < 10) {
        errMsg.textContent = 'Team description has to be atleast 10 characters long!';
        errorField.appendChild(errMsg);
    } else {
        isValid = true;
        try {
            errorField.removeChild(errMsg);
        } catch { }
    }
    return isValid;
}

export function teamCreateEditValidator(teamName, logoUrl, teamDescription, errorField) {
    errorField.replaceChildren();
    let validName = validateTeamName(teamName, errorField);
    let validUrl = validateTeamLogoUrl(logoUrl, errorField);
    let validDescription = validateTeamDescription(teamDescription, errorField);

    if (!validName || !validUrl || !validDescription) {
        throw new Error();
    }
}