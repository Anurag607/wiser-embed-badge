import { useRef } from "react";
import BadgeDetailsContainer from "./BadgeDetailsContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar as setShowSidebar, toggleBottomSidebar as setShowBottomBar } from "../redux/drawerSlice.mjs";
import { useOnClickOutside } from "../helper.mjs";
import leftArrow from "../assets/left_arrow.svg";

const Sidebar = () => {
    const dispatch = useDispatch();
    const showSidebar = useSelector((state) => state.drawer.showSidebar);
    const ref = useRef();

    useOnClickOutside(ref, () => {
        dispatch(setShowBottomBar([false, ""]));
        dispatch(setShowSidebar([false, ""]));
    });

    return (
        <>
            <div ref={ref} className={`z-[100000001] top-[12.5%] right-0 w-[35rem] bg-transparent rounded-l-2xl overflow-clip fixed h-[75vh] ease-in-out duration-300 ${showSidebar[0] ? "translate-x-0" : "translate-x-full"} shadow-[0px_0px_200px_0px_#00000047]`}>
                <div className="mx-auto bg-white h-full w-full relative overflow-clip rounded-l-2xl p-7 flex flex-row items-start justify-start gap-x-4">
                    <button
                        onClick={() => {
                            dispatch(setShowBottomBar([false, ""]));
                            dispatch(setShowSidebar([false, ""]));
                        }}
                        className="bg-transparent hover:bg-neutral-100 rounded-xl w-fit h-fit text-white text-md font-bold flex items-center justify-center mb-3.5 transition-all duration-300 ease-in-out border border-neutral-300 px-3 py-2"
                    >
                        <img src={leftArrow} alt="arrow-left" className={"w-4 h-4 m-0 p-0"} />
                    </button>
                    <BadgeDetailsContainer badge={showSidebar[1]} />
                </div>
            </div>
        </>
    );
};

export default Sidebar;