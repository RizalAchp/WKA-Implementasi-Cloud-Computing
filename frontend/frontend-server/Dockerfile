# Dockerfile-base
FROM rustlang/rust:nightly-buster-slim AS Builder

RUN rustup target add x86_64-unknown-linux-musl

RUN apt-get update -qq && \
    apt-get install -y \
    musl-tools \
    musl-dev

RUN update-ca-certificates

ARG WORD_DIR=/app
WORKDIR ${WORD_DIR}

COPY ./ .

RUN cargo build --target x86_64-unknown-linux-musl --release
