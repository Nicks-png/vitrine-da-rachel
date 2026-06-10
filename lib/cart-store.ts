"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  tamanho?: string;
  slug: string;
  quantidade: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantidade">) => void;
  removeItem: (id: string, tamanho?: string) => void;
  updateQuantity: (id: string, tamanho: string | undefined, quantidade: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.tamanho === item.tamanho
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.tamanho === item.tamanho
                  ? { ...i, quantidade: i.quantidade + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantidade: 1 }] };
        });
      },

      removeItem: (id, tamanho) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.tamanho === tamanho)
          ),
        }));
      },

      updateQuantity: (id, tamanho, quantidade) => {
        if (quantidade <= 0) {
          get().removeItem(id, tamanho);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.tamanho === tamanho ? { ...i, quantidade } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.preco * i.quantidade, 0),

      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantidade, 0),
    }),
    { name: "vitrine-rachel-cart" }
  )
);
