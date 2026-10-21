import type { Action } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
// Redux Toolkit の configureStore には移行しない方針のため、非推奨表示の付かない legacy_createStore を使う
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './modules/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// redux-devtools-extension パッケージは非推奨のため、拡張機能が注入するグローバルを直接使う
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const initStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// 各モジュールの thunk は asyncFactory<スライスの型> で作られており、RootState を渡すと
// RootState 自体がその reducer の型から作られているため型が循環する。getState はどの thunk も
// 使っていないので、dispatch 側の state 型は any にして各 thunk の宣言に合わせる
export type AppDispatch = ThunkDispatch<any, unknown, Action>;
