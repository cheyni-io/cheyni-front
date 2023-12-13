// Em um arquivo separado, como themeSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light', // ou 'dark', dependendo do seu tema padrão
  },
  reducers: {
    // Esta ação alterna entre os modos 'light' e 'dark'
    changeTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

// Exporta a ação
export const { changeTheme } = themeSlice.actions;

// Exporta o reducer
export default themeSlice.reducer;