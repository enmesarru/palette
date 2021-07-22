import React from 'react';
import { useSelector } from 'react-redux';
import { selectPalette } from './features/color/colorSlice';

import ColorBox from './features/color/ColorBox';
import Picker from './features/sidebar/Picker';
import './App.css'
import GridGenerator from './features/sidebar/GridGenerator';

function App() {
  const palette = useSelector(selectPalette)

  return (
    <div className="container">
      <div className="container__content">
        {palette.map((a, i) => {
          return <ColorBox val={i} key={i}/>
        })}
      </div>
      <div className="container__sidebar">
        <Picker />
        <GridGenerator />
      </div>
    </div>
  );
}

export default App;
