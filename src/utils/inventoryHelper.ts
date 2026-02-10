import { InventoryData } from "@/types/overviewType";
import { CircleCheck, Clock, TriangleAlert } from "lucide-react";

 export const getInventoryDisplay = (inv: InventoryData | undefined | null) => {
  const safeInv = inv ?? { OK: 0, LOW: 0, OUT: 0 };

  let value = safeInv.OK;
  let label = "In Stock";
  let color = "bg-green-50 text-green-500";
  let statusType = "GOOD";

  if (safeInv.OUT > 0) {
    value = safeInv.OUT;
    label = "Out of Stock";
    color = "bg-red-50 text-red-500";
    statusType = "CRITICAL";
  } else if (safeInv.LOW > 0) {
    value = safeInv.LOW;
    label = "Low Stock";
    color = "bg-amber-50 text-amber-500";
    statusType = "WARNING";
  }

  return { value, label, color, statusType };
};

export const getActivityStyle = (action: string) => {
  switch (action) {
    case 'INVENTORY_LOW':
    case 'INVENTORY_OUT':
      return {
        icon: TriangleAlert,
        bg: 'bg-amber-100',
        text: 'text-amber-500',
      };
    case 'USER_SIGNUP':
      return {
        icon: Clock,
        bg: 'bg-sky-100',
        text: 'text-sky-500',
      };
    case 'ORDER_CREATED':
    case 'ORDER_PLACED':
    case 'ORDER_COMPLETED':
      return {
        icon: CircleCheck,
        bg: 'bg-green-100',
        text: 'text-green-500',
      };
    default:
      return {
        icon: CircleCheck,
        bg: 'bg-slate-100',
        text: 'text-slate-500',
      };
  }
};