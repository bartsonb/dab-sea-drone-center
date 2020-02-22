/**
 * @desc    Removes all keys in the given object that are not listed in the given array.
 * @param   validKeys: array
 * @param   object: object
 * @returns Object
 */
exports.only = (validKeys, object) => {
    let newObject = {};

    Object.keys(object.toJSON()).forEach(key => {
        if (validKeys.includes(key)) newObject[key] = object[key]
    });

    return newObject;
};

/**
 * @desc    Removes all keys in the given object that are listed in the given array.
 * @param   validKeys: array
 * @param   object: object
 * @returns Object
 */
exports.except = (validKeys, object) => {
    let newObject = {};

    Object.keys(object.toJSON()).forEach(key => {
        if (!validKeys.includes(key)) newObject[key] = object[key]
    });

    return newObject;
};