console.log("Hello World!", browser);
const kQRAPI = "https://qrcode.tec-it.com/API/QRCode?data="

function generateQRCode(methodName, message) {
    // 查询所有 Tab
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // 获取当前正显示的 Tab
        var activeTab = tabs[0];
        // 发消息给 content.js，告诉它获取当前链接
        browser.tabs.sendMessage(activeTab.id, { title: methodName, message: message}, function (res) {
            // content.js 获取后回调到这里
            if (res.title == "targetURL") {
                const activeTabURL = res.urlStr;
                const encodedTabURL = encodeURIComponent(activeTabURL);
                // 获取popup.html 中 img
                var qrcodeImg = document.getElementById("qrcode");
                qrcodeImg.onload = function() {
                    // 图片加载完成，loading 消失
                    document.getElementById("loader").style.display = "none";
                };
                // 通过请求获取二维码照片
                qrcodeImg.src = kQRAPI + encodedTabURL + "&istransparent=true";
            }
        });
    });
}

// 直接触发生成二维码的方法
generateQRCode("getPageURL", "generate current page URL");
