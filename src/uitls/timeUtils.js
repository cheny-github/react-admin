export function formatTime(date) {
    if (date) {
        return `${date.getFullYear()}:${date.getMonth()+1}:${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }else{
        return ''
    }
    
}