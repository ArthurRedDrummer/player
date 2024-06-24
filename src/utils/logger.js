import { getEnv, getParentWindowURL } from '@/utils/helpers'

const COLORS = {
    BACKGROUND: {
        message: '#28455d',
        warning: '#c59d1e',
        error: '#7e1b1b',
        success: '#4c860e'
    },
    TEXT: {
        message: '#b0c6d7',
        warning: '#eee8d7',
        error: '#eccfcf',
        success: '#c5d2b8'
    }
}

const stringStyle = style => {
    let str = '';

    for (let prop in style) {
        let value = style[prop];

        str += `${prop}: ${value};`
    }

    return str;
}

const checkIsDevRoute = url => {
    if (!url) {
        return false;
    }

    let pathName = new URL(url).pathname;

    return /\/dev\//gi.test(pathName);
}

class Logger {
    constructor() {
        let parentUrl = getParentWindowURL();

        this.env = getEnv();
        this.isDev = checkIsDevRoute(parentUrl);
    }

    message(type = 'message', module = 'GLOBAL', message, data) {
        if (!message) {
            return null;
        }

        if (this.isDev) {
            window.parent.postMessage(JSON.stringify({
                id: 'logger',
                type,
                module,
                message,
                data
            }), '*');
        }

        if (this.env !== 'production') {
            let style = {
                padding: '5px 10px',
                background: COLORS.BACKGROUND[type],
                color: COLORS.TEXT[type],
            };

            if (type === 'error') {
                console.error(`%cSMOTRIM PLAYER | ${module.toUpperCase()}: ${message}`, stringStyle(style));
            } else {
                console.log(`%cSMOTRIM PLAYER | ${module.toUpperCase()}: ${message}`, stringStyle(style));
            }

            if (data && typeof data === 'object') {
                console.table(data);
            }
        }
    }

    async send(data) {
        return await fetch('/iframe/datalog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(err => {
            return true
        });
    }
}

const logger = new Logger();

export default logger;
