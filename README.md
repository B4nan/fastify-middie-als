# Fastify + middie + AsyncLocalStorage middlewares

This demonstrates that async context created in a middleware gets lost for requests
with payload. Note that a post request without payload will work fine.

```bash
yarn
yarn start
curl localhost:3000
# fails to get the ID from ALS if there is actual payload
curl -d '{}' -H 'Content-Type: application/json' localhost:3000
# without the payload it will work fine (even for post request)
curl -X POST localhost:3000
# also works fine
curl localhost:3000
```

Calling GET (or POST without payload) several times will log:

```
In Middleware with id 0
get 0
In Middleware with id 1
get 1
In Middleware with id 2
get 2
```

Calling POST with payload:

```
In Middleware with id 0
post undefined
In Middleware with id 1
post undefined
In Middleware with id 2
post undefined
```
