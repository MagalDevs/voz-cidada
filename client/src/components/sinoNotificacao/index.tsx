"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell } from 'lucide-react';

const SinoNotificacao = () => {
  const { 
    notifications, 
    unreadCount, 
    fetchNotifications, 
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Ícone do sino */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          fetchNotifications();
        }}
        className="p-1 rounded-full hover:bg-white/10 transition-colors relative"
      >
        <Bell className="h-6 w-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Dropdown de notificações com animação */}
      <div className={`absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
          <h4 className="font-medium text-gray-900">Notificações</h4>
          {unreadCount > 0 && (
            <button 
              onClick={markAllNotificationsAsRead}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>
        
        {/* Lista de notificações */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            [...notifications]
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 border-b border-gray-100 cursor-pointer ${!notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  onClick={() => {
                    markNotificationAsRead(notification.id);
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-gray-900">{notification.title}</h5>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <small className="text-xs text-gray-500 block mt-1">
                    {new Date(notification.timestamp).toLocaleString('pt-BR')}
                  </small>
                </div>
              ))
          ) : (
            <p className="p-4 text-center text-gray-500">Nenhuma notificação</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinoNotificacao;