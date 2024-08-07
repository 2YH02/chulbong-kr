import { MAP_LAT_DIF, MOBILE_WIDTH } from "@/constants";
import useDeleteFavorite from "@/hooks/mutation/favorites/useDeleteFavorite";
import useSetFavorite from "@/hooks/mutation/favorites/useSetFavorite";
import useMarkerData from "@/hooks/query/marker/useMarkerData";
import useWeatherData from "@/hooks/query/marker/useWeatherData";
import useBodyToggleStore from "@/store/useBodyToggleStore";
import useMapStore from "@/store/useMapStore";
import useMobileMapOpenStore from "@/store/useMobileMapOpenStore";
import usePageLoadingStore from "@/store/usePageLoadingStore";
import useRoadviewStatusStore from "@/store/useRoadviewStatusStore";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import ShareModal from "../common/ShareModal";
import BookmarkIcon from "../icons/BookmarkIcon";
import RoadViewIcon from "../icons/RoadViewIcon";
import ShareIcon from "../icons/ShareIcon";
import { Skeleton } from "../ui/skeleton";

interface Props {
  markerId: number;
  lat: number;
  lng: number;
  closeOverlay: VoidFunction;
  goDetail: VoidFunction;
  goReport: VoidFunction;
}

const MarkerOverlay = ({
  markerId,
  lat,
  lng,
  closeOverlay,
  goDetail,
  goReport,
}: Props) => {
  const { map } = useMapStore();

  const { open: openMobileMap, close: closeMoblieMap } =
    useMobileMapOpenStore();
  const { open: roadviewOpen, setPosition: setRoadview } =
    useRoadviewStatusStore();

  const { open: bodyOpen, isOpen: isBodyOpen } = useBodyToggleStore();

  const { data: marker } = useMarkerData(markerId);
  const { data: weather, isLoading: isWeatherLoading } = useWeatherData(
    marker?.latitude as number,
    marker?.longitude as number,
    Boolean(marker)
  );

  const { mutate: bookmark } = useSetFavorite(markerId);
  const { mutate: deleteBookmark } = useDeleteFavorite(markerId);

  const { setLoading } = usePageLoadingStore();

  const [isShare, setIsShare] = useState(false);

  const shareRef = useRef<HTMLDivElement>(null);

  const changeRoadviewlocation = useCallback(async () => {
    setRoadview(marker?.latitude as number, marker?.longitude as number);
  }, [marker]);

  const openRoadview = async () => {
    if (window.innerWidth <= MOBILE_WIDTH) {
      openMobileMap();
    }
    await changeRoadviewlocation();
    roadviewOpen();
  };

  const openBody = async () => {
    bodyOpen();
  };

  return (
    <div
      className="bg-black absolute bottom-[74px] w-[370px] p-4 -ml-[193px] rounded-md
    mo:w-[210px] mo:-ml-[112px]"
    >
      <div
        className="absolute top-[100%] left-1/2 -translate-x-1/2 border-l-[12px] border-r-[12px] border-b-0
      border-t-[24px] border-t-black border-l-transparent border-r-transparent border-solid"
      />
      <div className="flex items-center justify-between mb-3">
        {isWeatherLoading || !weather || !marker ? (
          <Skeleton className="w-20 h-9" />
        ) : (
          <div className="flex items-center">
            <div className="mr-4">
              <img src={weather.iconImage} alt={weather.desc} />
            </div>
            <div className="text-[17px]">{weather.temperature}℃</div>
          </div>
        )}
        <button
          onClick={closeOverlay}
          className="rounded-sm px-2 text-sm hover:bg-white-tp-light"
        >
          닫기
        </button>
      </div>
      <div className="flex mo:flex-col-reverse mo:items-center">
        <div className="w-[240px] pr-4 mo:pr-0 mo:text-center mo:mt-4 mo:w-[190px]">
          {marker ? (
            <p className="font-bold truncate">
              {marker.description || "작성된 설명이 없습니다."}
            </p>
          ) : (
            <Skeleton className="w-1/3 h-6 mo:mx-auto mo:mb-1" />
          )}
          <div className="text-xs text-grey-dark mb-3">
            <button
              onClick={async () => {
                const moveLatLon = new window.kakao.maps.LatLng(
                  (lat as number) + MAP_LAT_DIF,
                  lng
                );

                if (!isBodyOpen) {
                  await openBody();
                  setTimeout(() => {
                    map?.panTo(moveLatLon);
                  }, 200);
                } else {
                  map?.panTo(moveLatLon);
                }

                if (window.innerWidth <= MOBILE_WIDTH) {
                  closeMoblieMap();
                }
                if (window.location.pathname === `/pullup/${markerId}`) return;

                setLoading(true);
                goDetail();
              }}
              className="underline mr-2"
            >
              상세보기
            </button>
            <button
              onClick={async () => {
                const moveLatLon = new window.kakao.maps.LatLng(
                  (lat as number) + MAP_LAT_DIF,
                  lng
                );

                if (!isBodyOpen) {
                  await openBody();
                  setTimeout(() => {
                    map?.panTo(moveLatLon);
                  }, 200);
                } else {
                  map?.panTo(moveLatLon);
                }

                if (window.innerWidth <= MOBILE_WIDTH) {
                  closeMoblieMap();
                }
                if (window.location.pathname === `/pullup/${markerId}/report`) {
                  return;
                }

                setLoading(true);
                goReport();
              }}
              className="underline"
            >
              정보 수정 제안
            </button>
          </div>
          <div className="flex justify-between pr-7 mo:pr-0 mo:justify-center">
            <div className="flex flex-col items-center justify-center mo:mx-2">
              <button
                className="rounded-full p-1 hover:bg-white-tp-light"
                onClick={() => {
                  if (!marker) return;

                  if (marker.favorited) deleteBookmark();
                  else bookmark();
                }}
              >
                {marker?.favorited ? (
                  <BookmarkIcon isActive />
                ) : (
                  <BookmarkIcon />
                )}
              </button>
              <p className="text-sm">북마크</p>
            </div>
            <div className="flex flex-col items-center justify-center mo:mx-2">
              <button
                className="rounded-full p-1 hover:bg-white-tp-light"
                onClick={openRoadview}
              >
                <RoadViewIcon />
              </button>
              <p className="text-sm">거리뷰</p>
            </div>
            <div
              className="relative flex flex-col items-center justify-center mo:mx-2"
              ref={shareRef}
            >
              <button
                className="rounded-full p-1 hover:bg-white-tp-light"
                onClick={() => setIsShare(true)}
              >
                <ShareIcon />
              </button>
              <p className="text-sm">공유</p>
              {isShare && (
                <ShareModal
                  link={`${process.env.NEXT_PUBLIC_URL}/pullup/${markerId}`}
                  className="absolute top-full -left-1/2 -translate-x-1/2"
                  closeModal={() => setIsShare(false)}
                  buttonRef={shareRef}
                  lat={marker?.latitude as number}
                  lng={marker?.longitude as number}
                  filename={
                    (marker?.address as string) || String(marker?.markerId)
                  }
                />
              )}
            </div>
          </div>
        </div>

        <div className="felx items-center justify-center">
          {marker ? (
            <Image
              src={marker.photos ? marker.photos[0].photoUrl : "/metaimg.webp"}
              width={100}
              height={100}
              alt="상세"
              className="rounded-sm w-[100px] h-[100px] w mo:w-[80px] mo:h-[80px] object-cover"
            />
          ) : (
            <Skeleton className="w-[100px] h-[100px] mo:w-[80px] mo:h-[80px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkerOverlay;
