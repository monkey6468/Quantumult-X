#!/usr/bin/env python3
import requests
import re
import base64
import traceback
import os
from flask_cors import CORS 
from flask import Flask
from flask_cors import CORS, cross_origin

from bs4 import BeautifulSoup, Tag
from lxml import etree

headers = {"User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36",
           "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
           "accept-language":"zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7",
           "content-encoding":"br",
           "Content-Type":"text/html;",
           # "Set-Cookie":"JekG_761d_forum_lastvisit=D_2_1686468722; expires=Sun, 18-Jun-2023 07:32:02 GMT; Max-Age=604800; path=/; domain=.fanqiangdang.com; secure",
        #    "accept-encoding":"gzip, deflate, br",
           "Access-Control-Allow-Origin":"*",
           "Access-Control-Allow-Headers":"Content-Type",
           "Access-Control-Allow-Credentials":"GET,POST,OPTIONS",
           }
merge = []

# ========== 抓取 https://fanqiangdang.com/archiver/?fid-2.html 的节点 ==========
try:
    res = requests.get("https://fanqiangdang.com/archiver/?fid-2.html",headers=headers)
    res.encoding = 'utf-8'
    html = etree.HTML(res.text)
    print(res.text)
    # lis = html.xpath('//*[@id="content"]/ul/li')
    # print(lis)# //*[@id="content"]/ul/li[1]
    # <a href="?tid-88611.html">2023-04-02上午ssr节点/订阅分享,免费节点,机场推荐8k</a>
    # article_url = re.search(r'<a href="(https://freenode.me/a/(.*?).html)" target="_self">(.*?)｜20(.*?)年(.*?)月(.*?)日最新高速稳定免费节点 Clash节点 V2ray节点 小火箭节点SSR订阅 Clash订阅 V2ray订阅  免费机场节点分享 节点订阅免费翻墙科学上网</a>',res.text).groups()[0]
    # article_url = re.search(r'"2023-04-02上午ssr节点/订阅分享,免费节点,机场推荐8k</a>',res.text)
    # print(article_url)

    # soup = BeautifulSoup(res.text, 'html.parser')

    # name = soup.select('#content > ul > li:nth-child(1) > a')
    # a = soup.find('div', class_='content')
    # print(res.text)

    # sub_res = requests.get(article_url,headers=headers)
    # sub_url = re.search(r'<p>https:(.*?)</p>',sub_res.text)[0]
    # sub_url = re.sub(r'<p>', "", sub_url)
    # sub_url = re.sub(r'</p>', "", sub_url)
    # print(sub_url)

    # res = requests.get(sub_url,headers=headers)
    # merge += str(base64.b64decode(res.text.encode()),'utf-8').strip().replace('\r\n','\n').split('\n')
except:
    traceback.print_exc()

# # ========== 写出文件 ==========
# txt = ''
# for url in set(merge):
#     txt = txt + url + '\n'

# if not os.path.exists("Free"):
#     os.makedirs("Free")
# with open("Free/freenode.txt",'w') as f:
#     f.write(txt)      
