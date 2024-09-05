/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import InventoryComponent from "./inventoryallmedicinetab";
import ExpirationComponent from "./inventoryexpiremedicinetab";
import SupplierComponent from "./inventorysuplier";
import { useNavigate } from "react-router-dom";
import SideNav from '../common/SideNav/sideNav.jsx'
import Topbar from '../common/topbar/Topbar.jsx'
import "./InventoryDashboard.css"; 

const InventoryDashboard = () => {
  const data = [
    {
      label: "Inventory",
      value: "inventory",
      component: <InventoryComponent />,
    },
    {
      label: "Expiration",
      value: "expiration",
      component: <ExpirationComponent />,
    },
    // {
    //   label: "Supplier",
    //   value: "supplier",
    //   component: <SupplierComponent />,
    // },
  ];

  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div>
      <Topbar />
      <div>
        <SideNav />
      </div>
      <div className="content-container">
        <div className="py-24 flex flex-col items-center justify-between gap-8">
          <div className="px-4 space-y-7 ml-20">
            <h2 className="text-center md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Inventory management <span className="text-red">Medicines</span>
            </h2>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-gray-900" : ""}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, component }) => (
                  <TabPanel key={value} value={value}>
                    {component}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
