'use client';  
  
import React from 'react';  
import ReactECharts from 'echarts-for-react';  
  
export default function PaymentMethodChart() {  
  const option = {  
    title: {  
      text: 'Métodos de Pago',  
      textStyle: { fontSize: 14 }  
    },  
    series: [{  
      type: 'pie',  
      radius: '60%',  
      data: [  
        { value: 35, name: 'MercadoPago' },  
        { value: 25, name: 'Stripe' },  
        { value: 20, name: 'Efectivo' },  
        { value: 20, name: 'Transferencia' }  
      ]  
    }]  
  };  
  
  return (  
    <div className="bg-white rounded-lg shadow-lg p-4">  
      <ReactECharts option={option} style={{ height: '200px', width: '100%' }} />  
    </div>  
  );  
}