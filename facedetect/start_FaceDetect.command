#! /bin/bash
cd "`dirname $0`"
source faceDetect-venv/bin/activate
python3 faceDetect.py
deactivate
exit