FROM bellsoft/liberica-openjdk-debian:17 AS builder
ENV WORK /workspace
COPY build.gradle settings.gradle gradlew $WORK/
COPY gradle $WORK/gradle
COPY ./src $WORK/src

WORKDIR $WORK

RUN apt-get update && apt-get install -y dos2unix && dos2unix gradlew
RUN chmod +x gradlew
RUN ./gradlew clean bootJar --parallel --no-daemon

FROM bellsoft/liberica-openjdk-debian:17

ARG JAR_FILE=workspace/build/libs/*.jar
COPY --from=builder $JAR_FILE app.jar

ARG ENCRYPT_KEY

ENTRYPOINT ["java", \
            "-Xms1400m", \
            "-Xmx1400m", \
            "-jar", \
#            "-Dspring.profiles.active=prod", \
            "--ENCRYPT_KEY=$ENCRYPT_KEY", \
            "/app.jar"]