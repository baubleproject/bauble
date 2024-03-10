import create from 'zustand';


interface StateState {
    reloadFlag:boolean;
    useReload():void;
}

export const useReloadState = create<StateState>((set) => ({
    reloadFlag: false,
    useReload(){
        set((state:any) => ({ reloadFlag: !state.reloadFlag }))
    }
}));

export default useReloadState;

