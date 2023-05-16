
import './App.css';
import React, { useCallback,useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');



  const categoryColumnDefs = [
    { field: 'Site' },
    { field: 'HREF' },
    { field: 'linkText' },
    { field: 'About' },
    { field: 'Contact' },
    { field: 'Team' },
    { field: 'Investor' },
    { field: 'Product' },
    { field: 'Career' },
    { field: 'News' },
    { field: 'ECommerce' },
    { field: 'Resources' },
    { field: 'Pricing' },
    { field: 'Social' },
    { field: 'Portal' },
    { field: 'Legal' },
    { field: 'Blog' },
    { field: 'keywordFound' },
  ];

  const matchCountColumnDefs = [
    { field: 'About' },
    { field: 'Contact' },
    { field: 'Team' },
    { field: 'Investor' },
    { field: 'Product' },
    { field: 'Career' },
    { field: 'News' },
    { field: 'ECommerce' },
    { field: 'Resources' },
    { field: 'Pricing' },
    { field: 'Social' },
    { field: 'Portal' },
    { field: 'Legal' },
    { field: 'Blog' },
  ];

  const metaDataColumnDefs = [
    { field: 'metaTagName' },
    { field: 'value' }
  ]

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  
  }), []);
  const [categoryRowData, setCategoryRowData] = useState();
  const [matchCountRowData, setResponsematchCountData] = useState();
  const [metaDataRowData, setResponsemetaData] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/wowCat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "url": inputValue }),
      });
      const jsonData = await response.json();

      setCategoryRowData(jsonData[0]);
      setResponsemetaData(formatMetaData(jsonData[1]));
      setResponsematchCountData([jsonData[2]]);

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const formatMetaData = (data) => {
    let dataArray = [];
    Object.entries(data).map(([key, value]) => {
      dataArray.push({ metaTagName: key, value: value })
    })
    return dataArray;
  }

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setCategoryRowData(data));
  }, []);


  return (
    <div>
      <div className='nav'>
      <nav className="navbar">
      <div className="h3css">
        <h3 style={{color: "#7c795d", fontFamily: 'Trocchi',fontSize: '45px', fontWeight: 'normal',lineHeight: '48px', marginLeft: '20px' }}>
          WowCategorise
          </h3>
      </div>
      <div className="navbar__right">
        <label for="searchBox" style={{marginRight:'15px'}}>Enter a URL to get data: </label>
        <input id="searchBox" type="text" size='50' placeholder="http://example.com/" value={inputValue} className="navbar__search" onChange={handleInputChange} />
        <button className="navbar__button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </nav>
    
      </div>

      <div className='mycontainer'>
        <div className='left'>
          <div className="ag-theme-alpine" style={{ width: '100%', height: 100 }}>
            <AgGridReact

              columnDefs={matchCountColumnDefs}
              rowData={matchCountRowData}
              defaultColDef={defaultColDef}
              pagination={false}
            />

          </div>



          <div className="ag-theme-alpine" style={{ margin:'5px 0 0 0',width: '100%', height: '100%' }}>
            <AgGridReact

              columnDefs={categoryColumnDefs}
              rowData={categoryRowData}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationAutoPageSize={true}
              onGridReady={onGridReady}
           
            />
          </div>
        </div>
        <div className='right'>
        <div className="ag-theme-alpine" style={{ width: '100%', height: '88vh' }}>
          <AgGridReact

            columnDefs={metaDataColumnDefs}
            rowData={metaDataRowData}
            defaultColDef={defaultColDef}
            pagination={false}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default App;
