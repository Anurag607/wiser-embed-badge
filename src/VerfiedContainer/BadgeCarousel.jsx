import { useCarousel } from '../helper.mjs';

const LeftArrow = () => {
    return (
      <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={"h-5 w-5"}
          viewBox="0 0 512 512"
          fill="currentColor"
      >
          <path 
              fillRule="evenodd"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
              clipRule="evenodd"
          />
      </svg>
    )
}

const RightArrow = () => {
    return (
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
    )
}

const BadgeCarousel = ({ children, seeAll }) => {
  const { ref: scrollContainerRef, scrollLeft, scrollRight } = useCarousel();

  return (
    <div className="relative max-w-[25rem] mobile:max-w-[80vw] w-full group h-fit no-scrollbar">
      {seeAll && (
        <>
          <div
            className="absolute left-0 top-1/2 !z-[101] -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-600 bg-gradient-to-r from-white via-white/90 to-white/50 opacity-0 group-hover:xs:opacity-100"
            onClick={() => scrollLeft(200)}
          >
            <LeftArrow />
          </div>
    
          <div
            className="absolute right-0 top-1/2 !z-[101] -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-neutral-600 bg-gradient-to-l from-white via-white/90 to-white/50 opacity-0 group-hover:xs:opacity-100"
            onClick={() => scrollRight(200)}
          >
            <RightArrow />
          </div>
        </>
      )}

      <div className="no-scrollbar overflow-x-scroll" ref={scrollContainerRef}>
        <div className="flex items-center gap-x-1.5 my-1.5">{children}</div>
      </div>
    </div>
  );
};

export default BadgeCarousel;