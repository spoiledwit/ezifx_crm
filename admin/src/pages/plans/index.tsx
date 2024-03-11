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

const plans: any[] = [];

const Plans = () => {
  return (
    <div className="px-8 pb-10">
      <h1 className="my-10 font-semibold text-2xl text-neutral-600">Plans</h1>
      <Table className="text-[15px]">
        <TableCaption className="border-y py-2">Data Not Found</TableCaption>
        <TableHeader>
          <TableRow className="dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white">
            <TableHead className="text-center text-white">Name</TableHead>
            <TableHead className="text-center text-white">Price</TableHead>
            <TableHead className="text-center text-white">
              Business Volume (BV)
            </TableHead>
            <TableHead className="text-center text-white">
              Referal Commission
            </TableHead>
            <TableHead className="text-center text-white">
              Tree Commision
            </TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {plans.map((plan, index) => (
            <TableRow>
              <TableCell className="font-medium">{plan.name}</TableCell>
              <TableCell className="font-medium">{plan.price}</TableCell>
              <TableCell className="font-medium">
                {plan.businessVolume}
              </TableCell>
              <TableCell className="font-medium">
                {plan.referalCommission}
              </TableCell>
              <TableCell className="font-medium">
                {plan.treeCommision}
              </TableCell>
              <TableCell className="font-medium">{plan.status}</TableCell>
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

export default Plans;
