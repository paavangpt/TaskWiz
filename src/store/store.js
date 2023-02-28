import { create } from "zustand";

export const useCardEditing = create((set) => ({
    editing: {
        isEditing: false,
        card: null,
        boardId: null
    },
    cancelEditing: () => set((state) => ({
        editing: {
            isEditing: false,
            card: null,
            boardId: null
        }
    })),
    setEditing: (isEditing, card, boardId) => set((state) => ({
        editing: {
            isEditing,
            card,
            boardId
        }
    }))
}))