# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.11.1-alpine

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

RUN apk --update add gcc build-base libffi-dev
# freetype-dev libpng-dev openblas-dev libffi-dev
# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

WORKDIR /django_backend
COPY . .

# Install pip requirements
# COPY requirements.txt requirements.txt
RUN python -m pip install --upgrade pip
# RUN python -m pip install "setuptools<58"
# RUN python -m pip install ez_setup
RUN python -m pip install -r requirements.txt