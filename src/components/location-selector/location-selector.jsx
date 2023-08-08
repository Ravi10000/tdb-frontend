import styles from "./location-selector.module.scss";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import LocationCard from "#components/location-card/location-card";
import { locationsInfo } from "#data/location-info";

function LocationSelector({ closeBookNow, setSelectedLocation }) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isNeabySelected, setIsNearbySelected] = useState(false);
  return (
    <div className={styles.locationSelector}>
      <div className={styles.head}>
        <h4 className={styles.heading}>Choose a location</h4>
        <div className={styles.closeBtn} onClick={closeBookNow}>
          <RxCross1 className={styles.closeIcon} />
        </div>
      </div>
      <div className={styles.subHead}>
        <div
          className={`${styles.action} ${isNeabySelected && styles.active}`}
          onClick={() => {
            setIsNearbySelected((prevState) => !prevState);
            setIsSearchBarOpen(false);
          }}
        >
          <p>NEARBY</p>
          <HiOutlineLocationMarker className={styles.actionIcon} />
        </div>
        <div
          className={`${styles.action} ${isSearchBarOpen && styles.active}`}
          //   style={{ filter: isSearchBarOpen ? "invert(1)" : "unset" }}
          onClick={() => {
            setIsSearchBarOpen((prevState) => !prevState);
            setIsNearbySelected(false);
          }}
        >
          <p>SEARCH</p>
          <LuSearch className={styles.actionIcon} />
        </div>
      </div>
      {isSearchBarOpen && (
        <label className={styles.searchBox} htmlFor="book-now-search-bar">
          <LuSearch className={styles.searchIcon} />
          <input
            type="text"
            id="book-now-search-bar"
            placeholder="Search by shop name or address"
          />
        </label>
      )}
      <div className={styles.locations}>
        {locationsInfo?.map((locationInfo) => (
          <LocationCard
            locationInfo={locationInfo}
            key={locationInfo?.name}
            setSelectedLocation={setSelectedLocation}
          />
        ))}
      </div>
    </div>
  );
}

export default LocationSelector;
