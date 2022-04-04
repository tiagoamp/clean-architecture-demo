import Reservation from "../entity/Reservation";
import Room from '../entity/Room';
import RoomRepository from '../repository/RoomRepository';

export default class BookRoom {

    private roomRepo: RoomRepository;

    constructor(roomRepository: RoomRepository) {
        this.roomRepo = roomRepository;
    }

    async execute(room: Room, from: Date, until: Date): Promise<Reservation> {
        const isAvailable = await this.roomRepo.isRoomAvailable(room.number, from, until);
        if (!isAvailable) {
           return Promise.reject('Room not available');
        }
        const reservation = new Reservation(room.number, room.price, from, until);
        const persisted = await this.roomRepo.addReservation(reservation);
        return persisted;
    }

}
