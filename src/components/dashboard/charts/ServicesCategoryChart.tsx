'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useAdminContext } from '@/context/AdminContext';

export default function StatsBarChart() {
  const {
    users,
    acceptedServiceCount,
    workerRequestsCount,
    serviceRequestsCount,
    loading
  } = useAdminContext();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const totalUsers = users?.length ?? 0;

  const option = {
    title: {
      text: 'Estadísticas del Sistema',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: {
      type: 'category',
      data: [
        'Total Usuarios',
        'Servicios Activos',
        'Sol. Trabajadores',
        'Sol. Servicios'
      ],
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: totalUsers, itemStyle: { color: '#8B5CF6' } },
          { value: acceptedServiceCount, itemStyle: { color: '#3B82F6' } },
          { value: workerRequestsCount, itemStyle: { color: '#EC4899' } },
          { value: serviceRequestsCount, itemStyle: { color: '#6366F1' } }
        ],
        barWidth: '60%'
      }
    ],
    media: [
      {
        query: {
          maxWidth: 640 // Tailwind sm breakpoint
        },
        option: {
          title: {
            textStyle: {
              fontSize: 14
            }
          },
          xAxis: {
            axisLabel: {
              fontSize: 10
            }
          },
          yAxis: {
            axisLabel: {
              fontSize: 10
            }
          }
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full">
      <ReactECharts
        option={option}
        style={{ height: '300px', width: '100%' }}
        opts={{ renderer: 'svg' }} // mejor para responsividad
      />
    </div>
  );
}
