import Room from "../entity/Room";
import RoomRepository from "../repository/RoomRepository";

export default class SearchRoom {

    private roomRepo: RoomRepository;

    constructor(roomRepository: RoomRepository) {
        this.roomRepo = roomRepository;
    }

    async executebyDates(checkin: Date, checkout: Date): Promise<Room[]> {
        const rooms = await this.roomRepo.getAvailableRooms(checkin, checkout);
        return Promise.resolve(rooms);
    }

    async executeByRoomNumber(roomNumber: number): Promise<Room|undefined> {
        const rooms = await this.roomRepo.findAll();
        const room = rooms.find(room => room.number === roomNumber);
        return room;
    }

}