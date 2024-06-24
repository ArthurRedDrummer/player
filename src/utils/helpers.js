const getEnv = () => {
    let host = window.location.origin;

    if (/(\.dev\.rfn\.ru|localhost)/gi.test(host)) {
        return 'development';
    }

    if (/test|rc|averchenko|player2/gi.test(host)) {
        return 'test';
    }

    return 'production';
}

const getParentWindowURL = () => (window.location !== window.parent.location)
    ? document.referrer
    : document.location.href;


const getPictureUrlById = (id, preset = 'xw') => {
    if (!id) {
        return null;
    }

    return `https://api.smotrim.ru/api/v1/pictures/${id}/${preset}/redirect`
}

export { getEnv, getParentWindowURL, getPictureUrlById }