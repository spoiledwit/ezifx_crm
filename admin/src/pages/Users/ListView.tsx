import BreadCrumb from "Common/BreadCrumb";
import { Dropdown } from "Common/Components/Dropdown";
import TableContainer from "Common/TableContainer";
import { UserListViewData } from "Common/data";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

// Icons
import filterDataBySearch from "Common/filterDataBySearch";
import axios from "axios";
import {
  CheckCircle,
  Download,
  Eye,
  Loader,
  MoreHorizontal,
  Search,
  Trash2,
} from "lucide-react";
import { ToastContainer } from "react-toastify";

const UsersTable = () => {
  const [userList, setUserList] = useState([]);

  const [user, setUser] = useState<any>([]);
  const [eventData, setEventData] = useState<any>();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  useEffect(() => {
    setUser(userList);
  }, [userList]);

  // fetch data
  const handleFetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/auth/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Search Data
  const filterSearchData = (e: any) => {
    const search = e.target.value;
    const keysToSearch = ["name", "email", "_id"];
    filterDataBySearch(userList, search, keysToSearch, setUser);
  };

  // columns
  const Status = ({ item }: any) => {
    switch (item) {
      case true:
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status">
            <CheckCircle className="size-3 mr-1.5" />
            Verified
          </span>
        );
      case false:
        return (
          <span className="px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded border bg-orange-100 border-transparent text-orange-500 dark:bg-orange-500/20 dark:text-orange-200 dark:border-transparent status">
            <Loader className="size-3 mr-1.5" />
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent inline-flex items-center status">
            <CheckCircle className="size-3 mr-1.5" />
            Unknown
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
              className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer"
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
                id="Checkbox1"
                className="size-4 bg-white border border-slate-200 checked:bg-none dark:bg-zink-700 dark:border-zink-500 rounded-sm appearance-none arrow-none relative after:absolute after:content-['\eb7b'] after:top-0 after:left-0 after:font-remix after:leading-none after:opacity-0 checked:after:opacity-100 after:text-custom-500 checked:border-custom-500 dark:after:text-custom-500 dark:checked:border-custom-800 cursor-pointer"
                type="checkbox"
              />
            </div>
          );
        },
      },
      {
        header: "User ID",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <Link
            to={`/user-details/${cell.row.original._id}`}
            className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600 user-id"
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell: any) => (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-10 font-medium rounded-full shrink-0 bg-slate-200 text-slate-800 dark:text-zink-50 dark:bg-zink-600">
              {cell.row.original.img ? (
                <img
                  src={cell.row.original.img}
                  alt=""
                  className="h-10 rounded-full"
                />
              ) : (
                cell
                  .getValue()
                  .split(" ")
                  .map((word: any) => word.charAt(0))
                  .join("")
              )}
            </div>
            <div className="grow">
              <h6 className="mb-1">
                <Link to="#!" className="name">
                  {cell.getValue()}
                </Link>
              </h6>
              <p className="text-slate-500 dark:text-zink-200">
                {cell.row.original.designation}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Phone Number",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "Joining Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
      },
      {
        header: "Email Verification Status",
        accessorKey: "approved",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => <Status item={cell.getValue()} />,
      },
      {
        header: "KYC Status",
        accessorKey: "hasKYC",
        enableColumnFilter: false,
        enableSorting: true,
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
                  to={`/user-details/${cell.row.original._id}`}
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

  return (
    <React.Fragment>
      <BreadCrumb title="Users" pageTitle="Users" />
      <ToastContainer closeButton={false} limit={1} />
      <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <div className="card" id="usersTable">
            <div className="card-body">
              <div className="flex items-center">
                <h6 className="text-15 grow">Users List</h6>
              </div>
            </div>
            <div className="!py-3.5 card-body border-y border-dashed border-slate-200 dark:border-zink-500">
              <form action="#!">
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                  <div className="relative xl:col-span-2">
                    <input
                      type="text"
                      className="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                      placeholder="Search for name, email, phone number etc..."
                      autoComplete="off"
                      onChange={(e) => filterSearchData(e)}
                    />
                    <Search className="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600" />
                  </div>

                  <div className="xl:col-span-3 xl:col-start-10">
                    <div className="flex gap-2 xl:justify-end">
                      <div>
                        <button
                          type="button"
                          className="bg-white border-dashed text-custom-500 btn border-custom-500 hover:text-custom-500 hover:bg-custom-50 hover:border-custom-600 focus:text-custom-600 focus:bg-custom-50 focus:border-custom-600 active:text-custom-600 active:bg-custom-50 active:border-custom-600 dark:bg-zink-700 dark:ring-custom-400/20 dark:hover:bg-custom-800/20 dark:focus:bg-custom-800/20 dark:active:bg-custom-800/20"
                        >
                          <Download className="inline-block size-4" />{" "}
                          <span className="align-middle">Export</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-body">
              {user && user.length > 0 ? (
                <TableContainer
                  isPagination={true}
                  columns={columns || []}
                  data={user || []}
                  customPageSize={10}
                  divclassName="-mx-5 -mb-5 overflow-x-auto"
                  tableclassName="w-full border-separate table-custom border-spacing-y-1 whitespace-nowrap"
                  theadclassName="text-left relative rounded-md bg-slate-100 dark:bg-zink-600 after:absolute ltr:after:border-l-2 rtl:after:border-r-2 ltr:after:left-0 rtl:after:right-0 after:top-0 after:bottom-0 after:border-transparent [&.active]:after:border-custom-500 [&.active]:bg-slate-100 dark:[&.active]:bg-zink-600"
                  thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold"
                  tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5"
                  PaginationClassName="flex flex-col items-center mt-8 md:flex-row"
                />
              ) : (
                <div className="noresult">
                  <div className="py-6 text-center">
                    <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                    <h5 className="mt-2 mb-1">Sorry! No Result Found</h5>
                    <p className="mb-0 text-slate-500 dark:text-zink-200">
                      We've searched more than 199+ users We did not find any
                      users for you search.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Modal  */}
      {/* <Modal
        show={show}
        onHide={toggle}
        id="defaultModal"
        modal-center="true"
        className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
      >
        <Modal.Header
          className="flex items-center justify-between p-4 border-b dark:border-zink-300/20"
          closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <Modal.Title className="text-16">
            {!!isEdit ? "Edit User" : "Add User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form
            action="#!"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="mb-3">
              <div className="relative size-24 mx-auto mb-4 rounded-full shadow-md bg-slate-100 profile-user dark:bg-zink-500">
                <img
                  src={selectedImage || validation.values.img || dummyImg}
                  alt=""
                  className="object-cover w-full h-full rounded-full user-profile-image"
                />
                <div className="absolute bottom-0 flex items-center justify-center size-8 rounded-full ltr:right-0 rtl:left-0 profile-photo-edit">
                  <input
                    id="profile-img-file-input"
                    name="profile-img-file-input"
                    type="file"
                    accept="image/*"
                    className="hidden profile-img-file-input"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="profile-img-file-input"
                    className="flex items-center justify-center size-8 bg-white rounded-full shadow-lg cursor-pointer dark:bg-zink-600 profile-photo-edit"
                  >
                    <ImagePlus className="size-4 text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500" />
                  </label>
                </div>
              </div>
              {validation.touched.img && validation.errors.img ? (
                <p className="text-red-400">{validation.errors.img}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label
                htmlFor="userId"
                className="inline-block mb-2 text-base font-medium"
              >
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                disabled
                value={validation.values.userId || "#TW1500004"}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="joiningDateInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Joining Date
              </label>
              <Flatpickr
                id="joiningDateInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                options={{
                  dateFormat: "d M, Y",
                }}
                name="joiningDate"
                placeholder="Select date"
                onChange={(date: any) =>
                  validation.setFieldValue(
                    "joiningDate",
                    moment(date[0]).format("DD MMMM ,YYYY")
                  )
                }
                value={validation.values.joiningDate || ""}
              />
              {validation.touched.joiningDate &&
              validation.errors.joiningDate ? (
                <p className="text-red-400">{validation.errors.joiningDate}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="userNameInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="userNameInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Enter name"
                name="name"
                onChange={validation.handleChange}
                value={validation.values.name || ""}
              />
              {validation.touched.name && validation.errors.name ? (
                <p className="text-red-400">{validation.errors.name}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="designationInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Designation
              </label>
              <input
                type="text"
                id="designationInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Enter designation"
                name="designation"
                onChange={validation.handleChange}
                value={validation.values.designation || ""}
              />
              {validation.touched.designation &&
              validation.errors.designation ? (
                <p className="text-red-400">{validation.errors.designation}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="emailInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="emailInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Enter email"
                name="email"
                onChange={validation.handleChange}
                value={validation.values.email || ""}
              />
              {validation.touched.email && validation.errors.email ? (
                <p className="text-red-400">{validation.errors.email}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="phoneNumberInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumberInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="12345 67890"
                name="phoneNumber"
                onChange={validation.handleChange}
                value={validation.values.phoneNumber || ""}
              />
              {validation.touched.phoneNumber &&
              validation.errors.phoneNumber ? (
                <p className="text-red-400">{validation.errors.phoneNumber}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="statusSelect"
                className="inline-block mb-2 text-base font-medium"
              >
                Status
              </label>
              <select
                className="form-input border-slate-300 focus:outline-none focus:border-custom-500"
                data-choices
                data-choices-search-false
                id="statusSelect"
                name="status"
                onChange={validation.handleChange}
                value={validation.values.status || ""}
              >
                <option value="">Select Status</option>
                <option value="Verified">Verified</option>
                <option value="Waiting">Waiting</option>
                <option value="Rejected">Rejected</option>
              </select>
              {validation.touched.status && validation.errors.status ? (
                <p className="text-red-400">{validation.errors.status}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="locationInput"
                className="inline-block mb-2 text-base font-medium"
              >
                Location
              </label>
              <input
                type="text"
                id="locationInput"
                className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                placeholder="Location"
                name="location"
                onChange={validation.handleChange}
                value={validation.values.location || ""}
              />
              {validation.touched.location && validation.errors.location ? (
                <p className="text-red-400">{validation.errors.location}</p>
              ) : null}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="reset"
                data-modal-close="addDocuments"
                className="text-red-500 transition-all duration-200 ease-linear bg-white border-white btn hover:text-red-600 focus:text-red-600 active:text-red-600 dark:bg-zink-500 dark:border-zink-500"
                onClick={toggle}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              >
                {!!isEdit ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal> */}
    </React.Fragment>
  );
};

export default UsersTable;
