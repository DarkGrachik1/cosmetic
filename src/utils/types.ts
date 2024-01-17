export interface Substance {
    id: number,
    name: string,
    description: string,
    status: number,
    image: string,
    percent_in: number
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Cosmetic {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
    description: string,
    clinical_trial: number
}

export interface Option {
    id: number,
    name: string
}