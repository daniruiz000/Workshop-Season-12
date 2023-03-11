import React from 'react';
import './App.css';
import ImageBrowser from './components/ImageBrowser/ImageBrowser';


export const ThemeContext = React.createContext();

const themes = {
  colorfull: {
      name: "colorfull",
      background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
      fontColor: "white",
  },
  normal: {
      name: "normal",
      background: "#FFFF",
      fontColor: "black",
  }
}

function App() {

  const [themeState, setThemeState] = React.useState(themes.colorfull);

  return (
    <div className="app">
      <ThemeContext.Provider value={themeState}>
      <button className="app__button" onClick={()=> setThemeState(themeState === themes.normal ? themes.colorfull : themes.normal)}>Cambiar Tema</button>
        <ImageBrowser />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
