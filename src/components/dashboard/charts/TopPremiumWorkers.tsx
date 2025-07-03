/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';  
  
import React, { useState } from 'react';  
import { useAdminContext } from '@/context/AdminContext';  
import Image from 'next/image';  
  
export default function TopPremiumWorkers() {  
  const { users, loading } = useAdminContext();  
  const [sortBy, setSortBy] = useState<'rate' | 'services' | 'name'>('rate');  
  
  if (loading) {  
    return (  
      <div className="bg-white rounded-lg shadow-lg p-6">  
        <div className="animate-pulse">  
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3 mx-auto"></div>  
          <div className="space-y-4">  
            {[1,2,3].map(i => (  
              <div key={i} className="h-16 bg-gray-200 rounded mx-auto max-w-md"></div>  
            ))}  
          </div>  
        </div>  
      </div>  
    );  
  }  
  
  // Filtrar workers premium y ordenar según criterio seleccionado  
  const premiumWorkers = users  
    ?.filter(user => user.role === 'worker' && user.premium)  
    ?.sort((a, b) => {  
      switch (sortBy) {  
        case 'rate':  
          return (b.rate || 0) - (a.rate || 0);  
        case 'services':  
          return (b.services?.length || 0) - (a.services?.length || 0);  
        case 'name':  
          return a.name.localeCompare(b.name);  
        default:  
          return (b.rate || 0) - (a.rate || 0);  
      }  
    })  
    ?.slice(0, 3) || [];  
  
  return (  
    <div className="bg-white rounded-lg shadow-lg p-6">  
      {/* Header centrado con filtros */}  
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">  
        <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">  
          🏆 Top 3 Workers Premium  
        </h3>  
        <select   
          value={sortBy}   
          onChange={(e) => setSortBy(e.target.value as any)}  
          className="text-black text-sm border rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"  
        >  
          <option value="rate">📊 Por Rating</option>  
          <option value="services">🛠️ Por Servicios</option>   
        </select>  
      </div>  
  
      {/* Estadísticas generales centradas */}  
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">  
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">  
          <div className="text-3xl font-bold text-blue-600 mb-1">{premiumWorkers.length}</div>  
          <div className="text-sm text-blue-700 font-medium">Workers Premium</div>  
        </div>  
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">  
          <div className="text-3xl font-bold text-green-600 mb-1">  
            {premiumWorkers.length > 0   
              ? (premiumWorkers.reduce((sum, w) => sum + (w.rate || 0), 0) / premiumWorkers.length).toFixed(1)  
              : '0.0'  
            }  
          </div>  
          <div className="text-sm text-green-700 font-medium">Rating Promedio</div>  
        </div>  
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">  
          <div className="text-3xl font-bold text-purple-600 mb-1">  
            {premiumWorkers.reduce((sum, w) => sum + (w.services?.length || 0), 0)}  
          </div>  
          <div className="text-sm text-purple-700 font-medium">Total Servicios</div>  
        </div>  
      </div>  
        
      {premiumWorkers.length === 0 ? (  
        <div className="text-center py-12">  
          <div className="text-6xl mb-4">🔍</div>  
          <p className="text-gray-500 text-lg">No hay workers premium registrados</p>  
        </div>  
      ) : (  
        <>  
          {/* Lista de workers centrada */}  
          <div className="space-y-6 mb-8">  
            {premiumWorkers.map((worker, index) => (  
              <div key={worker.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">  
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">  
                  {/* Posición y avatar centrados */}  
                  <div className="flex flex-col items-center">  
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full font-bold text-lg mb-2 shadow-lg">  
                      {index + 1}  
                    </div>  
                    <Image  
                      src={worker.user_pic || '/img/user-placeholder.png'}  
                      alt={worker.name}  
                      width={80}  
                      height={80}  
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"  
                    />  
                  </div>  
                    
                  {/* Información del worker centrada */}  
                  <div className="flex-1 text-center sm:text-left">  
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{worker.name}</h4>  
                    <p className="text-gray-600 mb-3">{worker.email}</p>  
                      
                    {/* Badges centrados */}  
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">  
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full border border-yellow-200">  
                        ⭐ {worker.rate?.toFixed(1) || 'Sin calificar'}  
                      </span>  
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full border border-green-200">  
                        👑 Premium  
                      </span>  
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full border border-blue-200">  
                        🛠️ {worker.services?.length || 0} servicios  
                      </span>  
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">  
                        📍 {worker.address?.city || 'Sin ubicación'}  
                      </span>  
                    </div>  
                      
                    {/* Estado de disponibilidad centrado */}  
                    <div className="flex items-center justify-center sm:justify-start mb-4">  
                      <div className={`w-3 h-3 rounded-full mr-2 ${worker.availability ? 'bg-green-500' : 'bg-red-500'}`}></div>  
                      <span className="text-sm font-medium text-gray-700">  
                        {worker.availability ? '✅ Disponible' : '❌ No disponible'}  
                      </span>  
                    </div>  
                      
                  </div>  
                </div>  
              </div>  
            ))}  
          </div>  
  
          {/* Gráfico de comparación centrado */}  
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">  
            <h4 className="text-lg font-bold text-gray-800 mb-6 text-center">📊 Comparación de Ratings</h4>  
            <div className="space-y-4">  
              {premiumWorkers.map((worker, index) => (  
                <div key={worker.id} className="flex items-center">  
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">  
                    {index + 1}  
                  </div>  
                  <span className="w-24 text-sm font-medium text-gray-700 truncate">{worker.name}</span>  
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3 shadow-inner">  
                    <div   
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm"   
                      style={{ width: `${((worker.rate || 0) / 5) * 100}%` }}  
                    ></div>  
                  </div>  
                  <span className="text-sm font-bold text-gray-800 min-w-[3rem] text-right">  
                    {worker.rate?.toFixed(1) || '0.0'} ⭐  
                  </span>  
                </div>  
              ))}  
            </div>  
          </div>  
        </>  
      )}  
    </div>  
  );  
}