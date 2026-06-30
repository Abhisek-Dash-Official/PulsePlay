> [!NOTE]
> This project is currently in active development.

<div align="center">

  <img src="./public/logo.png" alt="PulsePlay Logo" width="150" />

  <h1>Pulse Play</h1>
  
  <p>A <b>1st-year academic</b> web project exploring applied data science, algorithmic recommendations, and media routing.</p>

  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />

  <br />

  <img src="https://img.shields.io/badge/Zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="Zustand" />
  <img src="https://img.shields.io/badge/Lucide_React-%23F26B3A.svg?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React" />
  <img src="https://img.shields.io/badge/React_Toastify-%23121212.svg?style=for-the-badge&logo=react&logoColor=%234CAF50" alt="React Toastify" />

  <br />

  <img src="https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Mongoose-%23880000.svg?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/bcryptjs-%23cb3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="bcryptjs" />
  <img src="https://img.shields.io/badge/jose_(JWT)-%23000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="jose JWT" />

</div>

<br />

<!-- TODO: Add project demo GIF here once the UI is fully built.
![PulsePlay CMS Demo](./docs/assets/my-demo.gif)
-->

> [!WARNING]
> **Disclaimer:** This repository contains **PulsePlay**, a personal web development project built strictly for self-learning and skill-building purposes. This platform is not intended for public commercial deployment or copyright infringement.

## Project Overview

PulsePlay is an advanced media discovery portal. The core focus of this project is applying data science and algorithmic concepts to web development.

Instead of dealing with heavy native video hosting, PulsePlay acts as an intelligent routing hub. The application gives users two primary options for any media title—navigating to external watch streams or utilizing external download links—while utilizing backend algorithms to personalize the discovery experience.

## Core Features

- **Dual Action Architecture:** Seamless UI/UX separating external streaming routes and direct external downloading links.
- **Algorithmic Recommendations:** Utilizes user interaction logs (Watch vs. Download routing) and media metadata to drive Content-Based and Collaborative Filtering algorithms.
- **Advanced Text Search:** Powered by MongoDB Text Indexes for typo-tolerant, weighted semantic search across titles, plots, and metadata tags.
- **Custom CMS:** A backend Content Management System for uploading media metadata, extracting tags, and managing the external routing links.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes (Node.js)
- **Database:** MongoDB (NoSQL)

## Getting Started

Follow these steps to run the PulsePlay environment locally on your machine.

**1. Clone the repository**

```
git clone https://github.com/Abhisek-Dash-Official/PulsePlay.git
cd pulseplay
```

**2. Install dependencies**

```
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root directory and add your connection string:

```
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_password_here

```

**4. Run the development server**

```
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Roadmap

Here is the planned phased development progression for PulsePlay:

- [x] **Phase 1:** Project Initialization & Architecture
- [x] **Phase 2:** Database Architecture (MongoDB Connection & Schema Models)
- [x] **Phase 3:** Advanced Text Search Integration (MongoDB)
- [x] **Phase 4:** Admin CMS Development
- [ ] **Phase 5:** User Authentication System
- [ ] **Phase 6:** Global UI & Home Page
- [ ] **Phase 7:** Media Details Hub
- [ ] **Phase 8:** User Interactions (Watchlist & Favorites)
- [ ] **Phase 9:** Search and Dynamic Filtering/Sorting Feature
- [ ] **Phase 10:** Algorithmic Recommendation Engine

## Documentation

For a deep dive into the backend architecture, please refer to the project documentation:

- [Database Schema (NoSQL)](./docs/database-schema.md)

- [API Routes & Endpoints](./docs/api-routes.md)

## Known Issues & Limitations

I am currently tracking a known architectural limitation. For a detailed technical explanation and the planned database schema update, please refer to the [Known Issues Documentation](./docs/KNOWN_ISSUES.md).

- **Activity Logs** : Hard-deleted records display as "Unknown" due to dangling database references.

## Key Learnings

Building PulsePlay has been an intensive experience, applying these concepts in a real-world project context:

- **Advanced MongoDB Text Indexing:** Implemented weighted, multi-field text indexes for typo-tolerant, high-performance semantic search.
- **Stateless Authentication (JWT):** Built a secure auth system using `jose` for stateless token signing and verification.
- **API Debugging:** Used **Thunder Client** to handle request lifecycle debugging and header-based authentication validation.
- **Professional Version Control:** Adopted **Atomic Commits** for clean, granular git history and utilized the **VIM** editor for efficient commit workflows.

## 🛠 Key Challenges Faced

- **Data Type Mismatches:** I encountered frequent issues with data type consistency, one of the e.g. when dealing with MongoDB `ObjectId`, `Strings`, and `Buffer` formats. These mismatches led to subtle bugs.
  - _Insight:_ This was a strong reminder of why **TypeScript** is essential. Using static types would have caught these mismatches at compile-time rather than during runtime debugging.

- **Lack of Upfront Planning:** I started implementation without a formal architecture or database design phase. This led to:
  - **Decision Fatigue:** Throughout the development process, I found myself constantly stopping to decide on data formats and feature integration strategies, rather than just building.
  - **Implementation Roadblocks:** Some ideas for features emerged midway, but because I hadn't planned the database schema beforehand, I couldn't implement them without risking a full database restructuring. I realized that features are only as good as the underlying schema they are built on.

## Development Methodology & Acknowledgements

As the core focus of this project lies in algorithmic recommendations, database architecture, and data science applications, AI coding assistants were utilized primarily as productivity tools. They assisted in UI scaffolding, CSS styling, and generating frontend boilerplate, allowing for a concentrated effort on the backend logic, schema design, and custom system architecture.
