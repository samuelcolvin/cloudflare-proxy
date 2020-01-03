addEventListener('fetch', event => {
  event.respondWith(handle_request(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: {'content-type': 'text/plain'},
  })
}

async function handle_request(event) {
  const params = new URL(event.request.url).searchParams
  const upstream = params.get('upstream')
  if (!upstream) {
    return new Response('no "upstream" argument found, not proxying', {
      headers: {'content-type': 'text/plain'},
      status: 400,
    })
  }

  await proxy(upstream, event.request)

  return new Response(`request proxied to "${upstream}"`, {
    headers: {'content-type': 'text/plain'},
  })
}

async function proxy(url, request) {
  await fetch(url, {
    method: request.method,
    headers: _get_headers(request),
    body: await request.blob(),
  })
}

const ignored_headers = new Set([
  'accept-encoding',
  'cf-connecting-ip',
  'cf-ew-via',
  'cf-ipcountry',
  'cf-ray',
  'cf-visitor',
  'connect-time',
  'connection',
  'content-length',
  'host',
  'total-route-time',
  'user-agent',
  'via',
  'x-forwarded-for',
  'x-forwarded-port',
  'x-forwarded-proto',
  'x-request-id',
  'x-request-start',
  'steam-donkey-authorization',
])

function _get_headers(request) {
  const keys = Object.keys(request.headers).filter(k => !ignored_headers.has(k))
  return Object.assign(...keys.map(k => ({[k]: request.headers[k]})))
}
