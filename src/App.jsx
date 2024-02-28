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
      <VerfiedContainer tags={badges} url={url} />
    </>
  )
}

// const SampleWrapper = ({children}) => {
//   return (
//     <div className={"relative rubik w-screen h-screen flex flex-col items-center justify-center"}>
//       <div className={"relative mobile:w-[95%] w-[28rem] h-fit grid place-items-center"}>
//           {children}
//       </div>
//     </div>
//   )
// }

export default App;
