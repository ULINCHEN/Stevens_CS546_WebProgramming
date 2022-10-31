//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

let checkId = (id) => {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0) throw 'Error: id cannot be an empty string or just spaces';
    if (id.charAt(0) == 0) throw 'Error: id should not start with 0'
    if (isNaN(id) == true) throw 'Error: id should be a valid number'
    id = Number(id);
    if (id <= 0) throw 'Error: id should not smaller than 1'
    if (id % 1 != 0) throw 'Error: id should be a whole number'
    return id;
}

module.exports = { checkId };