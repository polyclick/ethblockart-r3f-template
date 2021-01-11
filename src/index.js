import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import blocks from './blocks';
import CustomStyle from './CustomStyle';
import { Canvas } from 'react-three-fiber';
import Sidebar from './components/Sidebar';

function App() {
  const gl = useRef(null);
  const attributesRef = useRef();

  /*
  Wrapped Component required to make p5 demos compatible with EthBlock.art
  As a creative coder, in this file you can:
    - Swap between block data by changing `defaultBlockNumber` (1, 2 or 3)
    - Change the default background color `defaultBackgroundColor`
    - Dynamically add mods & colors in `defaultMods`
  For the rest, you can ignore this file, check CustomStyle.js
  */
 const defaultBlockNumber = 2;
 const defaultBackgroundColor = '#cccccc';

 /*
 Add and remove value/color mods here.
 Keep ids in line with naming convention. All lowercase.
 Value mods should be named `mod1`, `mod2`, `mod3`, ...
 Color mods should be named `color1`, `color2`, ...
 */
 const defaultMods = [
   { id: `mod1`, value: 0.75 },
   { id: `mod2`, value: 0.25 },
   // { id: `mod3`, value: 0.25 },
   // { id: `mod4`, value: 0.25 },
   { id: `color1`, value: `#ff0000` },
   // { id: `color2`, value: `#00ff00` },
   // { id: `color3`, value: `#0000ff` }
 ]

 const [blockNumber, setBlockNumber] = useState(defaultBlockNumber);
 const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
 const [mods, setMods] = useState(defaultMods)

 const onModChange = (modsSetFunction, id, val) => {
   mods.find(m => m.id === id).value = val
   modsSetFunction([...mods])
 }

 const modsAsAttributes = () => {
   return mods.reduce((acc, m) => {
     acc[m.id] = m.value
     return acc
   }, {})
 }

 const [customAttribs, setCustomAttribs] = useState([]);
 function setAttribs(attributes) {
   setCustomAttribs(attributes)
 }


  useEffect(() => {
    console.log('wtd');
    if (gl.current && backgroundColor) {
      gl.current.setClearColor(backgroundColor);
    }
  }, [backgroundColor, gl]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flexGrow: 1 }}>
        <div
          style={{
            margin: '0 auto',
            marginTop: '64px',
            width: '60vw',
            height: '60vw',
          }}
        >
          <h3>EthBlock.art react-three-fiber boilerplate</h3>

          <Canvas
            key="canvas"
            invalidateFrameloop
            colorManagement
            orthographic
            camera={{ zoom: 300, position: [0, 0, 100] }}
            gl={{ preserveDrawingBuffer: true }}
            onCreated={(context) => {
              // canvasRef.current = context.gl.domElement;
              gl.current = context.gl;
              gl.current.setClearColor(backgroundColor);
            }}
            pixelRatio={window.devicePixelRatio}
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <CustomStyle
              block={blocks[blockNumber - 1]}
              // background={backgroundColor}
              attributesRef={attributesRef}
              { ...modsAsAttributes() }
              attribsCallback={setAttribs}
            />
          </Canvas>
        </div>
      </div>

      {<Sidebar
        blocks={blocks}
        blockNumber={blockNumber}
        mods={mods}
        customAttribs={customAttribs}
        backgroundColor={backgroundColor}
        handleBlockChange={(e) => setBlockNumber(e) }
        handleBackgroundChange={(e) => setBackgroundColor(e) }
        handleModChange={(id, val) => onModChange(setMods, id, val)}
      />}
    </div>
  );
}

// export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
