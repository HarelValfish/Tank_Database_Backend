// Loading placeholder that mirrors the TankCard layout so the grid doesn't
// jump when real data arrives. The shimmer is a moving gradient sweep.
export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-ink-700 bg-ink-850">
      <div className="relative h-48 w-full overflow-hidden bg-ink-800">
        <Shimmer />
      </div>
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 rounded bg-ink-700" />
        <div className="h-5 w-3/4 rounded bg-ink-700" />
        <div className="h-3 w-full rounded bg-ink-800" />
        <div className="h-3 w-5/6 rounded bg-ink-800" />
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-16 rounded bg-ink-800" />
          <div className="h-6 w-20 rounded bg-ink-800" />
        </div>
      </div>
    </div>
  );
}

function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent">
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}
