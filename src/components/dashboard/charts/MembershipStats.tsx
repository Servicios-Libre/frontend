'use client';  
  
import React from 'react';  
import { useAdminContext } from '@/context/AdminContext';  
  
export default function MembershipStats() {  
  const { users, loading } = useAdminContext();  
  
  if (loading) {  
    return (  
      <div className="bg-white rounded-lg shadow-lg p-6">  
        <div className="animate-pulse">  
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/2 mx-auto"></div>  
          <div className="space-y-3">  
            {[1,2,3,4].map(i => (  
              <div key={i} className="h-12 bg-gray-200 rounded"></div>  
            ))}  
          </div>  
        </div>  
      </div>  
    );  
  }  
  
  const totalUsers = users?.length || 0;  
  const premiumUsers = users?.filter(u => u.premium)?.length || 0;  
  const premiumWorkers = users?.filter(u => u.role === 'worker' && u.premium)?.length || 0;  
  const premiumClients = users?.filter(u => u.role === 'user' && u.premium)?.length || 0;  
  const totalWorkers = users?.filter(u => u.role === 'worker')?.length || 0;  
  const totalClients = users?.filter(u => u.role === 'user')?.length || 0;  
  const totalAdmins = users?.filter(u => u.role === 'admin')?.length || 0;  
  
  const conversionRate = totalUsers > 0 ? ((premiumUsers / totalUsers) * 100).toFixed(1) : '0';  
  const workerConversionRate = totalWorkers > 0 ? ((premiumWorkers / totalWorkers) * 100).toFixed(1) : '0';  
  const clientConversionRate = totalClients > 0 ? ((premiumClients / totalClients) * 100).toFixed(1) : '0';  
  
  return (  
    <div className="bg-white rounded-lg shadow-lg p-6">  
      {/* Header centrado */}  
      <div className="text-center mb-6">  
        <h3 className="text-xl font-bold text-gray-800 mb-2">  
          💎 Estadísticas de Membresías Premium  
        </h3>  
        <p className="text-gray-600 text-sm">  
          Análisis detallado de conversión y distribución de usuarios premium  
        </p>  
      </div>  
        
      {/* Métricas principales centradas */}  
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">  
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">  
          <div className="text-3xl font-bold text-blue-600 mb-1">{premiumUsers}</div>  
          <div className="text-sm text-blue-700 font-medium">Total Premium</div>  
          <div className="text-xs text-blue-500 mt-1">de {totalUsers} usuarios</div>  
        </div>  
          
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-shadow">  
          <div className="text-3xl font-bold text-green-600 mb-1">{conversionRate}%</div>  
          <div className="text-sm text-green-700 font-medium">Tasa Conversión</div>  
          <div className="text-xs text-green-500 mt-1">general</div>  
        </div>  
          
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">  
          <div className="text-3xl font-bold text-purple-600 mb-1">{premiumWorkers}</div>  
          <div className="text-sm text-purple-700 font-medium">Workers Premium</div>  
          <div className="text-xs text-purple-500 mt-1">{workerConversionRate}% conversión</div>  
        </div>  
          
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">  
          <div className="text-3xl font-bold text-orange-600 mb-1">{premiumClients}</div>  
          <div className="text-sm text-orange-700 font-medium">Clientes Premium</div>  
          <div className="text-xs text-orange-500 mt-1">{clientConversionRate}% conversión</div>  
        </div>  
      </div>  
  
      {/* Sección de análisis detallado */}  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">  
        {/* Distribución por rol con barras de progreso */}  
        <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">  
          <h4 className="font-bold text-gray-800 mb-4 text-center">📊 Distribución por Rol</h4>  
          <div className="space-y-4">  
            <div className="flex flex-col space-y-2">  
              <div className="flex justify-between items-center">  
                <span className="text-sm font-medium text-gray-700">👷 Workers Premium:</span>  
                <span className="font-bold text-purple-600">{premiumWorkers}/{totalWorkers}</span>  
              </div>  
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">  
                <div   
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm"   
                  style={{ width: `${(premiumWorkers / Math.max(totalWorkers, 1)) * 100}%` }}  
                ></div>  
              </div>  
              <span className="text-xs text-gray-500 text-center">{workerConversionRate}% de conversión</span>  
            </div>  
              
            <div className="flex flex-col space-y-2">  
              <div className="flex justify-between items-center">  
                <span className="text-sm font-medium text-gray-700">👤 Clientes Premium:</span>  
                <span className="font-bold text-orange-600">{premiumClients}/{totalClients}</span>  
              </div>  
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">  
                <div   
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500 shadow-sm"   
                  style={{ width: `${(premiumClients / Math.max(totalClients, 1)) * 100}%` }}  
                ></div>  
              </div>  
              <span className="text-xs text-gray-500 text-center">{clientConversionRate}% de conversión</span>  
            </div>  
          </div>  
        </div>  
  
        {/* Resumen ejecutivo */}  
        <div className="p-5 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">  
          <h4 className="font-bold text-gray-800 mb-4 text-center">📈 Resumen Ejecutivo</h4>  
          <div className="space-y-3">  
            <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">  
              <span className="text-sm text-gray-600">👥 Usuarios Totales:</span>  
              <span className="font-bold text-gray-800">{totalUsers}</span>  
            </div>  
            <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">  
              <span className="text-sm text-gray-600">💎 Penetración Premium:</span>  
              <span className="font-bold text-green-600">{conversionRate}%</span>  
            </div>  
            <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">  
              <span className="text-sm text-gray-600">🎯 Mejor Conversión:</span>  
              <span className="font-bold text-blue-600">  
                {parseFloat(workerConversionRate) > parseFloat(clientConversionRate) ? 'Workers' : 'Clientes'}  
              </span>  
            </div>  
            <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">  
              <span className="text-sm text-gray-600">⚙️ Administradores:</span>  
              <span className="font-bold text-indigo-600">{totalAdmins}</span>  
            </div>  
          </div>  
        </div>  
      </div>  
  
      {/* Insights y recomendaciones */}  
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-5 border border-yellow-200">  
        <h4 className="font-bold text-gray-800 mb-3 text-center">💡 Insights Clave</h4>  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
          <div className="text-center">  
            <div className="text-2xl mb-2">  
              {parseFloat(workerConversionRate) > parseFloat(clientConversionRate) ? '🚀' : '📊'}  
            </div>  
            <p className="text-sm text-gray-700">  
              <strong>  
                {parseFloat(workerConversionRate) > parseFloat(clientConversionRate)   
                  ? 'Workers convierten mejor'   
                  : 'Clientes convierten mejor'  
                }  
              </strong>  
            </p>  
            <p className="text-xs text-gray-600 mt-1">  
              {parseFloat(workerConversionRate) > parseFloat(clientConversionRate)  
                ? `${workerConversionRate}% vs ${clientConversionRate}%`  
                : `${clientConversionRate}% vs ${workerConversionRate}%`  
              }  
            </p>  
          </div>  
            
          <div className="text-center">  
            <div className="text-2xl mb-2">  
              {parseFloat(conversionRate) >= 20 ? '🎉' : parseFloat(conversionRate) >= 10 ? '📈' : '⚠️'}  
            </div>  
            <p className="text-sm text-gray-700">  
              <strong>  
                {parseFloat(conversionRate) >= 20   
                  ? 'Excelente conversión'   
                  : parseFloat(conversionRate) >= 10   
                    ? 'Buena conversión'  
                    : 'Oportunidad de mejora'  
                }  
              </strong>  
            </p>  
            <p className="text-xs text-gray-600 mt-1">  
              Tasa actual: {conversionRate}%  
            </p>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
}