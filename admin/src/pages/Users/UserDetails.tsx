import React from "react";
import BreadCrumb from "Common/BreadCrumb";
import AccountInfo from "./AccountInfo";
import { Nav } from "Common/Components/Tab/Nav";
import Tab from "Common/Components/Tab/Tab";
import PersonalTabs from "./PersonalTabs";
import ChangePasswordTabs from "./ChangePasswordTabs";
import PrivacyPolicyTabs from "./PrivacyPolicyTabs";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCallback, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleFetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URI}/auth/getUserById/${id}`,
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

  return (
    <React.Fragment>
      <BreadCrumb title="User Details" pageTitle="Users" />
      <Tab.Container defaultActiveKey="personalTabs">
        <div className="card">
          <AccountInfo 
          user={data}
          fetchUser={handleFetchUser}
          className="card-body" />
          <div className="card-body !py-0">
            <Nav className="flex flex-wrap w-full text-sm font-medium text-center nav-tabs">
              <Nav.Item eventKey="personalTabs" className="group">
                <a
                  href="#!"
                  data-tab-toggle
                  data-target="personalTabs"
                  className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                >
                  Personal Info
                </a>
              </Nav.Item>

              <Nav.Item eventKey="changePasswordTabs" className="group">
                <a
                  href="#!"
                  data-tab-toggle
                  data-target="changePasswordTabs"
                  className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                >
                  Change Password
                </a>
              </Nav.Item>
              <Nav.Item eventKey="privacyPolicyTabs" className="group">
                <a
                  href="#!"
                  data-tab-toggle
                  data-target="privacyPolicyTabs"
                  className="inline-block px-4 py-2 text-base transition-all duration-300 ease-linear rounded-t-md text-slate-500 dark:text-zink-200 border-b border-transparent group-[.active]:text-custom-500 dark:group-[.active]:text-custom-500 group-[.active]:border-b-custom-500 hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]"
                >
                  Privacy Policy
                </a>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey="personalTabs">
            <PersonalTabs 
            fetchUser={handleFetchUser}
            user={data} />
          </Tab.Pane>
          {/* <Tab.Pane eventKey="integrationTabs">
            <IntegrationTabs />
          </Tab.Pane> */}
          <Tab.Pane eventKey="changePasswordTabs">
            <ChangePasswordTabs 
            user={data}
            fetchUser={handleFetchUser}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="privacyPolicyTabs">
            <PrivacyPolicyTabs />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </React.Fragment>
  );
};

export default UserDetails;
