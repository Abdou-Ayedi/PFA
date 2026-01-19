import { Settings, User } from 'lucide-react';

interface HeaderProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function Header({ selectedModel, onModelChange }: HeaderProps) {
  const models = ['Model 1', 'Model 2', 'Model 3'];

  return (
    <div className="h-16 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-6">
      {/* Model Selector Pills */}
      <div className="flex gap-2">
        {models.map((model) => (
          <button
            key={model}
            onClick={() => onModelChange(model)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedModel === model
                ? 'bg-[#7a8b6a] text-white'
                : 'bg-[#f5f3ef] text-[#5a6b4a] hover:bg-[#ebe9e3]'
            }`}
          >
            {model}
          </button>
        ))}
      </div>

      {/* Settings & Avatar */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#f5f3ef] rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-[#5a6b4a]" />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#7a8b6a] flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
