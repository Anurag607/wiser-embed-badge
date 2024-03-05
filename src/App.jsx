import { useState, useEffect } from "react";
import Widget from './Widget';
import { createPortal } from 'react-dom';

const App = () => {
  const [ecowiserVerified, setEcowiserVerified] = useState(null);

  useEffect(() => {
    setEcowiserVerified(document.querySelector("#ecowiser-verified"));
  }, []);

  return (
    <>
      {ecowiserVerified ? createPortal(<Widget />, ecowiserVerified) : <></>}
    </>
  )
}

export default App