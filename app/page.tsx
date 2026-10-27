"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownToLine, ArrowUpRight, Bell, CheckCircle2, ChevronDown,
  CircleHelp, ClipboardList, CreditCard, FileText, Film, FolderOpen, LayoutDashboard,
  Menu, MessageCircle, Plus, Search, Settings, ShieldCheck, Stethoscope, Users, Wallet,
  X, Play, Clock3
} from "lucide-react";

type VideoStatus = "Prêt à publier" | "En montage" | "À valider";
type VideoItem = {
  id: number;
  title: string;
  client: string;
  date: string;
  duration: string;
  status: VideoStatus;
  description: string;
  hashtags: string;
};

const initialVideos: VideoItem[] = [
  { id: 1, title: "Pourquoi une dent peut mourir sans douleur ?", client: "Cabinet Dr. Salma", date: "27 oct. 2026", duration: "00:42", status: "Prêt à publier", description: "Une dent peut perdre sa vitalité sans provoquer de douleur. Voici les signes à surveiller et pourquoi un contrôle est important.", hashtags: "#Dentiste #SantéBuccoDentaire #Rabat" },
  { id: 2, title: "Le saignement des gencives : faut-il s'inquiéter ?", client: "Centre Dentaire Nour", date: "26 oct. 2026", duration: "00:36", status: "À valider", description: "Le saignement des gencives n'est pas à ignorer. Découvrez les causes possibles et quand consulter.", hashtags: "#Gencives #Dentiste #Prévention" },
  { id: 3, title: "Les erreurs fréquentes après une extraction", client: "Cabinet Dr. Salma", date: "24 oct. 2026", duration: "00:51", status: "En montage", description: "Quelques conseils généraux pour favoriser une bonne récupération après une extraction dentaire.", hashtags: "#ExtractionDentaire #ConseilsSanté #Dentiste" },
];

