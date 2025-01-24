import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');
	}
	return socket;
};