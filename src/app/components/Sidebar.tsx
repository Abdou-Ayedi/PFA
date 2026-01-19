import { Plus } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-[#E8E4DB] border-r border-[#d4cfc4] flex flex-col">
      {/* App Name */}
      <div className="p-6 border-b border-[#d4cfc4]">
        <h1 className="text-[#5a6b4a] tracking-wide">PFA CHATBOT</h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button className="w-full bg-[#7a8b6a] hover:bg-[#6a7b5a] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History - Future Implementation */}
      <div className="flex-1 px-4">
        <div className="text-[#8a9b7a] text-sm opacity-60 mt-4">
          {/* Chat history will appear here */}
        </div>
      </div>
    </div>
  );
}
