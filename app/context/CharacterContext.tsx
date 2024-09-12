"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useCharacter from "../hooks/useCharacter";
import { Character, Info } from "../types";

interface CharacterContextType {
  characters: Character[] | undefined;
  info: Info | undefined;
  error: Error | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onClickPageHandler: (page: number) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const characterState = useCharacter();

  return (
    <CharacterContext.Provider value={characterState}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }
  return context;
};
