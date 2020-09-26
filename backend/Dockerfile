FROM golang:alpine as builder
RUN apk --no-cache add git
WORKDIR /go/src/app
COPY . .
RUN go get -d  ./...
RUN go install  ./...

FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app
COPY --from=builder /go/bin/spaceapi.ccc.de ./app
COPY config.yaml config.yaml
EXPOSE 8080
CMD ["./app"]
