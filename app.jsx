// Supabase Configuration - WICHTIG: Hier deine eigenen Werte eintragen!
const SUPABASE_URL = 'https://uoimyjydmiyeffdhiyve.supabase.co'; // z.B. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaW15anlkbWl5ZWZmZGhpeXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzkwNDAsImV4cCI6MjA4MzkxNTA0MH0.SuUXcPvoz6e2JEchQrfkNPTor2p3GQBLqQ3HmugTRXo'; // Langer String von Supabase

// Supabase Client initialisieren
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { useState, useEffect, useRef } = React;

// Styles
const styles = `
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
  .gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }
  
  .dashboard {
    min-height: 100vh;
    padding: 32px;
  }
  
  .header {
    margin-bottom: 32px;
    animation: slideDown 0.6s ease-out;
  }
  
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .header-title {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .logo {
    width: 56px;
    height: 56px;
    background: white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
  
  .logo .material-icons {
    font-size: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .title-text h1 {
    color: white;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  
  .title-text p {
    color: rgba(255,255,255,0.8);
    font-size: 14px;
  }
  
  .user-badge {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px);
    padding: 12px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    border: 1px solid rgba(255,255,255,0.2);
  }
  
  .user-avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  
  .card {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    border: 1px solid rgba(255,255,255,0.8);
    animation: fadeInUp 0.6s ease-out;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .section-title {
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
  }
  
  .tabs {
    display: flex;
    gap: 8px;
    background: #f5f5f5;
    padding: 6px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  
  .tab {
    flex: 1;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #666;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .tab:hover {
    color: #667eea;
  }
  
  .tab.active {
    background: white;
    color: #667eea;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  
  .btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  }
  
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn-secondary {
    background: #f5f5f5;
    color: #1a1a1a;
    box-shadow: none;
  }
  
  .btn-secondary:hover {
    background: #e8e8e8;
  }
  
  .btn-small {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .btn-danger {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .alert {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    animation: fadeIn 0.3s;
  }
  
  .alert-info {
    background: #e3f2fd;
    color: #0d47a1;
    border: 2px solid #90caf9;
  }
  
  .alert-warning {
    background: #fff3e0;
    color: #e65100;
    border: 2px solid #ffb74d;
  }
  
  .alert-success {
    background: #e8f5e9;
    color: #2e7d32;
    border: 2px solid #81c784;
  }
  
  .event-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
    border: 2px solid transparent;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  
  .event-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .event-card:hover {
    border-color: #667eea;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }
  
  .event-card:hover::before {
    opacity: 1;
  }
  
  .event-card.active::before {
    opacity: 1;
  }
  
  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    gap: 16px;
  }
  
  .event-title h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
  }
  
  .badge {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  
  .badge.active {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
  }
  
  .event-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #666;
    font-size: 14px;
  }
  
  .meta-item .material-icons {
    font-size: 20px;
    color: #667eea;
  }
  
  .event-actions {
    display: flex;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    flex-wrap: wrap;
  }
  
  .post-item {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s;
    border: 2px solid transparent;
  }
  
  .post-item:hover {
    background: white;
    border-color: #667eea;
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
  }
  
  .post-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .post-icon .material-icons {
    color: white;
    font-size: 24px;
  }
  
  .post-content {
    flex: 1;
    min-width: 0;
  }
  
  .post-content h4 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
  }
  
  .post-content p {
    font-size: 13px;
    color: #666;
    font-family: 'Courier New', monospace;
  }
  
  .icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: none;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  
  .icon-btn:hover {
    background: #f5f5f5;
  }
  
  .icon-btn.danger {
    color: #f5576c;
  }
  
  .icon-btn.danger:hover {
    background: #fff5f7;
  }
  
  .dialog-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
  }
  
  .dialog-overlay.show {
    display: flex;
  }
  
  .dialog {
    background: white;
    border-radius: 24px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 24px 64px rgba(0,0,0,0.2);
  }
  
  .dialog-header {
    padding: 32px 32px 24px;
    border-bottom: 2px solid #f5f5f5;
  }
  
  .dialog-header h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
  }
  
  .dialog-content {
    padding: 32px;
  }
  
  .dialog-footer {
    padding: 24px 32px;
    border-top: 2px solid #f5f5f5;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 10px;
  }
  
  input[type="text"],
  input[type="url"],
  input[type="date"],
  input[type="time"],
  input[type="number"] {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e8e8e8;
    border-radius: 12px;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s;
    background: #fafafa;
  }
  
  input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  .helper-text {
    font-size: 13px;
    color: #666;
    margin-top: 8px;
  }
  
  .switch-group {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 12px;
  }
  
  .switch {
    position: relative;
    width: 52px;
    height: 28px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e0e0e0;
    transition: 0.4s;
    border-radius: 28px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  input:checked + .slider {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  input:checked + .slider:before {
    transform: translateX(24px);
  }
  
  .loading {
    text-align: center;
    padding: 48px 24px;
    color: #666;
  }
  
  .loading .material-icons {
    font-size: 48px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideDown {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    .dashboard {
      padding: 16px;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .tabs {
      flex-direction: column;
    }
    
    .event-meta {
      grid-template-columns: 1fr;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Main App Component
function App() {
  const [view, setView] = useState('home');
  
  return (
    <div className="gradient-bg">
      {view === 'home' && <HomeView onSelectView={setView} />}
      {view === 'admin' && <AdminView onBack={() => setView('home')} />}
      {view === 'participant' && <ParticipantView onBack={() => setView('home')} />}
    </div>
  );
}

// Home View
function HomeView({ onSelectView }) {
  return (
    <div className="gradient-bg" style={{ padding: '32px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div className="logo" style={{ margin: '0 auto 24px' }}>
          <span className="material-icons">directions_bike</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>Bänkli Challenge</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>
          Fahre so viele Bänkli wie möglich ab und sammle Punkte!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onSelectView('participant')}>
            <span className="material-icons">play_arrow</span>
            Als Teilnehmer starten
          </button>
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onSelectView('admin')}>
            <span className="material-icons">admin_panel_settings</span>
            Admin-Bereich
          </button>
        </div>
        <p style={{ marginTop: '24px', fontSize: '13px', color: '#999' }}>Version 1.0 • Progressive Web App</p>
      </div>
    </div>
  );
}

// Admin View
function AdminView({ onBack }) {
  const [tab, setTab] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  // Load events from Supabase
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          posts (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
      
      const active = data?.find(e => e.is_active);
      setActiveEvent(active);
    } catch (error) {
      console.error('Error loading events:', error);
      alert('Fehler beim Laden der Events: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = async (eventId) => {
    try {
      // Deactivate all events first
      await supabase
        .from('events')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Activate selected event
      const { error } = await supabase
        .from('events')
        .update({ is_active: true })
        .eq('id', eventId);

      if (error) throw error;
      await loadEvents();
    } catch (error) {
      console.error('Error setting active event:', error);
      alert('Fehler: ' + error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Event wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      await loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Fehler beim Löschen: ' + error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Posten wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      await loadEvents();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Fehler beim Löschen: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="gradient-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading">
          <span className="material-icons">refresh</span>
          <p style={{ marginTop: '16px' }}>Lade Events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-top">
          <div className="header-title">
            <div className="logo">
              <span className="material-icons">directions_bike</span>
            </div>
            <div className="title-text">
              <h1>Bänkli Challenge</h1>
              <p>Admin Dashboard</p>
            </div>
          </div>
          <div className="user-badge">
            <div className="user-avatar">A</div>
            <span>Admin</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <h2 className="section-title">Event Management</h2>
          <button className="btn" onClick={() => setShowEventDialog(true)}>
            <span className="material-icons">add</span>
            Neues Event
          </button>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}>
            <span className="material-icons">event</span>
            Events
          </button>
          <button className={`tab ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
            <span className="material-icons">place</span>
            Posten
          </button>
        </div>

        {/* Events Tab */}
        {tab === 0 && (
          <div>
            {events.length === 0 ? (
              <div className="alert alert-info">
                <span className="material-icons">info</span>
                <div>Noch keine Events erstellt. Klicke auf "Neues Event" um zu starten.</div>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className={`event-card ${event.is_active ? 'active' : ''}`}>
                  <div className="event-header">
                    <div className="event-title">
                      <h3>{event.title}</h3>
                    </div>
                    {event.is_active && (
                      <span className="badge active">
                        <span className="material-icons">bolt</span>
                        Aktiv
                      </span>
                    )}
                  </div>
                  <div className="event-meta">
                    <div className="meta-item">
                      <span className="material-icons">schedule</span>
                      <span>Start: {event.start_date} um {event.start_time} Uhr</span>
                    </div>
                    <div className="meta-item">
                      <span className="material-icons">alarm</span>
                      <span>Ende: {event.end_date} um {event.end_time} Uhr</span>
                    </div>
                    <div className="meta-item">
                      <span className="material-icons">place</span>
                      <span>Posten: {event.posts?.length || 0}</span>
                    </div>
                    <div className="meta-item">
                      <span className="material-icons">link</span>
                      <span>Google Form {event.google_form_url ? 'konfiguriert' : 'fehlt'}</span>
                    </div>
                  </div>
                  <div className="event-actions">
                    {!event.is_active && (
                      <button className="btn btn-small btn-secondary" onClick={() => handleSetActive(event.id)}>
                        <span className="material-icons">publish</span>
                        Als aktiv setzen
                      </button>
                    )}
                    <button className="btn btn-small btn-danger" onClick={() => handleDeleteEvent(event.id)}>
                      <span className="material-icons">delete</span>
                      Löschen
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Posts Tab */}
        {tab === 1 && (
          <div>
            {!activeEvent ? (
              <div className="alert alert-warning">
                <span className="material-icons">warning</span>
                <div>Bitte zuerst ein Event als aktiv setzen, um Posten zu verwalten.</div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div className="alert alert-info" style={{ flex: 1, margin: 0, minWidth: '250px' }}>
                    <span className="material-icons">info</span>
                    <p>Aktives Event: <strong>{activeEvent.title}</strong> mit {activeEvent.posts?.length || 0} Posten</p>
                  </div>
                  <button className="btn" onClick={() => setShowPostDialog(true)}>
                    <span className="material-icons">add_location</span>
                    Neuer Posten
                  </button>
                </div>

                {activeEvent.posts?.length === 0 ? (
                  <div className="alert alert-info">
                    <span className="material-icons">info</span>
                    <div>Noch keine Posten definiert. Füge den ersten Posten hinzu!</div>
                  </div>
                ) : (
                  activeEvent.posts?.map((post) => (
                    <div key={post.id} className="post-item">
                      <div className="post-icon">
                        <span className="material-icons">place</span>
                      </div>
                      <div className="post-content">
                        <h4>{post.name}</h4>
                        <p>{post.latitude}, {post.longitude}</p>
                      </div>
                      <button className="icon-btn danger" onClick={() => handleDeletePost(post.id)}>
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        )}

        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #f5f5f5' }}>
          <button className="btn btn-secondary" onClick={onBack}>
            <span className="material-icons">arrow_back</span>
            Zurück
          </button>
        </div>
      </div>

      {/* Event Dialog */}
      <EventDialog 
        show={showEventDialog} 
        onClose={() => setShowEventDialog(false)} 
        onSave={loadEvents}
      />

      {/* Post Dialog */}
      <PostDialog 
        show={showPostDialog} 
        onClose={() => setShowPostDialog(false)} 
        eventId={activeEvent?.id}
        onSave={loadEvents}
      />
    </div>
  );
}

// Event Dialog Component
function EventDialog({ show, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    start_time: '14:00',
    end_date: '',
    end_time: '17:00',
    google_form_url: '',
    is_active: false
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.start_date || !formData.end_date || !formData.google_form_url) {
      alert('Bitte fülle alle Pflichtfelder aus.');
      return;
    }

    setSaving(true);
    try {
      // If setting as active, deactivate all others first
      if (formData.is_active) {
        await supabase
          .from('events')
          .update({ is_active: false })
          .neq('id', '00000000-0000-0000-0000-000000000000');
      }

      const { error } = await supabase
        .from('events')
        .insert([formData]);

      if (error) throw error;

      alert('Event erfolgreich erstellt!');
      onSave();
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        start_date: '',
        start_time: '14:00',
        end_date: '',
        end_time: '17:00',
        google_form_url: '',
        is_active: false
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Fehler beim Erstellen: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  return (
    <div className="dialog-overlay show" onClick={(e) => e.target.className.includes('dialog-overlay') && onClose()}>
      <div className="dialog">
        <form onSubmit={handleSubmit}>
          <div className="dialog-header">
            <h2>Neues Event erstellen</h2>
          </div>
          <div className="dialog-content">
            <div className="form-group">
              <label>Event-Titel *</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="z.B. Bänkli Challenge Herbst 2024"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Startdatum *</label>
                <input 
                  type="date" 
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Startzeit *</label>
                <input 
                  type="time" 
                  value={formData.start_time}
                  onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Enddatum *</label>
                <input 
                  type="date" 
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Endzeit *</label>
                <input 
                  type="time" 
                  value={formData.end_time}
                  onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Google Form URL *</label>
              <input 
                type="url" 
                value={formData.google_form_url}
                onChange={(e) => setFormData({...formData, google_form_url: e.target.value})}
                placeholder="https://docs.google.com/forms/d/e/xxxxx/formResponse"
              />
              <div className="helper-text">
                URL des Google Formulars für Check-Ins
              </div>
            </div>

            <div className="form-group">
              <div className="switch-group">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  />
                  <span className="slider"></span>
                </label>
                <span style={{fontWeight: 500}}>Als aktives Event setzen</span>
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Abbrechen</button>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Erstelle...' : 'Event erstellen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Post Dialog Component
function PostDialog({ show, onClose, eventId, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: ''
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.latitude || !formData.longitude) {
      alert('Bitte fülle alle Felder aus.');
      return;
    }

    if (!eventId) {
      alert('Kein aktives Event ausgewählt.');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('posts')
        .insert([{
          ...formData,
          event_id: eventId,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude)
        }]);

      if (error) throw error;

      alert('Posten erfolgreich hinzugefügt!');
      onSave();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        latitude: '',
        longitude: ''
      });
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Fehler beim Hinzufügen: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  return (
    <div className="dialog-overlay show" onClick={(e) => e.target.className.includes('dialog-overlay') && onClose()}>
      <div className="dialog">
        <form onSubmit={handleSubmit}>
          <div className="dialog-header">
            <h2>Neuen Posten hinzufügen</h2>
          </div>
          <div className="dialog-content">
            <div className="form-group">
              <label>Posten-Name *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="z.B. Bänkli beim Rosenberg"
              />
            </div>

            <div className="form-group">
              <label>Breitengrad (Latitude) *</label>
              <input 
                type="number" 
                step="0.000001"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                placeholder="47.423889"
              />
            </div>

            <div className="form-group">
              <label>Längengrad (Longitude) *</label>
              <input 
                type="number" 
                step="0.000001"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                placeholder="9.373611"
              />
            </div>

            <div className="alert alert-info">
              <span className="material-icons">info</span>
              <p>Tipp: GPS-Koordinaten kannst du von Google Maps kopieren.</p>
            </div>
          </div>
          <div className="dialog-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Abbrechen</button>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Füge hinzu...' : 'Posten hinzufügen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Participant View
function ParticipantView({ onBack }) {
  const [started, setStarted] = useState(false);
  const [participantName, setParticipantName] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);
  const [checkedPosts, setCheckedPosts] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [loading, setLoading] = useState(true);
  const watchIdRef = useRef(null);
  const wakeLockRef = useRef(null);

  useEffect(() => {
    loadActiveEvent();
  }, []);

  const loadActiveEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`*, posts(*)`)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setActiveEvent(data);
    } catch (error) {
      console.error('Error loading active event:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const checkNearbyPosts = async (position) => {
    if (!activeEvent || !position) return;

    const { latitude, longitude } = position.coords;
    
    for (const post of activeEvent.posts) {
      if (checkedPosts.some(cp => cp.post_id === post.id)) continue;

      const distance = calculateDistance(
        latitude, 
        longitude, 
        post.latitude, 
        post.longitude
      );

      if (distance <= 15) {
        await handleCheckIn(post, position);
      }
    }
  };

  const handleCheckIn = async (post, position) => {
    const timestamp = new Date().toISOString();
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('check_ins')
        .insert([{
          event_id: activeEvent.id,
          post_id: post.id,
          participant_name: participantName,
          timestamp: timestamp,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }]);

      if (error) throw error;

      // Update local state
      setCheckedPosts(prev => [...prev, {
        post_id: post.id,
        post_name: post.name,
        timestamp: timestamp
      }]);

      // Vibrate
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }

      // Send to Google Form
      if (activeEvent.google_form_url) {
        const formData = new FormData();
        formData.append('entry.569449595', participantName);
        formData.append('entry.325445212', post.name);
        formData.append('entry.352391264', new Date(timestamp).toLocaleString('de-CH'));

        fetch(activeEvent.google_form_url, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        }).catch(err => console.log('Google Form error:', err));
      }

      alert(`✓ ${post.name} erfasst!`);
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Fehler beim Check-In: ' + error.message);
    }
  };

  const startTracking = async () => {
    if (!participantName || !activeEvent) return;

    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }

      if ('geolocation' in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            setCurrentPosition(position);
            checkNearbyPosts(position);
          },
          (error) => {
            console.error('GPS error:', error);
            alert('GPS-Fehler. Bitte Standort aktivieren.');
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
          }
        );

        setIsTracking(true);
        setStarted(true);
      }
    } catch (error) {
      console.error('Error starting tracking:', error);
    }
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
    }
    setIsTracking(false);
  };

  useEffect(() => {
    if (!activeEvent || !started) return;

    const updateTime = () => {
      const now = new Date();
      const endDateTime = new Date(`${activeEvent.end_date}T${activeEvent.end_time}`);
      const diff = endDateTime - now;

      if (diff <= 0) {
        setTimeRemaining('Event beendet');
        stopTracking();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [activeEvent, started]);

  useEffect(() => {
    return () => stopTracking();
  }, []);

  if (loading) {
    return (
      <div className="gradient-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading">
          <span className="material-icons">refresh</span>
          <p style={{ marginTop: '16px' }}>Lade Event...</p>
        </div>
      </div>
    );
  }

  if (!activeEvent) {
    return (
      <div className="gradient-bg" style={{ padding: '32px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="alert alert-warning">
            <span className="material-icons">warning</span>
            <div>Kein aktives Event gefunden. Bitte kontaktiere den Administrator.</div>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: '16px' }} onClick={onBack}>
            <span className="material-icons">arrow_back</span>
            Zurück
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="gradient-bg" style={{ padding: '32px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="logo" style={{ margin: '0 auto 24px' }}>
            <span className="material-icons">directions_bike</span>
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>{activeEvent.title}</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px' }}>
            Start: {activeEvent.start_date} {activeEvent.start_time} Uhr<br />
            Ende: {activeEvent.end_date} {activeEvent.end_time} Uhr<br />
            Posten gesamt: {activeEvent.posts?.length || 0}
          </p>

          <div style={{ marginBottom: '24px' }}>
            <label>Dein Name</label>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Vorname Nachname"
              style={{ width: '100%' }}
            />
          </div>

          <div className="alert alert-info" style={{ textAlign: 'left' }}>
            <span className="material-icons">info</span>
            <div>
              <strong>So funktioniert's:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>GPS-Tracking läuft automatisch</li>
                <li>Bei 15m Radius zum Posten: Check-In</li>
                <li>Handy vibriert bei Erfassung</li>
              </ul>
            </div>
          </div>

          <button 
            className="btn" 
            style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
            onClick={startTracking}
            disabled={!participantName}
          >
            <span className="material-icons">play_arrow</span>
            Challenge starten
          </button>

          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={onBack}>
            <span className="material-icons">arrow_back</span>
            Zurück
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px', color: 'white' }}>
        <h3>{participantName}</h3>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{checkedPosts.length}</div>
            <div style={{ fontSize: '14px' }}>von {activeEvent.posts?.length || 0} Posten</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{timeRemaining}</div>
            <div style={{ fontSize: '14px' }}>verbleibend</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.3)', height: '8px', borderRadius: '4px', marginTop: '16px' }}>
          <div style={{ 
            background: 'white', 
            height: '100%', 
            borderRadius: '4px',
            width: `${(checkedPosts.length / (activeEvent.posts?.length || 1)) * 100}%`,
            transition: 'width 0.3s'
          }}></div>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: isTracking ? '#43e97b' : '#f5576c' }}>
            <span className="material-icons">{isTracking ? 'gps_fixed' : 'gps_off'}</span>
            <span style={{ fontWeight: 600 }}>{isTracking ? 'GPS aktiv' : 'GPS inaktiv'}</span>
            {currentPosition && (
              <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#666' }}>
                Genauigkeit: ±{Math.round(currentPosition.coords.accuracy)}m
              </span>
            )}
          </div>

          <h3 style={{ marginBottom: '16px' }}>Erfasste Posten</h3>
          {checkedPosts.length === 0 ? (
            <p style={{ color: '#666' }}>Noch keine Posten erfasst. Fahre los!</p>
          ) : (
            checkedPosts.map((cp, index) => (
              <div key={cp.post_id} style={{ 
                padding: '12px', 
                background: '#f8f9fa', 
                borderRadius: '8px', 
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{cp.post_name}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    {new Date(cp.timestamp).toLocaleTimeString('de-CH')}
                  </div>
                </div>
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  #{index + 1}
                </div>
              </div>
            ))
          )}

          <div className="alert alert-warning" style={{ marginTop: '24px' }}>
            <span className="material-icons">battery_alert</span>
            <p>GPS-Tracking verbraucht viel Akku!</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary" 
              style={{ flex: 1 }}
              onClick={() => {
                if (confirm('Challenge wirklich beenden?')) {
                  stopTracking();
                  onBack();
                }
              }}
            >
              <span className="material-icons">stop</span>
              Beenden
            </button>
            {!isTracking && (
              <button className="btn" style={{ flex: 1 }} onClick={startTracking}>
                <span className="material-icons">play_arrow</span>
                GPS starten
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
