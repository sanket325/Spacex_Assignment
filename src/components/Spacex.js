import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Example = () => {
  const [data, setData] = useState([]);
  const [dataOnclick, setDataOnclick] = useState([]);
  const [flag, Setflag] = useState(true);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v3/launches/')
      .then(response => {
        setData(response.data.map(item => item));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const fetchData =(item) => {
    setDataOnclick(item);
    Setflag(false);
  };

  const fetchMore = () => {
    setLimit(limit + 5);
  };

  return (
    <>
      {flag
        ?
        <InfiniteScroll
          dataLength={data.slice(0, limit).length}
          next={fetchMore}
          hasMore={limit < data.length}
          loader={<h4>Loading.........................</h4>}
        >
          <div className='container-fluid'>
            <div className="row">
              {data.slice(0, limit).map((item, index) => (
                <div className="col-xs-3 col-sm-6 col-md-6 col-lg-3 p-4" key={item.flight_number} onClick={() => fetchData(item)} >
                  <div className="card cardContainerOne p-5">
                    <img src={item.links.mission_patch_small} className="card-img-top" alt="mission img"/>
                    <div className="card-body">
                      <h5 className="card-title py-3">MISSION Name: {item.mission_name}</h5>
                      <p className="card-text py-1 fw-medium">LAUNCH DATE LOCAL: {item.launch_date_local}</p>
                      <p className="card-text py-1">Flight Number: {item.flight_number}</p>
                      <p className="card-text cardDetails" style={{textAlign: "justify"}}>details: {item.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      :
    <div className='col-12 d-flex justify-content-center detailsWrapper'>
        <div key={dataOnclick.flight_number} className="row" style={{ margin: '10px', backgroundColor: "" }}>
            <div className="col-md-4">
                <div className='leftImg'>
                    <img src={dataOnclick.links.mission_patch_small} className="img-fluid" alt="mission img"/>
                </div>
            </div>
            <div className="col-md-8 px-5">
                <div className="card cardContainerTwo border-0">
                <div className="card-body p-0">
                    <h3 className="card-title pb-2" style={{borderBottom: "5px solid #800000"}}>Rocket Name: {dataOnclick.rocket.rocket_name}</h3>
                    <p className="card-text pt-4">Rocket Name: {dataOnclick.rocket.rocket_name}</p>
                    <p className="card-text">Rocket Type: {dataOnclick.rocket.rocket_type}</p>
                    <p className="card-text">Flight: {dataOnclick.rocket.first_stage.cores[0].flight}</p>
                    <p className="card-text">Nationality: {dataOnclick.rocket.second_stage.payloads[0].nationality}</p>
                    <p className="card-text">Manufacturer: {dataOnclick.rocket.second_stage.payloads[0].manufacturer}</p>
                    <p className="card-text">Payload Type: {dataOnclick.rocket.second_stage.payloads[0].payload_type}</p>
                    <p className="card-text">Orbit Reference System: {dataOnclick.rocket.second_stage.payloads[0].orbit_params.reference_system}</p>
                    <p className="card-text">Orbit Regime: {dataOnclick.rocket.second_stage.payloads[0].orbit_params.regime}</p>
                    <p className="card-text">Launch ID: {dataOnclick.launch_site.site_id}</p>
                    <p className="card-text">Site Name: {dataOnclick.launch_site.site_name}</p>
                    <p className="card-text">Site Name Long: {dataOnclick.launch_site.site_name_long}</p>
                    <button className="mt-4 btn btn-secondary btn-md" onClick={() => window.location.reload()}>Back</button>
                </div>
                </div>
            </div>
        </div>
    </div>

      }
      </>
  );
};

export default Example;
