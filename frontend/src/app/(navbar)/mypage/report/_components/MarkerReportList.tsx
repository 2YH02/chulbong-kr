import BlackLightBox from "@/components/atom/BlackLightBox";
import EmojiHoverButton from "@/components/atom/EmojiHoverButton";
import GrowBox from "@/components/atom/GrowBox";
import LoadingSpinner from "@/components/atom/LoadingSpinner";
import AlertButton from "@/components/common/AlertButton";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Separator } from "@/components/ui/separator";
import useApproveReport from "@/hooks/mutation/report/useApproveReport";
import useDeleteReport from "@/hooks/mutation/report/useDeleteReport";
import useDenyReport from "@/hooks/mutation/report/useDenyReport";
import { cn } from "@/lib/utils";
import useMarkerImageStore from "@/store/useMarkerImageStore";
import usePageLoadingStore from "@/store/usePageLoadingStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ChangePassword from "../../user/ChangePassword";
import StatusBadge from "./StatusBadge";

interface Props {
  markerId: number;
  desc: string;
  imgs: string[];
  status: string;
  userId?: number;
  myId?: number;
  reportId: number;
  className?: string;
  address?: string;
  isAdmin?: boolean;
}

interface InfoListProps {
  text: string;
  subText: string;
  buttonText?: string;
  isTruncate?: boolean;
}

const InfoList = ({
  text,
  subText,
  buttonText,
  isTruncate = false,
}: InfoListProps) => {
  return (
    <div className="flex text-[13px] py-1">
      <span className={`w-1/5 text-wrap break-words`}>{text}</span>
      <span
        className={`w-4/5 ${isTruncate ? "truncate" : "text-wrap break-words"}`}
      >
        {subText}
      </span>
      <GrowBox />
      {buttonText && <ChangePassword />}
    </div>
  );
};

const MarkerReportList = ({
  markerId,
  desc,
  imgs,
  status,
  reportId,
  className,
  address,
  isAdmin = false,
}: Props) => {
  const { setImages, setCurImage, openImageModal, setCurImageIndex } =
    useMarkerImageStore();

  const router = useRouter();

  const { setLoading } = usePageLoadingStore();

  const { mutate: deleteReport, isPending: deleteReportPending } =
    useDeleteReport(markerId, reportId);
  const { mutate: approveReport, isPending: approvePending } =
    useApproveReport(markerId);
  const { mutate: denyReport, isPending: denyPending } =
    useDenyReport(markerId);

  const [dropdown, setDropdown] = useState(false);

  const [viewImages, setViewImages] = useState<
    { photoId: string; photoUrl: string }[]
  >([]);

  useEffect(() => {
    if (!imgs) return;

    const setImageId = () => {
      const newImgs = imgs.map((img) => {
        return { photoId: v4(), photoUrl: img };
      });

      setImages(newImgs);
      setViewImages(newImgs);
    };

    setImageId();
  }, [imgs]);

  return (
    <BlackLightBox className={cn("relative", className)}>
      <div className="flex items-center mb-2">
        {isAdmin && (
          <AlertButton
            ButtonText={
              deleteReportPending ? (
                <LoadingSpinner size="xs" />
              ) : (
                <DeleteIcon size={20} />
              )
            }
            title="정말 삭제하시겠습니까?"
            clickFn={deleteReport}
            disabled={deleteReportPending}
          />
        )}
        <GrowBox />
        <div className="relative">
          <button
            onClick={() => {
              if (isAdmin) setDropdown((prev) => !prev);
            }}
            disabled={approvePending || denyPending}
          >
            {approvePending || denyPending ? (
              <LoadingSpinner size="xs" />
            ) : (
              <StatusBadge status={status} />
            )}
          </button>
          {dropdown &&
            status !== "APPROVED" &&
            status !== "DENIED" &&
            !approvePending &&
            !denyPending && (
              <div className="absolute top-8 left-0">
                {isAdmin && (
                  <div>
                    <div className="mb-1">
                      <AlertButton
                        ButtonText={<StatusBadge status={"APPROVED"} />}
                        title="정말 승인하시겠습니까?"
                        desc="현재 등록된 정보가 바뀔 수 있습니다."
                        clickFn={() => approveReport(reportId)}
                        disabled={approvePending || denyPending}
                      />
                    </div>
                    <div>
                      <AlertButton
                        ButtonText={<StatusBadge status={"DENIED"} />}
                        title="정말 거절하시겠습니까?"
                        clickFn={() => denyReport(reportId)}
                        disabled={approvePending || denyPending}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      <div>수정</div>
      <InfoList text="주소" subText={address || "주소 제공 안됨"} />
      <InfoList text="설명" subText={desc || "작성된 설명 없음"} isTruncate />
      {imgs && viewImages && (
        <div>
          <Separator className="mx-1 my-3 bg-grey-dark-1" />
          <div>추가된 이미지</div>
          <div className="flex">
            {viewImages?.map((img, i) => {
              return (
                <button
                  onClick={() => {
                    setCurImageIndex(i);
                    setCurImage(img);
                    openImageModal();
                  }}
                  key={img.photoId}
                >
                  <Image
                    src={img.photoUrl}
                    width={30}
                    height={30}
                    alt="마커 수정"
                    className="w-10 h-10 object-contain ml-2"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <EmojiHoverButton
        text="위치 상세보기"
        className="bg-black-light mt-3 hover:bg-black-light"
        center
        onClickFn={() => {
          setLoading(true);
          router.push(`/pullup/${markerId}`);
        }}
      />
    </BlackLightBox>
  );
};

export default MarkerReportList;
