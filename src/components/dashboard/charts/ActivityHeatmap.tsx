/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';  
  
import React from 'react';  
import ReactECharts from 'echarts-for-react';  
import { useInvoiceData } from '@/hooks/useInvoiceData';  
  
export default function ActivityHeatmap() {  
  const { invoices, loading } = useInvoiceData();  
  
  if (loading) {  
    return (  
      <div className="bg-white rounded-lg shadow-lg p-6">  
        <div className="animate-pulse">  
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>  
          <div className="h-64 bg-gray-200 rounded"></div>  
        </div>  
      </div>  
    );  
  }  
  
  const generateHeatmapData = () => {  
    const data: [number, number, number][] = [];  
    const activityMap = new Map<string, number>();  
  
    // Solo usar datos de facturas (sin user.created_at que no existe)  
    invoices.forEach(invoice => {  
      const date = new Date(invoice.createdAt);  
      const day = date.getDay();  
      const hour = date.getHours();  
      const key = `${day}-${hour}`;  
      activityMap.set(key, (activityMap.get(key) || 0) + 1);  
    });  
  
    for (let day = 0; day < 7; day++) {  
      for (let hour = 0; hour < 24; hour++) {  
        const key = `${day}-${hour}`;  
        const value = activityMap.get(key) || 0;  
        data.push([hour, day, value]);  
      }  
    }  
  
    return data;  
  };  
  
  const heatmapData = generateHeatmapData();  
  const maxValue = Math.max(...heatmapData.map(item => item[2]), 1);  
  
  const option = {  
    title: {  
      text: 'Actividad por Hora y Día',  
      left: 'center',  
      textStyle: {  
        fontSize: 16,  
        fontWeight: 'bold',  
        color: '#374151'  
      }  
    },  
    tooltip: {  
      position: 'top',  
      formatter: (params: any) => {  
        const hour = params.data[0];  
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];  
        const day = dayNames[params.data[1]];  
        const value = params.data[2];  
        return `${day} ${hour.toString().padStart(2, '0')}:00<br/>Actividad: ${value}`;  
      }  
    },  
    grid: {  
      height: '60%',  
      top: '20%',  
      left: '10%',  
      right: '10%'  
    },  
    xAxis: {  
      type: 'category',  
      data: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),  
      splitArea: { show: true },  
      axisLabel: { interval: 3, fontSize: 10 }  
    },  
    yAxis: {  
      type: 'category',  
      data: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],  
      splitArea: { show: true }  
    },  
    visualMap: {  
      min: 0,  
      max: maxValue,  
      calculable: true,  
      orient: 'horizontal',  
      left: 'center',  
      bottom: '5%',  
      inRange: {  
        color: ['#f0f9ff', '#0ea5e9', '#0369a1', '#1e40af']  
      }  
    },  
    series: [{  
      name: 'Actividad',  
      type: 'heatmap',  
      data: heatmapData,  
      label: { show: false }  
    }]  
  };  
  
  return (  
    <div className="bg-white rounded-lg shadow-lg p-6">  
      <ReactECharts option={option} style={{ height: '300px' }} />  
    </div>  
  );  
}