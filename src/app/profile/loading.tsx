export default function Loading() {
  return (
    <section className="max-w-2xl mx-auto px-4 mt-4 animate-pulse">
      <div className="bg-gray-200 h-48 rounded-lg mb-4" />
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
      <div className="h-24 bg-gray-200 rounded mb-4" />
      <div className="h-16 bg-gray-200 rounded" />
    </section>
  );
}
