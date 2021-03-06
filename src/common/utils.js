/**
 * Возвращает дату в формате dd.mm.yyyy at hh:mm
 */
export const getDate = (unixTime) => {
    if (!unixTime || Number.isNaN(Number(unixTime)) ) {
        return ''
    }

    const date = new Date(unixTime * 1000);
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const time = getTime(date);
    const dateStr = [d, m, y].join('.');
    return `${dateStr} at ${time}`
};


/**
 * Возвращает время в формате hh:mm
 */
const getTime = (date) => {
    const hh = (0 + date.getHours().toString()).slice(-2);
    const mm = (0 + date.getMinutes().toString()).slice(-2);
    return [hh, mm].join(':');
};

export const getHostName = (url) => {
    if (url) {
        const {host} = new URL(url);
        return host
    }

    return null
};

export const objIsEmpty = (obj) => {
    return isObj(obj) && Object.values(obj).length === 0;
};

export const isObj = (obj) => {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
};

export function copy(entity) {
    return JSON.parse(JSON.stringify(entity));
}

export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        const latter = () => {
            fn.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(latter, wait)
    }
}
