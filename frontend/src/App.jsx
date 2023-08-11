function App() {
  return (
    <>
      <div className="container mt-16 flex flex-col gap-4  items-start">
        <h1 className="text-4xl font-bold">台灣物流機器人 UserScript</h1>
        <p>
          這個 UserScript 可以在許多購物網站中協助你快速將包裹加入機器人追蹤。
        </p>
        <a
          href="https://github.com/tasi788/TaiwanDeliveryPlugins/raw/main/userscript/taiwan-delivery.user.js"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-2 bg-blue-500 text-white rounded-[1em] hover:bg-blue-600"
        >
          安裝
        </a>
        <details className="bg-fuchsia-50 rounded-[1em] w-full">
          <summary className="text-fuchsia-600 font-bold cursor-pointer p-4">
            沒有跳出安裝畫面？
          </summary>
          <ol className="list-decimal list-inside p-4 pt-0">
            <li>確認瀏覽器是否有安裝 Tampermonkey</li>
            <li>
              <a
                href="https://chrome.google.com/webstore/detail/gcalenpjmijncebpfijmoaglllgpjagf"
                className="text-blue-600 underline hover:opacity-75 active:opacity-50"
              >
                安裝 Tampermonkey
              </a>
            </li>
          </ol>
        </details>
        <details className="bg-fuchsia-50 rounded-[1em] w-full">
          <summary className="text-fuchsia-600 font-bold cursor-pointer p-4">
            目前支援的網站有哪些？
          </summary>
          <ul className="list-disc list-inside  p-4 pt-0">
            <li>PChome 24h</li>
          </ul>
        </details>
      </div>
    </>
  );
}

export default App;
