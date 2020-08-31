FROM mysql:5.7.25
COPY docker-healthcheck-mysql /usr/local/bin/
# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-mysql
