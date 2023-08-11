// ==UserScript==
// @name         台灣物流機器人
// @namespace    https://gnehs.net/
// @version      0.2.0
// @description  窩可以幫尼輕鬆將包裹加入台灣物流機器人呦 ><
// @author       gnehs
// @website      https://logistics-front.sudo.host/
// @match        https://ecvip.pchome.com.tw/web/order/all*
// @match        https://logistics-front.sudo.host/*
// @match        http://localhost:5173/*
// @icon         https://logistics-front.sudo.host/icon.jpg
// @pancake      https://pancake.tw
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @updateURL    https://github.com/tasi788/TaiwanDeliveryPlugins/raw/main/userscript/taiwan-delivery.user.js
// @downloadURL  https://github.com/tasi788/TaiwanDeliveryPlugins/raw/main/userscript/taiwan-delivery.user.js
// ==/UserScript==
(async function () {
  // Add CSS Style
  const style = document.createElement("style");
  style.innerHTML = `
  .frosted-glass {
    --bg-board-color: lch(76.67 38.33 203.29 / 0.1);
    position: relative;
    backdrop-filter: blur(8px);
    background: linear-gradient(
      140deg,
      var(--bg-board-color) 28.7%,
      color-mix(in lch, var(--bg-board-color) 30%, transparent)
    );
    box-shadow: rgba(255, 255, 255, 0.12) 1px 1px 1px 0px inset,
      rgba(255, 255, 255, 0.02) -1px -1px 1px 0px inset;
    filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.2));
  }
  .🥞台灣物流機器人 {
    all: unset;
    display: inline-flex;
    border-radius: 0.5em;
    padding: 0.25em 0.5em;
    background-color: #444;
    color: #fff;
    cursor: pointer;
    margin-top: 0.5em;
    font-family: 'Noto Sans TC', sans-serif;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    transition: all 0.1s ease;
  }
  .🥞台灣物流機器人 > i{
    font-size: 1.25em;
  }
  .🥞台灣物流機器人:hover {
    background-color: #222;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  .🥞台灣物流機器人:active {
    background-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
  .🥞toast-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 1em;
    padding: 1em;
  }
  .🥞toast{
    padding: 16px 24px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.4);
    color: #111;
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 1em;
    text-align: left;
    transition: all 0.1s ease;
    pointer-events: all;
    animation: toast 0.25s ease;
    width: 280px;
    line-height: 1.5em;
    overflow: hidden;
  }
  .🥞toast.🥞exit{
    animation: toast-out 0.5s ease;
  }
  .🥞toast-title{
    font-weight: 700;
  }
  @keyframes toast {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes toast-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    50% {
      transform: translateX(100%);
      opacity: 0;
      max-height: 80px;
    }
    100% {
      max-height: 0;
      opacity: 0;
    }
  }
`;
  document.head.appendChild(style);
  function addStyleSheet(href) {
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    head.appendChild(link);
  }
  addStyleSheet("https://cdn.jsdelivr.net/npm/boxicons/css/boxicons.min.css");
  addStyleSheet(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap"
  );
  async function track(service, track_id, note) {
    let apiKey = await GM.getValue("apiKey", "");
    if (apiKey === "") {
      apiKey = prompt("請輸入 API Key");
      await GM.setValue("apiKey", apiKey);
    }
    let res = await fetch("https://logistics.sudo.host/packages/query", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track_id,
        service,
        note,
      }),
    }).catch((e) => {
      console.error(e);
      return e;
    });
    let data = await res.json();
    if (data.detail) {
      toast(data.detail, "error");
      return;
    }
    if (data.message === "貨物已配達") {
      toast(`無法加入已配達的包裹`);
      return;
    }
    alert(`已將「${track_id}」加入追蹤`);
    return data;
  }
  //-
  // Config
  //-
  if (
    location.href.startsWith("https://logistics-front.sudo.host/") ||
    location.href.startsWith("http://localhost:5173/")
  ) {
    // inject config function
    localStorage.setItem("userscript-install", "true");
    localStorage.setItem(
      "api-key",
      JSON.stringify(await GM.getValue("apiKey", ""))
    );
    let inputObserver = new MutationObserver((mutations) => {
      let apiKeyField = document.querySelector("#api-key");
      if (apiKeyField) {
        apiKeyField.addEventListener("change", async function (e) {
          await GM.setValue("apiKey", e.target.value);
          console.log("[APIKEY]", e.target.value);
          toast("已儲存 API Key");
        });
        inputObserver.disconnect();
      }
    });
    inputObserver.observe(document.querySelector("body"), {
      childList: true,
      subtree: true,
    });
  }

  //-
  // Notification Center
  //-
  const toastContainer = document.createElement("div");
  toastContainer.className = "🥞toast-container";
  document.body.appendChild(toastContainer);
  function toast(message, type = "info", timeout = 3000) {
    let toast = document.createElement("div");
    toast.className = `🥞toast 🥞toast-${type} frosted-glass`;
    toast.innerHTML = `<div class="🥞toast-title">通知</div><div class="🥞toast-content">${message}</div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("🥞exit");
    }, timeout);
    setTimeout(() => {
      toast.remove();
    }, timeout + 500);
  }
  //-
  // PChome 24h
  //-
  if (location.href.startsWith("https://ecvip.pchome.com.tw/web/order/all")) {
    new MutationObserver((mutations) => {
      document
        .querySelectorAll(".link_logistics:not(.tracked)")
        .forEach((logisticsLink) => {
          logisticsLink.classList.add("tracked");
          let trackButton = document.createElement("button");
          trackButton.classList.add("🥞台灣物流機器人");
          trackButton.innerHTML = "<i class='bx bx-package' ></i> 追蹤包裹";
          trackButton.addEventListener("click", () => {
            let href = logisticsLink.href;
            let text = logisticsLink.innerText.split(" ");
            let nextTextNodes = logisticsLink.parentElement.innerHTML
              .split(/\<\/a>|<button/)
              .at(-2)
              .trim();
            let service = text[0];
            let track_id = text[1] || nextTextNodes;
            switch (service) {
              case "黑貓":
                track("Tcat", track_id, "PChome 24h");
                break;
              case "網家速配":
                track("GoPcHome", track_id, "PChome 24h");
                break;
              case "大榮":
                track("Kerrytj", track_id, "PChome 24h");
                break;
              case "新竹物流":
                track("Hct", track_id, "PChome 24h");
                break;
              case "郵局":
                track("Ipost", track_id, "PChome 24h");
                break;
              case "宅配通":
                track("Ecan", track_id, "PChome 24h");
                break;
              case "大智通-電子商務": // 7-11
                track("SevenEleven", track_id, "PChome 24h");
                break;
              case "日翊": // 全家
                track("FamiMart", track_id, "PChome 24h");
                break;
              // case "聯強": // 不支援
              default:
                toast(`目前不支援 ${service} 呦 ><`);
                break;
            }
          });
          logisticsLink.parentElement.appendChild(trackButton);
        });
    }).observe(document.querySelector("#listOrder"), {
      childList: true,
      subtree: true,
    });
  }
})();
