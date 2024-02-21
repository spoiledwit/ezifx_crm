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

const copyTrades: any[] = [];

const CopyTrade = () => {
  return (
    <div className="px-8 pb-10">
      <h1 className="flex justify-between items-center my-10 font-semibold text-2xl text-neutral-600">
        <span> Copy Trade</span>
        <Button className="">+ Add New</Button>
      </h1>
      <Table className="text-[15px]">
        <TableCaption className="border-y py-2">
          No Master Accounts Yet
        </TableCaption>
        <TableHeader>
          <TableRow className="dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white">
            <TableHead className="text-center text-white">SI</TableHead>
            <TableHead className="text-center text-white">Login</TableHead>
            <TableHead className="text-center text-white">Commision</TableHead>
            <TableHead className="text-center text-white">
              Minimum Investment
            </TableHead>
            <TableHead className="text-center text-white">Gain</TableHead>
            <TableHead className="text-center text-white">Delete</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {copyTrades.map((trade, index) => (
            <TableRow key={index} className="text-center dark:hover:bg-dark/10">
              <TableCell>{trade.si}</TableCell>
              <TableCell className="font-medium">{trade.login}</TableCell>
              <TableCell className="font-medium">{trade.commision}</TableCell>
              <TableCell className="font-medium">
                {trade.minInvestment}
              </TableCell>
              <TableCell className="font-medium">{trade.gain}</TableCell>
              <TableCell className="flex justify-center items-center">
                <Button className="text-red-500 border-red-500">Delete</Button>
              </TableCell>
              <TableCell>
                <Button className="text-primary border-primary">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CopyTrade;
