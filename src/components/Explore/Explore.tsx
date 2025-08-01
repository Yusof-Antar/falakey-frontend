import { useEffect } from "react";
import ExploreInputs from "./ExploreInputs";
import { useDispatch, useSelector } from "react-redux";
import { search } from "@/lib/slices/searchSlice";
import { useSearchParamsHook } from "@/helper/searchHook";
import SEO from "../Common/SEO";
import { useLocation } from "react-router-dom";
import { RootState } from "@/lib/store";
import { useTrans } from "@/utils/translation";
import MasonryWrapper from "../Masonry/MasonryWrapper";

const Explore = () => {
  const dispatch = useDispatch();
  const stringFiltering = useSearchParamsHook();
  const location = useLocation();
  const previousearchData = useSelector((state: RootState) => state.search);

  useEffect(() => {
    // Update the search state in Redux when necessary
    const searchParams = new URLSearchParams(location.search);

    dispatch(
      search({
        ...previousearchData,
        types: searchParams.get("types") ?? previousearchData.types,
        search: searchParams.get("search") ?? previousearchData.search,
        filter: {
          orientation:
            searchParams.get("orientation") ??
            previousearchData.filter?.orientation ??
            null,
          size:
            searchParams.get("size") ?? previousearchData.filter?.size ?? null,
          color:
            searchParams.get("color") ??
            previousearchData.filter?.color ??
            null,
        },
        sort: searchParams.get("sort") ?? previousearchData.sort ?? null,
      })
    );
  }, [dispatch]);

  

  const { t } = useTrans();

  return (
    <>
      <SEO title="Explore" description="" name="Falakey" type="article" />

      <div className="header justify-center items-center flex flex-col flex-wrap">
        <div className="explore w-full max-w-screen-size px-4">
          <div className="min-[1024px]:text-[70px] min-[319px]:text-[28px]  min-[425px]:text-[36px]  min-[768px]:text-[55px] font-bold mb-[16px]">
            {t("explore.title")}
          </div>

          <ExploreInputs />
          <div className="w-full mt-4">
            <MasonryWrapper title="" stringFiltering={stringFiltering} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
