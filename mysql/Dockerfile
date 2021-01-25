FROM mysql:latest
ENV MYSQL_DATABASE stepchallenge
ENV MYSQL_ROOT_PASSWORD rootpass123
COPY ./db.sql /docker-entrypoint-initdb.d
EXPOSE 3306
