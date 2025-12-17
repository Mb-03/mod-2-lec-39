"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@/features/shared/ui/Loader";
import { useInfinityPosts } from "../hook/useInfinityPosts";

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfinityPosts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // თუ ელემენტი არ არსებობს ან გვერდები აღარ გვაქვს
    if (!loadMoreRef.current || !hasNextPage) return;

    // დავამატოთ დამკვირვებელი
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // viewport
        rootMargin: "100px", // 100px-ით ადრე დათრიგერდეს
        threshold: 0, // ოდნავ გამოჩნდება დაიწყოს
      }
    );

    // დამკვირვებელო დააკვირდი Ref-ში არსებულ div-ს
    observer.observe(loadMoreRef.current);

    // cleanup - oberver-ის გათიშვა
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Data */}
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((post) => (
            <div key={post.id} className="border-2 p-4 mb-3">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ))}

      {isFetchingNextPage && <Loader />}

      {/* Target div */}
      <div ref={loadMoreRef} className="h-px" />
    </div>
  );
};

export default PostList;
