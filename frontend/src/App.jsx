function App() {
  return (
    <>
      <div className="container mt-16">
        <h1 className="text-4xl font-bold">台灣物流機器人 UserScript</h1>
        <a
          href="https://github.com/tasi788/TaiwanDeliveryPlugins/raw/main/userscript/taiwan-delivery.user.js"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          安裝
        </a>
        <details className="mt-4">
          <summary>沒有跳出安裝畫面？</summary>
          <ol className="list-decimal list-inside">
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
      </div>
    </>
  );
}

export default App;
