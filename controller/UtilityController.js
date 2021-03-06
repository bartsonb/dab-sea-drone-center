const Command = require('../models/Command');

/**
 * @name    Commands
 * @route   GET /api/utility/commands
 * @returns Array of available commands
 */
exports.commands = (req, res) => {
    Command.find(
        {},
        '-_id -__v',
        (error, commands) => {
            return res.send(commands.map(command => command.name));
        });
};

/**
 * @name    Online
 * @route   GET /api/online/
 * @returns True, if service is online
 */
exports.online = (req, res) => {
    res.json({
        success: true
    });
};