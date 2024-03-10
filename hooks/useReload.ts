import create from 'zustand';


interface StateState {
    reloadFlag:boolean;
    ReloadPage():void;
}

export const useReloadState = create<StateState>((set) => ({
    reloadFlag: false,
    ReloadPage(){
        set((state:any) => ({ reloadFlag: !state.reloadFlag }))
    }
}));

export default useReloadState;

