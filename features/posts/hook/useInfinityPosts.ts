import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";

export function useInfinityPosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },

    initialPageParam: 1,
  });
}
