FROM node:alpine
MAINTAINER diegotony
COPY . /app
WORKDIR ./app
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps && \
  npm config set registry http://registry.npmjs.org &&  \
  npm install 
ENV PORT=3041
EXPOSE 3041
CMD ["npm","run","start"]