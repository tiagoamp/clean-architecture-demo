import express from 'express';
import { bookRoom, searchRoom } from '../controller/RoomExpressController';

const app = express();

app.use(express.json());

app.get('/api/room/search', searchRoom);
app.post('/api/room/book', bookRoom);

app.listen(5000, () => console.log('Server running'));