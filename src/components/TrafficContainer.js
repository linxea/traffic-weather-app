import React from "react";
import TrafficImages from "../components/TrafficImages";
import Loader from "../components/Loader";

const TrafficContainer = ({
  isLoading,
  locationNameMapping,
  selectedLocation,
}) => (
  <>
    {isLoading ? (
      <Loader />
    ) : (
      <TrafficImages
        images={locationNameMapping[selectedLocation]?.images}
        location={selectedLocation}
      />
    )}
  </>
);

export default TrafficContainer;
