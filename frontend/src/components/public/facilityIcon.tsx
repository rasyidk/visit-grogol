import {
  Wifi,
  Waves,
  Snowflake,
  UtensilsCrossed,
  Mountain,
  Coffee,
  ParkingCircle,
  Flower2,
  Leaf,
  HeartPulse,
  ShieldCheck,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  wifi: Wifi,
  pool: Waves,
  ac: Snowflake,
  breakfast: UtensilsCrossed,
  view: Mountain,
  coffee: Coffee,
  parking: ParkingCircle,
  spa: Flower2,
  eco: Leaf,
  yoga: HeartPulse,
  security: ShieldCheck,
};

export function FacilityIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name.toLowerCase()] ?? MapPin;
  return <Icon className={className} />;
}

export function facilityLabel(name: string) {
  return name.toUpperCase();
}
