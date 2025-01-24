# HTTP Monitor Application

## Project Overview
A full-stack real-time HTTP response monitoring application that periodically pings httpbin.org and displays response data.

## Tech Stack
- **Backend**: 
  - Node.js with TypeScript
  - Express.js
  - MongoDB
  - Socket.IO
- **Frontend**:
  - Next.js
  - TypeScript
  - Shadcn UI
  - Tailwind CSS
- **Testing**: Jest
- **CI/CD**: GitHub Actions

## Prerequisites
- Node.js (v18+)
- MongoDB

## Setup Instructions

### Environment Variables
Create `.env` files in both backend and frontend directories:

**Backend `.env`**:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/http-monitor
LOG_LEVEL=info
```

**Frontend `.env`**:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/http-monitor.git

# Install dependencies backend from root directory
cd backend
pnpm install

# Run backend
pnpm run dev

# Install dependencies frontend from root directory
cd fronend
pnpm install

# Run frontend
pnpm run dev
```

## Architectural Decisions

### Backend Design
- Used TypeScript for type safety
- Implemented event-driven architecture with Socket.IO
- Periodic monitoring with configurable intervals
- Comprehensive logging with Winston

### Frontend Design
- Server-side rendering with Next.js
- Shadcn UI for consistent, accessible components
- Real-time updates using Socket.IO
- Responsive design with Tailwind CSS

## Assumptions
1. httpbin.org is consistently available
2. Show  all the information from the pinged message
3. Gave some extra fields like response time, the timestamp of the reponse made

## Future Improvements
- Add authentication
- Implement more advanced filtering
- Add alerts for failed requests
- Support multiple endpoint monitoring

## Testing Strategy
- Unit tests for core services
- Used Jest to test the backend services core functionality
- Integration tests for API endpoints
- Socket connection tests
