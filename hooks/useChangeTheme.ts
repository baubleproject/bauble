import create from 'zustand';


interface StateState {
    themeChangedFlag: boolean;
    useChangeModeTheme(): void;
}

export const useChangeTheme = create<StateState>((set) => ({
    themeChangedFlag: false,
    useChangeModeTheme() {
        set((state: StateState) => ({ themeChangedFlag: !state.themeChangedFlag }))
    }
}));

export default useChangeTheme;

