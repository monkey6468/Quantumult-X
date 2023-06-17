#!/usr/bin/env python3
import requests
import re
import base64
import traceback
import os

headers = {
"Host":"api-2.quickg.cc",
"Authorization":"Token d327b0df4873e3e2020578ae77083ae059634ca7",
"channel":"GW",
"appVersion":"2.1.7",
"Accept-Language":"zh-CN,zh-Hans;q=0.9",
"Accept-Encoding":"gzip, deflate, br",
"platform":"ios",
"imei":"b8d5f841bdd44230b8b155b3b9317f31",
"Content-Length":"0",
"User-Agent":"Telescope/219 CFNetwork/1335.0.3 Darwin/21.6.0",
"Connection":"keep-alive",
"Accept":"application/json",
"systemVersion":"15.6.1",
}
merge = []

# ========== 抓取 kkzui.com 的节点 ==========
try:
    res = requests.post("https://api-2.quickg.cc/api/v5/nodes/",headers=headers)
    # article_url = re.search(r'<h2 class="item-heading"><a href="(https://kkzui.com/(.*?)\.html)">',res.text).groups()[0]

    print(res)
    # res = requests.get(article_url,headers=headers)
    # sub_url = re.search(r'<p><strong>这是v2订阅地址</strong>：(.*?)</p>',res.text).groups()[0]
    # print(sub_url)

    # res = requests.get(sub_url,headers=headers)
    # merge += str(base64.b64decode(res.text.encode()),'utf-8').strip().replace('\r\n','\n').split('\n')
except:
    traceback.print_exc()


# ========== 写出文件 ==========
# txt = ''
# for url in set(merge):
#     txt = txt + url + '\n'

# if not os.path.exists("Free/List"):
#     os.makedirs("Free/List")
# with open("Free/List/kzkj.txt",'w') as f:
#     f.write(txt)
