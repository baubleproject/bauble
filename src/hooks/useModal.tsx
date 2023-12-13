"use client"
import { Profile } from "@prisma/client"
import { create } from "zustand"

interface ModalData {
    content?: string
    profile?: Profile
}

export type ModalType =
    | "editProfile"

interface ModalStore {
    type: ModalType | null,
    isOpen: boolean
    data: ModalData
    onOpen: (type: ModalType , data?:ModalData) => void
    onClose: () => void
}

export const useModal = create<ModalStore>(set => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen(type , data = {}) {
        set({ isOpen: true, type, data })
    },
    onClose() {
        set({ isOpen: false, type: null })
    }
}))
