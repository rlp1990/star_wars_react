export type StarWarsCharactersResponse = {
    count?: number;
    next?: string;
    previous?: string;
    results: StarWarsCharacter[]
}

export type StarWarsCharacter = {
    name: string;
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year: string;
    gender?: string;
    homeworld?: string;
    films: string[];
    species?: string[];
    vehicles?: string[];
    startships?: string[];
    created?: string;
    edited?: string;
    url: string;
}

export type StarWarsCharacterFilms = {
    title: string;
    release_date: string;
}