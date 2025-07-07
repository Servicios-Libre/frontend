'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useAdminContext } from '@/context/AdminContext';

export default function SystemActivityChart() {
  const {
    workerRequestsCount,
    serviceRequestsCount,
    activeServicesCount,
    loading
  } = useAdminContext();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Datos de ejemplo
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const workerRequestsData = [12, 19, 15, 25, 22, workerRequestsCount];
  const serviceRequestsData = [8, 15, 12, 18, 16, serviceRequestsCount];
  const activeServicesData = [20, 35, 28, 42, 38, activeServicesCount];

  const option = {
    title: {
      text: 'Actividad del Sistema',
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
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Solicitudes de Trabajadores', 'Solicitudes de Servicios', 'Servicios Activos'],
      top: 30,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: months,
        axisLabel: {
          fontSize: 12
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 12
        }
      }
    ],
    series: [
      {
        name: 'Solicitudes de Trabajadores',
        type: 'line',
        stack: 'Total',
        areaStyle: { opacity: 0.6 },
        emphasis: { focus: 'series' },
        data: workerRequestsData,
        itemStyle: { color: '#8B5CF6' }
      },
      {
        name: 'Solicitudes de Servicios',
        type: 'line',
        stack: 'Total',
        areaStyle: { opacity: 0.6 },
        emphasis: { focus: 'series' },
        data: serviceRequestsData,
        itemStyle: { color: '#EC4899' }
      },
      {
        name: 'Servicios Activos',
        type: 'line',
        stack: 'Total',
        areaStyle: { opacity: 0.6 },
        emphasis: { focus: 'series' },
        data: activeServicesData,
        itemStyle: { color: '#3B82F6' }
      }
    ],
    media: [
      {
        query: {
          maxWidth: 640 // sm
        },
        option: {
          title: {
            textStyle: {
              fontSize: 14
            }
          },
          legend: {
            textStyle: {
              fontSize: 10
            },
            top: 20
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
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
