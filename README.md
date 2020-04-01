# cloudflare worker proxy

Proxy requests using a cloudflare worker, useful for webhooks fired to slow endpoints.

[`https://proxy.samuelcolvin.workers.dev`](https://proxy.samuelcolvin.workers.dev) will proxy a request to the URL 
specified by the `upstream` GET parameter.

Request `method`, `headers` and `body` will be forwarded unchanged if possible.

The function will return immediately, but the proxied request will continue for as long as possible, 
this is useful when you want to fire a webhook to an endpoint which may take a long time to startup and respond.
For example a free-tier heroku dyno or google cloud function endpoint which is likely to be cold.

## Usage

Make a request with the `upstream` GET parameter providing the upstream url (using httpie):

```bash
curl -v 'https://proxy.samuelcolvin.workers.dev?upstream=https://www.example.com'
```

## To publish

```bash
wrangler publish
```
