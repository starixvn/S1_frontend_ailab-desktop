FROM node:14.15.0 AS build-step

ARG project_name

WORKDIR /build

# bind node_modules to bin/PATH
# 因為有用到 node_module內的 nx command
# 故需要綁定 docker bin path 否則會 command not found
ENV PATH /build/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
# --force , force install
RUN npm i -g node-sass --force
RUN npm i --force

COPY . .
# minify file
# npx 意即安裝 gulp 套件執行完便將其刪除
RUN npx gulp minify --gulpfile=apps/${project_name}/gulpfile.js
# 已有綁定 $PATH 所以不需要使用 npx
RUN nx clear-cache
RUN nx autoBuild ${project_name} --skip-nx-cache

FROM nginx:1.18.0

# 不同 step 要再綁定一次 ARG 才吃得到
ARG project_name
WORKDIR /app
COPY --from=build-step /build/apps/${project_name}/public .
EXPOSE 8000