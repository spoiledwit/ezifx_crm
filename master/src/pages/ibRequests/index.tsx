import SolidCard from "@/components/Cards/SolidCard";
import { FaEye } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
const requests = [
  {
    date: "2024-02-19 7:08 PM",
    name: "Deandre Golburn",
    sponser: "sponser",
    status: "approved",
    action: "view",
  },
  {
    date: "2024-02-19 7:08 PM",
    name: "Deandre Golburn",
    sponser: "sponser",
    status: "approved",
    action: "view",
  },
  {
    date: "2024-02-19 7:08 PM",
    name: "Deandre Golburn",
    sponser: "sponser",
    status: "approved",
    action: "view",
  },
  {
    date: "2024-02-19 7:08 PM",
    name: "Deandre Golburn",
    sponser: "sponser",
    status: "approved",
    action: "view",
  },
  {
    date: "2024-02-19 7:08 PM",
    name: "Deandre Golburn",
    sponser: "sponser",
    status: "approved",
    action: "view",
  },
];

const IbRequests = () => {
  return (
    <div className="px-8 pb-10">
      <h1 className="my-10 font-semibold text-2xl text-neutral-600">
        Ib Requests
      </h1>
      <div className="grid grid-cols-3 gap-5">
        <SolidCard
          title="Pending"
          data={0}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Approved"
          data={40}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Rejected"
          data={0}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
      </div>
      <Table className="mt-7 text-[15px]">
        <TableCaption className="border-y py-2">
          A list of IB Requests
        </TableCaption>
        <TableHeader>
          <TableRow className="dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white">
            <TableHead className="text-center text-white">Date</TableHead>
            <TableHead className="text-center text-white">Name</TableHead>
            <TableHead className="text-center text-white">Sponser</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {requests.map((request, index) => (
            <TableRow key={index} className="text-center dark:hover:bg-dark/10">
              <TableCell>{request.date}</TableCell>
              <TableCell className="font-medium">{request.name}</TableCell>
              <TableCell className="font-medium">{request.sponser}</TableCell>
              <TableCell className="">
                {request.status == "approved" ? (
                  <div className="border border-green-500 text-green-500 bg-green-100 rounded-md py-1 ">
                    Approved
                  </div>
                ) : (
                  <div className="border border-red-500 text-red-500 bg-red-100 rounded-md py-1 ">
                    Rejected
                  </div>
                )}
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <Link to="/" className="text-center p-3 bg-[#FAD79B] rounded">
                  <FaEye />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IbRequests;
