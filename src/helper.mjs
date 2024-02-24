import {
    useState,
    useLayoutEffect,
    useEffect,
    useCallback,
    useRef,
} from 'react';

// Contanst..
export const apiURL = 'https://extension.wiser.eco/';
export const embedBadge = (url, image, name) =>
    ` <a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">
        <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              width: 'fit-content',
              borderRadius: '9999px',
              paddingInline: '1.85rem',
              paddingBlock: '0.35rem',
            }}
          >
            <img
              loading='lazy'
              src=${image}
              alt=${name}
              style={{
                width: '2rem',
                height: '2rem',
                objectFit: 'contain',
              }}
            />
            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                color: '#828282',
                fontWeight: '500',
                letterSpacing: '0rem',
                fontFamily: 'rubik',
              }}
            >
              ${name}
            </p>
          </div>
      </a>
      `;

// APIs...
export const getBrandEmbedLink = async (query) => {
    const response = await fetch(
        `${apiURL}products/brand-url/?name=${query}`,
        {
            method: 'GET',
            headers: {
                DUMMY: 1,
                'Content-Type': 'application/json'
            }
        }
    );
    const data = await response.json();
    return data;
};

export const getBrandById = async (id) => {
    const response = await fetch(
        `${apiURL}products/brand-by-id/?brand_id=${id}`,
        {
            method: 'GET',
            headers: {
                DUMMY: 1,
                'Content-Type': 'application/json'
            }
        }
    );
    const data = await response.json();
    return data;
};

export const getBadgeDetails = async () => {
    try {
        const response = await fetch(
            `${apiURL}brand-assessment/badges/list/`,
            {
                method: 'GET',
                headers: {
                    DUMMY: 1,
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Failed to get Badges", err);
    }
}

// Hooks...
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

export function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export const useCarousel = () => {
    const containerRef = useRef(null);
    const scrollX = useCallback(
        (offset) => {
            if (!containerRef || !containerRef.current) return;
            containerRef.current.scroll({
                left: containerRef.current.scrollLeft + offset,
                behavior: 'smooth',
            });
        },
        [containerRef],
    );

    const scrollLeft = (value = 400) => scrollX(-value);

    const scrollRight = (value = 400) => scrollX(value);

    return { ref: containerRef, scrollLeft, scrollRight };
};
