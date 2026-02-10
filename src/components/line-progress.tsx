import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

const LineProgress = ({
  value,
  targetValue,
  title,
  unit,
  isCircle
}: {
  value: number;
  targetValue: number;
  title: string;
  unit?: string;
  isCircle: boolean;
}) => {
  const progressPercentage = Math.min((value / targetValue) * 100, 100);

  const getStyles = (pct: number) => {
    if (pct <= 30) return { 
      indicator: "bg-amber-500", 
      text: "text-amber-600", 
      bg: "bg-amber-100" 
    };
    if (pct <= 70) return { 
      indicator: "bg-sky-600", 
      text: "text-sky-700", 
      bg: "bg-sky-100" 
    };
    return { 
      indicator: "bg-green-500", 
      text: "text-green-600", 
      bg: "bg-green-100" 
    };
  };

  const styles = getStyles(progressPercentage);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full flex justify-between text-xs items-center">
        <div className="flex items-center gap-2">
          <div className={cn(
            "font-medium  px-2 py-0.5 rounded-full text-[10px] text-xs",
            isCircle ? `${styles.text} ${styles.bg}` : "text-slate-500"
          )}>
            {title}
          </div>
        </div>
        <p className={cn(
          "font-semibold",
          isCircle ? `${styles.text}` : "text-slate-800"
        )}>
          {unit} {value.toLocaleString()}
        </p>
      </div>

      <Progress 
        value={progressPercentage} 
        indicatorClassName={styles.indicator} 
      />
    </div>
  );
};

export default LineProgress;