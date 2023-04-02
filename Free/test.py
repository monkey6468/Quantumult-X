#!/usr/bin/env python3
import requests
import re
from urllib.parse import unquote
import base64
import traceback


with open("list_raw.txt",'w') as f:
    f.write(txt)
with open("list.txt",'w') as f:
    b64txt = base64.b64encode(txt.encode())
    f.write(str(b64txt,'utf-8'))
