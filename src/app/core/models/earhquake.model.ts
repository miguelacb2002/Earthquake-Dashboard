export interface Earthquake {
    id:string
    magnitude:number
    place:string
    time:number
    updated:number
    depth:number
    longitude:number
    latitude:number
    tsunami:number
    alert:string | null
    title:string
    url:string
}