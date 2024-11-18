export const decodeJwt = (token) => {
  const [header, payload, signature] = token.split(".");

  const decodedHeader = JSON.parse(
    atob(header.replace(/-/g, "+").replace(/_/g, "/"))
  );
  const decodedPayload = JSON.parse(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
  );

  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature,
  };
};
