import React, { useState, useEffect } from "react";
// import { posts } from "../data/posts";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const { post } = await res.json();
      setPost(post);
      setLoading(false);
    }
    fetcher();

  }, [id]);

  if (loading) return <div>・・・読み込み中・・・</div>
  if (!loading && !post) return <div>・・・投稿が見つかりませんでした・・・</div>


  // const post = posts.find((post) => post.id === Number(id));
  if (!post) return <p>記事が見つかりませんでした。</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 px-4" >
      <img src={post.thumbnailUrl} alt={post.title} ></img>
      <div className="flex justify-between items-center">
        <div className="text-gray-500 my-8">{new Date(post.createdAt).toLocaleDateString()}</div>
        <div className="flex">{post.categories.map((category, index) => {
          return (
            <div className="border border-blue-600 rounded-md px-2 py-1 mr-2" key={index}>{category}</div>
          )
        })}</div>
      </div>
      <p className="font-bold text-2xl" >{post.title}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

    </div>
  )
};