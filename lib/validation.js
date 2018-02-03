function validateRegistrationData(username, password, repeatedPassword) {

    const errorResult = {};

    if (username.length < 3) {
        errorResult.success = false;
        errorResult.usernameMessage = "Username should be at least 3 symbols long";
    }
    if (password.length < 3) {
        errorResult.success = false;
        errorResult.passwordMessage = "Password should be at least 3 symbols long";
    }
    if (!/\w+/.test(username)) {
        errorResult.success = false;
        errorResult.usernameMessage = "Username contains restricted symbols";
    }
    if (!/\w+/.test(password)) {
        errorResult.success = false;
        errorResult.passwordMessage = "Password contains restricted symbols";
    }
    if (username.length === 0) {
        errorResult.success = false;
        errorResult.usernameMessage = "Username is not specified";
    }
    if (password.length === 0) {
        errorResult.success = false;
        errorResult.passwordMessage = "Password is not specified";
    }
    if (password !== repeatedPassword) {
        errorResult.success = false;
        errorResult.repeatedPasswordMessage = "You should repeat password";
    }

    if (errorResult.success === false) {
        return errorResult;
    }

    return {
        success: true
    }
}

module.exports = validateRegistrationData;