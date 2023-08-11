// ==UserScript==
// @name         台灣物流機器人
// @namespace    https://gnehs.net/
// @version      0.3.0
// @description  窩可以幫尼輕鬆將包裹加入台灣物流機器人呦 ><
// @author       gnehs
// @website      https://logistics-front.sudo.host/
// @match        https://ecvip.pchome.com.tw/web/order/all*
// @match        https://ecvip.pchome.com.tw/m/order/all*
// @match        https://shopee.tw/user/purchase/*
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
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 12px;
    background-color: #2e2f39;
    color: #fff;
    cursor: pointer;
    font-family: 'Noto Sans TC', sans-serif;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    transition: all 0.1s ease;
    box-sizing: border-box;
  }
  .🥞台灣物流機器人 > i{
    font-size: 1.25em;
  }
  .🥞台灣物流機器人:hover {
    background-color: #4a4b5c;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  .🥞台灣物流機器人:active {
    background-color: #22232b;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
  .🥞toast-container,
  .🥞toast-container * {
    box-sizing: border-box;
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
    gap: 8px;
    padding: 8px;
  }
  .🥞toast{
    padding: 16px 24px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.6);
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
  .🥞toast.🥞dark{
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
  }
  .🥞toast.🥞exit{
    animation: toast-out 0.5s linear;
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
      max-height: 96px;
    }
    50%, 100% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      max-height: 0;
      padding: 0;
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
    toast(`已將「${track_id}」加入追蹤`);
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
    const toast = document.createElement("div");
    toast.className = `🥞toast 🥞toast-${type} frosted-glass`;
    if (
      location.href.startsWith("https://logistics-front.sudo.host/") ||
      location.href.startsWith("http://localhost:5173/")
    ) {
      toast.classList.add("🥞dark");
    }
    toast.innerHTML = `<div class="🥞toast-title">通知</div><div class="🥞toast-content">${message}</div>`;
    toastContainer.appendChild(toast);
    let removeTimeout = setTimeout(() => {
      remove();
    }, timeout);
    function remove() {
      removeTimeout && clearTimeout(removeTimeout);
      toast.classList.add("🥞exit");
      toast.onanimationend = () => {
        toast.style.display = "none";
        toast.remove();
      };
    }
    return { remove };
  }
  //-
  // PChome 24h
  //-
  if (
    location.href.startsWith("https://ecvip.pchome.com.tw/web/order/all") ||
    location.href.startsWith("https://ecvip.pchome.com.tw/m/order/all")
  ) {
    new MutationObserver((mutations) => {
      document
        .querySelectorAll(
          '.link_logistics:not(.tracked),a:not(.tracked)[style="text-decoration: underline ;color:0099cc"]'
        )
        .forEach((logisticsLink) => {
          logisticsLink.classList.add("tracked");
          let trackButton = document.createElement("button");
          trackButton.classList.add("🥞台灣物流機器人");
          trackButton.style = "margin-top: 0.5em;";
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
  //-
  // Shopee
  //-
  if (location.href.startsWith("https://shopee.tw/user/purchase/")) {
    new MutationObserver((mutations) => {
      document
        .querySelectorAll(".hiXKxx:not(.tracked)")
        .forEach((orderItem) => {
          try {
            let orderHref = orderItem.querySelector(
              'a[href^="/user/purchase/order/"]'
            ).href;
            let orderID = orderHref.match(/order\/(\d+)/)[1];
            orderItem.classList.add("tracked");
            let trackButtonContainer = document.createElement("div");
            trackButtonContainer.classList.add("PgtIur");
            let trackButton = document.createElement("button");
            trackButton.classList.add("🥞台灣物流機器人");
            trackButton.innerHTML = "<i class='bx bx-package' ></i> 追蹤包裹";
            trackButton.style = `width: 150px;height: 40px;border-radius: 2px;font-size: 14px;`;
            trackButton.addEventListener("click", async () => {
              let { remove: removeLoading } = toast("正在查詢訂單資訊⋯");
              // https://shopee.tw/api/v4/order/get_order_detail?order_id=143807054231066
              let orderDetail = await fetch(
                `https://shopee.tw/api/v4/order/get_order_detail?order_id=${orderID}`,
                {
                  withCredentials: true,
                  credentials: "include",
                }
              ).then((res) => res.json());
              let carrier = orderDetail.data.shipping.fulfilment_carrier.text;
              let id = orderDetail.data.shipping.tracking_number;
              let shop_name =
                orderDetail.data.info_card.parcel_cards[0].shop_info.shop_name;
              let note = `蝦皮|${shop_name}`;
              switch (carrier) {
                case "蝦皮店到店":
                  await track("Shopeetw", id, note);
                  break;
                case "中華郵政":
                  await track("Ipost", id, note);
                  break;
                case "全家":
                case "全家冷凍超取(不寄送離島地區)":
                  await track("FamiMart", id, note);
                  break;
                case "萊爾富":
                  await track("HiLife", id, note);
                  break;
                case "7-ELEVEN":
                case "蝦皮海外 - 7-11":
                case "蝦皮韓國 - 7-11":
                  await track("SevenEleven", id, note);
                  break;
                default:
                  toast(`目前不支援這家貨運商：${carrier}`);
              }
              removeLoading();
            });
            trackButtonContainer.appendChild(trackButton);
            orderItem
              .querySelector(".EOjXew")
              .appendChild(trackButtonContainer);
          } catch (e) {
            console.error(e);
          }
        });
    }).observe(document.querySelector("body"), {
      childList: true,
      subtree: true,
    });
  }
})();
