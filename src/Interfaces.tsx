export interface iEvent {
    name: string
    time: string
    description: string
    image?: string
    location: string
}

export interface iDay {
    event: iEvent[]
}

export interface iTour {
    days: iDay[]
}

export interface iPlanet {
    name: string
    description: string
    image: string
    color: string[]
    tour: iTour
    temperature: number
    daysInYear: number
    dayLength: dayLength
}

export interface dayLength {
    hours: number
    minutes: number
    seconds: number
}