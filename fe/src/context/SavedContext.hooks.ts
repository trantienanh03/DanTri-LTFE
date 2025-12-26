import { createContext, useContext } from 'react';
import type { SavedArticle } from '../types/saved';

export interface SavedContextType {
  savedArticles: SavedArticle[];
  addToSaved: (article: Omit<SavedArticle, 'savedAt'>) => void;
  removeFromSaved: (link: string) => void;
  isSaved: (link: string) => boolean;
}

export const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (context === undefined) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};
