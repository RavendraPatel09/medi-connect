# MediConnect

> A comprehensive full-stack medicine delivery platform connecting buyers, sellers, and administrators with real-time capabilities and modern cloud-native architecture.

---

## 📋 Overview

**MediConnect** is a production-ready, full-stack e-commerce platform for medicine distribution built with modern web and backend technologies. The monorepo architecture orchestrates three independent web applications, a scalable Python backend, and shared component libraries, enabling seamless collaboration between patients, pharmacies, and platform administrators.

### Key Capabilities

- **Multi-role marketplace**: Distinct interfaces for buyers, sellers, and platform administrators
- **Real-time communication**: WebSocket-based chat and notifications
- **Secure authentication**: JWT-based OAuth2 with role-based access control (RBAC)
- **Scalable backend**: FastAPI with async support, database migrations, and caching layer
- **Containerized deployment**: Docker & Docker Compose configuration included
- **Developer-friendly**: TypeScript throughout, shared type definitions, and unified tooling

---

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend Applications                  │
│  ┌──────────┬──────────┬──────────┬──────────┬────────┐  │
│  │ Buyer    │ Seller   │ Admin    │  Theme   │  UI    │  │
│  │ (React)  │ (React)  │ (React)  │ Package  │Package │  │
│  └──────────┴──────────┴──────────┴──────────┴────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ HTTP/WS
┌─────────────────────────────────────────────────────────┐
│              FastAPI Backend (Python)                    │
│  ┌──────────────────────────────────────────────────────┤
│  │ API Routes: Auth │ Medicines │ WebSockets           │
│  ├──────────────────────────────────────────────────────┤
│  │ SQLAlchemy ORM │ Pydantic Validation │ JWT Security  │
│  ├──────────────────────────────────────────────────────┤
│  │ PostgreSQL │ Redis Cache │ Alembic Migrations       │
│  └──────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🛒 **Buyer Application**
- Browse medicine marketplace with detailed product information
- Real-time chat with sellers and support
- Shopping cart and checkout flow
- Order history and tracking
- Intuitive UI with smooth animations (Framer Motion, GSAP)
- 3D visual elements (Three.js)

### 🏪 **Seller Dashboard**
- Upload and manage medicine inventory
- Real-time sales analytics and dashboards
- Order management and fulfillment
- Messaging with buyers
- Performance metrics (Recharts)

### 🛠️ **Admin Dashboard**
- Platform-wide analytics and reporting
- User management (approve/reject sellers)
- System health monitoring
- Medicine catalog management
- Approval workflows

### 🔐 **Authentication & Security**
- JWT-based OAuth2 authentication
- Bcrypt password hashing
- Role-based access control (BUYER, SELLER, ADMIN)
- Secure API endpoints with dependency injection
- CORS configured for multi-origin access

### 💬 **Real-Time Communication**
- WebSocket support for instant chat
- Live notifications
- Bi-directional data streaming

### 📦 **Shared Libraries**
- `ui` — Reusable React components across all apps
- `theme` — Consistent design tokens and Tailwind configuration
- `types` — Unified TypeScript type definitions (frontend-backend alignment)
- `hooks` — Custom React hooks for common patterns

---

## 🛠️ Technology Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18.3 + Vite |
| Language | TypeScript |
| Routing | React Router v6 |
| State Management | React Query (TanStack) + Axios |
| Styling | Tailwind CSS + custom theme |
| Animation | Framer Motion, GSAP |
| 3D Graphics | Three.js, React Three Fiber |
| Charts | Recharts |
| Icons | Lucide React |
| Build Orchestration | Turbo |
| Package Manager | pnpm |

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI 0.111+ |
| Language | Python 3.11+ |
| Server | Uvicorn (ASGI) |
| ORM | SQLAlchemy 2.0+ |
| Database | PostgreSQL (primary), SQLite (dev) |
| Caching | Redis |
| Migrations | Alembic |
| Authentication | Python-Jose (JWT), PassLib (bcrypt) |
| Real-Time | WebSockets |
| Validation | Pydantic v2 |
| Deployment | Docker, Docker Compose |

### DevOps
- **Container Orchestration**: Docker, Docker Compose
- **Build Tools**: Turbo, pnpm
- **Linting**: ESLint, oxlint
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript compiler

---

## 📁 Project Structure

