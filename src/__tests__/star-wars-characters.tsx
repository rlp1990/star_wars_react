import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { starWarsCharactersFetcher } from "../components/star-wars-characters/fetch-star-wars-characters";
import StarWarsCharacters from "../components/star-wars-characters/star-wars-characters";
import { StarWarsCharacter } from "../components/types/star-wars-characters-types";

const fetchStarWarsCharacters = jest.fn();

describe("<star-wars-characters> view", () => {
  // Correct title format
  test("<h1>Star Wars Characters</h1> Title in document", () => {
    render(<StarWarsCharacters />);
    const title = screen.getByTestId("star-wars-characters-title");
    expect(title.tagName).toBe("H1");
    expect(title.textContent).toBe("Star Wars Characters");
  });

  // Check method {fetchStarWarsCharacters} is correctly fetching data
  xit("<star-wars-character-card> Api calls work", async () => {
    render(<StarWarsCharacters />);
    const fakeSWData: StarWarsCharacter[] = [
      { name: "Luke Skywalker", birth_year: "1990", films: [], url: "http" },
    ];
    const fetcherPromise = Promise.resolve(fakeSWData);
    const fetch = jest.fn(() => fetcherPromise);
    fetchStarWarsCharacters.mockResolvedValueOnce(fetch);
    const useStarWarsCharactersSpy = jest
      .spyOn(starWarsCharactersFetcher, "useStarWarsCharacters")
      .mockReturnValue(fetcherPromise);
    await screen.findAllByTestId("Luke Skywalker");
    expect(useStarWarsCharactersSpy).toBeCalled();
  });

  // Check method {fetchStarWarsCharacters} is correctly fetching data
  xit("<star-wars-character-card> Fetched cards", async () => {
    render(<StarWarsCharacters />);
    const cardElements = await waitFor(
      () => screen.findByText("Luke Skywalker"),
      {
        timeout: 3000,
      }
    );
    expect(cardElements).toBeInTheDocument();
  });
});
