
import './App.css';
import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import CustomTooltipForCategories from './categoriesTooltip';
import CustomTooltipForMetaData from './metadataTooltip'

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);


  const categoryColumnDefs = [
    { field: 'Site' },
    { field: 'HREF', tooltipField: 'HREF' },
    { field: 'linkText', tooltipField: 'linkText' },
    { field: 'About', width: 100 },
    { field: 'Contact', width: 110 },
    { field: 'Team', width: 90 },
    { field: 'Investor', width: 110 },
    { field: 'Product', width: 110 },
    { field: 'Career', width: 100 },
    { field: 'News', width: 90 },
    { field: 'ECommerce', width: 130 },
    { field: 'Resources', width: 120 },
    { field: 'Pricing', width: 100 },
    { field: 'Social', width: 100 },
    { field: 'Portal', width: 100 },
    { field: 'Legal', width: 90 },
    { field: 'Blog', width: 90 },
    { field: 'keywordFound', tooltipField: 'keywordFound' },
  ];

  const matchCountColumnDefs = [
    { field: 'About', width: 80 },
    { field: 'Contact', width: 90 },
    { field: 'Team', width: 75 },
    { field: 'Investor', width: 90 },
    { field: 'Product', width: 90 },
    { field: 'Career', width: 80 },
    { field: 'News', width: 73 },
    { field: 'ECommerce', width: 115 },
    { field: 'Resources', width: 100 },
    { field: 'Pricing', width: 80 },
    { field: 'Social', width: 75 },
    { field: 'Portal', width: 78 },
    { field: 'Legal', width: 75 },
    { field: 'Blog', width: 70 },
  ];

  const metaDataColumnDefs = [
    { field: 'metaTagName',tooltipField: 'metaTagName'  },
    { field: 'value',tooltipField: 'value'}
  ]

  const defaultColDefForCategories = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
    tooltipComponent: CustomTooltipForCategories,
  }), []);

  const defaultColDefForMatchCount = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
  }), []);

  const defaultColDefForMetaData = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
    tooltipComponent: CustomTooltipForMetaData
  }), []);


  const [categoryRowData, setCategoryRowData] = useState();
  const [matchCountRowData, setResponsematchCountData] = useState();
  const [metaDataRowData, setResponsemetaData] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    setSubmitClicked(true);
    try {
      const response = await fetch('http://localhost:5000/wowCat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "url": inputValue }),
      });
      const jsonData = await response.json();
      console.log(Object.keys(jsonData).length)
      if (Object.keys(jsonData).length !== 0) {
        setCategoryRowData(jsonData[0]);
        setResponsemetaData(formatMetaData(jsonData[1]));
        setResponsematchCountData([jsonData[2]]);
        setLoading(false)
      } else {
        setLoading(true);
        alert("Couldn't find data for given URL! Please enter a valid URL")
      }
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
      setSubmitClicked(false);
    }

  };

  const formatMetaData = (data) => {
    let dataArray = [];
    Object.entries(data).map(([key, value]) => {
      dataArray.push({ metaTagName: key, value: value })
    })
    return dataArray;
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a' }}>
      <div className='nav'>
        <nav className="navbar">
          <div>
            <h3 style={{ color: "#d6d6d6", fontFamily: 'Trocchi', fontSize: '45px', fontWeight: 'normal', lineHeight: '48px', marginLeft: '20px' }}>
              WowCategorise
            </h3>
          </div>
          <div className="navbar__right">
            <label for="searchBox" style={{ marginRight: '15px', color: '#d6d6d6' }}>Enter a URL to get data: </label>
            <input id="searchBox" type="text" size='50' placeholder="http://example.com/" value={inputValue} className="navbar__search" onChange={handleInputChange} onKeyDown={handleKeypress} />
            <button type="submit" className="navbar__button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </nav>

      </div>
      {loading ? (
        <div id='beforeSubmitDiv'>

          <div className='ag-custom-loading1' style={{ width: '100vw', height: '102vh' }}>
            <span className='loadingText' style={{ fontFamily: 'Trocchi', fontSize: '35px', fontWeight: 'normal', margin: '20px', textAlign: 'center' }}>
              Please Enter a URL in the Textbox an<br /> Click on submit button to get the data
            </span>
          </div>

          <div>
            {submitClicked ? (
              <div><span className="ag-custom-loading"></span></div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

      ) : (
        <div id='afterSubmitDiv'>
          {submitClicked ? (
            <div><span className="ag-custom-loading"></span></div>
          ) : (
            <div className='mycontainer'>
              <div className='left'>
                <div className="ag-theme-balham-dark" style={{ width: '100%', height: 70 }}>
                  <h4 style={{ color: "#d6d6d6", fontFamily: 'Trocchi', fontSize: '20px', fontWeight: 'normal', marginLeft: '20px' }}>
                    Total count of matches per category</h4>
                  <AgGridReact

                    columnDefs={matchCountColumnDefs}
                    rowData={matchCountRowData}
                    defaultColDef={defaultColDefForMatchCount}
                  />

                </div>



                <div className="ag-theme-alpine-dark" style={{ margin: '45px 0 0 0', width: '100%', height: '70.5vh' }}>
                  <h4 style={{ color: "#d6d6d6", fontFamily: 'Trocchi', fontSize: '20px', fontWeight: 'normal', marginLeft: '20px' }}>
                    Details of URLs matched</h4>
                  <AgGridReact

                    columnDefs={categoryColumnDefs}
                    rowData={categoryRowData}
                    defaultColDef={defaultColDefForCategories}
                    tooltipShowDelay={0}
                    //tooltipHideDelay={2000}
                  />
                </div>
              </div>
              <div className='right'>
                <div className="ag-theme-alpine-dark" style={{ textAlign: 'center', width: '100%', height: '85vh' }}>
                  <h4 style={{ color: "#d6d6d6", fontFamily: 'Trocchi', fontSize: '20px', fontWeight: 'normal', marginLeft: '20px' }}>
                    MetaData for Given URL</h4>
                  <AgGridReact
                    columnDefs={metaDataColumnDefs}
                    rowData={metaDataRowData}
                    defaultColDef={defaultColDefForMetaData}
                    pagination={false}
                    tooltipShowDelay={0}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
