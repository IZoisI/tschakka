/* ===========================================================
   PFF32 // Public Config
   -----------------------------------------------------------
   Beide Werte sind PUBLIC — sie sind dafür gemacht, im
   Browser-JS zu landen. Der anon-Key ist explizit
   öffentlich (Supabase-Konvention) und ist durch
   Row-Level-Security abgesichert.
   Echte Geheimnisse liegen NICHT hier, sondern in
   Edge-Function-Secrets.
   =========================================================== */
window.SUPABASE_CONFIG = {
  url:     "https://lgooopplzotptmdlgwtx.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnb29vcHBsem90cHRtZGxnd3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0Nzk3MzAsImV4cCI6MjA5MzA1NTczMH0.5v8FMZohb8lBZRZYVy_XzTqBldikhRMIvOV67CK6qnk"
};
