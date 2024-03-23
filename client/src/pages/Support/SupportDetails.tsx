import axios from "axios";
import BreadCrumb from "Common/BreadCrumb";
import { SendHorizontal } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "store/useAuthStore";

const SupportDetails = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [deposit, setDeposit] = useState({} as any);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [messageValue, setMessageValue] = useState("");

  const navigate = useNavigate()


  useEffect(() => {
    handleFetchTicket();
  }, []);

  const handleFetchTicket = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/ticket/${id}`,
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

  const handleSendMessage = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URI}/ticket/send-message/${deposit._id}`,
        {content: messageValue},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Message sent successfully");
      navigate("/support")
    } catch (error) {
      toast.error("An error occurred while approving deposit");
    } finally {
    }
  }, [messageValue]);

  return (
    <React.Fragment>
      <BreadCrumb title="Ticket Details" pageTitle="Ticket" />
      <ToastContainer closeButton={false} limit={1} />
      {loading ? <p>Loading...</p> : <> </>}
      {deposit && (
        <div className="bg-white shadow-md rounded-md p-4 w-full">
          <div className="flex justify-between">
            <div>
              <p>
                <strong>Subject:</strong> {deposit.subject}
              </p>
              <p>
                <strong> status:</strong> {deposit.status}
              </p>
             
              {/* <p>
                <strong>Status:</strong> {deposit.status}
              </p>
              <p>
                <strong>Created At:</strong> {deposit.createdAt}
              </p>
              <p>
                <strong> Updated At:</strong> {deposit.updatedAt}
              </p> */}
            </div>
            {/* {deposit.status === "Pending" ? (
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
            )} */}
          </div>

          {/* Chatting  */}
          <div className="mt-10 border shadow-md mx-20 p-8">
            <h1 className="text-2xl fonr-bold mb-5">Messages</h1>

            {deposit &&
              deposit?.messages?.length> 0 &&
              deposit?.messages?.map((message: any) => (
                <div>
                  {!user?.isAdmin && message.senderId != user?._id ? (
                    <div className="flex flex-col items-end ">
                      <div className=" py-3">You</div>
                      <div className="bg-zinc-800 text-white p-3 w-[400px] rounded-md shadow-md">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className=" py-3">Client</div>
                      <div className="bg-slate-300 p-3 w-[400px] rounded-md shadow-md">
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {deposit?.messages?.length == 0 ? <p className="text-center">No message found</p>: <></>}


            <div className="flex items-center mt-5">
              <div className="flex-grow">
                <input
                  type="text"
                  className="py-2 pr-4 w-full text-sm text-topbar-item bg-topbar border border-topbar-border rounded pl-8 placeholder:text-slate-400 form-control focus-visible:outline-0 min-w-[300px] focus:border-blue-400 group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:border-topbar-border-dark group-data-[topbar=dark]:placeholder:text-slate-500 group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:border-topbar-border-brand group-data-[topbar=brand]:placeholder:text-blue-300 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:border-zink-500 group-data-[topbar=dark]:dark:text-zink-100"
                  placeholder="send a message..."
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                />
              </div>
              <div className="px-4" onClick={handleSendMessage}>
                <SendHorizontal />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SupportDetails;
