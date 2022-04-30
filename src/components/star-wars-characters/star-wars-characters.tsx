import { useEffect, useState } from "react";
import Connection from "../../api/api-hooks";
import { StarWarsCharacterCard } from "../star-wars-character-card/star-wars-character-card";
import { StarWarsCharacter, StarWarsCharactersResponse } from "./start-wars-characters-types";

const API_URL: string = "people";

export default function StarWarsCharacters() {

  /**
   * @param {number} page The page number for the items to display
   */
  const [page, setPage] = useState<number>(1);

  /**
   * @param {StarWarsCharacter[]} starWarsCharacters List of Star wars characters
   */
  const [starWarsCharacters, setStarWarsCharacters] =
    useState<StarWarsCharacter[]>();

    /**
     * Method to get the ID of the star wars character
     * @param {String} url path for the star wars character request 
     */
  const getStartWarsCharacterId = (url: string): number => {
    const urlSplitted = url.split("/");
    return Number(urlSplitted[urlSplitted.length - 2]);
  };

  /**
   * Method to make request (GET) and fetch Star wars characters
   */
  const fetchStarWarsCharacters = (): void => {
    const connection = new Connection();
    connection.setDoGetParams({ page: page });
    connection.doGet(
      API_URL,
      (response: StarWarsCharactersResponse) => {
        const starWarsCharactersResponse: StarWarsCharacter[] =
          response.results;
        page === 1
          ? setStarWarsCharacters(starWarsCharactersResponse)
          : setStarWarsCharacters(
              starWarsCharacters?.concat(starWarsCharactersResponse)
            );
      },
      (error: Error) => {
        console.log(error);
      }
    );
  };

  /**
   * Method to load more Star wars Characters by page
   */
  const fetchMoreStarWarsCharacters = (): void => {
    setPage(page + 1);
    fetchStarWarsCharacters();
  };

  // At the beginning: Fetch first page of element list
  useEffect(() => {
    fetchMoreStarWarsCharacters();
  }, []);

  return (
    <>
      <div className="star-wars-character-container">
        {starWarsCharacters?.map(starWarsCharacter => {
            return (
            <StarWarsCharacterCard 
                key={starWarsCharacter.name}
                name={starWarsCharacter.name}
                filmsNumber={starWarsCharacter.films.length}
                birthYear={starWarsCharacter.birth_year}
                id={getStartWarsCharacterId(starWarsCharacter.url)}
                />)
        })}
      </div>
      <button onClick={() => fetchMoreStarWarsCharacters()}>Load more</button>
    </>
  );
}
