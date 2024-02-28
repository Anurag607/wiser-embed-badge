import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar as setShowSidebar, toggleBottomSidebar as setShowBottomBar, setCurrentBadge } from "../redux/drawerSlice.mjs";
import BadgeCarousel from './BadgeCarousel.jsx';
import verifiedBadge from "../assets/VerifiedBadge.svg";
import { useWindowSize } from '../helper.mjs';

const VerfiedContainer = ({ tags, url }) => {
    const dispatch = useDispatch();
    const [width, height] = useWindowSize();
    const [seeAll, setSeeAll] = useState(false);
    const [tagItems, setTagItems] = useState([]);
    const [tagItemCount, setTagItemCount] = useState(0);

    useEffect(() => {
        setTagItems(seeAll ? tags : tags.slice(0, width <= 531 ? 1 : 2));
        setTagItemCount(tags.length);
    }, [tags, url]);

    useEffect(() => {
        setTagItems(seeAll ? tags : tags.slice(0, width <= 531 ? 1 : 2));
    }, [seeAll, width]);

    return (
        <div className="h-full w-full flex flex-col gap-4 justify-start items-start relative rounded-lg border-[1.5px] border-[#F2F2F2] mobile:p-1.5 p-2.5 hover:shadow-md transition-all">
            <div className="flex items-center justify-start text-lg font-medium leading-6 text-neutral-800 line-clamp-2 capitalize">
                <img loading="lazy" src={verifiedBadge} alt="Ecowiser Verified" className="h-[32px] inline-block mr-1.5" />
                <div className={"flex flex-col items-start justify-start"}>
                    <p>{"Ecowiser Verified"}</p>
                    <a 
                        href={url}
                        target={"_blank"}
                        className={"text-xs text-neutral-500 font-normal hover:underline transition-all"}
                    >
                        {"Click here for more details."}
                    </a>
                </div>
            </div>

            <BadgeCarousel seeAll={seeAll}>
                {tagItems.map((tag, index) => {
                    return (
                        <div
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(setShowBottomBar([true, tag]));
                                dispatch(setShowSidebar([true, tag]));
                                dispatch(setCurrentBadge(tag));
                            }}
                            className={`flex cursor-pointer whitespace-nowrap rounded-full border py-1 pl-1.5 pr-2 text-xs font-medium duration-200 items-center text-neutral-600 gap-x-1 min-w-max z-[100]`}
                        >
                            <img loading="lazy" src={tag.image_url} alt={tag.name} className="h-3.5" />
                            {tag.name}
                        </div>
                    )
                })}
                {tagItemCount > 1 && !seeAll && (
                    <div
                        onClick={() => setSeeAll(true)}
                        className={`flex flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border py-1 pl-1.5 pr-2 text-xs font-medium tracking-wide duration-200  items-center text-neutral-600 gap-x-1 min-w-max z-[100]`}
                    >
                        {`+ ${tagItemCount - (width <= 531 ? 1 : 2)} More`}
                    </div>
                )}
            </BadgeCarousel>
        </div>
    );
};

export default VerfiedContainer;