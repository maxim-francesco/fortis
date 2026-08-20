// Attribute lookup helper for MEDFIL Automobile
// Performs attributeId-first matching, falling back to exact diacritic-normalized name comparison.

const normalize = (str: string) =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const ALIASES: Record<string, { attrId: string; names: string[] }> = {
  make: { attrId: "attr:make", names: ["marca", "make", "brand"] },
  marcă: { attrId: "attr:make", names: ["marca", "make", "brand"] },
  marca: { attrId: "attr:make", names: ["marca", "make", "brand"] },
  model: { attrId: "attr:model", names: ["model"] },
  year: { attrId: "attr:year", names: ["an", "an fabricatie", "anul fabricatiei", "year"] },
  an: { attrId: "attr:year", names: ["an", "an fabricatie", "anul fabricatiei", "year"] },
  mileage: { attrId: "attr:mileage", names: ["kilometraj", "km", "mileage"] },
  kilometraj: { attrId: "attr:mileage", names: ["kilometraj", "km", "mileage"] },
  price: { attrId: "attr:price", names: ["pret", "price"] },
  pret: { attrId: "attr:price", names: ["pret", "price"] },
  fueltype: { attrId: "attr:fuelType", names: ["combustibil", "motorizare", "fuel", "fueltype"] },
  combustibil: { attrId: "attr:fuelType", names: ["combustibil", "motorizare", "fuel", "fueltype"] },
  gearbox: { attrId: "attr:gearbox", names: ["cutie de viteze", "cutie viteze", "cutie", "transmisie", "gearbox"] },
  cutie: { attrId: "attr:gearbox", names: ["cutie de viteze", "cutie viteze", "cutie", "transmisie", "gearbox"] },
};

export function getAttrObject(listing: any, key: string): any {
  if (!listing?.attributeValues || !Array.isArray(listing.attributeValues)) return null;
  const keyNorm = normalize(key);
  const info = ALIASES[keyNorm];
  const targetId = info ? info.attrId : `attr:${keyNorm}`;
  const targetNames = info ? info.names : [keyNorm];

  return (
    listing.attributeValues.find((av: any) => {
      const avAttrId = av.attributeId || av.attribute?.id;
      if (avAttrId && avAttrId === targetId) return true;
      const avName = normalize(av.attribute?.name || "");
      return targetNames.some((name) => avName === name);
    }) || null
  );
}

export function getAttrValue(listing: any, key: string): any {
  const av = getAttrObject(listing, key);
  if (!av) return null;
  if (av.numberValue !== undefined && av.numberValue !== null) return av.numberValue;
  if (av.stringValue !== undefined && av.stringValue !== null) return av.stringValue;
  if (av.booleanValue !== undefined && av.booleanValue !== null) return av.booleanValue;
  return null;
}
