import Box from "./components/Box";
import Title from "./components/Title";
import Details from "./components/Details";
import Settings from "./components/Settings";
function App() {
  return (
    <>
      <Box>
        <Title>台灣物流機器人 UserScript</Title>
        <p>
          這個 UserScript 可以在許多購物網站中協助你快速將包裹加入機器人追蹤。
        </p>
        <a
          href="https://github.com/tasi788/TaiwanDeliveryPlugins/raw/main/userscript/taiwan-delivery.user.js"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-2 bg-blue-500 text-white rounded-[.5em] hover:bg-blue-600 shadow-xl"
        >
          安裝
        </a>
      </Box>

      <Box>
        <Title>常見問題</Title>
        <Details title="沒有跳出安裝畫面？">
          <ul className="list-disc list-inside">
            <li>確認瀏覽器是否有安裝 UserScript 相關擴充套件</li>
            <li>
              我們推薦下列擴充套件，請根據你的瀏覽器選擇：
              <ul className="list-disc list-inside pl-8">
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/gcalenpjmijncebpfijmoaglllgpjagf"
                    className="text-blue-200 underline hover:opacity-75 active:opacity-50"
                  >
                    Tampermonkey Beta (Chrome、Edge)
                  </a>
                </li>
                <li>
                  <a
                    href="https://firefox.tampermonkey.net/firefox-current-beta.xpi"
                    className="text-blue-200 underline hover:opacity-75 active:opacity-50"
                  >
                    Tampermonkey Beta (Firefox)
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </Details>
        <Details title="目前支援的網站有哪些？">
          <ul className="list-disc list-inside">
            <li>PChome 24h（不支援部分貨運商）</li>
          </ul>
        </Details>
      </Box>
      <Settings />
    </>
  );
}

export default App;
