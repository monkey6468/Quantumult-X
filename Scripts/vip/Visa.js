

/******************************
脚本功能：Visa看天下+解锁VIP
软件版本：3.3.3
更新时间：2023-3-12
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

^https:\/\/open3\.vistastory\.com\/v3\/api\/notice\/need_read_notice_number? url reject
^https:\/\/open3\.vistastory\.com\/v3\/api\/index\/loading_ad2? url reject
^http[s]?:\/\/open3\.vistastory\.com url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/Visa.js

[mitm] 

hostname = open3.vistastory.com


*******************************/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

/**js 中 indexof() 只能处理字符串类型，如果没有检索到目标字符串，则返回 -1*/
if (url.indexOf('/get_home_center') != -1) {
    obj.subscriptionVip.endTime = 2783131310000;
    obj.subscriptionVip.isActive = 1;
    obj.isVip = 1;

    body = JSON.stringify(obj);
}

if (url.indexOf('/article_detail2') != -1) {
    obj.article.isBuyArticle = 1;

    body = JSON.stringify(obj);
}

if (url.indexOf('/get_vip_info_and_recommend_mags') != -1) {
    obj.isVip = 1;
    obj.expireVip = 0;
    obj.isUpgradeVip = 1;
    obj.subscriptionVip.endTime = 2783131310000;
    obj.subscriptionVip.isActive = 1;

    body = JSON.stringify(obj);
}

if (url.indexOf('/mag_column_detail') != -1) {
    obj.isBuyMag = 1;
    obj.isFree = 1;
    obj.mag.isfree = 1;
    obj.mag.isBuyMag = 1;

    body = JSON.stringify(obj);
}

if (url.indexOf('/last_mag_2') != -1) {
    obj.mag.isBuyMag = 1;
    obj.mag.isFree = 1;
    obj.teji.isfree = 1;
    obj.teji.isBuyMag = 1;

    body = JSON.stringify(obj);
}

if (url.indexOf('/all_mag_page_3') != -1) {
    for (int i = 0; i < obj.magList.length; i++) {
        obj.magList[i].isBuyMag = 1;
        obj.magList[i].isFree = 1;
    }

    body = JSON.stringify(obj);
}
$done({body});
