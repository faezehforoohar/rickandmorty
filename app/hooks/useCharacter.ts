import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { apiServices, IFilterCharacter } from "../services";
import { Character, CharacterResponse, Info } from "../types";
import { url } from "../constants";

export default function useCharacter() {
  const [characters, setCharacters] = useState<Character[]>();
  const [info, setInfo] = useState<Info>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedValue] = useDebounce(searchText, 500);
  const [error, setError] = useState<Error | null>(null);

  const onClickPageHandler = (page: number) => {
    fetch(`${url}/character/?page=${page}&name=${debouncedValue}`)
      .then((res) => res.json())
      .then((data: CharacterResponse) => {
        setCharacters(data.results);
        setInfo(data.info);
      });
    setCurrentPage(page);
  };

  const fetchCharacters = async () => {
    setError(null);

    try {
      const query: IFilterCharacter = {
        page: debouncedValue ? 1 : currentPage,
        name: debouncedValue,
      };

      const response = await apiServices.fetchCharacters(query);

      setCharacters(response.results || []);
      setInfo(response.info);
    } catch (error) {
      console.error("Failed to fetch characters:", error);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).status === 404) {
        setError(new Error("Character not found"));
      } else {
        setError(
          error instanceof Error ? error : new Error("An error happened")
        );
      }
      setCharacters([]);
      setInfo(undefined);
    }
  };

  useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return {
    characters,
    info,
    error,
    currentPage,
    setCurrentPage,
    setSearchText,
    onClickPageHandler,
  };
}
