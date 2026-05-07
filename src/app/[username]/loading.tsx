export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="max-w-2xl mx-auto px-2 relative -mt-16">
        <div className="flex items-end gap-3">
          <div className="size-36 rounded-xl bg-gray-300 border-2 border-white" />
          <div className="flex-1 space-y-2 pb-2">
            <div className="h-8 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm h-80" />
          <div className="bg-white rounded-xl p-4 shadow-sm h-80" />
        </div>
      </div>
    </div>
  );
}
