import Modal from "Common/Components/Modal";
import AnimationButton from "components/UIElement/UiButtons/AnimationButton";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

const OTPModal = ({
  show,
  toggle,
  resetPassword,
  loading,
  otp,
  setOtp
}: {
  show: boolean;
  toggle: () => void;
  resetPassword: () => void;
  loading: boolean;
  otp: string,
  setOtp: any
}) => {
  return (
    <div>
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
          <Modal.Title className="text-16">{"OTP Verification"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return false;
            }}
          >
            <h4 className="text-center my-3 text-2xl">Please enter 6 digit otp sent to your mail box</h4>
            <div className=" flex flex-col items-center my-10">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "35px ",
                  height: "40px",
                  border: "1px solid black",
                  margin: "5px",
                }}
              />
            </div>

            <div className=" flex justify-center mt-10">
              <AnimationButton
                className="w-full items-center justify-center"
                loading={loading}
                disabled={loading}
                loadingText={loading ? "Submitting ..." : "Submit"}
                label="Submit"
                onClick={resetPassword}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OTPModal;
