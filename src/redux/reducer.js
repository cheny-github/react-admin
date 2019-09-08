import { TYPE_ADD, TYPE_SUB } from "./actions";

export function calculate(state=1,action) {
    switch (action.type) {
        case TYPE_ADD:
            return state + action.number*1;
        case TYPE_SUB:
            return state -action.number*1;
        default:
            return state;
    }
}