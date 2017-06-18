// import config from '../config.js';

export async function invokeApig(
  { url,
    method = 'GET',
    body }, userToken) {

  const url = url//`${config.apiGateway.URL}${path}`;
  const headers = {
  //   Authorization: userToken,
  };

  body = (body) ? JSON.stringify(body) : body;

  const results = await fetch(url, {
    method,
    body,
    headers
  });

  if (results.status !== 200) {
    throw new Error(await results.text());
  }

  return results.json();
}
