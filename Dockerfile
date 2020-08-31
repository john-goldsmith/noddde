FROM node:14.2.0-slim
RUN apt-get update && \
        apt-get install -y git python build-essential && \
        rm -rf /var/lib/apt/lists/*
WORKDIR /noddde

# Note that .dockerignore influences what gets copied
COPY . .

# ADD https://get.aquasec.com/microscanner /
# RUN chmod +x /microscanner
# RUN /microscanner N2JlNzQzY2VmNmM1

RUN npm ci
# RUN npm run build
COPY docker-healthcheck /usr/local/bin/
# HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD docker-healthcheck
