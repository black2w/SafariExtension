browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
    // 接收 popup.js 中发送的消息，并回调结果
    if (request.title == "getPageURL") {
        sendResponse({ title: "targetURL", urlStr: window.location.href });
    }
});
