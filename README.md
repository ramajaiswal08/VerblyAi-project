# VerblyAI Bot Management

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: localStorage (can be extended to backend)
- **Icons**: Lucide React
- **Build Tool**: Next.js 14 with App Router

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone - https://github.com/ramajaiswal08/VerblyAi-project.git
   cd verbluai-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Install shadcn/ui components** (if not already installed)
   \`\`\`bash
   npx shadcn@latest init
   npx shadcn@latest add button card input textarea label select slider tabs switch badge avatar dropdown-menu dialog alert-dialog sheet sidebar chart
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏃‍♂️ Running the Project Locally

### Development Mode
\`\`\`bash
npm run dev
\`\`\`
Starts the development server with hot reloading at `http://localhost:3000`

### Production Build
\`\`\`bash
npm run build
npm start
\`\`\`
Creates an optimized production build and starts the 


## 🎯 Key Features

### 1. Bot Creation & Management
- **From Scratch**: Complete form with 8 configuration tabs
- **From Templates**: 6 pre-built templates for common use cases

### 2. Advanced Customization
- **Appearance**: 6 theme presets + custom color picker
- **Personality**: Multiple personality types and languages
- **LLM Configuration**: Support for OpenAI, Anthropic, Google, Cohere
- **Help Desk**: FAQ management system
- **Data Collection**: User information gathering


##  Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`



## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon library
- [Next.js](https://nextjs.org/) for the React framework
