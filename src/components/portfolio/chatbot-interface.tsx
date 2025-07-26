/**
 * Interactive Chatbot Interface Component
 * 
 * Advanced conversational AI interface for portfolio interactions.
 * Features modern design with floating bubble, smooth animations,
 * and comprehensive chat functionality.
 * 
 * Key Features:
 * - Floating chat bubble with notification badge
 * - Expandable chat window with smooth transitions
 * - Typing indicators and message animations
 * - File upload support for resumes/documents
 * - Voice message capabilities (future enhancement)
 * - Mobile-responsive design
 * - Keyboard shortcuts and accessibility
 * 
 * Backend Integration Instructions:
 * 1. Replace the mock API calls with your actual chatbot endpoint
 * 2. Implement proper authentication if required
 * 3. Add error handling and retry mechanisms
 * 4. Integrate with your fine-tuned model API
 */

import { useState, useRef, useEffect } from "react"
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Paperclip, 
  Mic,
  Bot,
  User,
  AlertCircle,
  RefreshCw,
  Volume2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

// Message interface for type safety
interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'file' | 'error'
  metadata?: {
    confidence?: number
    suggestions?: string[]
  }
}

// Chat status states
type ChatStatus = 'closed' | 'minimized' | 'open'
type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error'

export function ChatbotInterface() {
  // Chat state management
  const [chatStatus, setChatStatus] = useState<ChatStatus>('closed')
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  
  // Refs for DOM manipulation
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { toast } = useToast()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (chatStatus === 'open') {
      inputRef.current?.focus()
    }
  }, [chatStatus])

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(
        "👋 Hello! I'm your AI assistant, trained on the portfolio owner's projects and expertise. Feel free to ask me anything about their work, skills, or experience!"
      )
    }
  }, [])

  // Add message to chat history
  const addMessage = (content: string, sender: 'user' | 'bot', metadata?: ChatMessage['metadata']) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type: 'text',
      metadata
    }
    
    setMessages(prev => [...prev, newMessage])
    
    // Show notification if chat is closed/minimized
    if (sender === 'bot' && chatStatus !== 'open') {
      setHasNewMessage(true)
    }
  }

  const addBotMessage = (content: string, metadata?: ChatMessage['metadata']) => {
    addMessage(content, 'bot', metadata)
  }

  const addUserMessage = (content: string) => {
    addMessage(content, 'user')
  }

  // Simulate API call to chatbot backend
  const sendMessageToBot = async (message: string): Promise<string> => {
    // Replace this with your actual API endpoint
    // Example: const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message }) })
    
    setConnectionStatus('connecting')
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      setConnectionStatus('connected')
      
      // Mock responses - replace with actual API integration
      const mockResponses = [
        "That's a great question about the portfolio! Based on the projects showcased, there's a strong focus on machine learning and AI applications.",
        "I can see you're interested in the technical details. The portfolio demonstrates expertise in Python, TensorFlow, and various ML frameworks.",
        "The projects shown here range from computer vision to natural language processing, showing versatility in AI/ML domains.",
        "Would you like me to elaborate on any specific project or technology mentioned in the portfolio?",
        "I'm trained on detailed information about each project, including the methodologies, challenges, and outcomes. What would you like to know more about?"
      ]
      
      return mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
    } catch (error) {
      setConnectionStatus('error')
      throw new Error('Failed to connect to AI assistant')
    }
  }

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return
    
    const userMessage = inputValue.trim()
    setInputValue('')
    addUserMessage(userMessage)
    setIsTyping(true)
    
    try {
      const botResponse = await sendMessageToBot(userMessage)
      setTimeout(() => {
        setIsTyping(false)
        addBotMessage(botResponse, {
          confidence: 0.85 + Math.random() * 0.15,
          suggestions: [
            "Tell me about the technical stack",
            "What makes these projects unique?",
            "Can you explain the AI methodologies used?"
          ]
        })
      }, 500)
    } catch (error) {
      setIsTyping(false)
      addBotMessage(
        "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        { confidence: 0 }
      )
      toast({
        title: "Connection Error",
        description: "Failed to reach AI assistant. Please check your connection.",
        variant: "destructive"
      })
    }
  }

  // Handle keyboard shortcuts
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Toggle chat status
  const toggleChat = () => {
    if (chatStatus === 'closed') {
      setChatStatus('open')
      setHasNewMessage(false)
    } else if (chatStatus === 'open') {
      setChatStatus('minimized')
    } else {
      setChatStatus('open')
      setHasNewMessage(false)
    }
  }

  const closeChat = () => {
    setChatStatus('closed')
    setHasNewMessage(false)
  }

  // File upload handler (for future enhancement)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      toast({
        title: "File Upload",
        description: `File "${file.name}" uploaded successfully.`,
      })
      addUserMessage(`📎 Uploaded: ${file.name}`)
      // TODO: Implement actual file processing
    }
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Floating chat bubble */}
        {chatStatus === 'closed' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                onClick={toggleChat}
                className="relative h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary-hover glow-effect animate-pulse-glow"
              >
                <MessageCircle className="h-6 w-6" />
                {hasNewMessage && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-destructive">
                    1
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="mb-2">
              <p>Chat with AI Assistant</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Chat window */}
        {(chatStatus === 'open' || chatStatus === 'minimized') && (
          <div className={`bg-card border border-border rounded-lg shadow-2xl transition-all duration-300 ${
            chatStatus === 'open' 
              ? 'w-80 h-96' 
              : 'w-80 h-12'
          }`}>
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="h-5 w-5 text-primary" />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                    connectionStatus === 'connected' ? 'bg-green-500' :
                    connectionStatus === 'connecting' ? 'bg-yellow-500' :
                    connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    {connectionStatus === 'connected' ? 'Online' :
                     connectionStatus === 'connecting' ? 'Connecting...' :
                     connectionStatus === 'error' ? 'Connection Error' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleChat}
                  className="h-8 w-8 p-0"
                >
                  {chatStatus === 'open' ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={closeChat}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            {chatStatus === 'open' && (
              <>
                <ScrollArea className="h-64 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-2 max-w-[80%] ${
                          message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          {/* Avatar */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            message.sender === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                          
                          {/* Message bubble */}
                          <div className={`rounded-lg px-3 py-2 text-sm ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}>
                            {message.content}
                            
                            {/* Message metadata */}
                            {message.metadata?.confidence && (
                              <div className="text-xs opacity-70 mt-1">
                                Confidence: {(message.metadata.confidence * 100).toFixed(0)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-1">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about the portfolio..."
                        className="pr-20"
                        disabled={connectionStatus === 'error'}
                      />
                      
                      {/* File upload and voice input buttons */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt"
                        />
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-8 w-8 p-0"
                        >
                          <Paperclip className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          disabled // TODO: Implement voice input
                        >
                          <Mic className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || connectionStatus === 'error'}
                      className="h-10 w-10 p-0"
                    >
                      {connectionStatus === 'connecting' ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Quick suggestions */}
                  {messages.length <= 1 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {[
                        "What projects are featured?",
                        "Tell me about the AI work",
                        "What technologies are used?"
                      ].map((suggestion) => (
                        <Button
                          key={suggestion}
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setInputValue(suggestion)
                            handleSendMessage()
                          }}
                          className="text-xs h-6 px-2"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

/**
 * Backend Integration Instructions:
 * 
 * 1. API Endpoint Setup:
 *    - Create POST /api/chat endpoint
 *    - Accept { message: string, sessionId?: string }
 *    - Return { response: string, confidence?: number, suggestions?: string[] }
 * 
 * 2. Authentication (if required):
 *    - Add API key or session token
 *    - Implement rate limiting
 *    - Add CORS headers for frontend domain
 * 
 * 3. Fine-tuned Model Integration:
 *    - Connect to your trained model endpoint
 *    - Include portfolio context in prompts
 *    - Handle model-specific response formats
 * 
 * 4. Error Handling:
 *    - Implement retry mechanisms
 *    - Add timeout handling
 *    - Provide fallback responses
 * 
 * 5. Enhanced Features:
 *    - Session persistence
 *    - Message history storage
 *    - File upload processing
 *    - Voice message transcription
 *    - Multi-language support
 * 
 * 6. Analytics:
 *    - Track conversation metrics
 *    - Monitor popular questions
 *    - Measure user engagement
 *    - A/B test different responses
 */