import Connection from "../../api/api-hooks";
import {
  StarWarsCharacter,
  StarWarsCharactersResponse,
} from "../types/star-wars-characters-types";

const API_URL: string = "people";

/**
 * Method to make request (GET) and fetch Star wars characters
 * @param {Number} page The page number
 */
export default function fetchStarWarsCharacters(
  page: number
): Promise<StarWarsCharacter[]> {
  const connection = new Connection();
  connection.setDoGetParams({ page: page });
  return connection.doGet(
    API_URL,
    (response: StarWarsCharactersResponse) => {
      return response.results;
    },
    (error: Error) => {
      console.log(error);
    }
  );
}

/**
 * Object to test with jest
 */
export const starWarsCharactersFetcher = {
  useStarWarsCharacters(page: number) {
    return fetchStarWarsCharacters(page);
  },
};
