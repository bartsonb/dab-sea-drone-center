// @route   GET api/utility/commands
// @returns Array of available commands
exports.commands = (req, res) => {
    res.json([
        'STOP',
        'RETURN',
        'SEARCH'
    ]);
};