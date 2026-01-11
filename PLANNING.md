# SocialFitness App - Project Planning Document

## Project Overview

SocialFitness is a social-based fitness tracking application that allows users to track workouts, share progress with friends, plan group training sessions, and visualize progress through 3D avatars and achievements.

## Core Features

### Phase 1: Workout System (Personal Use - No Authentication)
**Note:** This phase works without user accounts - all data stored locally or in browser storage for personal use.

#### Exercise Management
- [ ] Pre-defined exercise database with muscle group categorization:
  - **Chest**: Chest press, Incline press, Decline press, Dumbbell flyes, etc.
  - **Biceps**: Bicep curls, Hammer curls, Concentration curls, etc.
  - **Triceps**: Tricep dips, Overhead extension, Close-grip press, etc.
  - **Legs**: Squats, Leg press, Lunges, Calf raises, etc.
  - **Abs**: Crunches, Planks, Leg raises, etc.
- [ ] Exercise metadata: name, muscle group, description, instructions
- [ ] Custom exercise creation (optional for future)

#### Workout Creation & Management
- [ ] Create custom workouts by selecting exercises
- [ ] Workout templates (e.g., "Push Day", "Pull Day", "Leg Day")
- [ ] Save and name workouts for reuse (local storage)
- [ ] Edit/delete saved workouts

#### Workout Session Tracking
- [ ] Record workout sessions with:
  - Date and time
  - Selected workout plan or custom session
  - For each exercise:
    - Sets performed
    - Repetitions per set
    - Weight (kg) per set
    - Rest time (optional)
    - Notes (optional)
- [ ] Save session data to local storage (IndexedDB or localStorage)
- [ ] View workout history (chronological list)

### Phase 2: Authentication & User System
- [ ] User account creation and authentication
- [ ] User profile management
- [ ] Secure login/logout system
- [ ] Session management
- [ ] Migrate local workout data to user account (on first login)

### Phase 3: Statistics & Progress Tracking (Personal)
- [ ] Personal records (PRs) tracking:
  - Max weight lifted for each exercise
  - Date of PR achievement
- [ ] Progress visualization:
  - Weight progression charts over time
  - Training frequency (workouts per week/month)
  - Volume progression (total weight × reps)
  - Muscle group balance charts
- [ ] Progress suggestions:
  - Recommended weight increases
  - Training frequency recommendations
  - Next workout suggestions based on history

### Phase 4: Social Features
#### Friend System
- [ ] User search and friend requests
- [ ] Accept/decline friend requests
- [ ] Friend list management
- [ ] Remove friends functionality

#### Social Feed & Achievements
- [ ] Share personal records and achievements
- [ ] View friends' recent achievements
- [ ] Achievement notifications
- [ ] Feed showing friends' workout activity

#### Workout Events & Group Training
- [ ] Create workout events:
  - Date and time
  - Location (gym name and address)
  - Planned workout (muscle groups/exercises)
  - Public/private events
- [ ] Browse upcoming workout events
- [ ] Send training invitations:
  - "Join me for this workout" feature
  - Accept/decline invitations
- [ ] Event participants list
- [ ] Training together statistics:
  - Number of joint training sessions
  - Locations trained together
  - Timeline of joint workouts

### Phase 5: Advanced Features (Future)
#### 3D Avatar System
- [ ] Photo/video capture for body scanning
- [ ] Integration with 3D AI generation tool (to be selected)
- [ ] Parametric mesh avatar creation
- [ ] Avatar customization based on:
  - Muscle mass parameters (linked to training data)
  - Body measurements
  - Training frequency visualization
- [ ] View friends' avatars and progress

#### 3D Virtual Gym Room
- [ ] 3D environment rendering (Three.js/WebGL)
- [ ] Achievement visualization as 3D assets:
  - Bench press with plates indicating weight achieved
  - Trophies and medals
  - Progress milestones
- [ ] Virtual gym room for viewing achievements
- [ ] Interactive 3D elements

## Technical Architecture

### Recommended Tech Stack (Browser-Based)

