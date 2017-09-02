FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD target/user-api-1.0.0.jar app.jar
EXPOSE 8243
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]
