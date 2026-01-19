import { FileText, ExternalLink } from 'lucide-react';

export function RightPanel() {
  return (
    <div className="w-80 bg-[#faf9f7] border-l border-[#e5e5e5] flex flex-col">
      <div className="p-6 border-b border-[#e5e5e5]">
        <h3 className="text-[#5a6b4a]">Generated Links</h3>
      </div>
      
      <div className="flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
          <div className="w-12 h-12 rounded-full bg-[#e8e4db] flex items-center justify-center mb-3">
            <FileText className="w-6 h-6 text-[#7a8b6a]" />
          </div>
          <p className="text-sm text-[#8a9b7a]">
            Documents and website links will appear here
          </p>
        </div>

        {/* Example of how links would appear - commented out for empty state */}
        {/* <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg border border-[#e5e5e5] hover:border-[#7a8b6a] transition-colors cursor-pointer">
            <div className="flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-[#7a8b6a] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#2d2d2d]">Document Title</p>
                <p className="text-xs text-[#8a9b7a] mt-1">example.com</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
