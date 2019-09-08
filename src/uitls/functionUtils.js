export function debounce(func,delay=200){
     let timeId;
    return function (...args) {
        timeId && clearTimeout(timeId)
        timeId=setTimeout(() => {
            func(...args)
        }, delay);
    }
}