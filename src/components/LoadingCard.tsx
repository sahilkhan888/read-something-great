export default function LoadingCard() {
  return (
    <div className="brutal-card p-0 overflow-hidden">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-24 bg-gray-200 animate-pulse" />
        <div className="h-6 w-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse" />
        <div className="flex justify-between pt-2">
          <div className="h-8 w-24 bg-gray-200 animate-pulse" />
          <div className="h-8 w-20 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
