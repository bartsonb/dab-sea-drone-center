let random = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
};

module.exports = (req, res, next) => {
    setTimeout(next, random(700, 1300));
};