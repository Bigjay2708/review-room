# Review Room

Review Room is a modern movie review platform where users can browse movies, read and write reviews, rate movies, and watch trailers.

## Features

- Browse popular, top-rated, and upcoming movies
- Search for specific movies
- View detailed movie information
- Watch movie trailers
- Write and read movie reviews
- Rate movies on a 5-star scale
- Responsive design with a bright and stylish UI

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion for animations
- **Database**: MongoDB
- **Movie Data**: TMDB API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB connection
- TMDB API key

### Installation

1. Install dependencies

```bash
npm install
```

2. Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
```

3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
