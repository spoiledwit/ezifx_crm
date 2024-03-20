import axios from "axios";
import BreadCrumb from "Common/BreadCrumb";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "store/useAuthStore";

const AccountDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [deposit, setDeposit] = useState({} as any);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    handleFetchDeposit();
  }, []);

  const handleFetchDeposit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/account/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDeposit(res.data);
    } catch (error) {
      toast.error("An error occurred while fetching deposit");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleApproveDeposit = useCallback(async () => {
    setApproving(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URI}/deposit/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDeposit(res.data);
      toast.success("Deposit approved successfully");
    } catch (error) {
      toast.error("An error occurred while approving deposit");
    } finally {
      setApproving(false);
    }
  }, []);
  const handleDeclineReject = useCallback(async () => {
    setApproving(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URI}/deposit/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDeposit(res.data);
      toast.success("Deposit declined successfully");
    } catch (error) {
      toast.error("An error occurred while declining deposit");
    } finally {
      setRejecting(false);
    }
  }, []);

  return (
    <React.Fragment>
      <BreadCrumb title="Account Details" pageTitle="Account Details" />
      <ToastContainer closeButton={false} limit={1} />
      {loading ? <p>Loading...</p> : <> </>}
      {deposit && (
        <div className="bg-white shadow-md rounded-md p-4 w-full">
          <div className="flex justify-between">
            <div>
              <p>
                <strong>Account Id:</strong> {deposit.accountId}
              </p>
              <p>
                <strong> Balance:</strong> {deposit.balance}
              </p>
              <p>
                <strong>Type:</strong>
                {deposit.type}
              </p>

              <p>
                <strong>Created At:</strong> {deposit.createdAt}
              </p>
              <p>
                <strong> Updated At:</strong> {deposit.updatedAt}
              </p>
            </div>
            {deposit.status === "Pending" ? (
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
            ) : deposit.status === "Rejected" ? (
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

export default AccountDetails;
