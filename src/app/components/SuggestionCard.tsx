interface SuggestionCardProps {
  text: string;
  onClick: (text: string) => void;
}

export function SuggestionCard({ text, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={() => onClick(text)}
      className="px-4 py-2.5 bg-white border border-[#e5e5e5] rounded-xl hover:bg-[#f5f3ef] hover:border-[#7a8b6a] transition-all text-sm text-[#5a6b4a] shadow-sm"
    >
      {text}
    </button>
  );
}
