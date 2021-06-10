import {getWindow} from 'ssr-window';
import {isServer} from './rootStore';

const window = getWindow();

export const initialState = isServer ? {} : window.__INITIAL_STATE__.router.initialState;