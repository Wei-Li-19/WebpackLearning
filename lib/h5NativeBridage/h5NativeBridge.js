

var Bridge = {
    init:connectWebViewJavascriptBridge,// jsBridge连接初始化
    callNativeBridge:callNativeBridge,// 基础调用
    getOAuthInfo: getOAuthInfo,// 获取授权信息
    getEventId: getEventId,// 获取活动id
    getNetworkStatus: getNetworkStatus,// 获取网络状态
    getUserModel:getUserModel
};


function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        console.log('bridgeInitSuccess');
        callback(window.WebViewJavascriptBridge)
    } else {
        console.log('bridgeInitFailed');
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function () {
                console.log('bridgeReInitSuccess');
                callback(window.WebViewJavascriptBridge)

            },
            false
        );
    }
}

/*
*
* 调用原生api
* type 调用类型 : 'info' , 'handler'
* handlerType 操作类型 :
* callback: 回调函数
* params: 调用参数
* */
function callNativeBridge(type,handlerType,callback,params) {
    // console.log('window.WebViewJavascriptBridge',window.WebViewJavascriptBridge)
    // console.log('callNativeBridge-callback',callback);


    if (window.WebViewJavascriptBridge && type==='info') {
        window.WebViewJavascriptBridge.send(handlerType, function(responseData) {
            callback(responseData);
            }
        );
    }else if (window.WebViewJavascriptBridge && type==='handler') {
        // console.log("callHandler 操作 "+handlerType+' : *********',params)
        WebViewJavascriptBridge.callHandler(handlerType, params, function(responseData) {
            console.log(handlerType+' : *********',responseData)
            callback(responseData);
            }
        );
    }else {
        console.log(handlerType+' Error ')
    }
}

// 获取授权信息
function getOAuthInfo(params,callback) {
    callNativeBridge('handler','getToken',callback,params)
}

// 获取活动id
function getEventId(callback) {
    callNativeBridge('info','getId',callback)
}

// 获取网络状态
function getNetworkStatus(callback) {
    callNativeBridge('info','getNetStatus',callback)
}

// 获取全部信息
function getUserModel(callback) {
    callNativeBridge('info','getUserModel',callback)
}

export default Bridge
