'use client';  
  
import React from 'react';  
import ReactECharts from 'echarts-for-react';  
  
export default function RevenueChart() {  
  const option = {  
    title: {  
      text: 'Ingresos Mensuales',  
      textStyle: { fontSize: 14 }  
    },  
    xAxis: {  
      type: 'category',  
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']  
    },  
    yAxis: {  
      type: 'value'  
    },  
    series: [{  
      data: [1200, 1900, 3000, 5000, 2000, 3000],  
      type: 'line',  
      smooth: true,  
      itemStyle: { color: '#3B82F6' }  
    }]  
  };  
  
  return (  
    <div className="bg-white rounded-lg shadow-lg p-4">  
      <ReactECharts option={option} style={{ height: '200px', width: '100%' }} />  
    </div>  
  );  
}