FROM eclipse-temurin:17

WORKDIR /app

RUN wget -q https://github.com/signalapp/registration-service/archive/b6e723d2395460c66565cd87ab4f6a8ea9c7791e.zip && \
        jar xf b6e723d2395460c66565cd87ab4f6a8ea9c7791e.zip && \
        mv registration-service-b6e723d2395460c66565cd87ab4f6a8ea9c7791e registration-service && \
        chmod -R +777 registration-service && \
        rm b6e723d2395460c66565cd87ab4f6a8ea9c7791e.zip

WORKDIR /app/registration-service

# Downloads all the dependencies required and bundles it into the image
RUN ./mvnw install -DskipTests -Dmicronaut.environments=dev

CMD ./mvnw clean mn:run -Dmicronaut.environments=dev