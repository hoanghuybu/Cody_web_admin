import moment from "moment";
import { useState } from "react";
import Checkbox from "../../form/input/Checkbox";
import Badge from "../../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Pagination from "../../ui/table/Pagination";

interface CustomTableProps {
  onSelectChange?: (selectedIds: number[]) => void;
}

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  productName: string;
  status: string;
  budget: string;
  date: string;
}
const generateData = (count: number): Order[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: `User ${i + 1}`,
      role: i % 2 === 0 ? "Developer" : "Designer",
    },
    productName: `Project ${i + 1}`,
    date: moment().subtract(i, "days").format("YYYY-MM-DD"),
    budget: `${(Math.random() * 10 + 1).toFixed(1)}K`,
    status: i % 3 === 0 ? "Pending" : i % 2 === 0 ? "Active" : "Active",
  }));
};

const tableData = generateData(25);

export default function TableCustom(props: CustomTableProps) {
  const { onSelectChange } = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = tableData.slice(startIndex, startIndex + pageSize);

  // Checkbox Logic
  const isAllSelected = selectedRows.length === tableData.length;

  const handleSelectAll = (checked: boolean) => {
    const newSelected = checked ? tableData.map((o) => o.id) : [];
    setSelectedRows(newSelected);
    onSelectChange?.(newSelected);
  };

  const handleRowSelect = (id: number, checked: boolean) => {
    const newSelected = checked
      ? [...selectedRows, id]
      : selectedRows.filter((item) => item !== id);
    setSelectedRows(newSelected);
    onSelectChange?.(newSelected);
  };

  // Order By Column Logic

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-4 py-3">
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Customer
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price Range
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {currentData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-3">
                  <Checkbox
                    checked={selectedRows.includes(order.id)}
                    onChange={(checked) => handleRowSelect(order.id, checked)}
                  />
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.productName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  06-08-2025
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {order.team.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.budget}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={tableData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
