
import create, { SetState } from 'zustand';

interface SidebarState {
    isCollapsed: boolean;
    isMobileCollapsed: boolean;
    toggleSidebarCollapse: () => void;
    toggleMobileSidebarCollapse: () => void;
}

const useSidebarStore = create<SidebarState>((set: SetState<SidebarState>) => ({
    isCollapsed: true,
    isMobileCollapsed: true,
    toggleSidebarCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    toggleMobileSidebarCollapse: () => set((state) => ({ isMobileCollapsed: !state.isMobileCollapsed })),
}));

export default useSidebarStore;

