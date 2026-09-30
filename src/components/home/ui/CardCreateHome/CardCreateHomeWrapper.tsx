import { getCategoriesUser } from "@/lib/categories/queries";
import { CardCreateHome } from ".";


type Props = {
  userId: string;
  isOpen: boolean;
  type: 'INCOME' | 'OUTCOME';
  onClose: () => void;
};

export async function CardCreateHomeModal({ userId, isOpen, type, onClose }: Props) {

  const categories = await getCategoriesUser(userId);

  return (
    <CardCreateHome
      isOpen={isOpen}
      type={type}
      onClose={onClose}
      categories={categories}
    />
  );
}
