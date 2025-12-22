# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Cấp quyền thực thi cho mvnw để tránh lỗi trên Linux
RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Chỉnh lại Xmx thấp hơn 512MB để không bị tràn RAM trên Render Free
ENV JAVA_OPTS="-Xmx384m -Xms256m"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"]