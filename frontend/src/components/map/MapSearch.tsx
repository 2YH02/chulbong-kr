"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import { Input } from "@/components/ui/input";
import useInput from "@/hooks/common/useInput";
import useSearchLocationData from "@/hooks/query/useSearchLocationData";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import MapSearchResult from "./MapSearchResult";

interface Props {
  mini?: boolean;
  className?: string;
}

const MapSearch = ({ mini = false, className }: Props) => {
  const [query, setQuery] = useState("");
  const searchInput = useInput("");

  const { data, isError } = useSearchLocationData(query);

  const [resultModal, setResultModal] = useState(false);

  const searchResultRef = useRef<HTMLDivElement>(null);
  const inpuRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => setQuery(searchInput.value), 300);

    return () => clearTimeout(handler);
  }, [searchInput.value]);

  useEffect(() => {
    if (!searchResultRef) return;

    const handleClick = (e: MouseEvent) => {
      if (
        e.target !== searchResultRef.current &&
        e.target !== inpuRef.current
      ) {
        setResultModal(false);
        return;
      }

      setResultModal(true);
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [searchResultRef]);

  return (
    <div
      className={cn(
        `absolute top-2 left-1/2 -translate-x-1/2 w-[90%] max-w-96 min-w-[280px] bg-black-light-2 z-50 rounded-sm`,
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute top-1/2 left-2 -translate-y-1/2">
          <SearchIcon size={18} color="grey" />
        </div>
        <Input
          ref={inpuRef}
          placeholder="원하는 주소로 지도 이동시키기"
          value={searchInput.value}
          onChange={(e) => {
            searchInput.handleChange(e);

            if (e.target.value.length > 0) setResultModal(true);
            else setResultModal(false);
          }}
          onFocus={(e) => {
            if (e.target.value.length > 0) setResultModal(true);
            else setResultModal(false);
          }}
          className="rounded-sm border border-solid placeholder:text-grey-dark placeholder:text-sm pl-8 text-base"
        />
        <button
          className="absolute top-1/2 right-2 -translate-y-1/2"
          onClick={searchInput.resetValue}
        >
          <ImCancelCircle />
        </button>
      </div>

      {resultModal && searchInput.value.length > 0 && (
        <div
          className="absolute top-10 left-0 w-full z-10 bg-black rounded-sm border border-solid p-4"
          ref={searchResultRef}
        >
          {isError && <div>잠시 후 다시 시도해 주세요.</div>}
          {data?.documents.length === 0 && <div>검색 결과가 없습니다.</div>}
          {data?.documents.map((document) => {
            return (
              <MapSearchResult
                key={document.id}
                title={document.place_name}
                subTitle={document.address_name}
                lat={Number(document.y)}
                lng={Number(document.x)}
                reset={searchInput.resetValue}
                setResultModal={setResultModal}
                mini={mini}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MapSearch;
