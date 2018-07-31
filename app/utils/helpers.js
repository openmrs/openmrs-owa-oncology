export function getParam(param) {
  const query = new URLSearchParams(window.location.search);
  return query.get(param);
}
