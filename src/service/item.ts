import { AxiosRequestConfig } from "axios";

import { Api } from "../api/api";

import { API_URL, KRATE_ID } from "../config/api";

const url = `${API_URL}/${KRATE_ID}`;
const endpoint = "items";

const api = new Api(url, endpoint);

type ItemRequest = {
  serial: string;
  description: string;
  count: number;
};

type ItemResponse = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  serial: string;
  description: string;
  count: number;
};

type FilterParams = {
  limit?: number;
  skip?: number;
  query?: string;
};

function getItems(params?: FilterParams) {
  if (params) return api.get<ItemResponse[]>({ params });

  return api.get<ItemResponse[]>();
}

function getItemById(id: string) {
  const config: AxiosRequestConfig = {
    url: `record/${id}`,
  };

  return api.get<ItemResponse[]>(config);
}

function createItem(data: ItemRequest) {
  return api.post<ItemResponse>(data);
}

function createItems(data: ItemRequest[]) {
  return api.post<ItemResponse[]>(data);
}

function updateItem(id: string, data: ItemRequest) {
  const config: AxiosRequestConfig = {
    url: id,
  };

  return api.put<ItemResponse>(data, config);
}

export { getItems, getItemById, createItem, createItems, updateItem };
