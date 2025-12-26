import React from 'react';
import { SavedContext } from './SavedContext.hooks';

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    savedArticles: [],
    addToSaved: () => {},
    removeFromSaved: () => {},
    isSaved: () => false,
  };

  return (
    <SavedContext.Provider value={value}>
      {children}
    </SavedContext.Provider>
  );
};