const navItems = [
  { label: "Vue d’ensemble", icon: LayoutDashboard },
  { label: "Clients", icon: Users },
  { label: "Vidéos", icon: Film },
  { label: "Scripts", icon: FileText },
  { label: "Abonnements", icon: ClipboardList },
  { label: "Paiements", icon: Wallet },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Vue d’ensemble");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const videos = useMemo(() => initialVideos.filter((video) => {
    const matchesQuery = (video.title + " " + video.client).toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "Tous les statuts" || video.status === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, statusFilter]);

  const sectionTitle = activeNav === "Vue d’ensemble" ? "Vue d’ensemble" : activeNav;
  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(label + " copié.");
    } catch {
      setNotice("Copie non disponible sur cet appareil. Sélectionnez le texte manuellement.");
    }
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <main className="app-shell">
      {mobileNav && <button aria-label="Fermer le menu" className="mobile-scrim" onClick={() => setMobileNav(false)} />}
      <aside className={"sidebar " + (mobileNav ? "sidebar-open" : "")}>
        <div className="brand">
          <div className="brand-mark">A</div>
          <div><strong>amazur</strong><span>ESPACE CLIENT</span></div>
          <button className="icon-button sidebar-close" aria-label="Fermer" onClick={() => setMobileNav(false)}><X size={18}/></button>
        </div>
        <div className="workspace-label">ESPACE AGENCE</div>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={"nav-item " + (activeNav === label ? "nav-active" : "")} onClick={() => { setActiveNav(label); setMobileNav(false); }}>
              <Icon size={18} strokeWidth={1.8}/><span>{label}</span>
              {label === "Vidéos" && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><strong>Besoin d’aide ?</strong><p>Contactez votre équipe Amazur pour toute question.</p><button onClick={() => setNotice("La messagerie sera activée dans une prochaine version.")}>Contacter l’agence <ArrowUpRight size={14}/></button></div>
          <button className="nav-item muted-nav" onClick={() => setNotice("Les paramètres seront disponibles après la configuration des comptes.")}><Settings size={18}/><span>Paramètres</span></button>
          <div className="profile-row"><div className="avatar agency-avatar">A</div><div className="profile-copy"><strong>Amazur Agency</strong><span>Administrateur · Démo</span></div><ChevronDown size={16} className="profile-chevron"/></div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Ouvrir le menu" onClick={() => setMobileNav(true)}><Menu size={21}/></button>
          <div className="breadcrumbs">Amazur <span>/</span> <strong>{sectionTitle}</strong></div>
          <div className="topbar-actions"><span className="demo-pill"><span/> Version de démonstration</span><button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice("Les notifications seront activées après la mise en place des comptes.")}><Bell size={18}/><i/></button><div className="avatar agency-avatar">A</div></div>
        </header>

        <div className="content-wrap">
          <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> PORTAIL DE GESTION</div><h1>{sectionTitle}</h1><p className="page-subtitle">Suivez les contenus, les clients et l’activité de votre agence.</p></div><button className="primary-button" onClick={() => setNotice("L’ajout de clients sera activé après la connexion à la base de données.")}><Plus size={17}/> Nouveau client</button></div>

          <div className="stat-grid">
            <div className="stat-card"><div className="stat-top"><span>Clients actifs</span><span className="stat-icon icon-blue"><Users size={18}/></span></div><div className="stat-value">12</div><div className="stat-foot"><span className="positive"><Activity size={14}/> +2</span> ce mois-ci <span className="foot-end">Exemple</span></div></div>
            <div className="stat-card"><div className="stat-top"><span>Vidéos livrées</span><span className="stat-icon icon-purple"><Film size={18}/></span></div><div className="stat-value">36 <small>/ 48</small></div><div className="progress-track"><span style={{width:"75%"}}/></div><div className="stat-foot">75 % des livrables <span className="foot-end">Exemple</span></div></div>
            <div className="stat-card"><div className="stat-top"><span>Revenus encaissés</span><span className="stat-icon icon-green"><CreditCard size={18}/></span></div><div className="stat-value">24 500 <small>DH</small></div><div className="stat-foot"><span className="positive"><ArrowUpRight size={14}/> Suivi</span> des paiements <span className="foot-end">Exemple</span></div></div>
            <div className="stat-card"><div className="stat-top"><span>Reste à encaisser</span><span className="stat-icon icon-orange"><Wallet size={18}/></span></div><div className="stat-value">8 000 <small>DH</small></div><div className="stat-foot"><span className="due-dot"/> Paiements à suivre <span className="foot-end">Exemple</span></div></div>
          </div>

          <section className="panel video-panel">
            <div className="panel-heading"><div><h2>Bibliothèque de vidéos</h2><p>Les derniers contenus de vos clients</p></div><button className="text-button" onClick={() => setActiveNav("Vidéos")}>Voir toutes les vidéos <ArrowUpRight size={15}/></button></div>
            <div className="filter-row"><label className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une vidéo ou un client…"/></label><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filtrer par statut"><option>Tous les statuts</option><option>Prêt à publier</option><option>À valider</option><option>En montage</option></select></div>
            <div className="video-list">
              {videos.map((video, index) => <article className="video-row" key={video.id}>
                <button className={"video-thumb thumb-" + index} aria-label={"Voir " + video.title} onClick={() => setSelectedVideo(video)}><Play size={19} fill="currentColor"/><span>{video.duration}</span></button>
                <div className="video-info"><strong>{video.title}</strong><span>{video.client} <i/> {video.date}</span><div className="mobile-status"><Status status={video.status}/></div></div>
                <div className="video-status"><Status status={video.status}/></div>
                <button className="row-action" onClick={() => setSelectedVideo(video)}>Détails <ArrowUpRight size={15}/></button>
              </article>)}
              {videos.length === 0 && <div className="empty-state">Aucune vidéo ne correspond à votre recherche.</div>}
            </div>
            <div className="panel-footer"><span>Affichage de {videos.length} vidéo(s) de démonstration</span><button onClick={() => setNotice("Le téléversement sécurisé sera ajouté avec Supabase Storage.")}>Gérer la bibliothèque <ArrowUpRight size={15}/></button></div>
          </section>

          <div className="bottom-grid">
            <section className="panel compact-panel"><div className="panel-heading"><div><h2>Suivi des abonnements</h2><p>État des forfaits clients</p></div><ClipboardList size={19} className="panel-heading-icon"/></div><div className="subscription-item"><div className="client-mini"><div className="avatar avatar-teal">DS</div><div><strong>Cabinet Dr. Salma</strong><span>Pack Croissance</span></div></div><div className="subscription-right"><strong>4 500 DH</strong><span className="status-chip chip-green">Actif</span></div></div><div className="subscription-item"><div className="client-mini"><div className="avatar avatar-lilac">CN</div><div><strong>Centre Dentaire Nour</strong><span>Pack Essentiel</span></div></div><div className="subscription-right"><strong>2 500 DH</strong><span className="status-chip chip-orange">À renouveler</span></div></div><button className="panel-link" onClick={() => setActiveNav("Abonnements")}>Voir les abonnements <ArrowUpRight size={15}/></button></section>
            <section className="panel compact-panel"><div className="panel-heading"><div><h2>Activité récente</h2><p>Dernières mises à jour</p></div><Activity size={19} className="panel-heading-icon"/></div><div className="activity-item"><span className="activity-icon activity-upload"><FolderOpen size={16}/></span><div><strong>Nouvelle vidéo ajoutée</strong><p>Cabinet Dr. Salma · Exemple</p><span>Il y a 2 heures</span></div></div><div className="activity-item"><span className="activity-icon activity-payment"><CheckCircle2 size={16}/></span><div><strong>Paiement enregistré</strong><p>Centre Dentaire Nour · Exemple</p><span>Hier</span></div></div><div className="activity-item"><span className="activity-icon activity-script"><FileText size={16}/></span><div><strong>Script mis à jour</strong><p>Prévention dentaire · Exemple</p><span>Il y a 2 jours</span></div></div></section>
          </div>
          <footer className="footer"><span>© 2026 Amazur · Portail client</span><span><ShieldCheck size={13}/> Prototype — aucune donnée réelle</span></footer>
        </div>
      </section>

      {selectedVideo && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedVideo(null)}><section className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-title" onClick={(e) => e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">DÉTAILS DU CONTENU</span><h2 id="video-title">{selectedVideo.title}</h2></div><button className="icon-button" aria-label="Fermer" onClick={() => setSelectedVideo(null)}><X size={19}/></button></div><div className="modal-video-preview"><Play size={27} fill="currentColor"/><span>Aperçu vidéo à connecter</span></div><div className="modal-field"><label>Description du post</label><p>{selectedVideo.description}</p><button className="secondary-button" onClick={() => copyText(selectedVideo.description, "Description")}><ClipboardList size={15}/> Copier la description</button></div><div className="modal-field"><label>Hashtags</label><p className="hashtags">{selectedVideo.hashtags}</p><button className="secondary-button" onClick={() => copyText(selectedVideo.hashtags, "Hashtags")}><ClipboardList size={15}/> Copier les hashtags</button></div><div className="modal-bottom"><Status status={selectedVideo.status}/><button className="primary-button" onClick={() => setNotice("Le téléchargement sera activé une fois le stockage vidéo connecté.")}><ArrowDownToLine size={16}/> Télécharger la vidéo</button></div><p className="modal-note"><Clock3 size={13}/> Les contenus affichés sont des exemples. Aucun fichier vidéo réel n’est encore connecté.</p></section></div>}
      {notice && <div className="toast" role="status"><CheckCircle2 size={17}/>{notice}<button aria-label="Fermer le message" onClick={() => setNotice("")}><X size={14}/></button></div>}
    </main>
  );
}

function Status({ status }: { status: VideoStatus }) {
  const className = status === "Prêt à publier" ? "status-ready" : status === "À valider" ? "status-review" : "status-editing";
  return <span className={"status-pill " + className}><span/>{status}</span>;
}