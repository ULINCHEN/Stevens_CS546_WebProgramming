//Your data modules to make the Axios calls and get the data

const axios = require('axios');

const pokemon = async () => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        return response;

    } catch (error) {
        throw ("Didn't find pokemon");
    }
};

const pokemonById = async (id) => {
    try {
        const response = await axios.get(` https://pokeapi.co/api/v2/pokemon/${id}`);
        return response;

    } catch (error) {
        throw (`Didn't find pokemon with id:${id}`);
    }
};

module.exports = { pokemon, pokemonById };