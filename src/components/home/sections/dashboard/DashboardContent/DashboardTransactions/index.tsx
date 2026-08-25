import { DashboardCard } from "../ui/DashboardCard";
import { TransactionCard } from "./TransactionCard";

export function DashboardTransactions() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <TransactionCard />
        </div>
    )
}
