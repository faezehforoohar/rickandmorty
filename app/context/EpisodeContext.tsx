"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useEpisode from "../hooks/useEpisode";
import { Episode, Character } from "../types";

interface EpisodeContextType {
  isLoading: boolean;
  episodesData: Episode[];
  error: Error | null;
  isVisible: (id: number) => number | undefined;
  toggleRows: (character: Character) => void;
}

const EpisodeContext = createContext<EpisodeContextType | undefined>(undefined);

export const EpisodeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const episodeState = useEpisode();

  return (
    <EpisodeContext.Provider value={episodeState}>
      {children}
    </EpisodeContext.Provider>
  );
};

export const useEpisodeContext = (): EpisodeContextType => {
  const context = useContext(EpisodeContext);
  if (!context) {
    throw new Error("useEpisodeContext must be used within an EpisodeProvider");
  }
  return context;
};
