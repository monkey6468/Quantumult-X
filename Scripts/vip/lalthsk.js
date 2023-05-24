/******************************
 脚本功能：恋爱聊天话术库 解锁VIP
 软件版本：1.1.6
 更新时间：2023-5-24
 使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
 *******************************
[rewrite_local]

^http[s]?:\/\/chat.zyhd02.cn url script-response-body https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/vip/lalthsk.js

[mitm] 

hostname = chat.zyhd02.cn

*******************************/

var body = $response.body.replace(/"isTry":\d/g,'"isTry":1')
.replace(/"isFree":\d/g,'"isFree":1')
.replace(/"unlockType":\d/g,'"unlockType":1')
.replace(/"vipTime":""/g,'"vipTime":"2058-10-20"')
.replace(/"vipIsValid":\d/g,'"vipIsValid":1')
.replace(/"vipText":".*?"/g,'"vipText":"有效期至:2058-10-20"')
.replace(/"freeSearchCount":"\d+"/g,'"freeSearchCount":"5858"')
.replace(/"isShowAd":"1"/g,'"isShowAd":"0"')
$done({ body });
