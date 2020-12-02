let currentUserEmail = '';

module.exports = {
    currentUserEmail,
    currentUserHandler: (email) => {
        currentUserEmail = email;
    }
};
