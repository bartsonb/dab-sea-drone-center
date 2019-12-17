// @route   GET api/utility/commands
exports.commands = (req, res) => {
    res.json([
        'MOVE_STRAIGHT',
        'MOVE_LEFT',
        'MOVE_RIGHT',
        'STOP',
        'RETURN_HOME'
    ]);
};