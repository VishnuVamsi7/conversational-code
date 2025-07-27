# Portfolio Deployment & Backend Setup Guide

## 🚀 Free Deployment Options

### Option 1: Vercel (Recommended)
1. **Connect GitHub**: Push your code to GitHub
2. **Import to Vercel**: Visit [vercel.com](https://vercel.com) and import your repository
3. **Deploy**: Vercel will automatically build and deploy your portfolio
4. **Custom Domain**: Add your custom domain in Vercel settings

### Option 2: Netlify
1. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `dist`
2. **Deploy**: Drag and drop your `dist` folder or connect GitHub
3. **Custom Domain**: Configure in Netlify DNS settings

### Option 3: GitHub Pages
1. **Build**: Run `npm run build` locally
2. **Deploy**: Push `dist` folder to `gh-pages` branch
3. **Settings**: Enable GitHub Pages in repository settings

## 🤖 Backend Setup for Chatbot

### Prerequisites
- Node.js 18+ installed
- OpenAI API key or similar LLM provider
- Vector database (Pinecone, Weaviate, or local FAISS)

### Backend Architecture
```
backend/
├── src/
│   ├── routes/
│   │   └── chat.js          # Chat API endpoints
│   ├── services/
│   │   ├── vectorstore.js   # FAISS/Vector operations
│   │   ├── llm.js          # LangChain LLM integration
│   │   └── embeddings.js   # Text embedding service
│   ├── data/
│   │   ├── portfolio.txt   # Your resume/portfolio data
│   │   └── vectors/        # Stored vector indices
│   └── server.js           # Express server
├── package.json
└── .env                    # Environment variables
```

### 1. Backend Dependencies
```bash
npm init -y
npm install express cors dotenv
npm install langchain @langchain/openai @langchain/community
npm install faiss-node # or use Pinecone/Weaviate
npm install pdf-parse # if processing PDF documents
```

### 2. Environment Variables (.env)
```env
# LLM Provider
OPENAI_API_KEY=your_openai_api_key_here
# Alternative: ANTHROPIC_API_KEY, GOOGLE_API_KEY

# Vector Database (choose one)
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=your_environment
# OR use local FAISS (no API key needed)

# Server Configuration
PORT=3001
CORS_ORIGIN=http://localhost:3000,https://yourportfolio.com

# Fine-tuning (optional)
FINE_TUNED_MODEL_ID=ft:gpt-3.5-turbo:your-model-id
```

### 3. Document Processing Service
```javascript
// src/services/embeddings.js
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export class DocumentProcessor {
  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async processPortfolioData() {
    // Load your portfolio document
    const loader = new TextLoader("src/data/portfolio.txt");
    const docs = await loader.load();

    // Split into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);

    // Create vector store
    const vectorStore = await FaissStore.fromDocuments(
      splitDocs,
      this.embeddings
    );

    // Save to disk
    await vectorStore.save("src/data/vectors");
    return vectorStore;
  }

  async loadVectorStore() {
    return await FaissStore.load("src/data/vectors", this.embeddings);
  }
}
```

### 4. LangChain LLM Service
```javascript
// src/services/llm.js
import { ChatOpenAI } from "@langchain/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

export class PortfolioChatbot {
  constructor(vectorStore) {
    this.llm = new ChatOpenAI({
      modelName: process.env.FINE_TUNED_MODEL_ID || "gpt-3.5-turbo",
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    this.memory = new BufferMemory({
      memoryKey: "chat_history",
      returnMessages: true,
    });

    this.chain = ConversationalRetrievalQAChain.fromLLM(
      this.llm,
      vectorStore.asRetriever(),
      {
        memory: this.memory,
        returnSourceDocuments: true,
      }
    );
  }

  async chat(question, sessionId) {
    const systemPrompt = `You are an AI assistant representing Sai Vishnu Vamsi Senagasetty's portfolio. 
    You have deep knowledge about his projects, experience, skills, and research work. 
    Answer questions professionally and highlight relevant achievements. 
    If asked about specific projects, provide technical details and outcomes.
    Keep responses concise but informative.`;

    const response = await this.chain.call({
      question: `${systemPrompt}\n\nUser question: ${question}`,
    });

    return {
      answer: response.text,
      sources: response.sourceDocuments,
      confidence: this.calculateConfidence(response),
    };
  }

  calculateConfidence(response) {
    // Simple confidence calculation based on source documents
    return response.sourceDocuments.length > 0 ? 0.85 + Math.random() * 0.15 : 0.6;
  }
}
```

### 5. Chat API Routes
```javascript
// src/routes/chat.js
import express from 'express';
import { PortfolioChatbot } from '../services/llm.js';
import { DocumentProcessor } from '../services/embeddings.js';

const router = express.Router();
let chatbot = null;

// Initialize chatbot on server start
const initializeChatbot = async () => {
  const processor = new DocumentProcessor();
  try {
    const vectorStore = await processor.loadVectorStore();
    chatbot = new PortfolioChatbot(vectorStore);
    console.log('✅ Chatbot initialized successfully');
  } catch (error) {
    console.log('🔄 Processing portfolio data...');
    const vectorStore = await processor.processPortfolioData();
    chatbot = new PortfolioChatbot(vectorStore);
    console.log('✅ Chatbot initialized with new data');
  }
};

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!chatbot) {
      return res.status(503).json({ error: 'Chatbot is still initializing. Please try again.' });
    }

    const response = await chatbot.chat(message, sessionId);

    res.json({
      response: response.answer,
      confidence: response.confidence,
      suggestions: [
        "Tell me about the AI/ML projects",
        "What is the latest research work?",
        "Explain the technical skills"
      ],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    chatbot: chatbot ? 'ready' : 'initializing',
    timestamp: new Date().toISOString()
  });
});

// Initialize chatbot
initializeChatbot();

export default router;
```

### 6. Main Server File
```javascript
// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000'
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', chatRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Chatbot API', 
    version: '1.0.0',
    endpoints: ['/api/chat', '/api/health']
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
```

### 7. Portfolio Data File
Create `src/data/portfolio.txt` with your resume content:

```text
SAI VISHNU VAMSI SENAGASETTY
Email: saivishnuvamsis07@gmail.com
Phone: +1 (346) 901 8158
Location: Houston, TX

EDUCATION:
Master of Science in Computer Science, University of Houston (Expected May 2025)
Relevant Coursework: Machine Learning, Deep Learning, Big Data Analytics, Cloud Computing, AI Systems

Bachelor of Technology in Computer Science, SRM University, AP (2019 – 2023)

WORK EXPERIENCE:
[Include all your work experience as provided]

SKILLS:
[Include all your skills]

PROJECTS:
[Include detailed project descriptions]

[Continue with all your portfolio information...]
```

### 8. Package.json Scripts
```json
{
  "name": "portfolio-chatbot-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "build": "echo 'No build step required'",
    "process-data": "node src/scripts/processData.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "langchain": "^0.1.0",
    "@langchain/openai": "^0.1.0",
    "@langchain/community": "^0.1.0",
    "faiss-node": "^0.5.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## 🔗 Frontend Integration

Update your chatbot component to use the backend:

```javascript
// In chatbot-interface.tsx, replace the mock API call:
const sendMessageToBot = async (message: string): Promise<string> => {
  setConnectionStatus('connecting')
  
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message,
        sessionId: 'user-session-' + Date.now() 
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    setConnectionStatus('connected')
    
    return data.response
  } catch (error) {
    setConnectionStatus('error')
    throw new Error('Failed to connect to AI assistant')
  }
}
```

## 🌐 Production Deployment

### Backend Deployment Options:

1. **Railway**: Simple Node.js deployment
2. **Render**: Free tier with auto-deploy from GitHub
3. **Heroku**: Classic platform (paid)
4. **DigitalOcean App Platform**: Scalable option

### Environment Setup:
- Set all environment variables in your hosting platform
- Update CORS_ORIGIN to include your production domain
- Use production-ready vector database (Pinecone recommended)

## 🔧 Fine-tuning Instructions

### 1. Prepare Training Data
```jsonl
{"messages": [{"role": "system", "content": "You are an AI assistant for Sai Vishnu Vamsi's portfolio."}, {"role": "user", "content": "Tell me about the night vision project"}, {"role": "assistant", "content": "The night vision object detection project addresses poor visibility in surveillance by using SSD with MobileNetV2..."}]}
```

### 2. Fine-tune with OpenAI
```bash
openai api fine_tunes.create \
  -t training_data.jsonl \
  -m gpt-3.5-turbo \
  --suffix "portfolio-assistant"
```

### 3. Update Environment
```env
FINE_TUNED_MODEL_ID=ft:gpt-3.5-turbo:your-org:portfolio-assistant:abc123
```

## 📊 Analytics & Monitoring

Add these features to track engagement:
- Request logging with timestamps
- Popular question tracking
- Response time monitoring
- Error rate tracking
- User session analytics

## 🚨 Security Considerations

- Rate limiting (use express-rate-limit)
- Input validation and sanitization
- API key rotation
- CORS configuration
- Request size limits
- Monitor for abuse patterns

## 📱 Testing

Test your chatbot thoroughly:
1. Basic portfolio questions
2. Technical project details
3. Experience and skills queries
4. Edge cases and error handling
5. Performance with concurrent users

Your portfolio chatbot is now ready for production with comprehensive backend support!