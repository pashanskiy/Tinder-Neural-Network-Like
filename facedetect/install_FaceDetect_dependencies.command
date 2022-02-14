#! /bin/bash
cd "`dirname $0`"
python3 -m venv faceDetect-venv
source faceDetect-venv/bin/activate
pip3 install matplotlib==3.5.1 mtcnn==0.1.1 tensorflow==2.7.0