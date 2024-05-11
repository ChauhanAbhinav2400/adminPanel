import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaMoneyBillAlt, FaCarAlt, FaMapMarkedAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const [data, setData] = useState({
    totalArticle: 0,
    totalTourPackage: 0,
    totalCarRentalVendor: 0,
    totalTourPackageVendor: 0,
    latestCarRentalBookings: [],
    latestTourPackageBookings: [],
    totalCarRentalBuyLeads: 0,
    totalTourPackageBuyLeads: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Fetch data from API and update the state
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="z-0  flex flex-wrap gap-4 max-h-[700px] overflow-y-auto w-full p-5">
      <div className="bg-gray text-white p-4 min-w-80 md:min-w-96 h-[30%] rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data.totalArticle}</div>
          <FaUserFriends className="text-4xl" />
        </div>
        <div className="text-lg font-medium">Total Articles</div>
      </div>

      <div className="bg-green/90 text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data.totalTourPackage}</div>
          <FaMoneyBillAlt className="text-4xl" />
        </div>
        <div className="text-lg font-medium">Total Tour Packages</div>
      </div>

      <div className="bg-orange text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data.totalCarRentalVendor}</div>
          <FaCarAlt className="text-4xl" />
        </div>
        <div className="text-lg font-medium">Total Car Rental Vendors</div>
      </div>

      <div className="bg-blue text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data.totalTourPackageVendor}</div>
          <FaMapMarkedAlt className="text-4xl" />
        </div>
        <div className="text-lg font-medium">Total Tour Package Vendors</div>
      </div>

      <div className="bg-gray text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="text-lg font-medium">Latest Car Rental Bookings</div>
        <ul className="mt-2">
          {data.latestCarRentalBookings.slice(0, 10).map((booking) => (
            <li key={booking.id} className="text-sm">
              {booking.name} - {booking.date}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-green text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="text-lg font-medium">Latest Tour Package Bookings</div>
        <ul className="mt-2">
          {data.latestTourPackageBookings.slice(0, 10).map((booking) => (
            <li key={booking.id} className="text-sm">
              {booking.name} - {booking.date}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-orange text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data.totalCarRentalBuyLeads}</div>
          <FaCalendarAlt className="text-4xl" />
        </div>
        <div className="text-lg font-medium">Total Car Rental Buy Leads</div>
      </div>

      <div className="bg-blue text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{data.totalTourPackageBuyLeads}</div>
          <FaCalendarAlt className="text-4xl" />
        </div>
        <div className="text-lg font-medium">Total Tour Package Buy Leads</div>
      </div>

      <div className="bg-gray text-white min-w-80 md:min-w-96 h-[30%] p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">${data.totalRevenue}</div>
          <FaChartLine className="text-4xl" />
        </div>
        <div className="text-lg font-medium">Total Revenue</div>
      </div>
    </div>
  );
};

export default Dashboard;