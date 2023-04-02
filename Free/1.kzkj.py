#!/usr/bin/env python3
import requests
import re
import base64
import traceback
import os

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"}
merge = []

# ========== 抓取 kkzui.com 的节点 ==========
try:
    res = requests.get("https://kkzui.com/jd?orderby=modified",headers=headers)
    article_url = re.search(r'<h2 class="item-heading"><a href="(https://kkzui.com/(.*?)\.html)">20(.*?)号(.*?)个高速免费节点(.*?)免费代理</a></h2>',res.text).groups()[0]

    res = requests.get(article_url,headers=headers)
    sub_url = re.search(r'<p><strong>这是v2订阅地址</strong>：(.*?)</p>',res.text).groups()[0]
    print(sub_url)

    res = requests.get(sub_url,headers=headers)
    merge += str(base64.b64decode(res.text.encode()),'utf-8').strip().replace('\r\n','\n').split('\n')
except:
    traceback.print_exc()


# ========== 写出文件 ==========
txt = ''
for url in set(merge):
    txt = txt + url + '\n'

if not os.path.exists("Free/List"):
    os.makedirs("Free/List")
with open("Free/List/kzkj.txt",'w') as f:
    f.write(txt)