```
medicycle-monorepo/
├── apps/
│   ├── buyer/              # Customer-facing marketplace application
│   │   ├── src/
│   │   │   ├── pages/      # Landing, Marketplace, Chat, etc.
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   └── assets/
│   │   └── package.json
│   ├── seller/             # Pharmacy inventory & order management
│   │   ├── src/
│   │   │   ├── pages/      # Dashboard, UploadMedicine, etc.
│   │   │   ├── components/
│   │   │   └── services/
│   │   └── package.json
│   └── admin/              # Platform administration dashboard
│       └── src/
│           ├── pages/      # Dashboard, Reports, etc.
│           └── ...
├── backend/                # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # Route handlers
│   │   │   ├── auth.py     # Auth endpoints
│   │   │   ├── medicines.py# Medicine CRUD
│   │   │   └── websockets.py# Real-time communication
│   │   ├── models/         # SQLAlchemy ORM models
│   │   ├── schemas/        # Pydantic validation schemas
│   │   ├── core/           # Config, security utilities
│   │   ├── db/             # Database session management
│   │   └── main.py         # FastAPI app initialization
│   ├── alembic/            # Database migration scripts
│   ├── pyproject.toml
│   ├── Dockerfile
│   └── docker-compose.yml
├── packages/
│   ├── ui/                 # Shared React component library
│   ├── theme/              # Tailwind config, design tokens
│   ├── types/              # Shared TypeScript interfaces
│   └── hooks/              # Custom React hooks
├── turbo.json              # Turbo build configuration
├── pnpm-workspace.yaml     # pnpm workspace configuration
└── package.json            # Root workspace manifest
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **pnpm**: 9.0.0+ (see `package.json` for exact version)
- **Python**: 3.11+ (for backend)
- **Docker** & **Docker Compose** (optional, for containerized deployment)
- **PostgreSQL** (for production; SQLite included for development)

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/RavendraPatel09/medi-connect.git
cd medi-connect
```

#### 2. Install Frontend Dependencies

```bash
pnpm install
```

#### 3. Set Up Backend Environment

```bash
cd backend

# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt  # or use pyproject.toml with pip-tools

# Initialize database (SQLite for dev)
python init_db.py
```

#### 4. Configure Environment Variables

Create `.env` files as needed:

**Backend** (`backend/.env`):
```env
DATABASE_URL=sqlite:///./medicycle.db
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
API_V1_STR=/api/v1
```

**Frontend** (`apps/buyer/.env.local`, etc.):
```env
VITE_API_URL=http://localhost:8000
```

### Running Locally

#### Option 1: Development Mode (All Services)

```bash
# In root directory
turbo run dev
```

This starts:
- **Backend**: `http://localhost:8000` (FastAPI docs: `/docs`)
- **Buyer App**: `http://localhost:5173`
- **Seller App**: `http://localhost:5174`
- **Admin App**: `http://localhost:5175`

#### Option 2: Individual Services

**Backend**:
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Frontend Apps**:
```bash
cd apps/buyer
pnpm dev
```

### Using Docker Compose (Recommended for Staging)

```bash
cd backend
docker-compose up --build
```

This orchestrates:
- FastAPI backend service
- PostgreSQL database
- Redis cache
- All with proper networking and environment configuration

---

## 📡 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Key Endpoints

**Authentication**:
- `POST /api/v1/auth/register` — Register new user
- `POST /api/v1/auth/login` — Login (OAuth2 PasswordFlow)

**Medicines**:
- `GET /api/v1/medicines/` — List all medicines
- `POST /api/v1/medicines/` — Create medicine (sellers only)
- `GET /api/v1/medicines/{id}` — Get medicine details

**WebSockets**:
- `WS /ws/chat/{user_id}` — Real-time chat connection

---

## 🏗️ Building for Production

### Frontend

```bash
pnpm build
```

Outputs optimized bundles to `dist/` in each app directory.

### Backend

```bash
# Using Docker (recommended)
docker build -t medicycle-backend:latest backend/
docker run -p 8000:8000 medicycle-backend:latest

# Or manual packaging
cd backend
pip install build
python -m build
```

### Database Migrations

```bash
cd backend
alembic upgrade head
```

---

## 🧪 Quality Assurance

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
turbo run typecheck
```

### Formatting

```bash
pnpm format
```

---

## 📊 Database Schema

Key tables include:
- `users` — Buyer/Seller/Admin accounts with roles
- `medicines` — Medicine catalog (name, dosage, manufacturer, etc.)
- `listings` — Seller inventory (price, quantity, expiry, etc.)
- `orders` — Customer orders with status tracking
- `order_items` — Order line items
- `messages` — Chat messages between users

See `backend/alembic/versions/` for migration history and schema evolution.

---

## 🔐 Security Considerations

- **Passwords**: Bcrypt hashing with salting
- **Authentication**: Stateless JWT tokens with expiration
- **Authorization**: Role-based access control on all endpoints
- **CORS**: Configured to accept requests from frontend origins
- **Rate Limiting**: Recommended to implement rate limiting in production
- **Environment Secrets**: Use `.env` files (never commit to git)

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow ESLint/Prettier for TypeScript
- Follow PEP 8 for Python
- Write meaningful commit messages
- Include tests for new features

---

## 📋 Roadmap

- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Email notifications & verification
- [ ] SMS notifications
- [ ] Advanced search & filtering
- [ ] Recommendation engine (ML-based)
- [ ] Review & rating system
- [ ] Inventory analytics & forecasting
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] CI/CD pipeline (GitHub Actions)

---

## 📄 License

This project is licensed under the **ISC License** — see the LICENSE file for details.

---

## 📧 Contact & Support

For issues, questions, or feature requests:
- **GitHub Issues**: [Open an issue](https://github.com/RavendraPatel09/medi-connect/issues)
- **Email**: Contact via GitHub profile

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Pydantic](https://docs.pydantic.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
