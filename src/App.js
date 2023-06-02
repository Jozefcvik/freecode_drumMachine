import { useState, useEffect } from 'react';
import './App.scss';
import data from './data.js'


function App() {

  const [pressedKey, setPressedKey] = useState('');
  const [animStatus, setAnimStatus] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const keyTemp = event.key.toUpperCase();
      setPressedKey(keyTemp);
      setAnimStatus(true);
      if (data.find(d => d.text === keyTemp)) playPad(keyTemp);
    })
  }, []);

  function playPad(selectPad) {
    const audio = document.getElementById(selectPad);
    audio.play();
  }

  return (
    <div id="drum-machine">
      <img id="imgFreeCode" src="https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg" alt="FreeCode Logo" width="300px" />
      <div
        id={animStatus ? "display-animation" : "display-default"}
        onAnimationEnd={() => setAnimStatus(false)}
      ><div id="display">{pressedKey}</div>
      </div>
      <div id="drumPads">
        {data.map((pad) => {
          return (
            <div
              key={pad.src}
              className="drum-pad"
              id={pad.src}
              onClick={() => {
                setPressedKey(pad.text);
                setAnimStatus(true);
                playPad(pad.text);
              }}
            >{pad.text}
              <audio
                className="clip"
                id={pad.text}
                src={pad.src}
              ></audio>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
