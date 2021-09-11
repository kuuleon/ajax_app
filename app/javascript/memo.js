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
  });
};
 
 window.addEventListener('load', post);