import Reservation from "../../../src/core/entity/Reservation";

describe('Reservation entity', () => { 

    test('Should create reservation from constructor args', async function() {
        const reservation = new Reservation(5, 100, new Date('2022-01-01'), new Date('2022-01-10'));
        expect(reservation.nrOfDays).toBe(9);
        expect(reservation.totalPrice).toBe(100 * 9);
    });

});