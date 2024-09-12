import { url } from "../constants";
import { CharacterResponse, Episode } from "../types";

export interface IFilterCharacter {
  page: number;
  name: string;
}

export interface IFilterEpisode {
  ids: string;
}

export interface IService {
  fetchCharacters: (params: IFilterCharacter) => Promise<CharacterResponse>;
  fetchEpisodes: (params: IFilterEpisode) => Promise<Episode[]>;
}

export const fetchData = {
  get: async <T>(url: string): Promise<T> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error: any = new Error("Failed to fetch data");
        error.status = response.status;
        throw error;
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export const apiServices: IService = {
  fetchCharacters: async (params: IFilterCharacter) => {
    try {
      const { page, name } = params;
      const urlWithFilters = `${url}/character/?page=${page}&name=${name}`;

      return await fetchData.get<CharacterResponse>(urlWithFilters);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  fetchEpisodes: async (params: IFilterEpisode) => {
    try {
      const { ids } = params;
      const urlWithFilters = `${url}/episode/${ids}`;

      return await fetchData.get<Episode[]>(urlWithFilters);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
