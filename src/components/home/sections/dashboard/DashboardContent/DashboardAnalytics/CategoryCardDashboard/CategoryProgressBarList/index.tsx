import { CategoryData } from "../CategoryDonutChart";

interface CategoryProgressBarListProps {
  categories: CategoryData[];
}

export function CategoryProgressBarList({ categories }: CategoryProgressBarListProps) {
  return (
    <div className="space-y-2.5">
      {categories.map((item) => (
        <div key={item.id} className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2 font-dm">
              <span className="text-slate-400 text-[10px]">{item.percentage}%</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800/60 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
