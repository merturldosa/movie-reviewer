/**
 * Keep backend server alive by pinging it periodically
 * Prevents Render free tier from sleeping after 15 minutes of inactivity
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

let pingInterval = null;

export const startKeepAlive = () => {
  // Don't start multiple intervals
  if (pingInterval) {
    return;
  }

  console.log('🔄 Keep-alive service started - pinging backend every 10 minutes');

  // Ping immediately on start
  pingBackend();

  // Then ping every 10 minutes
  pingInterval = setInterval(() => {
    pingBackend();
  }, PING_INTERVAL);
};

export const stopKeepAlive = () => {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
    console.log('⏹️ Keep-alive service stopped');
  }
};

const pingBackend = async () => {
  try {
    const healthUrl = API_BASE_URL.replace('/api', '/api/health');
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend ping successful:', data.message);
    } else {
      console.warn('⚠️ Backend ping failed with status:', response.status);
    }
  } catch (error) {
    console.error('❌ Backend ping error:', error.message);
  }
};

// Auto-start when module loads (only in production)
if (import.meta.env.PROD) {
  startKeepAlive();
}
