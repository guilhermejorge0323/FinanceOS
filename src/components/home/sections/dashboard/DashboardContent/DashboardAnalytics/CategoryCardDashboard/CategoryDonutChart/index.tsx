'use client';

import { PieChart, Pie, ResponsiveContainer } from 'recharts';

export interface CategoryData {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface CategoryDonutChartProps {
  data: CategoryData[];
}

export function CategoryDonutChart({ data }: CategoryDonutChartProps) {
    const chartData = data.map((item) => ({
    ...item,
    fill: item.color,
  }));
  return (
    <div className='h-44 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={chartData}
            dataKey='amount'
            nameKey='name'
            cx='50%'
            cy='50%'
            innerRadius={45}
            outerRadius={65}
            paddingAngle={3}
            stroke='none'
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
