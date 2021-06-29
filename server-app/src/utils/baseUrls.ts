import {getWindow} from 'ssr-window';

const window = getWindow()

export const serverUrl = `https://${window.location.host}`