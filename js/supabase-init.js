<!-- Подключить в <head> ПЕРЕД нашими скриптами на всех страницах: admin.html, catalog.html, product.html -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  // ВСТАВЬ СЮДА свои значения:
  const SUPABASE_URL  = "https://eomznhuianjpodnqgrbc.supabase.co";
  const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbXpuaHVpYW5qcG9kbnFncmJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1ODU1MTMsImV4cCI6MjA3MTE2MTUxM30.b8f55U4vPchQLHHnl_fejKnFHobtR1Dr9JEcyXuCUxw";

  window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
</script>


