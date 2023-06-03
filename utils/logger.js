export const logger = (message, type) => {
    switch (type) {
        case 'success':
            console.log('\x1b[32m', message, '\x1b[32m');
            break;

        case 'note':
            console.log('\x1b[34m', message, '\x1b[34m');
            break;

        case 'alert':
            console.log('\x1b[33m', message, '\x1b[33m');
            break;

        case 'error':
            console.log('\x1b[31m', message, '\x1b[31m');
            break;
        
        default:
            console.log(message);
    }
}
