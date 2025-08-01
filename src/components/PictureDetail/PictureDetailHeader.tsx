import { socialMdeiaShare } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DownloadingIcon from "@mui/icons-material/Downloading";
import share_post from "@/helper/shareFunction";
import unkownProfile from "../../../public/images/unkown-profile.png";
import AvailableForHire from "../Common/AvailableForHire";
import { Author } from "@/models/author";
import { useTrans } from "@/utils/translation";

import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
const PictureDetailHeader = ({
  author,
  slug,
  downloads,
  favoriteCount,
  isFavorite,
  toggleFavorite,
  isLocked,
}: {
  author?: Author;
  slug: string;
  downloads: {
    label: string;
    dimensions: string;
    link: string;
    extension?: string;
  }[];
  favoriteCount: number;
  isFavorite: boolean;
  isLocked: boolean;
  toggleFavorite: (e: any) => void;
}) => {
  const [favoriteHeart, setFavoriteHeart] = useState(isFavorite);
  const [showDownload, setShowDownload] = useState(false);
  const [showShare, setshowShare] = useState(false);

  useEffect(() => {
    setFavoriteHeart(isFavorite);
  }, [isFavorite]);

  const { t } = useTrans();

  return (
    <div className="flex justify-between items-start w-[95%] m-auto sm:flex-row gap-6 flex-col ">
      <a
        href={`/author/${author?.username}`}
        className="flex cursor-pointer items-center justify-center gap-3"
      >
        {author!.avatar ? (
          <img
            src={author!.avatar}
            alt={author?.display_name}
            className="rounded-full size-[40px] aspect-square object-cover bg-primary"
          />
        ) : (
          <img
            src={unkownProfile}
            alt={author?.display_name}
            className="rounded-full size-[40px] aspect-square object-cover"
          />
        )}

        <div className="flex flex-col items-start justify-center">
          <p className="sm:text-md text-sm">{author?.display_name}</p>
          <AvailableForHire
            available={author?.available_for_hire ?? false}
            username={author?.username}
          />
        </div>
      </a>
      <div className="flex gap-3 w-full justify-between flex-wrap">
        <div className="flex gap-3">
          <div>
            <button
              onClick={() => {
                setshowShare(!showShare);
                setShowDownload(false);
              }}
              className="px-4 py-2 bg-[hsla(0,0%,50%,0.2)] text-black-700 rounded-md transition duration-300 ease-in-out items-center justify-center"
            >
              {t("post.share")}
            </button>
            {showShare && (
              <div className="absolute  mt-2 bg-[#eee] rounded-lg shadow-lg w-72 ">
                <ul className="text-[#000]  py-5">
                  {socialMdeiaShare.map((media, index) => (
                    <li key={index}>
                      <button
                        className="text-[22px] w-full flex items-center gap-4 px-8 py-2 text-left font-bold text-[#000] rounded-md hover:text-[#44175b]  transition-colors"
                        onClick={() => {
                          share_post(
                            media.key as
                              | "facebook"
                              | "pinterest"
                              | "twitter"
                              | "email"
                              | "whatsapp",
                            `window.location.origin/listing/${slug}`
                          );
                        }}
                      >
                        <div className="w-[20px]">
                          <FontAwesomeIcon icon={media.icon} />
                        </div>
                        <span className="text-[18px] font-semibold">
                          {media.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={(e) => toggleFavorite(e)}
            className="px-4 py-2 gap-2 bg-[hsla(0,0%,50%,0.2)] text-[16px] h-[40px] text-[#aab8c2] rounded-md  transition duration-300 ease-in-out flex items-center justify-center"
          >
            <motion.div
              initial={favoriteHeart}
              animate={
                favoriteHeart
                  ? { scale: [1, 1.2, 0.85, 1], color: "#ef4444" }
                  : { scale: 1, color: "#9ca3af" }
              }
              transition={{ duration: 0.5 }}
              className={`text-2xl`}
            >
              <FaHeart />
            </motion.div>
            <span className="text-black">{favoriteCount}</span>
          </button>
        </div>
        {isLocked ? null : (
          <div className="relative">
            <button
              onClick={() => {
                setshowShare(false);
                setShowDownload(!showDownload);
              }}
              className="px-4 py-2 gap-2 flex bg-[#b17ece] text-white rounded-md items-center justify-center"
            >
              <p>{t("post.download")}</p>
              <span className="flex items-center justify-center">
                <DownloadingIcon fontSize="small" />
              </span>
            </button>

            {showDownload && (
              <div className="absolute top-full mt-2 right-0 bg-[#eee] rounded-lg shadow-lg w-72 z-10">
                <ul className="text-[#000]  py-5">
                  {downloads?.map((download, index) => (
                    <li key={index}>
                      <a
                        className="text-[16px] w-full flex items-baseline gap-4 px-8 py-2 text-left font-bold text-[#000] rounded-md hover:text-[#44175b]  transition-colors"
                        href={download.link}
                        target="_self"
                      >
                        <div className="flex items-center gap-1">
                          <div>{download.label}</div>
                          <span className="text-[11px]">
                            ({download.extension})
                          </span>
                        </div>
                        <span className="text-[13px] font-normal">
                          {download.dimensions}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PictureDetailHeader;
