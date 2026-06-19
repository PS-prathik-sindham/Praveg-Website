"use client";

import { Agentation } from "agentation";

export default function AgentationToolbar() {
  // Only render the visual-feedback toolbar during development.
  if (process.env.NODE_ENV === "production") return null;
  return <Agentation />;
}
