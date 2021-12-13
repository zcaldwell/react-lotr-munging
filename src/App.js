import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import CharacterList from './components/Characters/CharacterList';
import FilmList from './components/Films/FilmList';

function App() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getFilms();
    getCharacters();
  }, []);

  const getFilms = async () => {
    // Add your code here!
    // 1. Get data using fetch from https://the-one-api.dev/v2/movie/ (don't forget to set your header!)
    // 2. Transform the response so that films contains nested arrays of:
    //   - the film's title
    //   - the film's title "slugified" i.e. in all lower case, with words separated with dashes,
    //   - the box office total
    //   - academy award nominations
    // NOTE: make sure you look at the response from the server - it may not be consistent
    // [["The Lord of the Rings Series", "the-lord-of-the-rings-series", 2917, 30 ], ["The Hobbit Series", "the-hobit-series", 2932, 7]...]

    // 3. Set the resulting transformation as state using setFilms
    // 4. You'll know it works if the films show up on the page
    const resp = await fetch('https://the-one-api.dev/v2/movie/', {
      headers: {
        Authorization: `Bearer KDa_JXiFTIdn9qS0E7wU`,
      },
    });
    const data = await resp.json();
    console.log(data);
    const munged = data.docs.map((film) => [
      film.name,
      film.name.trim().toLowerCase().split(' ').join('-'),
      film.boxOfficeRevenueInMillions,
      film.academyAwareNominations,
    ]);
    setFilms(munged);
  };

  const getCharacters = async () => {
    // Add your code here!
    // 1. Get data using fetch from https://the-one-api.dev/v2/character/
    // 2. Update the response data with the key `dates` which is a combination of
    //    the `birth` key and the `death key` separated with a dash. If neither date
    //    is provided, it should hold the string 'Unknown'
    //    [
    //       {name: 'Adanel', birth: "", death: "", dates: "Unknown", ...},
    //       {name: 'Adrahil I', birth: "Before , TA 1944", death: "Late , Third Age", dates: "Before , TA 1944 - Late , Third Age", ...},
    //       {name: 'Adrahil II', birth: "TA 2917", death: "TA 3010, dates: "TA 2917 - TA 3010", ...},
    //    ]
    // 3. Set the resulting transformation as state using setCharacters
    // 4. You'll know it works if the characters show up on the page
    const resp = await fetch('https://the-one-api.dev/v2/character/', {
      headers: {
        Authorization: `Bearer KDa_JXiFTIdn9qS0E7wU`,
      },
    });
    const data = await resp.json();
    const munged = data.docs.map((item) => ({
      ...item,
      dates: item.birth && item.death ? `${item.brirth} - ${item.death}` : `Unknown`,
    }));
    setCharacters(munged);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavLink to="/films" data-testid="film-link">
            Films
          </NavLink>
          <NavLink to="/characters" data-testid="char-link">
            Characters
          </NavLink>
        </header>
        <Switch>
          <Route path="/characters" exact>
            <h1>Characters</h1>
            <CharacterList characters={characters} />
          </Route>
          <Route path="/films" exact>
            <h1>Films</h1>
            <FilmList films={films} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
