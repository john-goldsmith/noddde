FROM mongo:4.2.6
COPY docker-healthcheck-mongo /usr/local/bin/
# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1
HEALTHCHECK CMD docker-healthcheck-mongo
