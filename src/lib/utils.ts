import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getSeatsStatus(seatsLeft: number): {
  label: string;
  variant: 'urgent' | 'warning' | 'normal';
} {
  if (seatsLeft <= 3) {
    return { label: `${seatsLeft} Seats Left`, variant: 'urgent' };
  }
  if (seatsLeft <= 10) {
    return { label: `${seatsLeft} Seats Left`, variant: 'warning' };
  }
  return { label: `${seatsLeft} Seats Available`, variant: 'normal' };
}
