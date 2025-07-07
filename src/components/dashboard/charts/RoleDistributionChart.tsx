'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useAdminContext } from '@/context/AdminContext';

export default function RoleDistributionChart() {
  const { users, loading } = useAdminContext();

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

  const totalAdmins = users?.filter((u) => u.role === 'admin').length ?? 0;
  const totalWorkers = users?.filter((u) => u.role === 'worker').length ?? 0;
  const totalRegularUsers = users?.filter((u) => u.role === 'user').length ?? 0;

  const option = {
    title: {
      text: 'Distribución de Usuarios por Rol',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: 'Usuarios',
        type: 'pie',
        radius: '50%',
        data: [
          { value: totalRegularUsers, name: 'Clientes', itemStyle: { color: '#8B5CF6' } },
          { value: totalWorkers, name: 'Trabajadores', itemStyle: { color: '#EC4899' } },
          { value: totalAdmins, name: 'Administradores', itemStyle: { color: '#6366F1' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    media: [
      {
        query: {
          maxWidth: 640 // Tailwind 'sm'
        },
        option: {
          legend: {
            orient: 'horizontal',
            top: 'bottom',
            left: 'center'
          },
          title: {
            textStyle: {
              fontSize: 14
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
        opts={{ renderer: 'svg' }} // SVG a veces se adapta mejor
      />
    </div>
  );
}
