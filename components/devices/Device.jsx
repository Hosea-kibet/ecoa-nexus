import React from "react";
import Associationhisttable from "../../components/associationhisttable/Associationhisttable";
// import Widget from "../../components/widget/Widget";
import Deviceusagetable from "../../components/deviceusagetable/Deviceusagetable"
const Device = (deviceSerialId) => {
  return (
    <div className="dvcmngmt">
      <h1 className='text-xl text-primary my-6 uppercase'>DEVICE MANAGEMENT</h1>
      <div className="asshist w-full overflow-x-scroll">
        <span className="aschist">Association History</span>
        <Associationhisttable />
      </div>
      <div className="dusage mt-6">
        <div className="dusagetitle">
          <span className="dusaget">Device Usage .</span>
          <span className="dusageecoa">ECOA EPC - 40043271</span>
        </div>
        <div className="dusagewidgets">
          {/* <Widget type="customersonboarded"  />
          <Widget type="epcsold"  />
          <Widget type="repaidinloans"  /> */}
        </div>
        <div className="dusagetable w-full overflow-x-scroll">
          <Deviceusagetable deviceSerialId={deviceSerialId}/>
        </div>
      </div>
    </div>
  );
};

export default Device;
