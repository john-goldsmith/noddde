FROM postgres:12.2
COPY docker-healthcheck-postgres /usr/local/bin/
# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-postgres
