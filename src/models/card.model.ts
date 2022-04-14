export interface Columns{
    id: string,
    label: string,
    cards: Cards[]
}

export interface Cards {
    id: string,
    detail: string
}

export interface ReducerAction {
    type: string,
    value: any
}

export interface CardState {
    columns: Columns[];
}