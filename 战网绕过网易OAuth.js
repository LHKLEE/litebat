// ==UserScript==
// @name         战网绕过网易OAuth，跳过challenge死循环修复版
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  拦截网易oauth，并且排除challenge安全验证页面，防止登录验证码页面被强制跳转造成死循环
// @match        https://oauth.g.mkey.163.com/*
// @match        https://account.battlenet.com.cn/login/zh/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const targetUrl = "https://account.battlenet.com.cn/login/zh/?app=apph&showCredentials=true";
    const path = window.location.pathname;

    // =========关键========= 如果进入challenge安全验证码页面，直接退出脚本，不跳转！！
    if(path.startsWith("/login/zh/challenge/")){
        return;
    }

    // 网易OAuth页面直接跳转
    if(location.hostname === "oauth.g.mkey.163.com"){
        window.location.replace(targetUrl);
        return;
    }

    // account.battlenet域名：仅当不是目标地址的时候跳转；challenge页面已经上面return过滤掉
    if(location.hostname === "account.battlenet.com.cn" && window.location.href !== targetUrl){
        window.location.replace(targetUrl);
    }
})();
