import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Widgets from './Widgets';
import DailyVisit from './DailyVisit';
import AccountsStatistics from './AccountsStatistics';

const Analytics = () => {

  return (
    <React.Fragment>
      <BreadCrumb title='Analytics' pageTitle='Dashboards' />
      <div className="grid grid-cols-12 gap-x-5">
        <Widgets />
        <AccountsStatistics />
        <DailyVisit />
      </div>
    </React.Fragment>
  );
};

export default Analytics;