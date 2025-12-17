import { Post } from "../types/post";


const LIMIT = 10

export async function getPosts(page: number) : Promise<Post[]> {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`
    );

    if (!res.ok) throw new Error("Failed to fetch")

    return res.json()

}