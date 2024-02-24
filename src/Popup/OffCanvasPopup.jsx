"use client";

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import Bottombar from './Bottombar.jsx';
import { useWindowSize } from '../helper.mjs';

const OffCanvasPopup = () => {
    const [width, height] = useWindowSize();
    const [switchToBottom, setSwitchToBottom] = useState(false);

    useEffect(() => {
        if (width <= 531) {
            setSwitchToBottom(true)
        } else {
            setSwitchToBottom(false)
        }

    }, [width]);

    return (
        <div>
            {typeof window === "undefined" ? <></> : (
                switchToBottom ? (
                    <Bottombar />
                ) : (
                    <Sidebar />
                )
            )}
        </div>
    )
}

export default OffCanvasPopup