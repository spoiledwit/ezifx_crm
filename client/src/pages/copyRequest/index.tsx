import { Button } from "@/components/ui/button";
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

const copyRequests: any[] = [];

const CopyRequest = () => {
  return (
    <div className="px-8 pb-10">
      <h1 className="my-10 font-semibold text-2xl text-neutral-600">
        Copy Requests
      </h1>
      <Table className="text-[15px]">
        <TableCaption className="border-y py-2">No Accounts Yet</TableCaption>
        <TableHeader>
          <TableRow className="dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white">
            <TableHead className="text-center text-white">
              Requested At
            </TableHead>
            <TableHead className="text-center text-white">
              Copier Account
            </TableHead>
            <TableHead className="text-center text-white">
              Initial Account
            </TableHead>
            <TableHead className="text-center text-white">
              Approved At
            </TableHead>
            <TableHead className="text-center text-white">
              Closing Amount
            </TableHead>
            <TableHead className="text-center text-white">Cloesd At</TableHead>
            <TableHead className="text-center text-white">
              Master Account
            </TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {copyRequests.map((request, index) => (
            <TableRow>
              <TableCell>{request.requestedAt}</TableCell>
              <TableCell className="font-medium">
                {request.copierAccount}
              </TableCell>
              <TableCell className="font-medium">
                {request.initialAccount}
              </TableCell>
              <TableCell className="font-medium">
                {request.approvedAt}
              </TableCell>
              <TableCell className="font-medium">
                {request.closingAmount}
              </TableCell>
              <TableCell className="font-medium">{request.cloesdAt}</TableCell>
              <TableCell className="font-medium">
                {request.masterAccount}
              </TableCell>
              <TableCell className="font-medium">{request.status}</TableCell>
              <TableCell className="flex justify-center items-center">
                <Button className="text-primary border-primary">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CopyRequest;
