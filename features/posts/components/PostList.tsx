"use client";

import { useEffect, useRef } from "react";
import { useInfinityPosts } from "../hook/useInfinityPosts";
import { Loader } from "@/features/shared/ui/Loader";

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfinityPosts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0 }
    );



    

    observer.observe(loadMoreRef.current)


    return () =>  observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="max-w-150 mx-auto">
      {data?.pages.map((page, idx) => (
        <div key={idx}>
          {page.map((post) => (
            <div className="border-2 p-4 mb-3" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ))}
      {isFetchingNextPage && <Loader />}
      <div ref={loadMoreRef} className="h-px" />
    </div>
  );
};

export default PostList;
