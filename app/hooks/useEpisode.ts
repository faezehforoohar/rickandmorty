import { useState } from "react";
import { apiServices, IFilterEpisode } from "../services";
import { Character, Episode } from "../types";
import { url } from "../constants";

export default function useEpisode() {
  const [episodesData, setEpisodesData] = useState<Episode[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const isVisible = (id: number) => {
    return visibleRows.find((item) => item === id);
  };

  const getIdsArray = (episodes: string[]) => {
    let ids: string[] = [];

    episodes.map((episode) => {
      const id = episode.replace(`${url}/episode/`, "");
      if (episodesData?.find((item) => item.id.toString() === id)) return;

      ids.push(id);
    });
    return ids.length === 1 ? `${ids},` : ids.join(",");
  };

  const toggleRows = (character: Character) => {
    const { id, episode } = character;
    let arrayIds = [...visibleRows];

    if (isVisible(id)) {
      setVisibleRows(arrayIds.filter((item) => item !== id));
    } else {
      arrayIds.push(id);
      setVisibleRows(arrayIds);

      if (episode.length > 0) {
        const ids = getIdsArray(episode);

        if (ids.length > 0) {
          fetchEpisode(ids);
        }
      }
    }
  };

  const fetchEpisode = async (ids: string) => {
    setLoading(true);
    setError(null);

    try {
      const query: IFilterEpisode = {
        ids: ids,
      };

      const response = await apiServices.fetchEpisodes(query);

      setEpisodesData([...episodesData, ...response] || []);
    } catch (error) {
      console.error("Failed to fetch episodes:", error);

      if ((error as any).status === 404) {
        setError(new Error("Episode not found"));
      } else {
        setError(
          error instanceof Error ? error : new Error("An error happened")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    episodesData,
    error,
    isVisible,
    toggleRows,
  };
}
