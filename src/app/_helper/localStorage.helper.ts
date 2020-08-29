import { DBInterface, DBUpdateInterface } from '../_interfaces/db.interface';

const store = (key: string, object: DBInterface | DBUpdateInterface) => {
  const stringified = JSON.stringify(object);
  localStorage.setItem(key, stringified);
  return stringified;
};

export const writeObjectToLS = (key: string, object: DBInterface) => {
  const Stored = readObjectFromLS(key);
  if (readObjectFromLS) {
    object = { ...object, ...Stored };
  }
  const stringified = store(key, object);
  return {
    message: 'Inserted',
    original: object,
    stringified,
  };
};

export const readObjectFromLS = (key: string) => {
  const stored = localStorage.getItem(key);
  return JSON.parse(stored);
};

export const rewriteObjectToLS = (
  key: string,
  id: string,
  object: DBUpdateInterface
) => {
  const stored = readObjectFromLS(key);
  if (stored && stored[id]) {
    stored[id] = object;
    const stringified = store(key, stored);
    return {
      message: 'Updated',
      original: object,
      new:stored[id],
    };
  } else {
    return 'No Data Found to Update';
  }
};

export const removeObjectFromLS = (key: string, id: string) => {
  const stored = readObjectFromLS(key);
  if (stored && stored[id]) {
    const removed = stored[id]
    delete stored[id];
    const stringified = store(key, stored);
    return {
      message: 'Deleted',
      removed,
    };
  } else {
    return 'No Data Found to Delete';
  }
};
