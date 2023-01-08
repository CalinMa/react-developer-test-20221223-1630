import { usersDiff, projectsDiff } from './data';

const DEFAULT_DELAY = 2000;
const PAGE_SIZE = 3;

const resolveOrRejectCollection = (timesCalled, collection) => () => {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      timesCalled += 1;
      const sliceStart = PAGE_SIZE * (Math.ceil(timesCalled / 2) - 1);
      const sliceEnd = PAGE_SIZE * Math.ceil(timesCalled / 2);
      const totalItems = collection.length;
      const hasItems = sliceStart < totalItems;

      clearTimeout(id);

      if (timesCalled % 2 === 0) {
        return reject({
          code: 500,
          error: 'Uknown error',
        });
      }

      return resolve({
        code: 200,
        data: collection.slice(sliceStart, sliceEnd),
        limit: PAGE_SIZE,
        offset: hasItems ? sliceStart : totalItems,
        total: totalItems,
      });
    }, DEFAULT_DELAY)
  });
};

const getProjectsDiff = () => {
  let timesCalled = 0;

  return resolveOrRejectCollection(timesCalled, projectsDiff);
};

const getUsersDiff = () => {
  let timesCalled = 0;

  return resolveOrRejectCollection(timesCalled, usersDiff);
};
export const sortDesc = (list) => {
  if (list && list.length > 0){
    list.sort(function (x, y) {
      return y.timestamp - x.timestamp;
    })
  }
return list
}
export const sortAsc = (list) => {
  if (list && list.length > 0){
    list.sort(function (x, y) {
      return x.timestamp - y.timestamp;
    })
  }
  return list
}

export default {
  getProjectsDiff: getProjectsDiff(),
  getUsersDiff: getUsersDiff(),
  // sortDesc: sortDesc(),
  // sortAsc: sortAsc()
};
