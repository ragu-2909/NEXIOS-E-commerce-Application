// import React, { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import HeadNavBar from "../navigation/headnavbar/HeadNavBar";
// import SideBar from '../navigation/sidebar/SideBar';
// import { useSelector, useDispatch } from 'react-redux';
// import { setMode, setColor } from '../../redux/features/ThemeSlice';

// const Layout = () => {
//   const { mode, color } = useSelector(state => state.theme);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const themeClass = localStorage.getItem('themeMode') || 'theme-mode-dark';
//     const colorClass = localStorage.getItem('colorMode') || 'theme-color-red';

//     dispatch(setMode(themeClass));
//     dispatch(setColor(colorClass));
//   }, [dispatch]);

//   return (
//     <div className={`flex h-screen relative text-txt-color ${mode} ${color}`}>
//       <div className='h-full'>
//         <SideBar />
//       </div>
//       <div className="w-[calc(100vw-60px)] ml-[65px] flex flex-col flex-1 bg-second-bg overflow-auto">
//         <HeadNavBar />
//         <div className="py-2 pt-1 px-4 flex-1 overflow-auto">
//           <Outlet />
//         </div>
//       </div>
// {
//   isLoggedOutModalOpen && (
//     <LogOut />
//   )
// }
//     </div>
//   );
// };

// export default Layout;



import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import HeadNavBar from "../navigation/headnavbar/HeadNavBar";
import SideBar from '../navigation/sidebar/SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { setMode, setColor } from '../../redux/features/ThemeSlice';
import LogOut from '../Login-signup/LogOut';

const Layout = () => {
  const { mode, color } = useSelector(state => state.theme);
  const isLoggedOutModalOpen = useSelector(state => state.logoutModal.isLoggedOutModalOpen)
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode') || 'theme-mode-dark';
    const colorClass = localStorage.getItem('colorMode') || 'theme-color-red';

    dispatch(setMode(themeClass));
    dispatch(setColor(colorClass));
  }, [dispatch]);

  return (
    <div className={`flex h-screen relative text-txt-color ${mode} ${color}`}>
      <div className='h-full'>
        <SideBar />
      </div>

      <div className="w-[calc(100vw-60px)] ml-[65px] flex flex-col flex-1 bg-second-bg overflow-y-auto">
        <HeadNavBar />
        <div className="py-2 pt-1 px-4 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      {
        isLoggedOutModalOpen && (
          <LogOut />
        )
      }
    </div>
  );
};

export default Layout;
