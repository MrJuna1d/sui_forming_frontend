"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpDown,
  Calendar,
  Edit,
  Eye,
  FilePlus,
  Search,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function SurveyDashboard() {
  const [page, setPage] = useState(1);

  // Sample data for charts
  const surveyResponseData = [
    { name: "Customer Satisfaction", responses: 120 },
    { name: "Product Feedback", responses: 98 },
    { name: "Website Usability", responses: 86 },
    { name: "Employee Engagement", responses: 65 },
    { name: "Market Research", responses: 43 },
  ];

  const timeSeriesData = [
    { date: "Jan", responses: 30 },
    { date: "Feb", responses: 45 },
    { date: "Mar", responses: 60 },
    { date: "Apr", responses: 52 },
    { date: "May", responses: 75 },
    { date: "Jun", responses: 68 },
  ];

  // Sample data for the table
  const respondents = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      survey: "Customer Satisfaction",
      date: "2023-06-15",
      status: "Completed",
    },
    {
      id: 2,
      name: "Sam Wilson",
      email: "sam@example.com",
      survey: "Product Feedback",
      date: "2023-06-14",
      status: "Completed",
    },
    {
      id: 3,
      name: "Taylor Smith",
      email: "taylor@example.com",
      survey: "Website Usability",
      date: "2023-06-14",
      status: "Partial",
    },
    {
      id: 4,
      name: "Jordan Lee",
      email: "jordan@example.com",
      survey: "Employee Engagement",
      date: "2023-06-13",
      status: "Completed",
    },
    {
      id: 5,
      name: "Casey Brown",
      email: "casey@example.com",
      survey: "Market Research",
      date: "2023-06-12",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          Creator Survey Dashboard
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <form className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search surveys..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </form>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Survey Responses by Type</CardTitle>
              <CardDescription>Total responses per survey type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={surveyResponseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="responses" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Response Trends</CardTitle>
              <CardDescription>Monthly response volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="responses"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Survey Respondents</CardTitle>
                <CardDescription>
                  Overview of all survey submissions
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem checked>
                      Completed
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Partial
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">#</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Name</span>
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <span>Survey</span>
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Date</span>
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {respondents.map((respondent) => (
                    <TableRow key={respondent.id}>
                      <TableCell className="font-medium">
                        {respondent.id}
                      </TableCell>
                      <TableCell>{respondent.name}</TableCell>
                      <TableCell>{respondent.email}</TableCell>
                      <TableCell>{respondent.survey}</TableCell>
                      <TableCell>{respondent.date}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            respondent.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {respondent.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            Create New Survey
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Existing Survey
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Detailed Results
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Example survey card */}
          {[
            "Customer Satisfaction",
            "Product Feedback",
            "Website Usability",
            "Employee Engagement",
          ].map((title, idx) => (
            <Card
              key={idx}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="flex flex-col items-center justify-center h-36 text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <FilePlus className="h-6 w-6" />
                </div>
                <p className="font-medium">{title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
