FROM gcr.io/distroless/cc

<<<<<<< HEAD
FROM rizalachp/frontendserver-base AS Builder
=======
COPY ./app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
>>>>>>> parent of 3d4e8ea (sudah penilaian hore)

ARG WORD_DIR=/app
WORKDIR ${WORD_DIR}

ARG APP=frontend-server

# Copy our build
COPY --from=Builder ${WORD_DIR}/target/x86_64-unknown-linux-musl/release/${APP} ${WORD_DIR}
COPY app/build/ ${WORD_DIR}
COPY Rocket.toml ${WORD_DIR}

EXPOSE 8080

CMD ["./frontend-server"]
