import React, { useState, useEffect } from "react";
// import { posts } from "../data/posts";
import { Link } from "react-router-dom";

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts")
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    }

    fetcher();
  }, []
  );

  if (loading) return <div>・・・読み込み中・・・</div>

  return (
    <div>
      <ul>
        {posts.map((post) => {
          return (

            <li key={post.id} className="border border-gray-200 p-4 mb-8 max-w-3xl mx-auto my-10 px-4">
              <Link to={`/posts/${post.id}`}>
                <div className="flex justify-between">

                  {/* ↓丸覚えで！ */}
                  <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                  <div className="flex">{post.categories.map((category, index) => {
                    return (
                      <div key={index} className="border border-blue-600 rounded-md text-blue-600 text-sm mr-2 py-1 px-2">{category}</div>
                    )
                  })}
                  </div>
                </div>

                <p className="text-2xl">{post.title}</p>
                {/* ↓丸覚えで！ */}
                <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
              </Link>

            </li>

          );
        })}
      </ul>
    </div>
  );
};

//  <div>{post.createdAt}</div>これでは文字列そのまま出力されてしまうから次の書き方にする↓ 
// 正しい日付表示の方法:
// post.createdAt が日付文字列であれば、new Date() を使って Date オブジェクトに変換し、
// その後に .toLocaleDateString() を使って日付を適切にフォーマットします。
// 詳細な説明：
// new Date(post.createdAt) は post.createdAt（例えば '2023-09-11T09:00:00.000Z'）を Date オブジェクトに変換します。
// .toLocaleDateString() メソッドを使って、その日付をローカライズされた形式で文字列として表示します。