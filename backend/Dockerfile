FROM golang:alpine as builder
RUN apk --no-cache add git
WORKDIR /go/src/app
COPY . .
RUN go get -d -v ./...
RUN go install -v ./...


FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /go/bin/app .
COPY config.yaml config.yaml
EXPOSE 8080
CMD ["./app", "-shared_secret=$SHARED_SECRET"]
