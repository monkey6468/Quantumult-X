#!/usr/bin/env python3
import requests
import re
from urllib.parse import unquote
import base64
import traceback
from bs4 import BeautifulSoup, Tag


headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"}
merge = []

# ========== 抓取 https://freenode.me/ 的节点 ==========
try:
    res = requests.get("https://freenode.me/",headers=headers)
    article_url = re.search(r'<a href="(https://freenode.me/a/(.*?).html)" target="_self">(.*?)｜20(.*?)年(.*?)月(.*?)日最新高速稳定免费节点 Clash节点 V2ray节点 小火箭节点SSR订阅 Clash订阅 V2ray订阅  免费机场节点分享 节点订阅免费翻墙科学上网</a>',res.text).groups()[0]
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
with open("Free/freenode_row.txt",'w') as f:
    f.write(txt)      
