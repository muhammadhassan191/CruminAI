# AbstractLeadFlow (CruminAI)

![AbstractLeadFlow Dashboard](./src/assets/hero.png) *(Note: Replace with actual screenshot)*

**AbstractLeadFlow** is an intelligent, high-fidelity Sales Intelligence platform designed to automate the discovery and management of B2B leads. Inspired by industry leaders like Apollo.io, this platform leverages AI to verify, categorize, and score business prospects. By integrating a built-in CRM, sales teams can seamlessly find leads and manage their outreach pipeline within a single, unified interface.

## ✨ Key Features

1. **Intelligent Lead Discovery**
   - Search across a global database of B2B contacts.
   - Advanced filtering by Job Title, Location, and Industry.
   - **Credit System:** "Reveal Info" feature to fetch verified Email, Phone, and LinkedIn data at the cost of credits.

2. **AI-Powered Insights (Google Gemini)**
   - **Lead Scoring:** Automatically evaluates and scores prospects (0-100) based on Ideal Customer Profile (ICP) alignment.
   - **Personalized Hooks:** Generates high-converting, personalized email opening lines using natural language AI.
   - **ICP Matcher:** Describe your target demographic in natural language, and Gemini configures your search parameters.

3. **Built-in CRM Pipeline**
   - Visual Kanban board to drag-and-drop leads through the sales cycle.
   - Default stages: *New*, *Contacted*, *Interested*, *Converted*.
   - Activity tracking (messages sent, last contact date, notes).

4. **Premium User Experience**
   - Modern "Dark Mode" aesthetics with glassmorphism effects.
   - Smooth, fluid animations powered by Framer Motion.
   - Responsive sidebar layout designed for desktop productivity.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React.js powered by Vite for blazing-fast performance.
- **Styling:** Vanilla CSS (Variables & Flexbox/Grid) for maximum control and premium dark mode formatting.
- **Backend & Database:** Supabase (PostgreSQL) handling real-time data, Row Level Security (RLS), and user authentication.
- **AI Engine:** Google Generative AI (`gemini-1.5-flash`) via the official SDK.
- **Icons & Animations:** Lucide React and Framer Motion.

---

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### 1. Prerequisites

- Node.js (v18+)
- A [Supabase](https://supabase.com/) account and project.
- A [Google AI Studio](https://aistudio.google.com/) API Key for Gemini.

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/CruminAI.git
cd CruminAI
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your credentials (you can copy `.env.example`):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsIn...
VITE_GEMINI_API_KEY=AIzaSyB...
```

### 4. Database Setup

You need to apply the schema to your Supabase PostgreSQL database. 

1. Go to your Supabase Project Dashboard.
2. Navigate to the **SQL Editor**.
3. Copy the contents of the `schema.sql` file located in the root of this repository.
4. Run the query. This script will provision the `leads`, `companies`, `profiles`, and `crm_leads` tables along with all necessary Triggers and RLS policies.

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/).

---

## 📂 Project Architecture

```text
CruminAI/
├── schema.sql             # Supabase PostgreSQL database tables and RLS configuration
├── .env.example           # Template for environment variables
├── src/
│   ├── index.css          # Global styles, variables, typography, and glassmorphism rules
│   ├── main.jsx           # React mounting and entry point
│   ├── App.jsx            # Routing and core components layout wrapper
│   ├── components/        # Reusable UI components
│   │   └── Layout.jsx     # Master Sidebar and Top Header structure
│   ├── pages/             # Distinct application views
│   │   ├── Dashboard.jsx  # Metrics and activity feed
│   │   ├── LeadSearch.jsx # Search engine and results table
│   │   └── CRM.jsx        # Kanban-style lead pipeline tracker
│   └── services/          # API interfaces 
│       ├── ai.js          # Gemini integration (Prompts, Scoring, Content Generation)
│       └── supabase.js    # Data fetching, CRM inserts, database client initialization
```

---

## 🧱 The Database Schema

The architecture is built for scalability on PostgreSQL:

- **`profiles`:** Tied to Supabase AUth. Tracks the user's current credit balance that gets deducted upon lead enrichment.
- **`companies`:** Distinct parent table storing overarching company metrics (Revenue, Size, Headquarter, Industry).
- **`leads`:** The massive table tracking the actual humans (Titles, Emails, Phones, LinkedIn URLs) mapped via Foreign Keys to `companies`.
- **`crm_leads`:** A pivot mapping table connecting a User Profile to a specific Lead, storing dynamic metrics like their Pipeline Status, Notes, and AI Score individually for that user account.

---

## 🔮 Future Roadmap

- [ ] **Real-world Enrichment APIs:** Integrating Apollo or Lusha APIs into the `enrichLead` service function to pull live data instead of using simulated credits.
- [ ] **Python Scraping Engine:** Developing an asynchronous FastAPI web scraping microservice utilizing Puppeteer to dynamically hydrate the PostgreSQL cluster with new LinkedIn leads.
- [ ] **Automated Email Outreach:** Implementing SMTP handshake protocols to allow users to trigger email campaigns directly from the CRM Pipeline. 

---

**Developer:** Hassan
**License:** MVP Proprietary
