import React, { useState } from 'react';
import Card from './Card';

function PokemonForm() {
    const [name, setName] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [pokeWeight, setpokeWeight] = useState('');
    const [nameError, setNameError] = useState('');
    const [pokemonNameError, setPokemonNameError] = useState('');

    const handleSubmit =  async (event) => {
        event.preventDefault();
        setNameError('');
        setPokemonNameError('');
        const regex = /^[a-zA-Z]+(?:\s?[a-zA-Z]+)*$/;
        const regexPokemon = /^[a-zA-Z]{6,}$/;

        if (name.length < 3 || !regex.test(name)||!regexPokemon.test(pokemonName)) {
            if (name.length < 3 || !regex.test(name)) {
                setNameError('Por favor chequea que la información sea correcta.');
            } 
            if (!regexPokemon.test(pokemonName)) {
                setPokemonNameError('Por favor chequea que la información sea correcta.');
            }        
        } else{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            setImageUrl(data.sprites.other.dream_world.front_default);
            setpokeWeight(data.weight);
        }  
        
    }

    const handleNameChange = (event) => {
        const inputName = event.target.value;
        setName(inputName);
    };

    const handlePokemonNameChange = (event) => {
        const inputPokemonName = event.target.value.trim();
        setPokemonName(inputPokemonName);
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={handleNameChange} />
                    <br />
                    {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
                </label>
                <br />
                <label>
                    Pokémon favorito:
                    <input type="text" value={pokemonName} onChange={handlePokemonNameChange} />
                    <br />
                    {pokemonNameError && <span style={{ color: 'red' }}>{pokemonNameError}</span>}
                </label>
                <br />
                <button type="submit"> Enviar <i class="fas fa-chevron-right"></i>
                </button>

            </form>
            {imageUrl && <Card imageUrl={imageUrl} pokemonName={pokemonName} name={name} weight={pokeWeight} />}
        </div>
    );

}

export default PokemonForm;