type ObjType = {
  [key: string]:
    | string
    | number
    | ObjType
    | ObjType[]
    | any[]
    | null
    | undefined;
};

export function removeEmptyValue(obj: ObjType) {
  const notAllowedValues = ["", null, undefined, "NO"];
  const notAllowedKeys = ["key", "label"];

  for (const key in obj) {
    if (notAllowedKeys.includes(key)) delete obj[key];

    if (notAllowedValues.includes(obj[key] as string)) {
      delete obj[key];
    }

    // if object
    else if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        obj[key] = (obj[key] as any[]).filter(
          (el) => !notAllowedValues.includes(el)
        );

        if ((obj[key] as any[]).length === 0) delete obj[key];
      }

      // if not array
      else {
        removeEmptyValue(obj[key] as ObjType);
        if (Object.keys(obj[key] as ObjType).length === 0) delete obj[key];
      }
    }
  }

  return obj;
}
