import { useForm } from "react-hook-form";

// React Hook Form の初期状態の設定

export const Contact = () => {
  const {
    register,//登録する　ための関数
    handleSubmit,//送信する時に実行される関数
    formState: { errors, isSubmitting },//フォームの状態関数{バリデーションエラーを保持する,送信中かどうかのフラグ}
    reset, //入力内容をリセットする関数
  } = useForm();
  // ※useForm()フックから返されるオブジェクトを分割代入で解体して、
  // register、handleSubmit、formState、resetの4つのプロパティをそれぞれ個別の変数として取得している


  // フォーム送信処理

  const onSubmit = async (data) => { //onSubmitはフォームが送信された際に呼び出される非同期の関数
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",//リクエストを送信する先のURL（エンドポイント）
        {//第２引数は、POSTリクエストを送信するための設定をしている
          method: "POST",//POSTメソッドを指定。
          headers: { "Content-Type": "application/json" },//HTTPメソッドを指定します。ここでは POST メソッドを使っている。
          //Content-Type ヘッダーは送信するデータの種類を示す。
          //ここでは application/json を指定しているので、サーバーには JSON形式 のデータが送られることを示している。
          //サーバー側が受け取るデータが JSON 形式であることを通知する重要な設定。
          body: JSON.stringify(data),//body はリクエストの本体部分です。ここには送信するデータを指定する
          //data はフォームから取得したデータ（例: 名前、メールアドレス、メッセージなど）を含むオブジェクト
          //このオブジェクトを JSON.stringify(data) で JSON文字列 に変換して送信します。
          //JSON.stringify は JavaScript のオブジェクトを JSON 文字列に変換するためのメソッド.
        }
      );

      //レスポンスの処理
      const result = await res.JSON();
      //await: res.json() は非同期関数なので、await を使ってその結果が返されるまで待つ。
      //これにより、result にはサーバーからのレスポンスデータが JSON 形式で格納されます。


      //結果の表示
      console.log("送信できました", result);
      alert("送信しました！");



    } catch (error) {
      console.log("送信エラー", error);
      alert("送信エラー");
    }
  }


  // リセットボタン
  const handleReset = () => reset();
  //handleReset: reset 関数を呼び出すシンプルな処理。フォームの値をクリアするためのハンドラー。

  return (
    <div>
      <h1>問合わせフォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="name">お名前</label>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              {...register("name", {
                required: "お名前は必須です。",//必須
                maxLength: {
                  value: 30,
                  message: "名前は30文字以内にしてください。",
                },
              })}
            />
            <p>{errors.name?.message}</p>
            {/* name フィールドのエラーメッセージを表示。errors オブジェクトに格納されています。
            errors は、フォーム内で発生したバリデーションエラーを保持している。
            エラーが発生しているフィールドの名前（name 属性で指定）をキーとし、その詳細が値として格納される。
            errors.name が存在しない場合（=エラーがない場合）、?. により undefined を返し、安全にアクセスできます。
            
            */}
          </div>
        </div>

        <div>
          <label htmlFor="email">メールアドレス</label>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", {
                required: "メールアドレスは必須です。",
                maxLength: {
                  value:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                  message: "正しいメールアドレスを入力してください。",
                },
              })}
            />
            <p>{errors.email?.message}</p>
          </div>
        </div>

        <div>
          <label htmlFor="message">本文</label>
          <div>
            <textarea
              id="message"
              name="message"
              rows="8"
              {...register("message", {
                required: "本文は必須です。",
                maxLength: {
                  value: 500,
                  message: "本文は500文字以内にしてください。",
                },
              })}
            />
            <p>{errors.message?.message}</p>
          </div>
        </div>

        <div>
          <button type="submit">{isSubmitting ? "送信中..." : "送信"}</button>
          <button type="button" onClick={handleReset}>
            クリア
          </button>
        </div>
      </form>
    </div>
  );
};


