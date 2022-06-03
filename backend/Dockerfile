FROM python:3.10-slim-bullseye

# ARG DEBIAN_FRONTEND=noninteractive
# RUN apt-get update && apt-get install binutils -y

RUN mkdir -p /tmp/app
COPY ./requirements.txt /tmp/app/requirements.txt

RUN python -m pip install --no-cache-dir -r /tmp/app/requirements.txt
RUN rm -rf /tmp/app

WORKDIR /app
COPY ./app/ .

ENV UVICORN_HOST='0.0.0.0'
ENV UVICORN_PORT=3000

CMD ["uvicorn", "server:api","--proxy-headers", "--host", "0.0.0.0", "--port", "3000"]
