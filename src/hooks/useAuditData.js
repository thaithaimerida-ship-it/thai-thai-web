import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

/**
 * Hook que consume /ecosystem/ads-summary del ads-agent.
 * Retorna data en el mismo formato que el viejo auditData.js estático.
 * Incluye loading, error, y refetch.
 */
export default function useAuditData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/ecosystem/ads-summary`, {
        headers: { 'Accept': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();

      if (json.status === 'no_data') {
        throw new Error('No hay datos de auditoría disponibles aún.');
      }

      // Mapear al formato que AdminDashboard espera
      setData({
        summary: json.summary,
        campaigns: json.campaigns,
        proposals_count: json.proposals_count,
        landing_page: json.landing_page,
      });
      setLastUpdate(json.timestamp);
    } catch (err) {
      console.error('[useAuditData] Error:', err.message);
      setError(err.message);
      // Fallback a datos estáticos si la API falla
      try {
        const { auditData } = await import('../data/auditData');
        setData(auditData);
      } catch {
        // Sin fallback disponible
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Refrescar cada 5 minutos
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, lastUpdate, refetch: fetchData };
}
