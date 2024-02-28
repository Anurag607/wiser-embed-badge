import { useState, useEffect } from 'react';
import OffCanvasPopup from "./Popup/OffCanvasPopup.jsx";
import VerfiedContainer from "./VerfiedContainer";
import { badgeDetails } from './helper.mjs';  
import { useDispatch } from 'react-redux';
import { setAllBadges, setBrandUrl } from './redux/drawerSlice.mjs';

function App() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const ecowiserVerified = document.querySelector("#ecowiser-verified");
    const url = ecowiserVerified.dataset.url;
    let tags = ecowiserVerified.dataset.badges.replace("Low Carbon", "Offsets Carbon").split(', ');
    tags = tags.map((el, _) => { return el.toLowerCase(); });
    let badges = [];
    badgeDetails.forEach((category, _) => {
      category.badges.forEach((badge, _) => {
        if(tags.includes(badge.name.toLowerCase())) badges.push(badge);
      })
    });

    setUrl(url);
    setBadges(badges);
    dispatch(setAllBadges(badges));
    dispatch(setBrandUrl(url));
  }, []);

  return (
    <>
      <OffCanvasPopup />
      <div className={"relative rubik w-screen h-screen flex flex-col items-center justify-center"}>
        <div className={"relative mobile:w-[95%] w-[28rem] h-fit mx-auto px-auto"}>
          <div className={`relative w-full grid place-items-center gap-2 rounded-md shadow-sm border p-2.5`}>
            <div className="relative h-fit w-full mx-auto">
              <VerfiedContainer tags={badges} url={url} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