#### Frontend
- **Framework**: React (with TypeScript) or Next.js for SSR
- **UI Library**: Material-UI, Chakra UI, or Tailwind CSS
- **State Management**: Redux Toolkit or Zustand
- **Charts/Visualization**: Recharts, Chart.js, or D3.js
- **3D Graphics** (future): Three.js, React Three Fiber
- **Routing**: React Router

#### Backend
- **Runtime**: Node.js with Express or Python with FastAPI/Django
- **Database**: PostgreSQL (primary) + MongoDB (optional for unstructured data)
- **Authentication**: JWT tokens + bcrypt for password hashing
- **API**: RESTful API or GraphQL
- **File Storage**: AWS S3, Cloudinary, or Firebase Storage (for future photo/video)

#### Hosting & Deployment
- **Frontend**: Vercel, Netlify, or AWS Amplify
- **Backend**: AWS EC2, Heroku, Railway, or DigitalOcean
- **Database**: AWS RDS, Supabase, or managed PostgreSQL service

### Database Schema Overview

#### Users
- id, email, username, password_hash, created_at, profile_image, bio

#### Exercises
- id, name, muscle_group, description, instructions, image_url (optional)

#### Workouts (Templates)
- id, user_id, name, created_at, is_template

#### Workout_Exercises (Junction)
- workout_id, exercise_id, order, sets_default, reps_default, weight_default

#### Workout_Sessions
- id, user_id, workout_id (nullable), date, duration, notes

#### Workout_Session_Exercises
- id, session_id, exercise_id, sets, reps (JSON array), weights (JSON array), notes

#### Friendships
- id, user_id, friend_id, status (pending/accepted/blocked), created_at

#### Achievements
- id, user_id, exercise_id, record_type (max_weight/max_reps), value, date, shared (boolean)

#### Workout_Events
- id, creator_id, title, description, date_time, location_name, location_address, workout_plan_id, status

#### Event_Participants
- event_id, user_id, status (invited/accepted/declined), invited_at

## Development Phases

### Phase 1: MVP (Minimum Viable Product) - Personal Workout Tracker
**Goal**: Basic workout tracking for personal use (no authentication required)
- Exercise database (basic set)
- Create and save workouts (local storage)
- Log workout sessions
- View workout history
- All data stored locally in browser

**Timeline**: 2-3 weeks

**Data Storage**: IndexedDB or localStorage (no backend needed initially)

### Phase 1.5: Frontend Data Persistence & Backend Integration (Next Steps)
**Goal**: Add temporary frontend persistence and backend API integration

#### Frontend Data Persistence (Best Practices)
- [ ] **Client-side caching strategy**:
  - Use React Query / TanStack Query for server state management
  - Cache API responses with appropriate cache keys and invalidation
  - Optimistic updates for better UX
- [ ] **Temporary persistence options** (if needed before full backend):
  - localStorage for user preferences/settings only
  - SessionStorage for temporary session data
  - IndexedDB for larger datasets (not recommended as primary storage)
  - **Note**: Browser storage should NOT be used for primary data - only caching/temp storage
- [ ] **State management improvements**:
  - Consider Zustand or Redux Toolkit for complex state
  - Separate client state from server state
  - Implement proper loading/error states

#### Backend API Integration (Best Practices)
- [ ] **API design**:
  - RESTful API with proper HTTP methods (GET, POST, PUT, DELETE)
  - Consistent endpoint naming convention (`/api/workouts`, `/api/workouts/:id`)
  - Proper status codes (200, 201, 400, 401, 404, 500)
  - API versioning if needed (`/api/v1/workouts`)
- [ ] **Data fetching**:
  - Use React Query / TanStack Query for data fetching, caching, and synchronization
  - Implement proper error handling and retry logic
  - Loading states and skeleton screens
  - Pagination for large datasets
- [ ] **Authentication**:
  - JWT tokens stored in httpOnly cookies (more secure than localStorage)
  - Token refresh mechanism
  - Proper CORS configuration
- [ ] **Data validation**:
  - Client-side validation (UX)
  - Server-side validation (security)
  - Use Zod or similar for runtime type validation
- [ ] **Error handling**:
  - Global error boundary
  - API error handling with user-friendly messages
  - Network error handling (offline detection)

**Timeline**: 2-3 weeks

