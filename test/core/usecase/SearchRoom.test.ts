import Reservation from "../../../src/core/entity/Reservation";
import RoomRepository from "../../../src/core/repository/RoomRepository";
import SearchRoom from "../../../src/core/usecase/SearchRoom";
import RoomRepositoryInMemory from "../../../src/infra/repository/RoomRepositoryInMemory";

describe('Search Room Use Case', () => { 

    let roomRepo: RoomRepository;
    let searchRoom: SearchRoom; 

    beforeEach(() => {
        roomRepo = new RoomRepositoryInMemory();
        searchRoom = new SearchRoom(roomRepo);
    });


    test('Should return all rooms as available When there are no reservations', async function() {
        const totalRooms = (await roomRepo.findAll()).length;
        const rooms = await searchRoom.executebyDates(new Date('2022-01-01'), new Date('2022-02-01'));
        expect(rooms.length).toBe(totalRooms);
    });

    test('Should return no available rooms When all of them are booked up', async function() {
        const rooms = await roomRepo.findAll();
        const reservations = rooms.map(room => new Reservation(room.number, room.price, new Date('2022-01-01'), new Date('2022-01-31')))
        for (const reservation of reservations) 
            await roomRepo.addReservation(reservation);
        const result = await searchRoom.executebyDates(new Date('2022-01-15'), new Date('2022-01-20'));
        expect(result.length).toBe(0);
    });

    test('Should not return available room When period is booked', async function() {
        const room = (await roomRepo.findAll()).find(r => r.number === 5);
        if (room === undefined) fail('Room not found');
        let reservation = new Reservation(room.number, room.price, new Date('2022-01-10'), new Date('2022-01-15'));
        reservation = await roomRepo.addReservation(reservation);
        const availables = await searchRoom.executebyDates(new Date('2022-01-01'), new Date('2022-01-20'));
        const containsBookedRoom = availables.some(r => r.number === 5);
        expect(containsBookedRoom).toBeFalsy();
    });

    test('Should return room When room number informed', async function() {
        const room = await searchRoom.executeByRoomNumber(5);
        expect(room?.number).toBe(5);
    });

});