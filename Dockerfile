FROM node:alpine
MAINTAINER diegotony
COPY . /app
WORKDIR ./app
RUN npm config set registry http://registry.npmjs.org  \
     && npm install 
ENV PORT=3041
EXPOSE 3041
CMD ["npm","run","start"]