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
      <div id="ecowiser-verified" data-url="https://wiser.eco/brands/category/Clothing%20and%20Accessories/944" data-badges="Certified Organic, Low Carbon, Sustainable Materials, Sustainable Packaging, Promotes Circularity, Low Waste"></div>
      {ecowiserVerified ? createPortal(<Widget />, ecowiserVerified) : <></>}
    </>
  )
}

export default App