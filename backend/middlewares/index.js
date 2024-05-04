function auth(req, res, next) {
    const { username, password, category } = req.body;
    const hardcodedCredentials = {
        admin: { username: 'admin', password: 'admin' },
        parent: { username: 'parent', password: 'parent' },
        student: { username: 'student', password: 'student' }
    };

    const credentialsMatch = hardcodedCredentials[category] &&
        username === hardcodedCredentials[category].username &&
        password === hardcodedCredentials[category].password;

    if (credentialsMatch) {
        res.json({
            msg: "Logged in Successfully"
        });
        next();
    } else {
        res.json({
            msg: "Incorrect credentials"
        });
    }
}

module.exports = auth;
