/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchBar = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchBar,
};

export const useUI = () => state;
