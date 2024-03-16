import SolidCard from "@/components/Cards/SolidCard";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: " A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: " B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: " C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: " D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: " E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: " F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#fff09e] dark:bg-white bg-opacity-30 border px-8 pb-10">
      <h1 className="my-10 font-semibold text-2xl text-neutral-600">
        Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-5">
        <SolidCard
          title="Total Users"
          data={90}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Active Users"
          data={79}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Email Unverified Users"
          data={8}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Mobile Unverifed Users"
          data={0}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Total Depositited"
          data={"$63,790.00"}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Pending Deposits"
          data={0}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Rejcted Deposits"
          data={7}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Desposited Charge"
          data={"$0.00"}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Total Withdrawals"
          data={"$2,190.00"}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Pending Withdrawals"
          data={0}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Rejcted Withdrawals"
          data={4}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Withdrawal Charge"
          data={"$0.00"}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Total Investments"
          data={"$0.00"}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Last 7 Days Investments"
          data={"$0.00"}
          bgStyle="bg-white border-2 border-[#fad79c]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
        <SolidCard
          title="Total Referral Commission"
          data={"$0.00"}
          bgStyle="bg-[#FAD79C]"
          titleStyle="text-[#D29125]"
          dataStyle="text-[#D29125]"
        />
      </div>
      <div className="w-full py-10 flex gap-5">
        <div className="w-full border bg-white rounded-lg p-5 shadow-xl">
          <div>
            <h1 className="px-5 text-4xl font-semibold">$8,185</h1>
            <LineChart width={500} height={300} data={data} className="mt-5">
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#f5ae39"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-2xl font-semibold">Total Deposits</p>
              <p className=" opacity-50 mt-3">
                Total amount deposited this month by all the users
              </p>
              <div className="flex flex-col gap-1 my-5 opacity-80 ">
                <p>
                  Pending Deposits: <span className="font-medium">40</span>
                </p>
                <p>
                  Rejected Deposits: <span className="font-medium">27</span>
                </p>
                <p>
                  Desposited Charge: <span className="font-medium">$642</span>
                </p>
              </div>
            </div>
            <Button className="bg-[#f5ae39] text-white dark:text-white dark:hover:bg-[#e2a43f] dark:bg-[#f5ae39] hover:bg-[#e2a43f] mb-6">
              View Deposits
            </Button>
          </div>
        </div>
        <div className="w-full bg-white justify-between gap-5 border rounded-lg p-5 shadow-xl">
          <div>
            <h1 className="px-5 text-4xl font-semibold">$5,395</h1>
            <LineChart width={500} height={300} data={data} className="mt-5">
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#f5ae39"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-2xl font-semibold">Total Withdrawals</p>
              <p className=" opacity-50 mt-3">
                Total amount withdrawed this month by all the users
              </p>
              <div className="flex flex-col gap-1 my-5 opacity-80 ">
                <p>
                  Pending Withdrawals: <span className="font-medium">32</span>
                </p>
                <p>
                  Rejected Withdrawals: <span className="font-medium">130</span>
                </p>
                <p>
                  Withdrawal Charge: <span className="font-medium">$142</span>
                </p>
              </div>
            </div>
            <Button className="bg-[#f5ae39] text-white dark:text-white dark:hover:bg-[#e2a43f] dark:bg-[#f5ae39] hover:bg-[#e2a43f] mb-6">
              View Withdrawals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
