export function debounce<T>(callback: Function, wait: number) {
    let timerId: NodeJS.Timeout;
    return (args: T) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(args);
        }, wait);
    };
}