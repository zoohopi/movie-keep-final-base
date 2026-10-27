import { create } from "zustand";
import type { Favorite } from "@/types/favorite";

type FavoritesStore = {
  favorites: Favorite[];
  setFavorites: (update: (prev: Favorite[]) => Favorite[]) => void;
};

export const useFavoritesStore = create<FavoritesStore>()((set) => ({
  favorites: [],
  setFavorites: (update) => {
    set((state) => ({ favorites: update(state.favorites) }));
  },
}));
