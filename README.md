# Hashcommerce - Back-end Challenge
## Descrição:
A aplicação foi implementa utilizando Node.js, Typescript e o framework Nest.js.
O código foi organizado para seguir a arquitetura limpa, isolando a camada de negócios (domain),
de frameworks e bibliotecas (detalhes), entregando assim alto grau de desacoplamento.
Foram utilizadas também boas práticas baseadas no SOLID e em clean code que colaboram para alta
coesão e baixo acoplamento, além de tornar o código mais fácil de ser compreendido por humanos.

## Execução:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Observação:
Após o conteiner entrar em execução, pode levar alguns instantes até que a aplicação esteja pronta para uso.

## Testes:
```bash
$ docker exec hashcommerce-api yarn test
```

## Como interagir:
### Endpoint:
[POST] http://localhost:3000/cart/checkout

### Header para requisição:
Content-type: application/json

## Variáveis de ambiente
### Configuração do host e porta do serviço de desconto
```
DISCOUNT_SERVICE_HOST=discount-service
DISCOUNT_SERVICE_PORT=50051
```