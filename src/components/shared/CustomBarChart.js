"use client"

import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const CustomTooltip = ({ active, payload, label })  => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-barchart-tooltip">
        <p className="font-semibold">{`${label}`}</p>
        <p className="text-small">{`All count: ${payload[0].value+payload[1].value}`}</p>
        <p className="text-small mb-1">{`Asian count: ${payload[2].value+payload[3].value}`}</p>
        <div>
          {payload.map((pld,idx) => {
            const totalCount = idx<2?payload[0].value + payload[1].value:payload[2].value + payload[3].value
            const percentage = Math.round(100*pld.value/totalCount) + "%"
            return (
            <div key={idx}>
              <div className="text-small">
                {pld.dataKey}: {pld.value} ({percentage})
              </div>
            </div>
          )})}
        </div>
      </div>
    );
  }

  return null;
};

export default function CustomBarChart (props) {
  const {data, barDataKeys} = props
  if(!barDataKeys || barDataKeys.length == 0){
    return null
  }
  return (
      <BarChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={CustomTooltip}/>
        <Legend />
        <Bar dataKey={barDataKeys[0]} stackId="a" fill="#c9c7eb" />
        <Bar dataKey={barDataKeys[1]} stackId="a" fill="#8884d8" />
        <Bar dataKey={barDataKeys[2]} stackId="b" fill="#ffe3ab" />
        <Bar dataKey={barDataKeys[3]} stackId="b" fill="#ffc658" />
      </BarChart>
  );
}
