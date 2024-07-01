// src/static.js
import * as url from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

export function getStatic(val) {
    if (isDevelopment) {
        return url.resolve(window.location.origin, val);
    }
    return `file://${__dirname}/static/${val}`;
}

