FROM eclipse-temurin:17

WORKDIR /app

RUN wget -q https://github.com/signalapp/registration-service/archive/5c0b4162a633564771851b2bddb160f929d50c79.zip && \
        jar xf 5c0b4162a633564771851b2bddb160f929d50c79.zip && \
        mv registration-service-5c0b4162a633564771851b2bddb160f929d50c79 registration-service && \
        chmod -R +777 registration-service && \
        rm 5c0b4162a633564771851b2bddb160f929d50c79.zip

WORKDIR /app/registration-service

# Downloads all the dependencies required and bundles it into the image
RUN ./mvnw install -DskipTests -Dmicronaut.environments=dev

CMD ./mvnw clean mn:run -Dmicronaut.environments=dev