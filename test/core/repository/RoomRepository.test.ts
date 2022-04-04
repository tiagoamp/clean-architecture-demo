import Reservation from "../../../src/core/entity/Reservation";
import Room from "../../../src/core/entity/Room";
import RoomRepository from "../../../src/core/repository/RoomRepository";
import RoomRepositoryInMemory from "../../../src/infra/repository/RoomRepositoryInMemory";

describe('Room Repository', () => { 

    let roomRepo: RoomRepository; 
    let room: Room;
    
    beforeEach(async () => {
        roomRepo = new RoomRepositoryInMemory();
        room = await roomRepo.findRoomByNumber(5);
    });

    
    test('Should return available When no reservations', async function() {
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-15'), new Date('2022-01-20'));
        expect(available).toBeTruthy();
    });

    test('Should return available When no overlaping periods (1)', async function() {
        roomRepo.addReservation(new Reservation(5, 100, new Date('2022-01-15'), new Date('2022-01-20')));
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-01'), new Date('2022-01-14'));
        expect(available).toBeTruthy();
    });

    test('Should return available When no overlaping periods (2)', async function() {
        roomRepo.addReservation(new Reservation(5, 100, new Date('2022-01-15'), new Date('2022-01-20')));
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-21'), new Date('2022-01-31'));
        expect(available).toBeTruthy();
    });

    test('Should return not available When overlaping periods (3)', async function() {
        await roomRepo.addReservation(new Reservation(5, 100, new Date('2022-01-15'), new Date('2022-01-20')));
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-15'), new Date('2022-01-20'));
        expect(available).toBeFalsy();
    });

    test('Should return not available When overlaping periods (4)', async function() {
        await roomRepo.addReservation(new Reservation(5, 100, new Date('2022-01-15'), new Date('2022-01-20')));
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-01'), new Date('2022-01-18'));
        expect(available).toBeFalsy();
    });

    test('Should return not available When overlaping periods (5)', async function() {
        await roomRepo.addReservation(new Reservation(5, 100, new Date('2022-01-15'), new Date('2022-01-20')));
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-18'), new Date('2022-01-31'));
        expect(available).toBeFalsy();
    });

    test('Should return not available When overlaping periods (6)', async function() {
        await roomRepo.addReservation(new Reservation(5, 100, new Date('2022-01-15'), new Date('2022-01-20')));
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-16'), new Date('2022-01-19'));
        expect(available).toBeFalsy();
    });

    test('Should return not available When overlaping periods (4)', async function() {
        await roomRepo.addReservation(new Reservation(5, 100, new Date('2022-01-15'), new Date('2022-01-20')));
        const available = await roomRepo.isRoomAvailable(5, new Date('2022-01-01'), new Date('2022-01-31'));
        expect(available).toBeFalsy();
    });

});