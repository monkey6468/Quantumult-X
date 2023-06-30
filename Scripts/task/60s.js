/*
******************************
脚本功能：每天60s读懂世界
更新时间：2023-6-30
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[task_local]
30 8 * * * https://raw.githubusercontent.com/1019459067/Quantumult-X/master/Scripts/task/60s.js, tag=每天60s读懂世界, img-url=https://raw.githubusercontent.com/Toperlock/Quantumult/main/icon/60s.png, enabled=true
*/

const url = `https://api.03c3.cn/zb/api.php`;
const method = `GET`;
const headers = {
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
    'Host': `api.03c3.cn`,
    'Connection': `keep-alive`,
    'Accept-Language': `zh-TW,zh-Hant;q=0.9`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Accept': `*/*`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest)
    .then(response => {

        $notify("每日60s读懂世界", '  ', JSON.parse(response.body)
            .datatime + ' 请点击通知查看内容', {
                "open-url": JSON.parse(response.body)
                    .imageUrl
            });
        $done();
    }, reason => {
        console.log(reason.error);
        $done();
    });