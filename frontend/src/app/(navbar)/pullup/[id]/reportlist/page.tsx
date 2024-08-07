import instance from "@/api/instance";
import ReportClient from "@/app/(navbar)/mypage/report/reportClient";
import BlackSideBody from "@/components/atom/BlackSideBody";
import PrevHeader from "@/components/atom/PrevHeader";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import LinkWrap from "./LinkWrap";

const getMarkerReport = async (markerId: number) => {
  const res = await instance.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reports/marker/${markerId}`
  );

  return res.data;
};

const ReportListPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["marker", "report", "formarker", params.id],
    queryFn: () => {
      return getMarkerReport(Number(params.id));
    },
  });

  const dehydrateState = dehydrate(queryClient);
  return (
    <BlackSideBody>
      <PrevHeader back text="정보 수정 제안 목록" />

      <div className="pb-4">
        <LinkWrap id={params.id} />
        <HydrationBoundary state={dehydrateState}>
          <ReportClient type="formarker" markerId={Number(params.id)} />
        </HydrationBoundary>
      </div>
    </BlackSideBody>
  );
};

export default ReportListPage;
