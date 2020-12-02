module.exports = {
    getError: (req, res) => {
        try {
            res.status(200).render('err-page');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
};
