import React, { useCallback, useEffect, useState } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { toast } from "react-hot-toast";
import { useAuthStore } from "store/useAuthStore";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const Withdrawal = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [Withdrawal, setWithdrawal] = useState({} as any);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    handleFetchWithdrawal();
  }, []);

  const handleFetchWithdrawal = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/withdrawal/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWithdrawal(res.data);
    } catch (error) {
      toast.error("An error occurred while fetching Withdrawal");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleApproveWithdrawal = useCallback(async () => {
    setApproving(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URI}/withdrawal/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWithdrawal(res.data);
      toast.success("Withdrawal approved successfully");
    } catch (error) {
      toast.error("An error occurred while approving Withdrawal");
    } finally {
      setApproving(false);
    }
  }, []);
  const handleDeclineReject = useCallback(async () => {
    setApproving(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URI}/withdrawal/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWithdrawal(res.data);
      toast.success("Withdrawal declined successfully");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while declining Withdrawal");
    } finally {
      setRejecting(false);
    }
  }, []);

  return (
    <React.Fragment>
      <BreadCrumb title="Withdrawal" pageTitle="Withdrawal" />
      <ToastContainer closeButton={false} limit={1} />
      {loading ? <p>Loading...</p> : <> </>}
      {Withdrawal && (
        <div className="bg-white shadow-md rounded-md p-4 w-full">
          <div className="flex justify-between">
            <div>
              <p>
                <strong>Payment Method:</strong> {Withdrawal.paymentMethod}
              </p>
              <p>
                <strong> Amount:</strong> {Withdrawal.amount}
              </p>

              <p>
                <strong>Status:</strong> {Withdrawal.status}
              </p>
              <p>
                <strong>Created At:</strong> {Withdrawal.createdAt}
              </p>
              <p>
                <strong> Updated At:</strong> {Withdrawal.updatedAt}
              </p>
            </div>
            {Withdrawal.status === "Pending" ? (
              <div className="flex gap-4 h-fit">
                <button
                  disabled={approving}
                  onClick={handleApproveWithdrawal}
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
            ) : Withdrawal.status === "Rejected" ? (
              <div className="bg-red-500 text-white px-4 py-2 rounded-md h-fit">
                <p className="text-white rounded-md">Rejected</p>
              </div>
            ) : (
              <div className="bg-green-500 text-white px-4 py-2 rounded-md h-fit">
                <p className="text-white rounded-md">Approved</p>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Withdrawal;