import { Link } from 'react-router-dom';
import './star-wars-character-card.css';

export type Props = {
  name: string;
  filmsNumber: number;
  birthYear: string;
  id: number;
}

export function StarWarsCharacterCard({name, filmsNumber, birthYear, id}: Props) {
  return (
  <div className='star-wars-character-card'>
      <Link to={`./start-wars-character-details/${id}`}><h2>{name}</h2></Link>
      <div className='star-wars-character-card__details'>
        <h4>{filmsNumber} films</h4>
        <h4>Birth year: {birthYear}</h4>
      </div>
  </div>);
}
