import React from "react";

function Card(props) {
    return (
        <div>
            <h3>Hola {props.name}! Este es tu pokémon favorito:</h3>
            <h4>¿Sabías qué tu pokémon favorito pesa: {props.weight/10} Kilogramos? Increíble!!</h4>
            <img src={props.imageUrl} alt={props.pokemonName} />
        </div>
    );
}

export default Card;