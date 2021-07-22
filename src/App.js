import React from 'react';
import { useSelector } from 'react-redux';
import { selectPalette } from './features/color/colorSlice';

import ColorBox from './features/color/ColorBox';
import Picker from './Picker';
import './App.css'

function App() {
  const palette = useSelector(selectPalette)

  return (
    <div className="container">
      <div className="container__content">
        {Array(2).fill(0).map((a, i) => {
          return <ColorBox val={i} key={i}/>
        })}
      </div>
      <div className="container__sidebar">
        <Picker />
      </div>
    </div>
  );
}

export default App;
