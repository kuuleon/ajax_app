const buildHTML = (XHR) => {
  const item = XHR.response.post;//レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;//関数buildHTMLの返り値にhtmlを指定
};


function post (){ //リクエストを送信する処理
  const submit = document.getElementById("submit"); //取得した投稿ボタンの要素を変数submitに格納
  submit.addEventListener("click", (e) => { //クリックしたときにイベント発火
    e.preventDefault();//「投稿ボタンをクリックした」という現象を無効化(重複投稿)
    const form = document.getElementById("form"); //取得したフォームの要素を変数formに格納
    const formData = new FormData(form);//生成したFormDataオブジェクトを変数formDataに格納

    const XHR = new XMLHttpRequest();//生成したXMLHttpRequestオブジェクトを変数XHRに格納
    XHR.open("POST", "/posts", true);//リクエストの指定指定（HTTP,パス、非同期通信）
    XHR.responseType = "json";//サーバーからのレスポンスの形式をJSONに指定
    XHR.send(formData);//フォームに入力された内容をサーバー側に送

    XHR.onload = () => { //リクエストの送信に成功したときに行う処理の定義
      if (XHR.status != 200) {//レスポンスに何らかの問題があった場合の処理
        alert(`Error ${XHR.status}: ${XHR.statusText}`);//ステータスコードに応じたメッセージが格納
        return null;//エラーが出た場合に、30行目以降に記述されている処理を行わないようにするためにJavaScriptの処理から抜け出す
      };
      const list = document.getElementById("list");//新しいメモを挿入するための要素を取得し、変数listに格納
      const formText = document.getElementById("content");//リセットの対象となるフォームの要素contentを取得して、変数formTextに格納
      list.insertAdjacentHTML("afterend", buildHTML(XHR));  //変数listに格納された要素の直後に生成したHTMLを挿入
      formText.value = "";//空の文字列を割り当てることで、フォームの値をリセット
    };
  });
};
 
 window.addEventListener('load', post);
 //ページが読み込まれることをトリガーにして、処理が実行されるように関数を定義