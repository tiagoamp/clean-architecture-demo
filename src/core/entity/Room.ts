import Reservation from "./Reservation";

export default class Room {
    
    number: number;
    type: RoomType;
    price: number;
    reservations: Reservation[];

    constructor(number: number, type: RoomType, price: number) {
        this.number = number;
        this.type = type;
        this.price = price;
        this.reservations = [];
    }
}

export enum RoomType {
    SINGLE = 'single', 
    DOUBLE = 'double', 
    DELUXE = 'deluxe'
}