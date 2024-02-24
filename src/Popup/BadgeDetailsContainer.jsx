import React, { useEffect, useState } from 'react';
import { getBadgeDetails } from '../helper.mjs';
import goto from "../assets/goto.svg";
import grs from "../assets/grs.svg";
import nf from '../assets/404.png';
import loadingGif from "../assets/loading.gif";
import logo from "../assets/icon.png";
import { useSelector } from 'react-redux';

const BadgeDetailsContainer = ({ badge }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const currentBadge = useSelector((state) => state.drawer.currentBadge);

    useEffect(() => {
        if (!currentBadge || currentBadge.length === 0) return;
        const fetchData = async () => {
            setIsLoading(true);
            const result = await getBadgeDetails();
            if (result === undefined || !result) {
                setIsLoading(false);
                return;
            }
            result.map(category => {
                category.badges.map(el => {
                    if (el.name.toLowerCase() === currentBadge.toLowerCase()) {
                        setData(el);
                        return;
                    }
                })
                if (data !== null) return;
            })
            setIsLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBadge]);


    return (
        isLoading ? <Loading /> : data === null ? <Fallback /> : (
            <div className="bg-white rounded-lg flex flex-col items-start justify-start gap-y-5 text-sm font-neutral-500 font-rubik cursor-default w-full h-full relative overflow-x-hidden overflow-y-auto thin-scrollbar pr-2.5 text-left">
                <div className={"flex items-center justify-between w-full"}>
                    <div className="flex items-center justify-start gap-x-3">
                        <img loading="lazy" src={data?.image_url} alt={data?.name} className="w-12 h-12 rounded-full" />
                        <h3 className="font-semibold text-neutral-600 text-[1.375rem]">
                            {data?.name}
                        </h3>
                    </div>
                </div>
                <p className={"text-zinc-500"}>{data?.description}</p>
                <div className="hidden flex-col items-start justify-center gap-y-3 w-full relative">
                    <h4 className="font-semibold text-neutral-600">
                        {"Associated certificate proof"}
                    </h4>
                    <div className={"flex flex-row flex-wrap items-center justify-start gap-x-3 gap-y-2 ps-2"}>
                        {new Array(1).fill(1).map((el, index) => {
                            return (
                                <div key={index} className={"shadow-[8px_8px_50px_0px_#00000014] rounded-full px-3 py-2 bg-white flex items-center justify-center gap-x-3 flex-nowrap"}>
                                    <img
                                        loading="lazy"
                                        src={grs}
                                        alt={data?.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <p className='w-[120px] leading-4 tracking-tight rubik text-neutral-600 font-medium text-sm'>{"Global Recycled Standard"}</p>
                                    <a href={"https://www.google.com/"}>
                                        <img
                                            loading="lazy"
                                            src={goto}
                                            alt={data?.name}
                                            className="w-6 h-6 rounded-full cursor-pointer"
                                        />
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {data?.bullet_points === null || data?.bullet_points.length === 0 ? <></> : (
                    <div className="flex flex-col items-start justify-center gap-y-3 w-full relative">
                        <h4 className="font-semibold text-neutral-600">
                            {"Badge Qualification Prerequisites"}
                        </h4>
                        <div
                            className="h-fit w-full flex items-start justify-start badgeDetailsContainerList text-zinc-500 font-normal text-sm"
                            dangerouslySetInnerHTML={{ __html: data?.bullet_points }}
                        />
                    </div>
                )}
                {data?.goals.length === 0 ? <></> : (
                    <div className="flex flex-col items-start justify-center gap-y-3 w-full relative pb-5">
                        <h4 className="font-semibold text-neutral-600">
                            {"Sustainable Development Goals (SDGs)"}
                        </h4>
                        <p className="text-zinc-500">{"Through achieving this badge, the brands demonstrates contribution towards the following goals: "}</p>
                        <div className="h-fit w-fit grid gap-2 mobile:grid-cols-2 grid-cols-3">
                            {data?.goals.map((goal, index) => (
                                <img
                                    key={index}
                                    loading='lazy'
                                    src={goal.image_url}
                                    alt={goal.name}
                                    className="mobile:w-32 w-38 mobile:h-32 h-38"
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className={"flex items-end justify-between mb-5 w-full"}>
                    <button className={"bg-primary hover:bg-transparent border border-primary font-semibold hover:text-primary text-white rounded-full text-md flex items-center justify-center gap-2 cursor-pointer transition-all p-4"}>
                        <p>{"View full review"}</p>
                        <div className="">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={"h-5 w-5"}
                                viewBox="0 0 512 512"
                                fill="currentColor"
                            >
                                <path 
                                    fillRule="evenodd"
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </button>
                    <div className={"cursor-default pointer-events-none flex items-center justify-center gap-1 text-primary text-xs"}>
                        <p className='text-neutral-500'>{"Powered By "}</p>
                        <img loading='lazy' src={logo} alt={"Ecowiser"} className={"w-3 h-3 m-0 p-0"} />
                        <p>{"Ecowiser"}</p>
                    </div>
                </div>
            </div>
        )
    )
}

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5 mobile:text-md text-lg font-neutral-500 font-rubik cursor-default w-full h-full relative overflow-x-hidden overflow-y-auto thin-scrollbar pr-2.5">
            <img
                loading='lazy'
                src={loadingGif}
                alt={"Loading"}
                className="w-32 h-32"
            />
            <h3 className="font-semibold text-neutral-600">
                {"Loading..."}
            </h3>
        </div>
    )
}

const Fallback = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5 mobile:text-md text-lg font-neutral-500 font-rubik cursor-default w-full h-full relative overflow-x-hidden overflow-y-auto thin-scrollbar pr-2.5">
            <img
                loading='lazy'
                src={nf}
                alt={"404 Not Found"}
                className="w-32 h-32"
            />
            <h3 className="font-semibold text-neutral-600">
                {"Badge Details not found"}
            </h3>
        </div>
    )
}

export default BadgeDetailsContainer