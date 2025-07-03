'use client';  
  
import React from 'react';  
import ReactECharts from 'echarts-for-react';  
import { useInvoiceData } from '@/hooks/useInvoiceData';  
import { useAdminContext } from '@/context/AdminContext';  
  
export default function KPIGauges() {  
  const { invoices, loading: invoicesLoading } = useInvoiceData();  
  const { users, loading: usersLoading } = useAdminContext();  
  
  if (invoicesLoading || usersLoading) {  
    return (  
      <div className="bg-white rounded-lg shadow-lg p-6">  
        <div className="animate-pulse">  
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>  
          <div className="h-64 bg-gray-200 rounded"></div>  
        </div>  
      </div>  
    );  
  }  
  
  const totalUsers = users?.length || 0;  
  const premiumUsers = users?.filter(u => u.premium)?.length || 0;  
  const conversionRate = totalUsers > 0 ? (premiumUsers / totalUsers) * 100 : 0;  
  
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);  
  const monthlyGoal = 50000; // Meta mensual ejemplo  
  const goalProgress = Math.min((totalRevenue / monthlyGoal) * 100, 100);  
  
  const option = {  
    title: {  
      text: 'KPIs Principales',  
      left: 'center',  
      textStyle: {  
        fontSize: 16,  
        fontWeight: 'bold',  
        color: '#374151'  
      }  
    },  
    series: [  
      {  
        name: 'Conversión Premium',  
        type: 'gauge',  
        center: ['25%', '60%'],  
        radius: '50%',  
        min: 0,  
        max: 100,  
        splitNumber: 5,  
        axisLine: {  
          lineStyle: {  
            color: [  
              [0.3, '#ff4757'],  
              [0.7, '#ffa502'],  
              [1, '#2ed573']  
            ],  
            width: 8  
          }  
        },  
        pointer: {  
          itemStyle: {  
            color: 'auto'  
          }  
        },  
        axisTick: {  
          distance: -20,  
          length: 6,  
          lineStyle: {  
            color: '#fff',  
            width: 1  
          }  
        },  
        splitLine: {  
          distance: -20,  
          length: 20,  
          lineStyle: {  
            color: '#fff',  
            width: 2  
          }  
        },  
        axisLabel: {  
          color: 'auto',  
          distance: 30,  
          fontSize: 10  
        },  
        detail: {  
          valueAnimation: true,  
          formatter: '{value}%',  
          color: 'auto',  
          fontSize: 14  
        },  
        data: [  
          {  
            value: conversionRate,  
            name: 'Conversión Premium'  
          }  
        ]  
      },  
      {  
        name: 'Meta Mensual',  
        type: 'gauge',  
        center: ['75%', '60%'],  
        radius: '50%',  
        min: 0,  
        max: 100,  
        splitNumber: 5,  
        axisLine: {  
          lineStyle: {  
            color: [  
              [0.5, '#ff4757'],  
              [0.8, '#ffa502'],  
              [1, '#2ed573']  
            ],  
            width: 8  
          }  
        },  
        pointer: {  
          itemStyle: {  
            color: 'auto'  
          }  
        },  
        axisTick: {  
          distance: -20,  
          length: 6,  
          lineStyle: {  
            color: '#fff',  
            width: 1  
          }  
        },  
        splitLine: {  
          distance: -20,  
          length: 20,  
          lineStyle: {  
            color: '#fff',  
            width: 2  
          }  
        },  
        axisLabel: {  
          color: 'auto',  
          distance: 30,  
          fontSize: 10  
        },  
        detail: {  
          valueAnimation: true,  
          formatter: '{value}%',  
          color: 'auto',  
          fontSize: 14  
        },  
        data: [  
          {  
            value: goalProgress,  
            name: 'Meta Mensual'  
          }  
        ]  
      }  
    ]  
  };  
  
  return (  
    <div className="bg-white rounded-lg shadow-lg p-6">  
      <ReactECharts option={option} style={{ height: '250px' }} />  
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">  
        <div>  
          <p className="text-sm text-gray-600">Usuarios Premium</p>  
          <p className="text-xl font-bold text-green-600">{premiumUsers}/{totalUsers}</p>  
        </div>  
        <div>  
          <p className="text-sm text-gray-600">Ingresos del Mes</p>  
          <p className="text-xl font-bold text-blue-600">${totalRevenue.toLocaleString()}</p>  
        </div>  
      </div>  
    </div>  
  );  
}