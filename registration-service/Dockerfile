FROM eclipse-temurin:17

WORKDIR /app

RUN wget -q https://github.com/JJTofflemire/registration-service/archive/45c2b87635185837aeb49e51afa1f9775d8e1341.zip && \
        jar xf 45c2b87635185837aeb49e51afa1f9775d8e1341.zip && \
        mv registration-service-45c2b87635185837aeb49e51afa1f9775d8e1341 registration-service && \
        chmod -R +777 registration-service && \
        rm 45c2b87635185837aeb49e51afa1f9775d8e1341.zip

WORKDIR /app/registration-service

# Downloads all the dependencies required and bundles it into the image
RUN ./mvnw install -DskipTests -Dmicronaut.environments=dev

CMD ./mvnw clean mn:run -Dmicronaut.environments=dev