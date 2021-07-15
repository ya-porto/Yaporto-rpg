import {getWindow} from 'ssr-window';

const window = getWindow()

export const yaBaseApiUrl = 'https://ya-praktikum.tech/api/v2/';

export const serverUrl = `https://${window.location.host}`