import axios from "axios";
import BreadCrumb from "Common/BreadCrumb";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "store/useAuthStore";

const UserDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleFetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      toast.error("An error occurred while fetching deposit");
    } finally {
      setLoading(false);
    }
  }, []);

  // const handleApproveDeposit = useCallback(async () => {
  //   setApproving(true);
  //   try {
  //     const res = await axios.put(
  //       `${process.env.REACT_APP_BASE_URI}/deposit/${id}/approve`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setData(res.data);
  //     toast.success("Deposit approved successfully");
  //   } catch (error) {
  //     toast.error("An error occurred while approving deposit");
  //   } finally {
  //     setApproving(false);
  //   }
  // }, []);
  // const handleDeclineReject = useCallback(async () => {
  //   setApproving(true);
  //   try {
  //     const res = await axios.put(
  //       `${process.env.REACT_APP_BASE_URI}/deposit/${id}/reject`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setData(res.data);
  //     toast.success("Deposit declined successfully");
  //   } catch (error) {
  //     toast.error("An error occurred while declining deposit");
  //   } finally {
  //     setRejecting(false);
  //   }
  // }, []);

  return (
    <React.Fragment>
      <BreadCrumb title="User" pageTitle="user-details" />
      <ToastContainer closeButton={false} limit={1} />
      {loading ? <p>Loading...</p> : <> </>}
      {data && (
        <div className="bg-white shadow-md rounded-md p-4 w-full">
          <div className="flex justify-between">
            <div>
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
              <p>
                <strong>Email:</strong>{data.email}
                {/* <a
                  className="text-blue-500"
                  href={data.paymentProof}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a> */}
              </p>
              {/* <p>
                <strong>Status:</strong> {data.approved == true ? "Approved": "Rejected"}
              </p> */}
              <p>
                <strong>KYC:</strong> {data.hasKYC == true ? "Yes": "No"}
              </p>
              <p>
                <strong>Created At:</strong> {data.createdAt}
              </p>
              <p>
                <strong> Updated At:</strong> {data.updatedAt}
              </p>
            </div>
            {/* {data.status === "Pending" ? (
              <div className="flex gap-4 h-fit">
                <button
                  disabled={approving}
                  onClick={handleApproveDeposit}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  {approving ? "Approving..." : "Approve"}
                </button>
                <button
                  disabled={rejecting}
                  onClick={handleDeclineReject}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  {rejecting ? "Declining..." : "Decline"}
                </button>
              </div>
            ) : data.status === "Rejected" ? (
              <div className="bg-red-500 text-white px-4 py-2 rounded-md h-fit">
                <p className="text-white rounded-md">Rejected</p>
              </div>
            ) : (
              <div className="bg-green-500 text-white px-4 py-2 rounded-md h-fit">
                <p className="text-white rounded-md">Approved</p>
              </div>
            )} */}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserDetails;
