import { render } from '@testing-library/react';
import StarWarsCharacterCard, { Props } from '../components/star-wars-character-card/star-wars-character-card';

test('<star-wars-character-card> Props', () => {
  const mockStarWarsCharacterCards: Props = { id: 1, name: "Obi", filmsNumber: 3, birthYear: "1900" };
  // render(<StarWarsCharacterCard {...mockStarWarsCharacterCards}  />);
  // render(<StarWarsCharacterCard/>);
});