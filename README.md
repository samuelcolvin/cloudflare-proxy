# cloudflare worker proxy

Proxy requests using a cloudflare worker, useful for webhooks fired to slow endpoints.

## Usage

Make a request with the `upstream` GET parameter providing the upstream url (using httpie):

```bash
curl -v 'https://proxy.samuelcolvin.workers.dev?upstream=https://www.example.com'
```

## To publish

```bash
wrangler publish
```
