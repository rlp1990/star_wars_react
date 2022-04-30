import { Link } from 'react-router-dom';

export function StarWarsCharacterCard({name, filmsNumber, birthYear, id}: 
    {name: string, filmsNumber: number, birthYear: string, id: number}) {
  return <div>
      <Link to={`./start-wars-character-details/${id}`}>{name}</Link>
  </div>;
}
