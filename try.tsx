import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { SuggestionCard } from './components/SuggestionCard';
import { RightPanel } from './components/RightPanel';
import { EmptyState } from './components/EmptyState';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'assistant';
}

export default function App() {
  const [selectedModel, setSelectedModel] = useState('Model 2');
  const [messages, setMessages] = useState<Message[]>([]);

  const suggestions = [
    'How can I improve my productivity?',
    'Explain quantum computing',
    'Write a creative story',
    'Help me plan a trip',
  ];

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm PFA Chatbot, your AI assistant. This is a UI mockup, so I can't process requests yet. Once connected to a backend, I'll be able to help you with various tasks!",
        role: 'assistant',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="h-screen flex bg-[#fefefe] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header selectedModel={selectedModel} onModelChange={setSelectedModel} />

        {/* Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Center Chat Section */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.text}
                      role={message.role}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 0 && (
              <div className="px-6 pb-4">
                <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionCard
                      key={index}
                      text={suggestion}
                      onClick={handleSuggestionClick}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <ChatInput onSend={handleSendMessage} />
          </div>

          {/* Right Panel */}
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

/* Modification de Abdou  */
async function callChatAPI(
  message: string,
  history: { role: string; content: string }[]
) {
  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur backend");
  }

  return response.json();
}

