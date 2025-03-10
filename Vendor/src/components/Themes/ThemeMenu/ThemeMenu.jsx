import React, { useEffect, useRef, useState } from 'react';
import './ThemeMenu.css';
import { FaPalette, FaX, FaCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setColor } from '../../../redux/features/ThemeSlice';  // Import actions from the slice

// Mode settings (light/dark)
const modeSettings = [
  { id: 'light', name: 'Light', background: 'light-background', class: 'theme-mode-light' },
  { id: 'dark', name: 'Dark', background: 'dark-background', class: 'theme-mode-dark' },
];

// Color settings (blue, red, etc.)
const colorSettings = [
  { id: 'blue', name: 'Blue', background: 'blue-color', class: 'theme-color-blue' },
  { id: 'red', name: 'Red', background: 'red-color', class: 'theme-color-red' },
  { id: 'cyan', name: 'Cyan', background: 'cyan-color', class: 'theme-color-cyan' },
  { id: 'green', name: 'Green', background: 'green-color', class: 'theme-color-green' },
  { id: 'orange', name: 'Orange', background: 'orange-color', class: 'theme-color-orange' },
];

// Helper function to handle clicks outside the menu
const clickOutsideRef = (contentRef, toggleRef) => {
  document.addEventListener('mousedown', (e) => {
    if (toggleRef.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.toggle('active');
    } else {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        contentRef.current.classList.remove('active');
      }
    }
  });
};

const ThemeMenu = () => {
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  // Handle clicks outside to close the menu
  clickOutsideRef(menuRef, menuToggleRef);

  const setActiveMenu = () => menuRef.current.classList.add('active');
  const closeMenu = () => menuRef.current.classList.remove('active');

  const dispatch = useDispatch();

  // Get current mode and color from Redux state
  const { mode, color } = useSelector((state) => state.theme);

  // Set mode (light/dark) and save to localStorage
  const setModeHandler = (mode) => {
    localStorage.setItem('themeMode', mode.class);
    dispatch(setMode(mode.class));  // Dispatch the setMode action
  };

  // Set color (blue, red, etc.) and save to localStorage
  const setColorHandler = (color) => {
    localStorage.setItem('colorMode', color.class);
    dispatch(setColor(color.class));  // Dispatch the setColor action
  };

  // Load initial state from localStorage when the component mounts
  useEffect(() => {
    const storedThemeMode = localStorage.getItem('themeMode') || 'theme-mode-dark';
    const storedColorMode = localStorage.getItem('colorMode') || 'theme-color-red';

    const themeClass = modeSettings.find((e) => e.class === storedThemeMode);
    const colorClass = colorSettings.find((e) => e.class === storedColorMode);

    if (themeClass) dispatch(setMode(themeClass.class)); 
    if (colorClass) dispatch(setColor(colorClass.class)); 
  }, [dispatch]);

  return (
    <div>
      <button ref={menuToggleRef} className="dropdownToggle" onClick={setActiveMenu}>
        <FaPalette className="w-[35px] h-[30px] icon" />
      </button>
      <div ref={menuRef} className="theme-menu">
        <h4>Theme settings</h4>
        <button className="theme-menu-close" onClick={closeMenu}>
          <FaX className="icon" />
        </button>
        <div className="theme-menu-select">
          <span>Choose Mode</span>
          <ul className="mode-list">
            {modeSettings.map((item, index) => (
              <li key={index} onClick={() => setModeHandler(item)}>
                <div
                  className={`mode-list-color ${item.background} ${item.class === mode ? 'active' : ''}`}
                >
                 
                  {item.class === mode && <FaCheck className="icon" />}
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="theme-menu-select">
          <span>Choose Color</span>
          <ul className="mode-list">
            {colorSettings.map((item, index) => (
              <li key={index} onClick={() => setColorHandler(item)}>
                <div
                  className={`mode-list-color ${item.background} ${item.class === color ? 'active' : ''}`}
                >
       
                  {item.class === color && <FaCheck className="icon" />}
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeMenu;
