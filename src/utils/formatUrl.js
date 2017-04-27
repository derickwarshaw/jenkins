export default function formatUrl(url) {
  // TODO [POST-POC]: Need a config that is altered by environment variables (seems to work a bit different in RN)
  const api = {
    host: 'yahoo.com',
    port: '',
    secure: true
  };
  const isAbsolute = url.startsWith('http');
  const adjustedPath = !isAbsolute && !url.startsWith('/') ? `/${url}` : url;
  const port = api.port ? `:${api.port}` : '';
  const protocol = api.secure ? 'https://' : 'http://';
  const formattedUrl = `${protocol}${api.host}${port}${adjustedPath}`;

  return !isAbsolute ? formattedUrl : url;
}
