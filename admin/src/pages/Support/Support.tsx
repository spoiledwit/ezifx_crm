import BreadCrumb from "Common/BreadCrumb";
import PhotosUploader from "components/Forms/ImageUploader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { toast } from "react-hot-toast";
import { useAuthStore } from "store/useAuthStore";

// icons
import TableContainer from "Common/TableContainer";
import {
  ArrowDown,
  CircleDollarSign,
  Eye,
  Loader,
  MoreHorizontal,
  Plus,
  Search,
  Ticket,
  TicketCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Dropdown } from "Common/Components/Dropdown";
import Modal from "Common/Components/Modal";

// Formik
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";

const Support = () => {
  const { user } = useAuthStore();
  const [dataList, setDataList] = useState<any>([]);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([
    {
      _id: "1",
      openedDate: "2021-10-10",
      subject: "Test",
      lastReply: "2021-10-10",
      priority: "High",
      status: "Closed",
    },
    {
      _id: "2",
      openedDate: "2021-10-10",
      subject: "Test",
      lastReply: "2021-10-10",
      priority: "High",
      status: "Opened",
    },
  ]);
  const [images, setImages] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    handleFetchTickets();
  }, []);

  const handleFetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/ticket`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataList(res.data);
      setData(res.data);
    } catch (error) {
      toast.error("An error occurred while fetching deposit");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      validation.setFieldValue("paymentProof", images[0]);
    } else {
      validation.setFieldValue("paymentProof", "");
    }
  }, [images]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      subject: "",
      priority: "",
      message: "",
      attachments: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      email: Yup.string().required("Email is Required"),
      subject: Yup.string().required("Subject is Required"),
      priority: Yup.string().required("Priority is Required"),
      message: Yup.string().required("Message is Required"),
      attachments: Yup.array()
        .required("Attachments is Required")
        .min(1, "At least one attachment is required"),
    }),

    onSubmit: async (values) => {
      const newData = {
        ...values,
      };
      setIsSubmiting(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URI}/ticket/create`,
          {
            ...newData,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        handleFetchTickets();
        toast.success("Ticket created successfully!");
        toggle();
        validation.resetForm();
        setImages([]);
      } catch (error: any) {
        if (!error.response) {
          return toast.error("Network error. Please try again.");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
      } finally {
        setIsSubmiting(false);
      }
    },
  });

  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      validation.resetForm();
    }
  }, [show, validation]);

  // Search Data
  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["_id", "subject"];
    const searchResult = dataList.filter((item: any) => {
      return keysToSearch.some((key) => {
        return (
          item[key] &&
          item[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    });
    setData(searchResult);
  };

  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    setDataList(data);
  }, []);

  const toggleTab = (tab: any, type: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredTickets = dataList;
      if (type !== "all") {
        filteredTickets = dataList.filter(
          (ticket: any) => ticket.status === type
        );
      }
      setData(filteredTickets);
    }
  };

  // columns
  const Status = ({ item }: any) => {
    console.log("ppppppppppp", item);
    switch (item) {
      case "Low":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
            {item}
          </span>
        );
      case "Medium":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-yellow-100 border-yellow-200 text-yellow-500 dark:bg-yellow-500/20 dark:border-yellow-500/20">
            {item}
          </span>
        );
      case "Opened":
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-green-100 border-green-200 text-green-500 dark:bg-green-500/20 dark:border-green-500/20">
            {item}
          </span>
        );
      default:
        return (
          <span className="delivery_status px-2.5 py-0.5 text-xs inline-block font-medium rounded border bg-red-100 border-red-200 text-red-500 dark:bg-red-500/20 dark:border-red-500/20">
            {item}
          </span>
        );
    }
  };

  const columns = useMemo(
    () => [
      {
        header: (
          <div className="flex items-center h-full">
            <input
              id="CheckboxAll"
              className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800"
              type="checkbox"
            />
          </div>
        ),
        enableSorting: false,
        id: "checkAll",
        cell: (cell: any) => {
          return (
            <div className="flex items-center h-full">
              <input
                id={"Checkbox" + cell.row.original.id}
                className="size-4 cursor-pointer bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800"
                type="checkbox"
              />
            </div>
          );
        },
      },
      {
        header: "Ticket ID",
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
          <>
            <Link
              to={`/support/${cell.row.original._id}`}
              className="transition-all duration-150 ease-linear order_id text-custom-500 hover:text-custom-600"
            >
              {cell.getValue()}
            </Link>
          </>
        ),
      },
      {
        header: "User ID",
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
          <>
            <Link
              to={`/user-details/${cell.row.original.userId}`}
              className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600 user-id"
            >
              {cell.getValue()}
            </Link>
          </>
        ),
      },
      {
        header: "Opened Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
      },
      {
        header: "Subject",
        accessorKey: "subject",
        enableColumnFilter: false,
      },
      {
        header: "Last Reply",
        accessorKey: "lastReply",
        enableColumnFilter: false,
      },
      {
        header: "Priority",
        accessorKey: "priority",
        enableColumnFilter: false,
        cell: (cell: any) => <Status item={cell.getValue()} />,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => <Status item={cell.getValue()} />,
      },

      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <Dropdown className="relative">
            <Dropdown.Trigger
              id="orderAction1"
              data-bs-toggle="dropdown"
              className="flex items-center justify-center size-[30px] p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
            >
              <MoreHorizontal className="size-3" />
            </Dropdown.Trigger>
            <Dropdown.Content
              placement={cell.row.index ? "top-end" : "right-end"}
              className="absolute z-50 py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md min-w-[10rem] dark:bg-zink-600"
              aria-labelledby="orderAction1"
            >
              <li>
                <Link
                  to={`/user-details/${cell.row.original.userId}`}
                  className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                >
                  <Eye className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{" "}
                  <span className="align-middle">Overview</span>
                </Link>
              </li>
            </Dropdown.Content>
          </Dropdown>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (images.length > 0) {
      validation.setFieldValue("attachments", images);
    } else {
      validation.setFieldValue("attachments", []);
    }
  }, [images]);

  const getCountByStatus = (status: string) => {
    let total = 0;
    dataList.forEach((item: any) => {
      if (item.status === status) {
        total++;
      }
    });
    return total;
  };

  return (
    <React.Fragment>
      <BreadCrumb title="Support Tickets" pageTitle="Support" />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 2xl:grid-cols-12">
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 text-green-500 rounded-md text-15 bg-green-50 dark:bg-green-500/20 shrink-0">
                <TicketCheck />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getCountByStatus("Opened")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Opened Support Tickets
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-2 2xl:row-span-1">
          <div className="card">
            <div className="flex items-center gap-3 card-body">
              <div className="flex items-center justify-center size-12 rounded-md text-15 bg-yellow-50 text-yellow-500 dark:bg-yellow-500/20 shrink-0">
                <Ticket />
              </div>
              <div className="grow">
                <h5 className="mb-1 text-16">
                  <CountUp
                    end={getCountByStatus("Closed")}
                    separator=","
                    className="counter-value"
                  />
                </h5>
                <p className="text-slate-500 dark:text-zink-200">
                  Closed Support Tickets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" id="ordersTable">
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Search for ..."
                  autoComplete="off"
                  onChange={(e) => filterSearchData(e)}
                />
                <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
              </div>
            </div>
            {/* <div className="lg:col-span-2 lg:col-start-11">
              <div className="ltr:lg:text-right rtl:lg:text-left">
                <Link
                  to="#!"
                  data-modal-target="addTicketModal"
                  type="button"
                  className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                  onClick={toggle}
                >
                  <Plus className="inline-block size-4" />{" "}
                  <span className="align-middle">Open a Ticket</span>
                </Link>
              </div>
            </div> */}
          </div>

          <ul className="flex flex-wrap w-full mt-5 text-sm font-medium text-center text-gray-500 nav-tabs">
            <li className={`group ${activeTab === "1" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target=""
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("1", "all");
                }}
              >
                <CircleDollarSign className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
                <span className="align-middle">All Tickets</span>
              </Link>
            </li>
            <li className={`group ${activeTab === "2" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target="all"
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("2", "Opened");
                }}
              >
                <Loader className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
                <span className="align-middle">Opened</span>
              </Link>
            </li>
            <li className={`group ${activeTab === "3" && "active"}`}>
              <Link
                to="#"
                data-tab-toggle
                data-target=""
                className="inline-block px-4 py-1.5 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 dark:text-zink-200 border border-transparent group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                onClick={() => {
                  toggleTab("3", "Closed");
                }}
              >
                <ArrowDown className="inline-block size-4 ltr:mr-1 rtl:ml-1" />{" "}
                <span className="align-middle">Closed</span>
              </Link>
            </li>
          </ul>

          {data && data.length > 0 ? (
            <TableContainer
              isPagination={true}
              columns={columns || []}
              data={data || []}
              customPageSize={10}
              divclassName="mt-5 overflow-x-auto"
              tableclassName="w-full whitespace-nowrap"
              theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zink-600"
              thclassName="px-3.5 py-2.5 font-semibold text-slate-500 border-b border-slate-200 dark:border-zink-500 dark:text-zink-200"
              tdclassName="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500"
              PaginationClassName="flex flex-col items-center mt-5 md:flex-row"
            />
          ) : (
            <div className="noresult">
              <div className="py-6 text-center">
                <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                <p className="mb-0 text-slate-500 dark:text-zink-200">
                  We've searched all tickets, but we did not find any ticket(s)
                  for your search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create a new Ticket Modal Form */}
      <Modal
        show={show}
        onHide={toggle}
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b dark:border-zink-500"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <Modal.Title className="text-16">{"Open A Ticket"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
              <div className="xl:col-span-12">
                <label
                  htmlFor="nameInput"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Name
                </label>
                <input
                  disabled
                  type="text"
                  id="nameInput"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="John Doe"
                  name="name"
                  onChange={validation.handleChange}
                  value={validation.values.name || ""}
                />
                {validation.touched.name && validation.errors.name ? (
                  <p className="text-red-400">{validation.errors.name}</p>
                ) : null}
              </div>

              <div className="xl:col-span-12">
                <label
                  htmlFor="emailInput"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Email
                </label>
                <input
                  disabled
                  type="email"
                  id="emailInput"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="john@gmail.com"
                  name="email"
                  onChange={validation.handleChange}
                  value={validation.values.email || ""}
                />
                {validation.touched.email && validation.errors.email ? (
                  <p className="text-red-400">{validation.errors.email}</p>
                ) : null}
              </div>

              <div className="xl:col-span-12">
                <label
                  htmlFor="subjectInput"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subjectInput"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Subject"
                  name="subject"
                  onChange={validation.handleChange}
                  value={validation.values.subject || ""}
                />
                {validation.touched.subject && validation.errors.subject ? (
                  <p className="text-red-400">{validation.errors.subject}</p>
                ) : null}
              </div>

              <div className="xl:col-span-12">
                <label
                  htmlFor="priorityInput"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Priority
                </label>
                <select
                  id="priorityInput"
                  className="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  name="priority"
                  onChange={validation.handleChange}
                  value={validation.values.priority || ""}
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {validation.touched.priority && validation.errors.priority ? (
                  <p className="text-red-400">{validation.errors.priority}</p>
                ) : null}
              </div>

              <div className="xl:col-span-12 flex flex-col">
                <label
                  htmlFor="messageInput"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Message
                </label>
                <textarea
                  id="messageInput"
                  className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  placeholder="Message"
                  name="message"
                  onChange={validation.handleChange}
                  value={validation.values.message || ""}
                />
                {validation.touched.message && validation.errors.message ? (
                  <p className="text-red-400">{validation.errors.message}</p>
                ) : null}
              </div>

              <div className="xl:col-span-12">
                <label
                  htmlFor="fileUpload"
                  className="inline-block mb-2 text-base font-medium"
                >
                  Upload Attachment(s)
                </label>
                <PhotosUploader
                  maxPhotos={1}
                  addedPhotos={images}
                  onChange={(photos: any) => {
                    setImages(photos);
                  }}
                />
              </div>
            </div>
            {validation.touched.attachments && validation.errors.attachments ? (
              <p className="text-red-400">{validation.errors.attachments}</p>
            ) : null}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="reset"
                className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                onClick={toggle}
              >
                Cancel
              </button>
              <button
                disabled={isSubmiting}
                type="submit"
                className={`text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 ${
                  isSubmiting ? "cursor-not-allowed" : ""
                }`}
              >
                {"Open a Ticket"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Support;
