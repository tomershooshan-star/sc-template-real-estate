import * as React from "react"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  handleShuffle: () => void
  testimonial: string
  position: string
  id: number
  author: string
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0)
  const isFront = position === "front"

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0",
        borderColor: "#c9a96e",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: MouseEvent | TouchEvent | PointerEvent) => {
        if (e instanceof MouseEvent) dragRef.current = e.clientX
      }}
      onDragEnd={(e: MouseEvent | TouchEvent | PointerEvent) => {
        if (e instanceof MouseEvent && dragRef.current - e.clientX > 150) handleShuffle()
        dragRef.current = 0
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 p-6 shadow-xl ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={`https://i.pravatar.cc/128?img=${id}`}
        alt={`Avatar of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full object-cover"
        style={{ border: "2px solid #c9a96e" }}
      />
      <span
        className="text-center text-lg italic"
        style={{
          color: "#2a2a2a",
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        &ldquo;{testimonial}&rdquo;
      </span>
      <span
        className="text-center text-sm font-semibold"
        style={{ color: "#c9a96e" }}
      >
        {author}
      </span>
    </motion.div>
  )
}
