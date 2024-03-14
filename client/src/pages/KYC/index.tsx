import logo from "assets/images/logo.webp";
import { useAuthStore } from "store/useAuthStore";
import { useEffect, useState } from "react";
import PhotosUploader from "components/Forms/ImageUploader";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";
import passport from "assets/images/passport.png";
import { Toaster } from "react-hot-toast";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      formik.setFieldValue("cnicImage", images[0]);
    } else {
      formik.setFieldValue("cnicImage", "");
    }
  }, [images]);

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
        await axios.post(
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
        toast.success("KYC done successfully");
        window.location.reload();
      } catch (error:any) {
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
        <div className="container mx-auto mt-10 max-w-[500px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-10">
              <span className="border-2 flex items-center justify-center flex-col border-dashed border-gray-300 p-5 rounded-lg">
                <img
                  src={passport}
                  alt=""
                  className="w-[200px] object-cover rounded-lg"
                />
                <p className="text-center text-sm text-gray-500 mt-3">
                  Upload a clear image of your Passport to verify your
                  account
                </p>
              </span>
              <PhotosUploader
                addedPhotos={images}
                maxPhotos={1}
                onChange={setImages}
              />
            </div>

            {formik.errors.cnicImage && formik.touched.cnicImage ? (
              <div className="text-red-500">{formik.errors.cnicImage}</div>
            ) : null}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default KycPage;