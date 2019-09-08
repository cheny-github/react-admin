

export const TYPE_ADD ='add';
export const add = (number)=>({ type:TYPE_ADD,number });

export const TYPE_SUB = 'sub';
export const sub = (number)=>({ type:TYPE_SUB,number });

// 配上redux-thunk以后，dispach可以接收一个函数了。
export const addAsync =(number)=>dispatch=>{
    setTimeout(() => {
        // dispatch中传入同步action
        dispatch(add(number))
    }, 3000);
}