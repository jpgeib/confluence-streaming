const db = require("../../config");
const { testCall } = require("../../models/test");

module.exports = {
    test: (req, res) => {
        try {
            console.log("Test route is working");
            db.query(testCall, (err, data) => {
                if (err) return res.json(err);
                res.json(data);
                console.log(data);
            });
        } catch (err) {
            console.log(err);
        };
    }
};