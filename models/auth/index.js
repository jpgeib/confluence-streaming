let database;

if (process.env.NODE_ENV === "production") {
    database = process.env.PROD_DB_NAME;
} else if (process.env.NODE_ENV === "development") {
    database = process.env.DEV_DB_NAME;
}

const getUserByEmail = `SELECT * FROM ${database}.users WHERE email = ?`;
const getUserById = `SELECT * FROM ${database}.users WHERE user_id = ?`;
const getUserIds = `SELECT user_id FROM ${database}.users`;
const setUserData = `INSERT INTO ${database}.users (user_id, first_name, last_name, email, password) VALUES (?)`;
const getUser = `SELECT * FROM ${database}.users WHERE email = ? OR (first_name = ? AND last_name = ?)`;
const resetUserPassword = `UPDATE ${database}.users SET password = ? WHERE id = ?`;

module.exports = {
    getUserByEmail,
    getUserById,
    getUserIds,
    setUserData,
    getUser,
    resetUserPassword
};