/******************************
脚本功能：简讯+解锁VIP
软件版本：5.0.2
更新时间：2023-3-12
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

#^https?:\/\/api\.tipsoon\.com\/api\/v1\/top\/ad url reject-img
^https?:\/\/gw1\.dushu365\.com url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/jianxun.js

[mitm] 

hostname = gw1.dushu365.com

*******************************/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);
 
if (url.indexOf('/user-orchestration/user/api/v101/userInfo') != -1) {
    obj.data.isTrial = true;
    obj.data.is_vip = true;
    obj.data.username = "肖伟华";
    body = JSON.stringify(obj);
}
 
if (url.indexOf('/user-orchestration/user/api/v100/vip_infos') != -1) {
       for (var i = 0; i < obj.data.list.length; i++) {
        obj.data.list[i].vipStatus = true;
    }
    body = JSON.stringify(obj);
}

if (url.indexOf('/sns-orchestration-system/learningRanking/v100/myRank') != -1) {
    obj.data.userName = "肖伟华";
    obj.data.weeklyLearningDuration = 520;
    body = JSON.stringify(obj);
}

if (url.indexOf('/resource-behavior-orchestration/play/v100/histories') != -1) {
    for (var i = 0; i < obj.data.playRecords.length; i++) {
        obj.data.playRecords[i].bookTitle = "肖伟华";
        obj.data.playRecords[i].hasBought = true;
    }
    body = JSON.stringify(obj);
}

if (url.indexOf('/resource-orchestration-system/book/v101/content/part') != -1) {
    obj.data.free = true;
    obj.data.hasBought = true;
    obj.data.hasUnlocked = true;
    obj.data.isFavorite = true;
    obj.data.trial = true;
    body = JSON.stringify(obj);
}

$done({body});
