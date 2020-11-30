export const getDate = (unixTime) => {
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
