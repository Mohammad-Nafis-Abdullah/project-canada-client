export function removeItem(array: any[], index: number) {
  if (index > -1) {
    const res = array.splice(index, 1);
    console.log(res);
  }

  return array;
}

export function addItem(array: any[], index: number, item: any) {
  array.splice(index, 0, item);

  return array;
}
