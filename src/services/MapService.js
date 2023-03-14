import Pbf from 'pbf';

const get = async () => {
  const request = 'https://cdn.digitransit.fi/map/v2/hsl-stop-map/16/37308/18959.pbf';
  const pbf = new Pbf();
  const obj = request.data.read(pbf);
  return obj;
};

export default {
  get,
};
