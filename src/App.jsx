import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getBrandEmbedLink, getBrandById, embedBadge } from "./helper.mjs";
import OffCanvasPopup from "./Popup/OffCanvasPopup.jsx";
import VerfiedContainer from "./VerfiedContainer";
import { useDispatch } from 'react-redux';
import { setAllBadges } from "./redux/drawerSlice.mjs";

function App() {
  const dispatch = useDispatch();
  const [badges, setBadges] = useState([]);
  const [isBadge, setIsBadge] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutateQuery = (query) => {
    setIsLoading(true);
    getBrandEmbedLink(query).then((data) => {
      setIsLoading(false);
      if (data.status !== 'okay') {
        toast.error("Couldn't find the brand you are looking for");
      } else setData(data);
    }).catch((err) => {
      console.log(err);
      toast.error("Couldn't find the brand you are looking for");
      setIsLoading(false);
    });
  }

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (data === undefined || data === null) return;
    if (!data.results || !isBadge) return;
    const brand_id = data.results.split('/').pop();

    getBrandById(parseInt(brand_id)).then((data) => {
      setBadges([...data.brand.tags]);
      dispatch(setAllBadges([...data.brand.tags]));
    }).catch((err) => {
      console.error(err);
    });
  }, [data]);

  useEffect(() => {
    if (badges.length > 0) {
      console.log(badges);
      setSelectedBadge(badges[1]);
    }
  }, [badges]);

  useEffect(() => {
    console.log(selectedBadge);
  }, [selectedBadge]);

  const onBadgeSubmit = (e) => {
    e.preventDefault();
    setIsBadge(true);
    const query = e.target.searchBrand.value;
    if (!query) {
      toast.error('Please enter a brand name');
      return;
    }
    mutateQuery(query);
  };

  const copyToClipboard = () => {
    if (!data.results) return;
    toast.success('Copied link to clipboard');
    navigator.clipboard.writeText(data.results);
  };

  return (
    <>
      <OffCanvasPopup />
      <div className={"relative rubik w-screen h-screen flex flex-col items-center justify-center"}>
        <div
          className={`relative flex w-full max-w-3xl flex-col items-center mx-5 px-5 py-8 sm:py-12 text-center rounded-xl shadow-lg hover:shadow-xl border`}
        >
          <div className="text-2xl sm:text-[2rem] font-semibold text-neutral-600">
            {"Badge Embed Link Generator"}
          </div>
          <div className="text-neutral-500 mt-1 mb-5 sm:mb-10">
            {"To generate your badge embed link, please enter the brand name below."}
          </div>
          <div className="relative w-full gap-y-3 flex flex-col items-center justify-center text-start">
            <form className="w-full max-w-md space-y-2.5" onSubmit={onBadgeSubmit}>
              <label
                htmlFor="searchBrand"
                className="block text-sm font-semibold leading-6 text-gray-800"
              >
                {"Search Brand"}
              </label>
              <div className="mt-1.5 w-full gap-2 inline-flex items-stretch">
                <input
                  name="searchBrand"
                  className="block w-full rounded-md py-2 px-3.5 text-gray-900 border  placeholder:text-gray-400 ring-primary focus:ring-offset-2 focus:ring-2 focus:outline-none duration-200 sm:text-sm sm:leading-6"
                  placeholder="Enter brand name ..."
                />
  
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${isLoading && "opacity-50 pointer-events-none cursor-default"} inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm break-keep w-[10rem] rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary duration-200`}
                >
                  {isLoading ? 'Loading...' : 'Generate'}
                </button>
              </div>
            </form>
            <div
              className={`bg-neutral-100 w-full max-w-md rounded-md py-2 px-3.5 border duration-200 sm:text-sm sm:leading-6 flex items-center ${data?.results ? 'text-neutral-600' : 'text-neutral-400'}`}
            >
              <div className="grow text-ellipsis min-w-0 overflow-hidden">
                {data?.results ?? 'Brand Embed Link'}
              </div>
              <div
                className={`shrink-0 text-neutral-400 duration-200 ${data?.results ? 'cursor-pointer hover:text-neutral-800' : 'cursor-default'}`}
                onClick={copyToClipboard}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={"h-5 w-5"}
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd"
                    d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className={"relative mobile:w-full w-[28rem] h-fit mx-auto px-auto"}>
              {data?.results && data?.results.length > 0 && badges.length > 0 && (
                <EmbedBadgeLinks url={data?.results} badges={badges} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const EmbedBadgeLinks = ({ url = '', badges }) => {
  const copyToClipboard = (text) => {
    toast.success('Copied snippet to clipboard');
    navigator.clipboard.writeText(text);
  };

  return (
      <div className={`relative w-full grid place-items-center gap-2 rounded-md shadow-sm border p-2.5`}>
        <div className={`bg-neutral-100 w-full py-2 px-3.5 border flex items-center justify-end`}>
          <div
            className={`text-neutral-400 hover:text-neutral-600 transition-all cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              // copyToClipboard(embedBadge());
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={"h-5 w-5"}
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path 
                fillRule="evenodd"
                d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="relative h-fit w-full mx-auto">
          <VerfiedContainer tags={badges} url={url} />
        </div>
      </div>
  );
};

export default App
