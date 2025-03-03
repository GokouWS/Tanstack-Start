import useThemeStore from "../zustand/themeStore";

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  const applyTheme = () => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  };

  return { theme, setTheme, toggleTheme, applyTheme };
};
