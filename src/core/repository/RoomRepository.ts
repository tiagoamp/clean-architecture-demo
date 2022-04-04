import Reservation from "../entity/Reservation";
import Room from "../entity/Room";

export default interface RoomRepository {
    
    findAll(): Promise<Room[]>; 

    findRoomByNumber(number: number): Promise<Room>;

    addReservation(reservation: Reservation) : Promise<Reservation>; 

    getAvailableRooms(initialDate: Date, endDate: Date) : Promise<Room[]>;

    isRoomAvailable(room: number, initialDate: Date, endDate: Date) : Promise<Boolean>;

}