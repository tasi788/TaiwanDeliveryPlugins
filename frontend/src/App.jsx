import Box from "./components/Box";
import Title from "./components/Title";
import Details from "./components/Details";
import Settings from "./components/Settings";
import Tag from "./components/Tag";
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";
function App() {
  const [isUserScriptInstalled] = useLocalStorage("userscript-install", false);
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="flex items-center gap-2 md:mt-4 mb-4 container p-0">
        <div
          className="w-12 h-12 frosted-glass rounded-[1rem] flex items-center justify-center active:scale-90 transition-transform"
          onClick={() => setCount(count + 1)}
        >
          {count < 7 ? (
            <i className="bx bx-package text-3xl" />
          ) : (
            <a className="text-3xl" href="https://pancake.tw" target="_blank">
              🥞
            </a>
          )}
        </div>
        <h1 className="text-2xl font-bold">台灣物流機器人</h1>
      </div>
      <Box>
        <Title>UserScript（測試版）</Title>
        <p>在購物網站中協助你快速將包裹加入機器人追蹤。</p>
        <div className="flex gap-2">
          <a
            href="https://github.com/tasi788/TaiwanDeliveryPlugins/raw/main/userscript/taiwan-delivery.user.js"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex px-4 py-1.5 rounded-[.5em] shadow-xl text-white gap-2 items-center justify-center bg-opacity-30 hover:bg-opacity-30 ${
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
          <a
            href="https://github.com/tasi788/TaiwanDeliveryPlugins/issues/new"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex px-4 py-1.5 rounded-[.5em] shadow-xl text-white gap-2 items-center justify-center bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-5 bg-white`}
          >
            <i className="bx bx-bug text-xl"></i>
            回報錯誤
          </a>
        </div>
        <div className="text-sm text-gray-400">
          仍在測試中，若有問題請至 GitHub 回報。
        </div>
      </Box>

      <Box>
        <Title>常見問題</Title>
        <Details title="沒有跳出安裝畫面？">
          <ul className="list-disc list-inside">
            <li>
              確認瀏覽器是否有安裝 UserScript
              相關擴充套件，安裝後再次點選上方安裝按鈕即可正常進行安裝。
            </li>
            <li>
              可以透過下列擴充套件使用 UserScript，請根據你的瀏覽器選擇：
              <ul className="list-disc list-inside pl-8">
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/jinjaccalgkegednnccohejagnlnfdag"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Violentmonkey (Chrome、Edge)
                  </a>
                  <Tag>推薦</Tag>
                </li>
                <li>
                  <a
                    href="https://addons.mozilla.org/firefox/addon/violentmonkey/"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Violentmonkey (Firefox)
                  </a>
                  <Tag>推薦</Tag>
                </li>
                <li>
                  <a
                    href="https://apps.apple.com/tw/app/userscripts/id1463298887"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Userscripts (Safari)
                  </a>
                  <Tag>推薦</Tag>
                  <Tag>iOS</Tag>
                  <Tag>iPadOS</Tag>
                  <Tag>macOS</Tag>
                </li>
                <li>
                  <a
                    href="https://chrome.google.com/webstore/detail/gcalenpjmijncebpfijmoaglllgpjagf"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tampermonkey Beta (Chrome、Edge)
                  </a>
                </li>
                <li>
                  <a
                    href="https://firefox.tampermonkey.net/firefox-current-beta.xpi"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
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
            <li>PChome 24h</li>
            <li>PChome 24h 手機網頁版</li>
            <li>蝦皮</li>
          </ul>
        </Details>
      </Box>
      <Settings />
      <div className="text-gray-400 text-sm text-center pb-8">
        Made with{" "}
        <a href="https://pancake.tw" target="_blank" rel="noreferrer">
          🥞
        </a>{" "}
        by{" "}
        <a
          href="https://gnehs.net"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          gnehs
        </a>
        .
      </div>
    </>
  );
}

export default App;
