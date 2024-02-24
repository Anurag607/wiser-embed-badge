import { useRef } from "react";
import BadgeDetailsContainer from "./BadgeDetailsContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar as setShowSidebar, toggleBottomSidebar as setShowBottomBar } from "../redux/drawerSlice.mjs";
import { useOnClickOutside } from "../helper.mjs";
import leftArrow from "../assets/left_arrow.svg";
import { setCurrentBadge } from "../redux/drawerSlice.mjs";

const Sidebar = () => {
    const ref = useRef();
    const dispatch = useDispatch();
    const showSidebar = useSelector((state) => state.drawer.showSidebar);
    const currentBadge = useSelector((state) => state.drawer.currentBadge);
    const allBadges = useSelector((state) => state.drawer.allBadges);

    useOnClickOutside(ref, () => {
        dispatch(setShowBottomBar([false, ""]));
        dispatch(setShowSidebar([false, ""]));
    });

    return (
        <>
            <div ref={ref} className={`z-[100000001] top-[12.5%] right-0 w-[35rem] bg-transparent rounded-l-2xl overflow-clip fixed h-[75vh] ease-in-out duration-300 ${showSidebar[0] ? "translate-x-0" : "translate-x-full"} shadow-[0px_0px_200px_0px_#00000047]`}>
                <div className="mx-auto bg-[#D9D9D9] h-full w-full relative overflow-clip rounded-l-2xl flex flex-row items-start justify-start gap-x-0">
                    <div className={"flex flex-col items-end justify-center gap-2 py-7 pl-4"}>
                        <button
                            onClick={() => {
                                dispatch(setShowBottomBar([false, ""]));
                                dispatch(setShowSidebar([false, ""]));
                                dispatch(setCurrentBadge(null));
                            }}
                            className="mr-4 bg-transparent hover:bg-neutral-100 rounded-xl w-fit h-fit text-white text-md font-bold flex items-center justify-center mb-3.5 transition-all duration-300 ease-in-out px-3 py-2"
                        >
                            <img src={leftArrow} alt="arrow-left" className={"w-4 h-4 m-0 p-0 shrink-0"} />
                        </button>
                        {allBadges.map((badge, index) => {
                            return (
                                <div 
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(setCurrentBadge(badge.name === "Low Carbon" ? "Offsets Carbon" : badge.name));
                                    }}
                                    className={`${(currentBadge === (badge.name === "Low Carbon" ? "Offsets Carbon" : badge.name)) ? "rounded-l-full p-2 px-[1rem]" : "rounded-full mr-4 p-1 px-[0.5rem]"} bg-white cursor-pointer hover:shadow transition-all mb-2`}
                                >
                                    <img loading={"lazy"} src={badge.icon} alt={badge.name} className={"w-10 h-10 m-0 p-0"} />
                                </div>
                            )
                        })}
                    </div>
                    <div className={"flex flex-col gap-2 justify-center items-center bg-white h-full w-full p-7 pb-0"}>
                        <BadgeDetailsContainer badge={showSidebar[1]} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;