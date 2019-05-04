const GetFirstName = (fullName) => {
    return fullName.split(' ')[0];
}

const IsValidPassword = (password) => {
    var isValid = password.length >= 8 && !password.toLowerCase().includes('password');
    return isValid;
}

export { GetFirstName, IsValidPassword};