### Phase 2: Authentication & User Accounts
**Goal**: Add user accounts and migrate to cloud storage
- User registration and authentication
- User profiles
- Migrate in-memory data to user accounts (on first login)
- Cloud database setup (PostgreSQL)

**Timeline**: 1-2 weeks

### Phase 3: Statistics & Progress
**Goal**: Data visualization and insights
- Statistics dashboard
- Progress charts
- Personal records tracking
- Basic recommendations

**Timeline**: 2-3 weeks

### Phase 4: Social Foundation
**Goal**: Basic social features
- Friend system
- Achievement sharing
- Social feed

**Timeline**: 2-3 weeks

### Phase 5: Group Training
**Goal**: Workout events and collaboration
- Event creation and management
- Invitation system
- Joint training statistics

**Timeline**: 2-3 weeks

### Phase 6: 3D Features (Future)
**Goal**: Visual avatar and virtual gym
- 3D avatar integration
- Virtual gym room
- Achievement visualization

**Timeline**: 4-8 weeks (research dependent)

## Current Status ✅

### Phase 1: Workout System (In Progress - Frontend Only)
**Status**: Basic implementation complete - In-memory state (no persistence)

**Completed:**
- ✅ React + TypeScript project structure
- ✅ Exercise database (40+ exercises across 7 muscle groups)
- ✅ Workout creation interface (select exercises only - no sets/reps/weight)
- ✅ Workout detail view
- ✅ Workout session tracking (add sets dynamically during workout)
- ✅ Workout history display
- ✅ In-memory state management (data resets on page refresh)

**Current Data Storage:**
- In-memory state only (data lost on page refresh)
- No backend integration yet
- No persistent storage (localStorage/IndexedDB not used)

**Data Structure:**
- Workouts: Just exercise IDs (sets/reps/weight added during session)
- Sessions: Full workout session data with sets, reps, weight per exercise

## Getting Started - First Steps

### Step 1: Project Setup (Frontend Only) ✅
1. ✅ Initialize frontend project (React + TypeScript)
2. ✅ Set up development environment
3. ✅ Configure build tools (Create React App)
4. ✅ Set up version control (Git)

### Step 2: Frontend Foundation ✅
1. ✅ Set up routing and navigation
2. ✅ Build basic layout/components
3. ✅ Set up state management (in-memory store)
4. ✅ Create exercise data structure (TypeScript file)

### Step 3: Core Workout Features ✅
1. ✅ Exercise listing and filtering (from local data)
2. ✅ Workout creation interface
3. ✅ Workout session logging form (add sets dynamically)
4. ✅ Workout history display
5. ✅ In-memory state management (singleton store)

### Step 4: Statistics & Visualization (Later)
1. Add charting library
2. Create statistics dashboard
3. Progress tracking and PRs
4. Data visualization components

### Step 5: Backend & Authentication (Phase 2)
1. Design database schema
2. Set up backend API
3. Implement authentication
4. Migrate local data to database

## Next Steps for Mobile Integration

When ready for mobile apps:
- **React Native** or **Flutter** for cross-platform development
- Share API between web and mobile
- Consider using Expo (React Native) for faster development
- Native modules for camera/AR features (3D scanning)

## Questions to Consider

1. **Exercise Database**: Will you curate a comprehensive list, or start with basics?
2. **3D Avatar Tool**: Research tools like Ready Player Me, Avaturn, or custom ML models
3. **Gym Locations**: Manual entry or integrate Google Maps API for location search?
4. **Privacy**: Default visibility settings for workouts and events?
5. **Notifications**: Real-time notifications for friend requests, event invites?
6. **Monetization** (future): Premium features, ads, subscriptions?

---

## Notes
- **Phase 1 is frontend-only** - no backend needed initially
- **Current implementation uses in-memory state** - data resets on page refresh (intentional for now)
- Start with browser-based MVP to validate core concepts
- Focus on workout tracking before adding authentication
- Design data structures to be easily migratable to database later
- Keep code structure flexible for adding backend in Phase 1.5
- Browser storage (localStorage/IndexedDB) should be used sparingly:
  - Only for user preferences/settings
  - Temporary caching (with proper invalidation)
  - NOT for primary data storage (that belongs in database)
- See TECH_STACK.md for detailed tech stack comparison and recommendations
