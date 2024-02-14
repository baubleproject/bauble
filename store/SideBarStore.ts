
import create, { SetState } from 'zustand';

interface SidebarState {
    isCollapsed: boolean;
    toggleSidebarCollapse: () => void;
}

const useSidebarStore = create<SidebarState>((set: SetState<SidebarState>) => ({
    isCollapsed: false,
    toggleSidebarCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));

export default useSidebarStore;

