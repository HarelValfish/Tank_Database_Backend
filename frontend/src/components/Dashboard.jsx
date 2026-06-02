import { motion } from "framer-motion";
import { SearchX, ServerCrash, RotateCw } from "lucide-react";
import TankCard from "./TankCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

// Parent variants drive the staggered entrance of the grid.
const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export default function Dashboard({ tanks, loading, error, onSelect, onRetry }) {
  // 1) Loading → skeletons
  if (loading) {
    return (
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // 2) Error
  if (error) {
    return (
      <Centered>
        <ServerCrash size={40} className="text-alert" />
        <h3 className="font-display text-xl font-600 text-ink-100">Connection Lost</h3>
        <p className="max-w-sm font-mono text-sm text-ink-400">{error}</p>
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-2 rounded-md border border-amber/50 bg-amber/10 px-4 py-2.5 font-display text-sm font-600 tracking-wide text-amber-glow transition hover:bg-amber/20"
        >
          <RotateCw size={15} /> RECONNECT
        </button>
      </Centered>
    );
  }

  // 3) Empty
  if (tanks.length === 0) {
    return (
      <Centered>
        <SearchX size={40} className="text-ink-500" />
        <h3 className="font-display text-xl font-600 text-ink-100">No Units Found</h3>
        <p className="max-w-sm font-mono text-sm text-ink-400">
          No records match the current parameters. Adjust your filters or commission a new unit.
        </p>
      </Centered>
    );
  }

  // 4) Grid
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3"
    >
      {tanks.map((tank, i) => (
        <TankCard key={tank.id} tank={tank} index={i} onSelect={onSelect} />
      ))}
    </motion.div>
  );
}

function Centered({ children }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-5 py-24 text-center sm:px-8">
      {children}
    </div>
  );
}
