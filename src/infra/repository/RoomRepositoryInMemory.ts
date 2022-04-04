import { v4 as uuid } from 'uuid';
import Reservation from "../../core/entity/Reservation";
import Room, { RoomType } from "../../core/entity/Room";
import RoomRepository from "../../core/repository/RoomRepository";

export default class RoomRepositoryInMemory implements RoomRepository {
    
    private roomsData: Room[] = [
        new Room(1, RoomType.SINGLE, 100.0),
        new Room(2, RoomType.SINGLE, 100.0),
        new Room(3, RoomType.SINGLE, 100.0),
        new Room(4, RoomType.DOUBLE, 150.0),
        new Room(5, RoomType.DOUBLE, 150.0),
        new Room(6, RoomType.DOUBLE, 150.0),
        new Room(7, RoomType.DOUBLE, 150.0),
        new Room(8, RoomType.DOUBLE, 150.0),
        new Room(9, RoomType.DELUXE, 200.0),
        new Room(10, RoomType.DELUXE, 200.0)
    ];

    private reservationsData: Reservation[] = [];

    findAll(): Promise<Room[]> {
        const rooms = [...this.roomsData];
        return Promise.resolve(rooms);
    }

    findRoomByNumber(number: number): Promise<Room> {
        const room = this.loadRoomsWithReservations().find(r => r.number === number);
        return new Promise((resolve,reject) => {
            if (room) resolve(room)
            else reject('Room not found');
        });
    }
    
    addReservation(reservation: Reservation): Promise<Reservation> {
        reservation.id = uuid();
        this.reservationsData.push(reservation);
        return Promise.resolve(reservation);
    }

    getAvailableRooms(initialDate: Date, endDate: Date): Promise<Room[]> {
        const rooms = this.loadRoomsWithReservations();
        const availables = rooms.filter(room => this.isAvailable(room.reservations, initialDate, endDate));
        return Promise.resolve(availables);
    }

    isRoomAvailable(room: number, initialDate: Date, endDate: Date): Promise<Boolean> {
        const reservations = this.reservationsData.filter(reserv => reserv.room === room);
        const isAvailable = this.isAvailable(reservations, initialDate, endDate);
        return Promise.resolve(isAvailable);
    }

    
    private loadRoomsWithReservations(): Room[] {
        return this.roomsData.map(room => {
            const reservations = this.reservationsData.filter(r => r.room === room.number);
            room.reservations = reservations;
            return room;
        });
    }

    private isAvailable(reservations: Reservation[], initialDate: Date, endDate: Date): Boolean {
        const isBooked = reservations.some(r => {
            return (initialDate >= r.checkin && initialDate <= r.checkout) || 
                   (endDate >= r.checkin && endDate <= r.checkout) || 
                   (r.checkin >= initialDate && r.checkin <= endDate) || 
                   (r.checkout >= initialDate && r.checkout <= endDate); 
        });
        return !isBooked;
    }

}