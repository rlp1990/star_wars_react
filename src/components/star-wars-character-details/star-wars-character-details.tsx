import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Connection from "../../api/api-hooks";
import {
  StarWarsCharacter,
  StarWarsCharacterFilms,
} from "../types/star-wars-characters-types";
import "./star-wars-character-details.css";

const API_URL: { [key: string]: string } = {
  people: "people",
  films: "films",
};

export function StarWarsCharacterDetails() {
  /**
   * Method to calculate how many years since film release date
   * @param {String} filmReleaseDateString Film release date
   * @returns {Number} Number of years from film release date
   */
  const getFilmAge = (filmReleaseDateString: string): number => {
    const filmReleaseData = new Date(filmReleaseDateString);
    return new Date().getFullYear() - filmReleaseData.getFullYear();
  };

  /**
   * Method to retrieve Star wars character film data
   * @param {String} filmUrl endpoint to retrieve film data
   */
  const getStarWarsCharacterFilm = (
    filmUrl: string
  ): Promise<StarWarsCharacterFilms> => {

    // Get the film ID from film URL
    const splittedUrl = filmUrl.split("/");
    const filmId = splittedUrl[splittedUrl.length - 2];

    // Request film data
    const connection = new Connection();
    return connection.doGet(
      `${API_URL.films}/${filmId}`,
      (response: StarWarsCharacterFilms) => {
        return response;
      },
      (error: Error) => {
        // Handle error according to requirements in page
        console.log(error);
      }
    );
  };

  /**
   * @param {StarWarsCharacter} starWarsCharacter
   * Handle the Star wars character object
   */
  const [starWarsCharacter, setStarWarsCharacter] =
    useState<StarWarsCharacter>();

  /**
   * @param {StarWarsCharacterFilms[]} starWarsCharacterFilms List of Star wars character films
   */
  const [starWarsCharacterFilms, setStarWarsCharacterFilms] = useState<
    StarWarsCharacterFilms[]
  >([]);

  // Get the id from the URL params
  const { id } = useParams();

  // On init, once Star wars character id is fetched from url: Make request
  useEffect(() => {
    if (!id) {
      throw new Error("Missing Id");
    }

    // Request data for Star wars character
    const connection = new Connection();
    connection.doGet(
      `${API_URL.people}/${id}`,
      (response: StarWarsCharacter) => {
        setStarWarsCharacter(response);

        // Get all film details from film list
        Promise.all(
          response.films.flatMap((film) => {
            return getStarWarsCharacterFilm(film);
          })
        ).then((response: StarWarsCharacterFilms[]) => {
          setStarWarsCharacterFilms(response);
        });
      },
      (error: Error) => {
        // Handle error according to requirements in page
        console.log(error);
      }
    );
  }, [id]);

  return (
    <div className="star-wars-character-details-container">
      <Link className="star-wars-character-details-container__button" to={"/"}>
        <img
          src={require("../../assets/left_arrow.png")}
          alt="Back to main list"
        />
        <h3>Back to main list</h3>
      </Link>
      <h1 className="star-wars-character-details-container__title">
        {starWarsCharacter?.name}
      </h1>
      <div className="star-wars-character-details-container__body">
        <ul className="star-wars-character-details-container__body-attributes">
          <li key={"height"}>Height: {starWarsCharacter?.height}cm</li>
          <li key={"gender"}>
            Gender:{" "}
            <span className="capitalize">{starWarsCharacter?.gender}</span>
          </li>
          <li key={"mass"}>Mass: {starWarsCharacter?.mass}Kg</li>
          <li key={"hair_color"}>
            Hair color:{" "}
            <span className="capitalize">{starWarsCharacter?.hair_color}</span>
          </li>
          <li key={"eye_color"}>
            Eye color:{" "}
            <span className="capitalize">{starWarsCharacter?.eye_color}</span>
          </li>
          <li key={"skin_color"}>
            Skin color:{" "}
            <span className="capitalize">{starWarsCharacter?.skin_color}</span>
          </li>
          <li key={"birth_year"}>
            Birth year: {starWarsCharacter?.birth_year}
          </li>
        </ul>

        <ul className="star-wars-character-details-container__body-films">
          <h2 className="star-wars-character-details-container__body-films-title">
            {starWarsCharacter?.films.length} Films
          </h2>
          {starWarsCharacterFilms?.map((film) => {
            return (
              <li key={film.title}>
                {film.title}: {getFilmAge(film.release_date)} years ago
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
