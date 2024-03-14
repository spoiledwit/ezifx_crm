import React from "react";
import logo from "assets/images/logo.webp";
import { useAuthStore } from "store/useAuthStore";
import { useEffect, useState } from "react";
import PhotosUploader from "components/Forms/ImageUploader";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";
import passport from "assets/images/passport.png";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "Common/Components/Modal";
import { useCallback } from "react";
import img from "assets/images/220822business_1459.jpg";

import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const Header = ({ user, setUser }: { user: any; setUser: any }) => {
  return (
    <header className="flex items-center min-h-[60px] justify-between px-4 py-3 bg-white shadow-md dark:bg-zink-800">
      <img src={logo} className="h-6" alt="" />
      <div
        onClick={() => {
          setUser(null);
          localStorage.removeItem("token");
        }}
        className="cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
      >
        <p className="">Logout as {user && user.name}</p>
      </div>
    </header>
  );
};

const KycPage = () => {
  const { user, setUser } = useAuthStore();
  const [images, setImages] = useState<any>([]);
  const [imagesManual, setImagesManual] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [KYC, setKYC] = useState<any>(null);
  const [loadingKYC, setLoadingKYC] = useState(false);

  const formik = useFormik({
    initialValues: {
      cnicImage: "",
    },

    validationSchema: Yup.object({
      cnicImage: Yup.string().required("Image is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URI}/kyc`,
          {
            cnicImage: values.cnicImage,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(res.data.data);
        toast.success("KYC done successfully");
        // window.location.reload();
      } catch (error: any) {
        if (!error.response) {
          return toast.error("Network error");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  const formikManual = useFormik({
    initialValues: {
      image: "",
      identityType: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Image is required"),
      identityType: Yup.string().required("Identity Type is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URI}/kyc/manual`,
          {
            image: values.image,
            identityType: values.identityType,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("KYC Request has been submitted successfully!");
        window.location.reload();
      } catch (error: any) {
        if (!error.response) {
          return toast.error("Network error");
        }
        if (typeof error.response.data === "string") {
          return toast.error(error.response.data);
        }
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (images.length > 0) {
      formik.setFieldValue("cnicImage", images[0]);
    } else {
      formik.setFieldValue("cnicImage", "");
    }
  }, [images]);

  const toggle = useCallback(() => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      formikManual.resetForm();
    }
  }, [show, formikManual]);

  useEffect(() => {
    if (imagesManual.length > 0) {
      formikManual.setFieldValue("image", imagesManual[0]);
    } else {
      formikManual.setFieldValue("image", "");
    }
  }, [imagesManual]);

  useEffect(() => {
    getKYC();
  }, []);

  const getKYC = async () => {
    try {
      setLoadingKYC(true);
      const res = await axios.get(`${process.env.REACT_APP_BASE_URI}/kyc`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setKYC(res.data);
    } catch (error: any) {
      if (!error.response) {
        return toast.error("Network error");
      }
      if (typeof error.response.data === "string") {
        // return toast.error(error.response.data);
      }
      // toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoadingKYC(false);
    }
  };

  if (loadingKYC) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (KYC && KYC.kycStatus?.toLowerCase() === "pending") {
    return (
      <React.Fragment>
        <Header user={user} setUser={setUser} />
        <div className="flex justify-center items-center min-h-[70vh] flex-col">
          <img src={img} className="w-1/4" alt="" />
          <p className="text-2xl font-semibold mt-5 text-center">
            Your KYC is pending for approval.
          </p>
          <p
          className="text-center mt-3 text-gray-500 dark:text-gray-400 w-1/2 max-w-[500px]"
          >
            You will be notified via email once your KYC is approved. Please wait for the
            approval.
          </p>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Toaster />
      <div className="flex flex-col justify-center items-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mt-10">
            Upload a proof of your identity
          </h1>
        </div>
        {user && !user.hasKYC && (
          <div className="container mx-auto mt-3">
            <p className="text-center">
              You need to upload a proof of your identity to continue to the
              CRM.
            </p>
          </div>
        )}
        <div className="container mx-auto mt-5 max-w-[500px]">
          <form onSubmit={formik.handleSubmit}>
            {!data ? (
              <div className="flex flex-col gap-10">
                <span className="border-2 flex items-center justify-center flex-col border-dashed border-gray-300 p-5 rounded-lg">
                  <img
                    src={passport}
                    alt=""
                    className="w-[200px] object-cover rounded-lg"
                  />
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Upload a clear image of your Passport to verify your account
                  </p>
                </span>
                <PhotosUploader
                  addedPhotos={images}
                  maxPhotos={1}
                  onChange={setImages}
                />
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-10">
                  <span className="border-2 flex items-center justify-center flex-col border-dashed border-gray-300 p-5 rounded-lg">
                    {data.result.name && (
                      <React.Fragment>
                        {" "}
                        <p className="text-center text-lg font-semibold">
                          {data.result.name} {data.result.surname}
                        </p>
                        <p>Passport Number: {data.result.passport_no}</p>
                        <p>Date of Birth: {data.result.date_of_birth}</p>
                      </React.Fragment>
                    )}
                    <p className="text-center text-sm text-gray-500 mt-3">
                      Your KYC is successfully done
                    </p>
                  </span>
                </div>
              </div>
            )}
            {formik.errors.cnicImage && formik.touched.cnicImage ? (
              <div className="text-red-500">{formik.errors.cnicImage}</div>
            ) : null}
            {!data && (
              <div className="flex justify-center mt-10">
                <AnimationButton
                  loading={loading}
                  label="Complete KYC"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  loadingText="Verifying..."
                  className="w-full max-w-[250px] justify-center"
                />
              </div>
            )}
            {data && (
              <div className="flex justify-center mt-10">
                <AnimationButton
                  loading={loading}
                  label="Continue to CRM"
                  onClick={() => {
                    window.location.reload();
                  }}
                  loadingText="Verifying..."
                  className="w-full max-w-[250px] justify-center"
                />
              </div>
            )}
          </form>
        </div>
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
            <Modal.Title className="text-16">
              {"Submit KYC Request"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formikManual.handleSubmit();
                return false;
              }}
            >
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                <div className="xl:col-span-12">
                  <label
                    htmlFor="identityType"
                    className="inline-block mb-2 text-base font-medium"
                  >
                    Identity Type
                  </label>
                  <select
                    id="identityType"
                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                    name="identityType"
                    onChange={formikManual.handleChange}
                    value={formikManual.values.identityType || ""}
                  >
                    <option value="">Select Identiy Type</option>
                    {["Passport", "CNIC"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {formikManual.touched.identityType &&
                  formikManual.errors.identityType ? (
                    <p className="text-red-400">
                      {formikManual.errors.identityType}
                    </p>
                  ) : null}
                </div>
                <div className="xl:col-span-12">
                  <label
                    htmlFor="image"
                    className="inline-block mb-2 text-base font-medium"
                  >
                    Upload Image
                  </label>
                  <PhotosUploader
                    maxPhotos={1}
                    addedPhotos={imagesManual}
                    onChange={(photos: any) => {
                      setImagesManual(photos);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="reset"
                  className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                  onClick={toggle}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <button
          onClick={toggle}
          className="mt-2 text-custom-500 hover:text-custom-600"
        >
          Submit KYC Request Manually
        </button>
      </div>
    </div>
  );
};

export default KycPage;
