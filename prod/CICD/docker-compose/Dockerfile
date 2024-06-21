FROM alpine:latest

RUN apk --no-cache add curl

#CMD ["sh", "-c", "curl http://10.0.2.15:7000/api/v1/grammar-titles?p_tag=JLPT_N1"]
CMD ["sh", "-c", "curl -L -k https://${HOST_IP}/api/v1/grammar-titles?p_tag=JLPT_N1"]