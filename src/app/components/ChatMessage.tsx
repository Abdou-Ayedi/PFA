import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  role: 'user' | 'assistant';
}

export function ChatMessage({ message, role }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#7a8b6a] flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-[#7a8b6a] text-white rounded-br-sm'
            : 'bg-[#f5f3ef] text-[#2d2d2d] rounded-bl-sm'
        }`}
      >
        <p className="whitespace-pre-wrap">{message}</p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#5a6b4a] flex items-center justify-center flex-shrink-0 mt-1">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
