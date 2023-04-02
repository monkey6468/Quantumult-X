#!/usr/bin/env python3
import requests
import re
import base64
import traceback
import os
from bs4 import BeautifulSoup, Tag
from lxml import etree

headers = {"User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36",
           "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
           "accept-language":"zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7",
           "content-encoding":"br",
           "Content-Type":"text/html;",
        #    "accept-encoding":"gzip, deflate, br",
        #    "cookie":"JekG_761d_saltkey=wMmJZ80e; JekG_761d_lastvisit=1680413849; _ga=GA1.2.1228613324.1680417566; _gid=GA1.2.1557583047.1680417566; __cf_bm=67cC9nZK_Z3Tvv36chjtnZlyU.3uC4McqS15ChzFr98-1680427736-0-AbcY2whbVeMROLzZyhHcwKGJG9GpHY+9Bntmruo5GqKkOe4hK/95OdC8y4GD0Ns+7mQwfTewWk1s69VJQ+zaibuuwcvoLVHdaBrh8jjtn+IPGHk8pgVwL6uJonALgtibaw==; JekG_761d_st_t=0|1680428013|fc3c6993abbb9204a96df3e5634bcd0e; JekG_761d_forum_lastvisit=D_2_1680427735D_51_1680428013; JekG_761d_visitedfid=51D43D2D63; JekG_761d_sid=ENK7N7; JekG_761d_lastact=1680428200	index.php	viewthread; JekG_761d_st_p=0|1680428200|d20b292a59bab465d3dbd4efe9cf8cf3; JekG_761d_viewid=tid_88696",
           "referer":"https://fanqiangdang.com/archiver/tid-210.html?_dsign=864ca95c"}
merge = []

# ========== 抓取 https://fanqiangdang.com/archiver/?fid-2.html 的节点 ==========
try:
    res = requests.get("https://fanqiangdang.com/archiver/?fid-2.html",headers=headers)
    # res.encoding = 'utf-8'
    # html = etree.HTML(res.text)
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

# if not os.path.exists("Free/List"):
#     os.makedirs("Free/List")
# with open("Free/List/freenode.txt",'w') as f:
#     f.write(txt)      
