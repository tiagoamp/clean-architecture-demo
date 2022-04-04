export default class Reservation {

    id: string | null;
    room: number;
    checkin: Date;
    checkout: Date;
    totalPrice: number;

    constructor(room: number, pricePerNight: number, checkin: Date, checkout: Date) {
        this.room = room;
        this.checkin = checkin;
        this.checkout = checkout;
        this.totalPrice = this.nrOfDays * pricePerNight;
        this.id = null;
    }

    get nrOfDays() {
        const diffInTime = this.checkout.getTime() - this.checkin.getTime();
        const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
        return diffInDays;
    }
    
}