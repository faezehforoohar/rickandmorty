"use client";

import { useCharacterContext } from "../context/CharacterContext";

export default function Search() {
  const { setCurrentPage, setSearchText } = useCharacterContext();

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchText(event.target.value);
  };

  return (
    <input
      className="form-control"
      type="text"
      placeholder="Type a character name"
      onChange={onChangeInputHandler}
    />
  );
}
