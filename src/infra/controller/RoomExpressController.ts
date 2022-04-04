import * as express from 'express';
import BookRoom from "../../core/usecase/BookRoom";
import SearchRoom from "../../core/usecase/SearchRoom";
import RoomRepositoryInMemory from "../repository/RoomRepositoryInMemory";

const roomRepo = new RoomRepositoryInMemory();
const searchRoomService = new SearchRoom(roomRepo);
const bookRoomService = new BookRoom(roomRepo);

export async function searchRoom(req: express.Request, res: express.Response) {
    const params = req.query;
    if (!params || !params.in || !params.out) {
        res.status(400).json( { success: false, message: 'Invalid request' } );
        return;
    }
    const checkin = new Date(params.in as string);
    const checkout = new Date(params.out as string);
    const rooms = await searchRoomService.executebyDates(checkin, checkout)
    res.json( { rooms : [...rooms] } );
}

export async function bookRoom(req: express.Request, res: express.Response) {
    if (!req.body || !req.body.room || !req.body.checkin || !req.body.checkout) {
        res.status(400).json( { success: false, message: 'Invalid request' } );
        return;
    }
    const room = await searchRoomService.executeByRoomNumber(req.body.room);
    if (!room) {
        res.status(404).json( { success: false, message: 'Room not found' } );
        return;
    }
    const checkin = new Date(req.body.checkin);
    const checkout = new Date(req.body.checkout);
    try {
        const reservation = await bookRoomService.execute(room, checkin, checkout);
        res.json( { reservation } );
    } catch(err) {
        if (err instanceof Error) 
            res.json( { success: false, error: err.message })
    }
}