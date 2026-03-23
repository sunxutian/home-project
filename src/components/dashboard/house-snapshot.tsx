import React from "react";

export function HouseSnapshot() {
  return (
    <section className="panel accent-panel">
      <p className="eyebrow">House Snapshot</p>
      <h2>130 Durie Ave</h2>
      <p>Closter, NJ 07624</p>
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
