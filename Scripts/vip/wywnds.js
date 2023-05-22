/******************************
 脚本功能：网易蜗牛读书 解锁VIP、优化个人中心、移除弹窗
 软件版本：1.9.69
 更新时间：2023-5-22
 使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
 *******************************

 [rewrite_local]

 ^https?:\/\/p\.du\.163\.com\/((gain\/readtime\/welfare)|(book\/related\/activity))\.json url reject
 ^https?:\/\/p\.du\.163\.com\/(gain|extra|promote)\/((readtime\/info)|init|list)\.json url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/wywnds.js

 [mitm]

 hostname = p.du.163.com

 *******************************/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

if (url.indexOf('/gain/readtime/info.json') != -1) {
    obj.tradeEndTime = 2802268800000;
}

if (url.indexOf('/extra/init.json') != -1) {
    obj.adConfig.vipUserAdSwitch_ios = true;
}

if (url.indexOf('/promote/list.json') != -1) {
    for (var i = 0; i < obj.promotionList.length; i++) {
        if (i == 0 || i == 1 || i == 4) {
            obj.promotionList[i].contentModule.moduleId = -1;
            obj.promotionList[i].contentModule.title = "";
            obj.promotionList[i].contentModule.description = "";
            obj.promotionList[i].contentModule.type = "";

            obj.promotionList[i].linkUrl = "";
            obj.promotionList[i].imageUrl = "";
            obj.promotionList[i].targetUrl = "";
        }
    }
}
body = JSON.stringify(obj);
$done({body});
