import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardContent } from "@mui/material";
import Select from "react-select";
import { useTable } from "react-table";
import "chart.js/auto"; // Required to enable Chart.js in modern frameworks

export const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth]);
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/transaction?month=${selectedMonth}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTransactions(data.transactions);
      setTotalRevenue(data.totalRevenue);
    } catch (error) {
      console.error("Error fetching transactions:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (option) => {
    setSelectedMonth(option.value);
  };

  const months = [
    { value: "all", label: "كل الأشهر" },
    { value: "1", label: "يناير" },
    { value: "2", label: "فبراير" },
    { value: "3", label: "مارس" },
    { value: "4", label: "أبريل" },
    { value: "5", label: "مايو" },
    { value: "6", label: "يونيو" },
    { value: "7", label: "يوليو" },
    { value: "8", label: "أغسطس" },
    { value: "9", label: "سبتمبر" },
    { value: "10", label: "أكتوبر" },
    { value: "11", label: "نوفمبر" },
    { value: "12", label: "ديسمبر" },
  ];

  const chartData = {
    labels: transactions.map((t) =>
      new Date(t.createdAt).toLocaleDateString("ar-EG")
    ),
    datasets: [
      {
        label: "Amount",
        data: transactions.map((t) => t.amount),
        fill: false,
        borderColor: "#8884d8",
      },
    ],
  };

  // Table columns for react-table
  const columns = React.useMemo(
    () => [
      { Header: "رقم الفاتورة", accessor: "transactionId" },
      { Header: "اسم المشتري", accessor: "user.name" },
      { Header: "المبلغ", accessor: "amount" },
      {
        Header: "التاريخ",
        accessor: (row) => new Date(row.createdAt).toLocaleDateString("ar-EG"),
      },
      { Header: "الحالة", accessor: "status" },
    ],
    []
  );

  // UseTable for table rendering
  const data = React.useMemo(() => transactions, [transactions]);
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">لوحة التحكم</h1>

      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Card className="mb-4">
        <CardHeader>إجمالي الأرباح</CardHeader>
        <CardContent>
          <div style={{ height: 300 }}>
            <Line data={chartData} />
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <Select
          options={months}
          onChange={handleMonthChange}
          defaultValue={months[0]}
          className="w-[180px]"
          placeholder="اختر الشهر"
        />
      </div>

      <Card>
        <CardHeader>قائمة الفواتير</CardHeader>
        <CardContent>
          <table {...getTableProps()} className="table-auto w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
