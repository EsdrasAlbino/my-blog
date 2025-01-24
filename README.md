# My Blog Platform

A modern full-stack blog platform built with Next.js 13+, featuring authentication, dynamic routing, and real-time content management.

## Features

- 🔐 User authentication (login/register)
- 📝 Create, edit, and delete blog posts
- 🎨 Modern UI with responsive design
- 🔍 Search functionality
- 👤 User profiles
- 🚀 Server-side rendering
- 🔒 Protected routes

## Tech Stack

- Next.js 13+
- TypeScript
- Prisma (Database ORM)
- NextAuth.js (Authentication)
- CSS Modules

## Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
cd my-blog
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
npm run dev
```

## Project Structure

- `app/`: Next.js 13+ app directory with route groups
  - `(auth)/`: Authentication related pages
  - `(protected)/`: Protected routes requiring authentication
  - `api/`: API routes for backend functionality

- `components/`: Reusable React components
- `lib/`: Utility functions and configurations
- `prisma/`: Database schema and migrations
- `public/`: Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.