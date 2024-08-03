import md5 from 'crypto-js/md5';

export const getApiParams = () => {
  const ts = new Date().getTime();
  const key = `${import.meta.env.VITE_MARVEL_API_KEY}`;
  const pass = `${import.meta.env.VITE_MARVEL_API_PASS}`;
  const hashedData = md5(ts + pass + key);
  return {
    ts: `${ts}`,
    hash: `${hashedData}`,
    apikey: key,
  };
};
