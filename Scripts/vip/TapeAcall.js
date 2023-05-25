/******************************
脚本功能：TapeAcall 解锁订阅
软件版本：5.11.8
更新时间：2023-5-25
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

^https?:\/\/api\.tapeacall\.com\/v3\/receipt? url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/wywnds.js

[mitm]

hostname = api.tapeacall.com

 https://api.tapeacall.com/v3/receipt?
 
*******************************/
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

if (url.indexOf('/v3/receipt') != -1) {
    obj.recordings.expiry = "2058-10-20T80:00:00Z";
    obj.recordings.is_active = true;
    
    obj.transcriptions.expiry = "2058-10-20T80:00:00Z";
    obj.transcriptions.is_active = true;
}

body = JSON.stringify(obj);
$done({body});
