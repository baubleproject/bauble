import create from 'zustand';


interface StateState {
    themeChangedFlag: boolean;
    ChangeModeTheme(): void;
}

export const useChangeTheme = create<StateState>((set) => ({
    themeChangedFlag: false,
    ChangeModeTheme() {
        set((state: StateState) => ({ themeChangedFlag: !state.themeChangedFlag }))
    }
}));

export default useChangeTheme;

