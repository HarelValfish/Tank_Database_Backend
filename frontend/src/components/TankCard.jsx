import { motion } from "framer-motion";
import { Crosshair, Calendar, ArrowUpRight } from "lucide-react";

// Fallback image when a tank has no imageUrl, or the URL fails to load.
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='480'><rect width='100%' height='100%' fill='%2315191c'/><text x='50%' y='50%' fill='%233a4248' font-family='monospace' font-size='22' text-anchor='middle' dominant-baseline='middle'>NO IMAGE FEED</text></svg>`
  );

// Each card is the source of the shared layout animation into the detail view.
// `layoutId` values are keyed by the tank id so Framer Motion can morph the
// card image/title smoothly into the modal.
export default function TankCard({ tank, index, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(tank)}
      layoutId={`card-${tank.id}`}
      // Staggered entrance handled by the parent's variants
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="corner-brackets group relative w-full overflow-hidden rounded-lg border border-ink-700 bg-ink-850 text-left outline-none transition-colors duration-300 hover:border-amber/50 focus-visible:ring-2 focus-visible:ring-amber/60"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.img
          layoutId={`img-${tank.id}`}
          src={tank.imageUrl || FALLBACK}
          onError={(e) => (e.currentTarget.src = FALLBACK)}
          alt={`${tank.tankName} ${tank.variant}`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {/* Tactical overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 tactical-grid opacity-40" />

        {/* Scanline sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute left-0 top-0 h-1/3 w-full animate-scan bg-gradient-to-b from-amber/20 to-transparent" />
        </div>

        {/* Service-time chip */}
        {tank.serviceTime && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded border border-ink-600/80 bg-ink-950/70 px-2 py-1 backdrop-blur">
            <Calendar size={11} className="text-olive" />
            <span className="font-mono text-[10px] tracking-wide text-ink-200">{tank.serviceTime}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="relative space-y-2 p-5">
        <div className="flex items-center justify-between">
          <span className="label-mono text-amber/80">
            {tank.variant ? `VAR · ${tank.variant}` : "UNCLASSIFIED"}
          </span>
          <ArrowUpRight
            size={16}
            className="text-ink-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
          />
        </div>

        <motion.h3
          layoutId={`title-${tank.id}`}
          className="font-display text-xl font-600 tracking-wide text-ink-50"
        >
          {tank.tankName}
        </motion.h3>

        {tank.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-300">{tank.description}</p>
        )}

        {tank.armament && (
          <div className="flex items-center gap-2 pt-2">
            <Crosshair size={13} className="shrink-0 text-amber" />
            <span className="truncate font-mono text-xs text-ink-300">{tank.armament}</span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
