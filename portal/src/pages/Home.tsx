import SolidCard from "@/components/Cards/SolidCard";
import HomeTable from "@/components/HomeTable/HomeTable";
import { Button } from "@/components/ui/button";
import { acData } from "@/constants";
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
      <h1 className="mt-10 my-4 font-semibold text-2xl text-neutral-600">
        Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-5">
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
      <h2 className="text-xl text-dark mt-7 my-4 font-semibold">Trading A/C Summary</h2>
      <HomeTable data={acData} />
    </div>
  );
};

export default Home;
