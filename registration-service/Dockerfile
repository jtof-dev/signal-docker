FROM eclipse-temurin:17

WORKDIR /app

RUN wget -q https://github.com/signalapp/registration-service/archive/d0a3d50b83f5aa2bb0403200dc38f6a2c28c373e.zip && \
        jar xf d0a3d50b83f5aa2bb0403200dc38f6a2c28c373e.zip && \
        mv registration-service-d0a3d50b83f5aa2bb0403200dc38f6a2c28c373e registration-service && \
        chmod -R +777 registration-service && \
        rm d0a3d50b83f5aa2bb0403200dc38f6a2c28c373e.zip

WORKDIR /app/registration-service

# Downloads all the dependencies required and bundles it into the image
RUN ./mvnw install -DskipTests -Dmicronaut.environments=dev

CMD ./mvnw clean mn:run -Dmicronaut.environments=dev