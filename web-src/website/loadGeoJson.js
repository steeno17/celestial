export async function loadGeoJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to fetch GeoJSON ${path}: ${response.status}`);
  }

  const geojson = await response.json();

  if (
    geojson.type !== "FeatureCollection" ||
    !Array.isArray(geojson.features)
  ) {
    throw new Error(`Expected a GeoJSON FeatureCollection from ${path}`);
  }

  return geojson;
}

export function project([longitude, latitude], width, height) {
  const x = ((longitude + 180) / 360) * width;
  const y = ((90 - latitude) / 180) * height;

  return [x, y];
}

export function drawMultiLineString(ctx, coordinates, width, height) {
  for (const line of coordinates) {
    ctx.beginPath();

    line.forEach(([longitude, latitude], index) => {
      const [x, y] = project([longitude, latitude], width, height);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }
}

export function drawPolygon(ctx, polygon, width, height) {
  ctx.beginPath();

  polygon.forEach(([longitude, latitude], index) => {
    const [x, y] = project([longitude, latitude], width, height);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.closePath();
  ctx.fill();
}
