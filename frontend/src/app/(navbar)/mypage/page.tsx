import instance from "@/api/instance";
import { type MyInfo } from "@/api/user/myInfo";
import BlackSideBody from "@/components/atom/BlackSideBody";
import GrowBox from "@/components/atom/GrowBox";
import Heading from "@/components/atom/Heading";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import DonationButton from "../home/_components/DonationButton";
import MypageClient from "./MypageClient";

const myInfo = async (cookie: string): Promise<MyInfo> => {
  const res = await instance.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
    {
      headers: {
        Cookie: cookie || "",
      },
    }
  );

  return res.data;
};

export const generateMetadata = () => {
  return {
    title: `대한민국 철봉 지도 | 마이 페이지`,
  };
};

const Mypage = async () => {
  const cookieStore = cookies();
  const decodeCookie = decodeURIComponent(cookieStore.toString());
  const queryClient = new QueryClient();

  await queryClient.invalidateQueries({ queryKey: ["user", "me"] });

  await queryClient.prefetchQuery({
    queryKey: ["user", "me"],
    queryFn: () => {
      return myInfo(decodeCookie);
    },
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <BlackSideBody className="px-4">
      <Heading title="내 정보" />
      <div className="flex flex-col h-[calc(100%-96px)]">
        <HydrationBoundary state={dehydrateState}>
          <MypageClient />
        </HydrationBoundary>
        <GrowBox />
        {/* <DonationButton /> */}
      </div>
    </BlackSideBody>
  );
};

export default Mypage;
