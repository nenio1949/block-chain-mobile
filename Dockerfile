FROM nginx:latest
RUN mkdir /app
ADD ./ /app
RUN cd /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /log
ENTRYPOINT nginx -g "daemon off;"