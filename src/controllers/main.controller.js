module.exports = {
    renderMainPage: (req, res) => {
        try {
            res.status(200).render('main');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
