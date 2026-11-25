export interface OrbitNodeCoords {
  x: number;
  y: number;
  angleDeg: number;
}

export function normalizeAngleDeg(angleDeg: number): number {
  const mod = angleDeg % 360;
  return mod < 0 ? mod + 360 : mod;
}

export function shortestAngleDeltaDeg(fromDeg: number, toDeg: number): number {
  let diff = toDeg - fromDeg;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return diff;
}

export function computePointerAngleDeg(
  centerX: number,
  centerY: number,
  clientX: number,
  clientY: number,
): number {
  return (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI;
}

/**
 * Computes orbital coordinates on a circle/ellipse.
 * Index 0 (UZ) starts top-left (-101.25 deg) and proceeds clockwise so
 * index 1 (EN) sits top-right (-78.75 deg), matching the 16-language ring.
 */
export function getOrbitNodePosition(
  index: number,
  total: number,
  rotationDeg: number,
  rx: number,
  ry: number,
): OrbitNodeCoords {
  const stepDeg = 360 / total;
  const baseDeg = -90 - stepDeg / 2 + index * stepDeg;
  const angleDeg = baseDeg + rotationDeg;
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * rx,
    y: Math.sin(rad) * ry,
    angleDeg,
  };
}
