'use client';  
  
import React from 'react';  
import ReactECharts from 'echarts-for-react';  
import { useInvoiceData } from '@/hooks/useInvoiceData';  
  
export default function PremiumAnalysis() {  
  const { processPremiumAnalysis, loading } = useInvoiceData();  
  
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
  
  const { premiumRevenue, regularRevenue } = processPremiumAnalysis();  
  
  const option = {  
    title: {  
      text: 'Ingresos: Premium vs Regular',  
      left: 'center',  
      textStyle: {  
        fontSize: 16, // Tamaño de fuente ajustado  
        fontWeight: 'bold',  
        color: '#374151'  
      }  
    },  
    tooltip: {  
      trigger: 'axis',  
      axisPointer: {  
        type: 'shadow'  
      },  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {  
        return `${params[0].name}<br/>Ingresos: $${params[0].value.toLocaleString()}`;  
      }  
    },  
    grid: {  
      left: '3%',  
      right: '4%',  
      bottom: '3%',  
      containLabel: true  
    },  
    xAxis: {  
      type: 'category',  
      data: ['Usuarios Premium', 'Usuarios Regulares'],  
      axisLabel: {  
        fontSize: 10 // Tamaño de fuente ajustado  
      }  
    },  
    yAxis: {  
      type: 'value',  
      axisLabel: {  
        formatter: '${value}',  
        fontSize: 10 // Tamaño de fuente ajustado  
      }  
    },  
    series: [  
      {  
        type: 'bar',  
        data: [  
          {   
            value: premiumRevenue,   
            itemStyle: { color: '#10B981' },  
            name: 'Premium'  
          },  
          {   
            value: regularRevenue,   
            itemStyle: { color: '#6B7280' },  
            name: 'Regular'  
          }  
        ],  
        barWidth: '50%'  
      }  
    ]  
  };  
  
  return (  
    <div className="bg-white rounded-lg shadow-lg p-6">  
      <ReactECharts option={option} style={{ height: '250px' }} />  
    </div>  
  );  
}