FROM node:18.16.0-alpine3.17
RUN npm i -g pnpm
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN pnpm install
COPY /src ./src
COPY tsconfig.build.json ./
COPY tsconfig.json ./
RUN pnpm build
EXPOSE 3000
CMD [ "pnpm", "start:prod"]