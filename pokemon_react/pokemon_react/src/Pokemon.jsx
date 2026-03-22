import React, { useEffect, useState } from 'react'
import './index.css'
import { PokemonCards } from "./PokemonCards"

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            const detailPokemonData = data.results.map(async (currPokemon) => {
                const res = await fetch(currPokemon.url);
                const data = await res.json();
                return data;
            });
            const detailResponse = await Promise.all(detailPokemonData);
            setPokemon(detailResponse);
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchPokemon()
    }, []);

    const searchPokemon= pokemon.filter((currPokemon)=>currPokemon.name.toLowerCase().includes(search.toLowerCase()))

    if (loading) {
        return (
            <h1>Loading.....</h1>
        )
    }

    return (
        <>
            <section>
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>
                <div className="pokemon-search">
                    <input
                        type="text"
                        placeholder="Search Pokémon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <ul className="cards">
                        {
                            searchPokemon.map((curr) => {
                                return (
                                    <PokemonCards key={curr.id} pokemonData={curr} />
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

