import instance from "@/api/instance";
import { type MyMarkerRes } from "@/api/user/mylocateMarker";
import BlackSideBody from "@/components/atom/BlackSideBody";
import PrevHeader from "@/components/atom/PrevHeader";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import MylocateClient from "./MylocateClient";

const mylocateMarker = async (
  pageParam: number,
  cookie: string
): Promise<MyMarkerRes> => {
  const res = await instance.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/markers/my?page=${pageParam}`,
    {
      headers: {
        Cookie: cookie || "",
      },
    }
  );

  return res.data;
};

const Mylocate = async () => {
  const cookieStore = cookies();
  const decodeCookie = decodeURIComponent(cookieStore.toString());
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["myMarker"],
    queryFn: ({ pageParam = 1 }) => mylocateMarker(pageParam, decodeCookie),
    initialPageParam: 1,
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <BlackSideBody>
      <PrevHeader back text="등록한 장소" />

      <HydrationBoundary state={dehydrateState}>
        <div className="px-4 pt-2 pb-4 mo:pb-20">
          <MylocateClient />
        </div>
      </HydrationBoundary>
    </BlackSideBody>
  );
};

export default Mylocate;
