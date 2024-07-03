import { create } from 'zustand';
import { Product } from './constants';
import { arrayMove } from '@dnd-kit/sortable';
import { dupeCheck } from './utils';

// Define your store
interface AppState {
  numProducts: number;
  shoppingList: Product[];
  addItemToList: (item: Product) => void;
  removeItemFromList: (id: number) => void;
  reorderList: (oldIndex: number, newIndex: number) => void,
  setItemQuantity: (id: number, quantity: number) => void;
}

const loadStateFromLocalStorage = (): Product[] => {
  const state = localStorage.getItem('shoppingList');
  return state ? JSON.parse(state) : [];
};

export const useStore = create<AppState>((set) => ({
  numProducts: 0,
  shoppingList: loadStateFromLocalStorage(),
  addItemToList: (item: Product) => set((state) => {
    item.quantity = 1
    let isDupe = dupeCheck(item.id, state.shoppingList)
    if (isDupe) {
      return { shoppingList: [...state.shoppingList] }
    } else {
      const list = [...state.shoppingList, item]
      const set = new Set(list)
      return { shoppingList: [...set] }
    }
  }),
  removeItemFromList: (id: number) => set((state) => {
    return { shoppingList: state.shoppingList.filter(item => item.id !== id) }
  }),
  reorderList: (oldIndex: number, newIndex: number) => set((state) => {
    return { shoppingList: arrayMove(state.shoppingList, oldIndex, newIndex) }
  }),
  setItemQuantity: (id: number, quantity: number) => set((state) => {
    const updatedList = state.shoppingList.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    return { shoppingList: updatedList };
  }),
}));