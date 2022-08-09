import { useEffect, useRef, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Table from './components/table';
import bir from './components/bir.json';
import ikki from './components/ikki.json';

function App() {
  const inputRef = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState();
  const [z_index, setZ_index] = useState(1);

  const onHandler = (e) => {
    // console.log(e);

    if (!e.target.hasAttribute('disabled')) {
      setOpacity(1);
      setZ_index(-1);
      setPosition(e);
      inputRef.current.blur();
      inputRef.current.value = String(e.target.innerHTML);
    } else {
      setOpacity(0);
    }
  };

  const onChange = () => {
    if (position.target.getAttribute('readonly')) {
      position.target.innerHTML = inputRef.current.value;
    }
  };

  const clearPosition = (e) => {
    setPosition(null);
    setOpacity(0);
  };

  const zoomBlur = (e) => {
    // e.target.style.width = `${(position?.target?.innerHTML.length + 1) * 7}px`;
    console.log(e.pageY, ' page');
    console.log(e.clientY, ' client');
    console.log(e.screenY, ' screen');
  };

  const clearZoom = (e) => {
    e.target.style.width = `${
      position?.nativeEvent?.srcElement?.clientWidth - 5
    }px`;
  };

  useEffect(() => {
    document.addEventListener('click', zoomBlur);
    // document.addEventListener('click', clearZoom);
  }, []);

  return (
    <div>
      <nav>
        <Link onClick={(e) => clearPosition(e)} style={{ margin: 40 }} to="/">
          1-BOB
        </Link>
        <Link
          onClick={(e) => clearPosition(e)}
          style={{ margin: 10 }}
          to="ikki"
        >
          2-BOB
        </Link>
      </nav>
      <div
        className="App"
        onClick={(e) => onHandler(e)}
        style={{ zIndex: z_index }}
      >
        <Routes>
          <Route path="/" element={<Table data={bir} />} />
          <Route path="ikki" element={<Table data={ikki} />} />
        </Routes>
      </div>
      <input
        ref={inputRef}
        onChange={onChange}
        // onClick={(e) => clearZoom(e)}
        // onDoubleClick={(e) => zoomBlur(e)}
        type={`${position?.target?.getAttribute('type') || 'text'}`}
        style={{
          backgroundColor: `${
            position?.target?.style?.backgroundColor || 'white'
          }`,
          opacity: opacity,
          position: 'absolute',
          top: `${position?.pageY - position?.nativeEvent?.offsetY}px`,
          left: `${position?.pageX - position?.nativeEvent?.offsetX}px`,
          height: 0 || position?.nativeEvent?.srcElement?.clientHeight - 3,
          minWidth: `${position?.nativeEvent?.srcElement?.clientWidth - 5}px`,
          // width: `${(position?.target?.innerHTML.length + 1) * 7}px`,
          maxWidth: '1200px',
          border: '1px solid blue',
          zIndex: 2,
          borderRadius: '0px',
          transform: 'scale(1.01)',
        }}
      />
    </div>
  );
}

export default App;
