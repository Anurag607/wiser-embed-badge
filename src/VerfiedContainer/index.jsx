import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar as setShowSidebar, toggleBottomSidebar as setShowBottomBar, setCurrentBadge } from "../redux/drawerSlice.mjs";
import BadgeCarousel from './BadgeCarousel.jsx';
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
                <img loading="lazy" src={"https://bezen-production-bucket.s3.us-east-1.amazonaws.com/embed/VerifiedBadge.svg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEA3EpgaRnMbodkUBNsqTuYAeepBG8jjGEeeORNn%2F7viawCIQC8FZc4M32Ve5dE4CWX%2FzyzqCH3qj8AS9LPUZa7gUm3Nir9AghyEAEaDDk5OTIwMDQ0OTgwMSIMOS30TADxrqd4lVsLKtoCyzGdjpBCx2jIQ3Aa%2F3jouR9oQP5LNeUtntAT4l0GnWGejxG7POF3yqatrcJ0D7oBfTrTyHhHNAi91%2F3wfBPFrpXEWtwgNoJYffGTCSy381tMOJermlJVQnnBMQS4Tu4%2BPHRj7pkmYXzDhJ54W5KPwZJxziNq0a%2F0UHyop%2BJyvAmvowwyw8G5fYUjd7hqeqJzBfj7cNtKJtDwd%2FtFn9z%2FVbv2JpwtgkuSrtjitlhViYzW7I%2BYPxoEHX24P8YAJULOEe1T3bo%2F5rnp1%2FhpDlyz54Sr271%2BCN2J6clFuTVUAk%2FEEBU1ZKZViRgHu12NRwiuU0xxw%2BcEj%2BUUCdsjdkI%2B8auRlgV6LPxD4QfG8hMs5VkgAujUvPPC2Niy%2BuXnb%2BQkkQZ0YtWui76PSP97fW4KXLYGR7VgaJOL6nM%2BEfw3qNGPUU4JEYztGguXiFXKv5q61D98xNgjwx4JVjCQ19mzBjqyApoC%2B4mqE5TmDnFajUwfxP3YH6yfc0fVpwqoCJ28p4xbE7n27Ugovuzt9PIyWNq8fhMN1XMUtau4GjEhUwzqTQEfZ7bFu1N%2ByytjwtDK7IpL7mBTAW%2F2GsHzctAx9rQA4V2WGEGiZneIFb8sDMBpKOVBO%2FULKvYH2zb2ZnZv5S%2Bqfe2srImCikro6kfr3uRepjlchUYU7qXeJkqgUasZUcVT4DL46HEezjz7syGNJDMvEk2JDbrvhtW%2F9WO5tf%2BpGYtH1oaUa4Sk9MJioAteJ0jEn7iz04KuXmaaEXxn1WNJpd2kA9n9LrWwES1Ya5LUHc%2FtjAC0rLi7r4ue6OD0DS1dG06j%2BfG%2FyfY6XfX1z2Kv9PY7igGx3UVbtFjtBfPUP1P%2Bee4Idwp2EnVFIgHy46lI1g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240622T085333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA6RJH44UESQCNJJEE%2F20240622%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a95c28b38962119ab94a5da3ff8e763f675e505491f3e867daaca1d280137a20"} alt="Ecowiser Verified" className="h-[32px] inline-block mr-1.5" />
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