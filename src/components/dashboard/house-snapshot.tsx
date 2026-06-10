import React from "react";

type HouseSnapshotProps = {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
};

export function HouseSnapshot({
  addressLine1,
  city,
  state,
  postalCode
}: HouseSnapshotProps) {
  return (
    <section className="panel accent-panel">
      <p className="eyebrow">House Snapshot</p>
      <h2>{addressLine1}</h2>
      <p>
        {city}, {state} {postalCode}
      </p>
      <dl className="snapshot-list">
        <div>
          <dt>Pickup Side</dt>
          <dd>West side</dd>
        </div>
        <div>
          <dt>Garbage</dt>
          <dd>Tuesdays and Fridays</dd>
        </div>
        <div>
          <dt>Recycling</dt>
          <dd>Wednesdays by 6:00 a.m.</dd>
        </div>
      </dl>
    </section>
  );
}
