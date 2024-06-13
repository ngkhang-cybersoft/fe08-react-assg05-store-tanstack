import httpStore from '../../../utils/config';
import { API_STORE } from '../../../utils/constants';

export const getAllStores = async () => {
  const res = await httpStore.get(API_STORE.GET_STORES);
  return res.data.content;
};

export const delStore = async (storeId) => {
  try {
    const res = await httpStore.delete(API_STORE.DELETE_STORE, {
      data: [storeId],
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addStore = async (store) => {
  try {
    const res = await httpStore.post(API_STORE.ADD_STORE, store);
    return [res.data.statusCode, res.data.content];
  } catch (error) {
    return [error.response.status, error.response.statusText];
  }
};

export const updateStore = async ({ id, data }) => {
  console.log(id, data);
  try {
    const res = await httpStore.put(API_STORE.UPDATE_STORE(id), data);
    return [res.data.statusCode, res.data.content];
  } catch (error) {
    return [error.response.status, error.response.statusText];
  }
};

export const getStoreByKeyword = async (keyWord) => {
  const res = await httpStore.get(API_STORE.GET_STORE_BY_KEYWORD(keyWord));
  return res.data.content.length > 0 ? res.data.content[0] : [];
};

export const searchStore = async (keyWord) => {
  const res = await httpStore.get(API_STORE.GET_STORE_BY_KEYWORD(keyWord));
  return res.data.content;
};
