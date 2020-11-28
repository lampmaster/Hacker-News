export const getDate = (date) => {
    const d = new Date().getDate(date);
    const m = new Date().getMonth(date);
    const y = new Date().getFullYear(date);
    return [d, m, y].join('.')
};

export const getHostName = (url) => {
    if (url) {
        const {host} = new URL(url);
        return host
    }

    return null
};
