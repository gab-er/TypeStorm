const MIN_PASSWORD_LENGTH = process.env.NEXT_PUBLIC_MIN_PASSWORD_LENGTH
const MIN_USERNAME_LENGTH = process.env.NEXT_PUBLIC_MIN_USERNAME_LENGTH

export function validateUsername(username) {
    if (username.length < MIN_USERNAME_LENGTH) {
            return(`Username must be at least ${MIN_USERNAME_LENGTH} characters long.`);
        } else {
            return('');
        }
}

export function validatePassword(password) {
    if (password.length < MIN_PASSWORD_LENGTH) {
            return(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
        } else if (password.length > 20) {
            return('Password cannot exceed 20 characters.');
        } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            return('Password must contain at least one special character.');
        } else if (!/(?=.*[0-9])/.test(password)) {
            return('Password must contain at least one number.')
        } else if (!/(?=.*[A-Z])/.test(password)) {
            return('Password must contain at least one uppercase letter.')
        } else if (!/(?=.*[a-z])/.test(password)) {
            return('Password must contain at least one lowercase letter.')
        } else {
            return('');
        }
}

export function validateConfirmPassword(password, inputPassword) {
    if (password != inputPassword) {
            return('Password does not match');
        } else {
            return('');
        }
}