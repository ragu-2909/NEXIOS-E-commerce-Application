import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import data from './data.json'; // Import the local JSON file



function Datatables() {


  const themeMode = useSelector((state) => state.theme.mode);
  const colorMode = useSelector((state) => state.theme.color);


const parts = colorMode.split('-');
const result = parts.length > 2 ? parts[2] : '';



const customStyles = {
  headRow: {
    style: {
      backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--second-bg-dark' : '--second-bg-light'})`, // Pure black background for header
      color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`, // White text for header
      borderBottom: '2px solid #333333',
    },
  },
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'uppercase',
      color: '#AAAAAA', // Muted white for headers
    },
  },
  rows: {
    style: {
      backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--main-bg-dark' : '--main-bg-light'})`, // Black background for rows
      color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`, // White text for rows
      '&:nth-child(odd)': {
        backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--third-bg-dark' : '--third-bg-light'})`, // Slightly lighter for alternating rows
      },
      '&:hover': {
        backgroundColor: `var(--main-color-${result}) !important`, // Lighter black on hover
        color: `${themeMode === "theme-mode-dark" ? '--second-bg-dark' : '--second-bg-light'} !important`,
        '.rdt_TableRow': {
          color:`${themeMode === "theme-mode-dark" ? '--second-bg-dark' : '--second-bg-light'} !important`, // Specifically target the row text
        },
      },
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      padding: '12px',
      color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`, // White text for cells
    },
  },
  pagination: {
    style: {
      backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--second-bg-dark' : '--second-bg-light'})`, // Black background for pagination
      color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`, // White text
      borderTop: '1px solid #333333',
    },
    pageButtonsStyle: {
      backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--second-bg-dark' : '--second-bg-light'})`, // Black background for buttons
      color: '#AAAAAA',
      fill: '#AAAAAA',
      borderRadius: '4px',
      height: '40px',
      width: '40px',
      padding: '0',
      margin: '0 4px',
      display: 'flex', // Add Flexbox to center content
  alignItems: 'center', // Center content vertically
  justifyContent: 'center', // Center content horizontally
      '&:hover': {
        backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--main-bg-dark' : '--main-bg-light'}) !important`,
        color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`,
        fill: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'})`,
      },
      '&.active': {
        backgroundColor: '#444444',
        color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`,
        fill: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'})`,
      },
    },
  },
};



  const columns = [
    {
      name: 'Order ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Customer Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
  ];

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    setRecords(data); // Load data from local file
    setFilterRecords(data); // Store unfiltered data
  }, []);

  const applyFilters = () => {
    const filteredData = filterRecords.filter(row => {
      const matchesSearch =
        search === '' ||
        Object.values(row)
          .some(value =>
            value
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          );

      const matchesStatus =
        filterStatus === '' || row.status === filterStatus;

      const matchesDate =
        filterDate === '' || row.date === filterDate;

      return matchesSearch && matchesStatus && matchesDate;
    });
    setRecords(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [search, filterStatus, filterDate]);


  const styles = {
    fullscreenContainer: {
      width: '100%',
      height: '100%',
      padding: '16px',
      boxSizing: 'border-box',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--main-bg-dark' : '--main-bg-light'})`, // Black background for container
      color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`, // White text
    },
    filterBar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
      gap: '12px',
      flexWrap: 'wrap',
    },
    input: {
      flex: '1',
      minWidth: '200px',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #333333',
      backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--second-bg-dark' : '--second-bg-light'})`, // Dark background for inputs
      color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`,
      outline: 'none',
      transition: 'border-color 0.3s',
      fontSize: '14px',
    },
    select: {
      flex: '1',
      minWidth: '200px',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #333333',
      backgroundColor: `var(${themeMode === "theme-mode-dark" ? '--second-bg-dark' : '--second-bg-light'})`, // Dark background for select
      color: `var(${themeMode === "theme-mode-dark" ? '--txt-color-dark' : '--txt-color-light'}) !important`,
      outline: 'none',
      transition: 'border-color 0.3s',
      fontSize: '14px',
    },
  };

  return (
    <div className='rounded-md' style={styles.fullscreenContainer}>
      {/* Search and filter bar */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.input}
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={styles.select}
        >
          <option value="">Filter by Status</option>
          {[...new Set(filterRecords.map(row => row.status))].map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        highlightOnHover={false}
      />
    </div>
  );

  
}



export default Datatables;
