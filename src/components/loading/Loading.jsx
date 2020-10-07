import React from 'react';
import './Loading.styles.scss'

const Loading = () => {
  return (
    <div className='loading'>
      <h1>Loading in progress..<br />
        Please refresh your web page if the recipes do not show up in 20 seconds.
      </h1>
      <div id="cooking">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div id="area">
          <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
          </div>
          <div id="pancake">
            <div id="pastry"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;