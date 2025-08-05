import Badge from "../components/ui/badge/Badge";

function OrdersManagement() {
  // Overview card data
  const overviewData = [
    {
      title: "Overdue",
      value: "$120.80",
    },
    {
      title: "Due within next 30 days",
      value: "0.00",
    },
    {
      title: "Average time to get paid",
      value: "24 days",
    },
    {
      title: "Upcoming Payout",
      value: "$3,450.50",
    },
  ];

  // Invoice data
  const invoices = [
    {
      id: "#323534",
      customer: "Lindsey Curtis",
      creationDate: "August 7, 2028",
      dueDate: "February 28, 2028",
      total: "$999",
      status: "Paid",
    },
    {
      id: "#323535",
      customer: "John Doe",
      creationDate: "July 1, 2028",
      dueDate: "January 1, 2029",
      total: "$1200",
      status: "Unpaid",
    },
    {
      id: "#323536",
      customer: "Jane Smith",
      creationDate: "June 15, 2028",
      dueDate: "December 15, 2028",
      total: "$850",
      status: "Draft",
    },
    {
      id: "#323537",
      customer: "Michael Brown",
      creationDate: "May 10, 2028",
      dueDate: "November 10, 2028",
      total: "$1500",
      status: "Paid",
    },
    {
      id: "#323538",
      customer: "Emily Davis",
      creationDate: "April 5, 2028",
      dueDate: "October 5, 2028",
      total: "$700",
      status: "Unpaid",
    },
    {
      id: "#323539",
      customer: "Chris Wilson",
      creationDate: "March 1, 2028",
      dueDate: "September 1, 2028",
      total: "$1100",
      status: "Paid",
    },
    {
      id: "#323540",
      customer: "Jessica Lee",
      creationDate: "February 20, 2028",
      dueDate: "August 20, 2028",
      total: "$950",
      status: "Draft",
    },
    {
      id: "#323541",
      customer: "David Kim",
      creationDate: "January 15, 2028",
      dueDate: "July 15, 2028",
      total: "$1300",
      status: "Paid",
    },
    {
      id: "#323542",
      customer: "Sarah Clark",
      creationDate: "December 10, 2027",
      dueDate: "June 10, 2028",
      total: "$800",
      status: "Unpaid",
    },
    {
      id: "#323543",
      customer: "Matthew Lewis",
      creationDate: "November 5, 2027",
      dueDate: "May 5, 2028",
      total: "$1400",
      status: "Paid",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge variant="light" color="success">
            {status}
          </Badge>
        );
      case "Unpaid":
        return (
          <Badge variant="light" color="warning">
            {status}
          </Badge>
        );
      case "Draft":
        return (
          <Badge variant="light" color="light">
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  return (
    <div className="flex flex-col w-full items-start gap-6 relative">
      <div className="flex flex-wrap items-center justify-between w-full">
        <div>
          <h1 className="font-semibold text-xl leading-7 text-[#1d2939] [font-family:'Outfit',Helvetica]">
            Invoices
          </h1>
        </div>

        {/* <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="font-normal text-[#667085] text-sm [font-family:'Outfit',Helvetica]"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <img
                className="w-[17px] h-4"
                alt="Breadcrumb separator"
                src="/svg-3.svg"
              />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="font-normal text-sm text-[#1d2939] [font-family:'Outfit',Helvetica]"
              >
                Invoices
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
      </div>

      {/* <div className="flex flex-col items-start gap-6 w-full">
        <Card className="w-full border-[#e4e7ec]">
          <CardHeader className="px-[25px] pb-0">
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-base font-semibold text-[#1d2939] [font-family:'Outfit',Helvetica]">
                Overview
              </CardTitle>
              <Button className="bg-[#465fff] text-white hover:bg-[#465fff]/90">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create an Invoice
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-[25px] pt-6">
            <div className="flex w-full border border-solid border-[#e4e7ec] rounded-xl">
              {overviewData.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-1.5 p-5 flex-1 ${
                    index < overviewData.length - 1
                      ? "border-r border-[#e4e7ec]"
                      : ""
                  }`}
                >
                  <div className="font-normal text-sm text-[#98a2b3] [font-family:'Outfit',Helvetica]">
                    {item.title}
                  </div>
                  <div className="font-normal text-3xl text-[#1d2939] [font-family:'Outfit',Helvetica]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full border-[#e4e7ec] overflow-hidden p-0">
          <CardHeader className="px-5 py-4 border-b border-[#e4e7ec] flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-[#1d2939] [font-family:'Outfit',Helvetica]">
                Invoices
              </CardTitle>
              <CardDescription className="text-sm font-normal text-[#667085] [font-family:'Outfit',Helvetica]">
                Your most recent invoices list
              </CardDescription>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="bg-[#f2f4f7] p-0.5 rounded-lg flex items-center">
                <ToggleGroup type="single" defaultValue="all">
                  <ToggleGroupItem
                    value="all"
                    className="bg-white text-[#101828] font-medium text-sm [font-family:'Outfit',Helvetica]"
                  >
                    All Invoices
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="unpaid"
                    className="text-[#667085] font-medium text-sm [font-family:'Outfit',Helvetica]"
                  >
                    Unpaid
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="draft"
                    className="text-[#667085] font-medium text-sm [font-family:'Outfit',Helvetica]"
                  >
                    Draft
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="relative">
                <div className="relative">
                  <Input
                    placeholder="SearchIcon..."
                    className="w-[300px] pl-[45px] h-11 text-sm font-normal text-[#98a2b3] [font-family:'Outfit',Helvetica] border-[#d0d5dd]"
                  />
                  <SearchIcon className="absolute w-5 h-5 top-3 left-4 text-[#98a2b3]" />
                </div>
              </div>

              <Button variant="outline" className="h-11 border-[#d0d5dd]">
                <FilterIcon className="w-5 h-5 mr-2" />
                <span className="font-medium text-[#344054] text-sm [font-family:'Outfit',Helvetica]">
                  FilterIcon
                </span>
              </Button>

              <Button variant="outline" className="h-11 border-[#d0d5dd]">
                <DownloadIcon className="w-5 h-5 mr-2" />
                <span className="font-medium text-[#344054] text-sm [font-family:'Outfit',Helvetica]">
                  Export
                </span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-white">
                  <TableRow className="border-b border-[#e4e7ec]">
                    <TableHead className="pl-4 w-[238.5px]">
                      <div className="flex items-center gap-3">
                        <Checkbox className="w-4 h-4 rounded border-[#d0d5dd]" />
                        <span className="font-medium text-[#344054] text-xs [font-family:'Outfit',Helvetica]">
                          Invoice Number
                        </span>
                      </div>
                    </TableHead>
                    <TableHead className="w-[202.45px]">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-[#344054] text-xs [font-family:'Outfit',Helvetica]">
                          Customer
                        </span>
                        <img alt="Sort icon" src="/container.svg" />
                      </div>
                    </TableHead>
                    <TableHead className="w-[255px]">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-[#344054] text-xs [font-family:'Outfit',Helvetica]">
                          Creation Date
                        </span>
                        <img alt="Sort icon" src="/container.svg" />
                      </div>
                    </TableHead>
                    <TableHead className="w-[256.23px]">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-[#344054] text-xs [font-family:'Outfit',Helvetica]">
                          Due Date
                        </span>
                        <img alt="Sort icon" src="/container.svg" />
                      </div>
                    </TableHead>
                    <TableHead className="w-[119.48px]">
                      <span className="font-medium text-[#344054] text-xs [font-family:'Outfit',Helvetica]">
                        Total
                      </span>
                    </TableHead>
                    <TableHead className="w-[131.28px]">
                      <span className="font-medium text-[#344054] text-xs [font-family:'Outfit',Helvetica]">
                        Status
                      </span>
                    </TableHead>
                    <TableHead className="w-[74.06px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow
                      key={invoice.id}
                      className="border-b border-[#e4e7ec]"
                    >
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <Checkbox className="w-4 h-4 rounded border-[#d0d5dd]" />
                          <span className="font-medium text-[#344054] text-xs [font-family:'Outfit',Helvetica]">
                            {invoice.id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-[#344054] text-sm [font-family:'Outfit',Helvetica]">
                          {invoice.customer}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-normal text-[#344054] text-sm [font-family:'Outfit',Helvetica]">
                          {invoice.creationDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-normal text-[#344054] text-sm [font-family:'Outfit',Helvetica]">
                          {invoice.dueDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-normal text-[#344054] text-sm [font-family:'Outfit',Helvetica]">
                          {invoice.total}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <img
                          className="w-[74.06px]"
                          alt="Actions"
                          src="/data.svg"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between px-5 py-4 border-t border-[#e4e7ec]">
            <div className="font-medium text-sm [font-family:'Outfit',Helvetica]">
              <span className="text-[#667085]">Showing </span>
              <span className="text-[#1d2939]">1</span>
              <span className="text-[#667085]"> to </span>
              <span className="text-[#1d2939]">10</span>
              <span className="text-[#667085]"> of </span>
              <span className="text-[#1d2939]">25</span>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="h-10 w-10 p-0 flex items-center justify-center"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </PaginationPrevious>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="h-10 w-10 p-0 flex items-center justify-center bg-[#465fff] text-white"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="h-10 w-10 p-0 flex items-center justify-center"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="h-10 w-10 p-0 flex items-center justify-center"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="h-10 w-10 p-0 flex items-center justify-center"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div> */}
    </div>
  );
}

export default OrdersManagement;
