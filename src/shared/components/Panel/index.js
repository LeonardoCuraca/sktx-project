import React from 'react';
import './Panel.css';

export default function Panel({title, data, color, icon}) {
    return (
      <div className="panel" style={{backgroundColor: color, opacity: 0.8}}>
        <div className="media no-margin">
          <div className="media-body">
            <h3>{data}</h3>
            <span>{title}</span>
          </div>
          <div className="media-right media-middle">
            <i className={icon + " icon"} style={{opacity: 0.75, fontSize: "48px", lineHeight: 1}}></i>
          </div>
        </div>
      </div>
    )
}
