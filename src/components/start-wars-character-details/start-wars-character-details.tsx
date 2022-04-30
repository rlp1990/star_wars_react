import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Connection from '../../api/api-hooks';
import { StarWarsCharacter } from "../star-wars-characters/start-wars-characters-types";

const API_URL: string = 'people';

export function StarWarsCharacterDetails() {

    /**
     * @param {StarWarsCharacter} starWarsCharacter 
     * Handle the Star wars character object
     */
    const [starWarsCharacter, setStarWarsCharacter] = useState<StarWarsCharacter>();

    // Get the id from the URL params
    const { id } = useParams();

    // On init, once Star wars character id is fetched from url: Make request
    useEffect(() => {
        if (!id) {
            throw new Error("Missing Id");
        }
        const connection = new Connection();
        connection.doGet(`${API_URL}/${id}`, (response: StarWarsCharacter) => {
            setStarWarsCharacter(response);
        },
        (error: Error) => {
            console.log(error);
        });
    }, [id]);

    return (
        <>
        <Link to={'/'}>Back to main list</Link>
        <div></div>
        </>
    );
}