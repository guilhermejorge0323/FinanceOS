'use client';

import { useState } from 'react';
import { HomeCard } from '../../sections/dashboard/DashboardContent/ui/DashboardCard';

type Category = { id: string; name: String };

type TransactionFormProps = {
  initialType?: 'INCOME' | 'OUTCOME';
  fixedType?: boolean;
  categories: Category[];
  onSuccess?: () => void;
};

export function TransactionForm({
  initialType = 'OUTCOME',
  fixedType = false,
  categories = [],
  onSuccess,
}: TransactionFormProps) {
  const [type, setType] = useState<'INCOME' | 'OUTCOME'>(initialType);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmout] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const isIncome = type === 'INCOME';

  const visibleCategories = categories.slice(0, 5);
  const showAddBtn = categories.length < 5;

  return <HomeCard>a</HomeCard>;
}
