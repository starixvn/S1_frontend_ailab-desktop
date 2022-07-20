import { createContext } from "react";

// wrapper
export const userInfoContext = createContext({ isLogin: false });
export const popBoxContext = createContext({});
export const walletInfoContext = createContext({});
export const msgCountContext = createContext({});
export const loadingContext = createContext({});
export const isRootContext = createContext({});
export const maintainListContext = createContext([]);
export const productTpIdsContext = createContext();
export const popUpMsgContext = createContext();

// promotion
export const promoPopBox = createContext({});

// referral
export const referralPopBox = createContext({});
