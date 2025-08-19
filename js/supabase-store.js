const Store = (() => {
  const BUCKET = 'images';
  const PLACEHOLDER = 'placeholder.jpg';

  const sanitize = (name) => name.replace(/[^\w.\-]+/g,'_');

  async function currentUser() {
    const { data:{ user } } = await supabase.auth.getUser();
    return user;
  }
  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }
  async function logout() { await supabase.auth.signOut(); }

  async function uploadImages(fileList) {
    const user = await currentUser();
    if (!user) throw new Error('Войди как админ');
    const files = Array.from(fileList || []);
    const urls = [];
    for (const f of files) {
      const path = `${user.id}/${Date.now()}-${sanitize(f.name)}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, f, {
        upsert: false,
        contentType: f.type || 'application/octet-stream'
      });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  }

  async function saveProduct(p) {
    const payload = { ...p };
    if (!payload.images || !payload.images.length) payload.images = [PLACEHOLDER];

    if (payload.id) {
      const { error } = await supabase.from('products').update(payload).eq('id', payload.id);
      if (error) throw error;
      return payload.id;
    } else {
      const { data, error } = await supabase.from('products').insert(payload).select().single();
      if (error) throw error;
      return data.id;
    }
  }

  async function listProducts() {
    const { data, error } = await supabase.from('products').select('*').order('id');
    if (error) throw error;
    return data || [];
  }

  async function getProduct(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  function subscribeProducts(onChange) {
    const ch = supabase
      .channel('products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, onChange)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }

  return { currentUser, login, logout, uploadImages, saveProduct, listProducts, getProduct, subscribeProducts, PLACEHOLDER };
})();
window.Store = Store;


