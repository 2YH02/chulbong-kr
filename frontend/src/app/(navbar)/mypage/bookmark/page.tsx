import instance from "@/api/instance";
import { type Favorite } from "@/api/user/bookmarkMarker";
import BlackSideBody from "@/components/atom/BlackSideBody";
import Heading from "@/components/atom/Heading";
import PrevHeader from "@/components/atom/PrevHeader";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import BookmarkClient from "./BookmarkClient";

const bookmarkMarker = async (cookie: string): Promise<Favorite> => {
  const res = await instance.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/favorites`,
    {
      headers: {
        Cookie: cookie || "",
      },
    }
  );

  return res.data;
};

const Bookmark = async () => {
  const cookieStore = cookies();
  const decodeCookie = decodeURIComponent(cookieStore.toString());
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["marker", "bookmark"],
    queryFn: () => {
      return bookmarkMarker(decodeCookie);
    },
  });

  const dehydrateState = dehydrate(queryClient);

  return (
    <BlackSideBody toggle bodyClass="p-0 mo:px-0 mo:pb-0">
      <PrevHeader url="/mypage" text="내 정보" />

      <Heading title="저장한 장소" />
      <HydrationBoundary state={dehydrateState}>
        <BookmarkClient />
      </HydrationBoundary>
    </BlackSideBody>
  );
};

export default Bookmark;
