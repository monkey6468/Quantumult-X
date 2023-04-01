#!/usr/bin/env python3
import requests
import re
from urllib.parse import unquote
import base64
import traceback

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53"}
merge = []

import telepot
import json

# Replace YOUR_API_TOKEN with your Telegram Bot API token
bot = telepot.Bot('YOUR_API_TOKEN')

# Replace YOUR_CHAT_ID with the ID of the Telegram group you want to get messages from
chat_id = 'YOUR_CHAT_ID'

# Replace YOUR_MEMBER_ID with the ID of the Telegram group member you want to get the latest message from
member_id = 'YOUR_MEMBER_ID'

# Get the latest messages from the group
response = bot.getUpdates()

# Parse the JSON response and extract the latest message sent by the member
latest_message = None
for message in response:
    if message['message']['chat']['id'] == chat_id and message['message']['from']['id'] == member_id:
        if latest_message is None or message['message']['date'] > latest_message['message']['date']:
            latest_message = message

# Extract the message text from the latest message
if latest_message is not None:
    message_text = latest_message['message']['text']
    print(message_text)

# # ========== 写出文件 ==========
# txt = ''
# for url in set(merge):
#     txt = txt + url + '\n'

# with open("list_raw.txt",'w') as f:
#     f.write(txt)
# with open("list.txt",'w') as f:
#     b64txt = base64.b64encode(txt.encode())
#     f.write(str(b64txt,'utf-8'))
