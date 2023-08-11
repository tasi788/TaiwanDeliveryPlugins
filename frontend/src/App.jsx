import Box from "./components/Box";
import Title from "./components/Title";
import Details from "./components/Details";
import Settings from "./components/Settings";
import { useLocalStorage } from "usehooks-ts";
function App() {
  const [isUserScriptInstalled] = useLocalStorage("userscript-install", false);
  return (
    <>
      <div className="flex items-center gap-2 mt-16 mb-4 container p-0">
        <div className="w-12 h-12 frosted-glass rounded-[1rem] flex items-center justify-center">
          <i className="bx bx-package text-3xl"></i>
        </div>
        <h1 className="text-2xl font-bold">台灣物流機器人</h1>
      </div>
      <Box>
        <Title>UserScript</Title>
        <p>在購物網站中協助你快速將包裹加入機器人追蹤。</p>
        <a
          href="https://github.com/tasi788/TaiwanDeliveryPlugins/raw/main/userscript/taiwan-delivery.user.js"
          target="_blank"
          rel="noreferrer"
          className={`inline-flex px-4 py-1.5 rounded-[.5em] shadow-xl text-white gap-2 items-center justify-center frosted-glass bg-opacity-30 hover:bg-opacity-30 ${
            isUserScriptInstalled
              ? "text-opacity-70 bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isUserScriptInstalled ? (
            <i className="bx bx-check text-xl"></i>
          ) : (
            <i className="bx bx-plus text-xl"></i>
          )}
          {isUserScriptInstalled ? "已安裝" : "安裝"}
        </a>
        <div className="text-sm text-gray-400 mt-2">
          仍在測試中，若有問題請至 GitHub 回報。
        </div>
      </Box>

      <Box>
        <Title>常見問題</Title>
        <Details title="沒有跳出安裝畫面？">
          <ul className="list-disc list-inside">
            <li>確認瀏覽器是否有安裝 UserScript 相關擴充套件</li>
            <li>
              可以透過下列擴充套件使用 UserScript，請根據你的瀏覽器選擇：
              <ul className="list-disc list-inside pl-8">
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/jinjaccalgkegednnccohejagnlnfdag"
                    className="link"
                    target="_blank"
                  >
                    Violentmonkey (Chrome、Edge)
                  </a>
                  <div className="frosted-glass inline-block text-white rounded-full p-0.5 px-2 text-sm ml-2">
                    推薦
                  </div>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/firefox/addon/violentmonkey/"
                    className="link"
                    target="_blank"
                  >
                    Violentmonkey (Firefox)
                  </a>
                  <div className="frosted-glass inline-block text-white rounded-full p-0.5 px-2 text-sm ml-2">
                    推薦
                  </div>
                </li>
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/gcalenpjmijncebpfijmoaglllgpjagf"
                    className="link"
                    target="_blank"
                  >
                    Tampermonkey Beta (Chrome、Edge)
                  </a>
                </li>
                <li>
                  <a
                    href="https://firefox.tampermonkey.net/firefox-current-beta.xpi"
                    className="link"
                    target="_blank"
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
            <li>PChome 24h（支援大部分貨運商）</li>
          </ul>
        </Details>
      </Box>
      <Settings />
    </>
  );
}

export default App;
