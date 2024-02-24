import { useRef } from "react";
import BadgeDetailsContainer from "./BadgeDetailsContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar as setShowSidebar, toggleBottomSidebar as setShowBottomBar } from "../redux/drawerSlice.mjs";
import { useOnClickOutside } from "../helper.mjs";
import leftArrow from "../assets/left_arrow.svg";
import { setCurrentBadge } from "../redux/drawerSlice.mjs";

const Bottombar = () => {
    const ref = useRef();
    const dispatch = useDispatch();
    const showBottomSidebar = useSelector((state) => state.drawer.showBottomSidebar);
    const currentBadge = useSelector((state) => state.drawer.currentBadge);
    const allBadges = useSelector((state) => state.drawer.allBadges);

    useOnClickOutside(ref, () => {
        dispatch(setShowBottomBar([false, ""]));
        dispatch(setShowSidebar([false, ""]));
    });

    return (
        <>
            <div ref={ref} className={`z-[100000001] bottom-0 left-0 right-0 w-screen bg-transparent rounded-t-2xl overflow-clip fixed h-[75vh] ease-in-out duration-300 ${showBottomSidebar[0] ? "translate-y-0" : "translate-y-full"} shadow-[0px_0px_200px_0px_#00000047]`}>
                <div className="mx-auto bg-[#D9D9D9] h-full w-full relative overflow-clip rounded-2xl flex flex-col justify-start items-center">
                    <button
                        onClick={() => {
                            dispatch(setShowBottomBar([false, ""]));
                            dispatch(setShowSidebar([false, ""]));
                            dispatch(setCurrentBadge(null));
                        }}
                        className="bg-transparent hover:bg-neutral-100 rounded-xl w-fit h-fit text-white text-md font-bold flex items-center justify-center mb-3.5 transition-all duration-300 ease-in-out border border-neutral-300 px-2 py-3"
                    >
                        <img src={leftArrow} alt="arrow-left" className={"w-4 h-4 m-0 p-0 rotate-90"} />
                    </button>
                    <div className={"no-scrollbar flex items-end justify-evenly w-full"}>
                        {allBadges.map((badge, index) => {
                            return (
                                <div 
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(setCurrentBadge(badge.name === "Low Carbon" ? "Offsets Carbon" : badge.name));
                                    }}
                                    className={`${(currentBadge === (badge.name === "Low Carbon" ? "Offsets Carbon" : badge.name)) ? "rounded-t-full p-2 px-[1rem]" : "rounded-full mb-4 p-2 px-[0.5rem]"} bg-white cursor-pointer hover:shadow transition-all`}
                                >
                                    <img loading={"lazy"} src={badge.icon} alt={badge.name} className={"w-6 h-6 m-0 p-0"} />
                                </div>
                            )
                        })}
                    </div>
                    <div className={"flex flex-col gap-2 justify-center items-center bg-white h-full w-full p-7 pb-0"}>
                        <BadgeDetailsContainer badge={showBottomSidebar[1]} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bottombar;