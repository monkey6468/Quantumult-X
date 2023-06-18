#!/usr/bin/env python3
import requests
import re
import base64
import traceback
import os

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"}
merge = []

# ========== 抓取 https://freenode.me/ 的节点 ==========
try:
    res = requests.get("https://freenode.me/",headers=headers)
    article_url = re.search(r'<a href="(https://freenode.me/a/(.*?).html)"',res.text).groups()[0]
    print(article_url)

    sub_res = requests.get(article_url,headers=headers)
    sub_url = re.search(r'<p>https:(.*?)</p>',sub_res.text)[0]
    sub_url = re.sub(r'<p>', "", sub_url)
    sub_url = re.sub(r'</p>', "", sub_url)
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
with open("Free/List/freenode.txt",'w') as f:
    f.write(txt)      
