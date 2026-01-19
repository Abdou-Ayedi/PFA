import { Send } from 'lucide-react';
import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#e5e5e5] bg-white px-6 py-4">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1 resize-none rounded-xl bg-[#f5f3ef] border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7a8b6a] focus:border-transparent placeholder:text-[#9a9a9a] min-h-[52px] max-h-[120px]"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-[#7a8b6a] hover:bg-[#6a7b5a] disabled:bg-[#c4c4c4] disabled:cursor-not-allowed text-white rounded-xl p-3.5 transition-colors shadow-sm"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
