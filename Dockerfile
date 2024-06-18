# syntax=docker/dockerfile:1
# see: https://docs.docker.com/engine/reference/builder/
ARG NODE_VERSION=20.11.1

# 获取基本镜像阶段
FROM node:${NODE_VERSION}-alpine as base

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /src


# 打包阶段
FROM base as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --link . .

RUN pnpm run build


# 运行时阶段
FROM base as runtime

# Use production node environment by default.
ENV NODE_ENV production

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=build /src/build ./build
COPY --link package.json .

ENV HOST=0.0.0.0 PORT=5555
EXPOSE 5555/tcp

# # Run the application as a non-root user.
USER node

# Run the application.
CMD pnpm run start
