import Room, { RoomType } from "../../../src/core/entity/Room";
import RoomRepository from "../../../src/core/repository/RoomRepository";
import BookRoom from "../../../src/core/usecase/BookRoom";
import RoomRepositoryInMemory from "../../../src/infra/repository/RoomRepositoryInMemory";

describe('Book Room Use Case', () => { 

    let bookRoom: BookRoom;
    let roomRepo: RoomRepository; 
    let room: Room;

    beforeEach(() => {
        roomRepo = new RoomRepositoryInMemory();
        bookRoom = new BookRoom(roomRepo);
        room = new Room(5, RoomType.DOUBLE, 150.0);
    });


    test('Should book a room when it is available', async function() {
        const reservation = await bookRoom.execute(room, new Date('2022-01-01'), new Date('2022-02-01'));
        expect(reservation).not.toBeNull();
        expect(reservation.id).not.toBeNull();
    });

    test('Should not book a room when it is unavailable', async function() {
        try {
            await bookRoom.execute(room, new Date('2022-01-01'), new Date('2022-01-31')); 
            const bookedRoom = await roomRepo.findRoomByNumber(room.number);
            expect(bookedRoom.reservations.length).toBe(1);
            await bookRoom.execute(room, new Date('2022-01-15'), new Date('2022-02-15'));
            fail('Should not have booked room!');
        } catch (error) {
            expect(error).toBe('Room not available');
        } 
    });

});