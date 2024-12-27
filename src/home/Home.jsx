import React from "react";
import { posts } from "../data/posts";

export const Home = () => {
  return (
    <div>
      <ul>
        {posts.map((post) => {
          return (

            <li class="border border-gray-200 p-4 mb-8 max-w-3xl mx-auto my-10 px-4">
              <div class="flex justify-between">
                <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                <div class="flex">{post.categories.map((category) => {
                  return (
                    <div class="border border-blue-600 rounded-md text-blue-600 text-sm mr-2 py-1 px-2">{category}</div>
                  )
                })}
                </div>
              </div>

              <p class="text-2xl">{post.title}</p>
              {/* ↓丸覚えで！ */}
              <div class="leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
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