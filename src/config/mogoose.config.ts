import { connect } from 'mongoose';

async function connectMongodb(): Promise<void> {
    try {
        await connect('mongodb://vitaopb:1234@localhost:27017');
        console.log('MONGODB is connected');
    } catch (error) {
        console.log(`MONGODB fail connection, error: ${error}`);
    }
}

export { connectMongodb };