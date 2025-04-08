import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/RestaurantPage.css';

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('infos'); // 'infos', 'menu', 'avis', 'photos'

  // Récupérer les informations du restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${id}`);
        setRestaurant(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du restaurant:', error);
        setError('Erreur lors de la récupération du restaurant. Veuillez réessayer.');
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  // Changer d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Formater les horaires d'ouverture
  const formatOpeningHours = (hours) => {
    if (!hours || !hours.open || !hours.close) return 'Non renseigné';
    return `${hours.open} - ${hours.close}`;
  };

  if (loading) {
    return <div className="loading">Chargement des informations du restaurant...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!restaurant) {
    return <div className="not-found">Restaurant non trouvé.</div>;
  }

  return (
    <div className="restaurant-page">
      <div className="restaurant-header" style={{
        backgroundImage: restaurant.photos && restaurant.photos.length > 0 
          ? `url(${restaurant.photos[0]})` 
          : 'url(/assets/default-restaurant-bg.jpg)'
      }}>
        <div className="restaurant-header-overlay">
          <div className="restaurant-header-content">
            <h1>{restaurant.name}</h1>
            
            <div className="restaurant-meta">
              <div className="restaurant-rating">
                <span className="stars">{restaurant.rating.average.toFixed(1)}</span>
                <span className="count">({restaurant.rating.count} avis)</span>
              </div>
              
              <div className="restaurant-badges">
                {restaurant.halal === 'certified' && <span className="badge halal-certified">Certifié Halal</span>}
                {restaurant.halal === 'claimed' && <span className="badge halal-claimed">Halal</span>}
                {restaurant.halal === 'partial' && <span className="badge halal-partial">Menu Halal Partiel</span>}
                
                <span className="price-range">{restaurant.priceRange}</span>
              </div>
              
              <div className="restaurant-cuisine">
                {restaurant.cuisine.join(' • ')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="restaurant-content">
        <div className="restaurant-tabs">
          <button 
            className={`tab ${activeTab === 'infos' ? 'active' : ''}`}
            onClick={() => handleTabChange('infos')}
          >
            Informations
          </button>
          
          <button 
            className={`tab ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => handleTabChange('menu')}
          >
            Menu
          </button>
          
          <button 
            className={`tab ${activeTab === 'avis' ? 'active' : ''}`}
            onClick={() => handleTabChange('avis')}
          >
            Avis
          </button>
          
          <button 
            className={`tab ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => handleTabChange('photos')}
          >
            Photos
          </button>
        </div>
        
        <div className="tab-content">
          {/* Onglet Informations */}
          {activeTab === 'infos' && (
            <div className="infos-tab">
              <div className="info-section">
                <h2>Adresse</h2>
                <p className="address">
                  {restaurant.address.street}<br />
                  {restaurant.address.postalCode} {restaurant.address.city}<br />
                  {restaurant.address.country}
                </p>
                
                <div className="map-container">
                  <iframe 
                    title="Restaurant location"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                      `${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.city}`
                    )}`}
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="directions-btn">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      `${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.city}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Itinéraire
                  </a>
                </div>
              </div>
              
              <div className="info-section">
                <h2>Horaires d'ouverture</h2>
                <div className="opening-hours">
                  <div className="day">
                    <span>Lundi:</span>
                    <span>{formatOpeningHours(restaurant.openingHours?.monday)}</span>
                  </div>
                  <div className="day">
                    <span>Mardi:</span>
                    <span>{formatOpeningHours(restaurant.openingHours?.tuesday)}</span>
                  </div>
                  <div className="day">
                    <span>Mercredi:</span>
                    <span>{formatOpeningHours(restaurant.openingHours?.wednesday)}</span>
                  </div>
                  <div className="day">
                    <span>Jeudi:</span>
                    <span>{formatOpeningHours(restaurant.openingHours?.thursday)}</span>
                  </div>
                  <div className="day">
                    <span>Vendredi:</span>
                    <span>{formatOpeningHours(restaurant.openingHours?.friday)}</span>
                  </div>
                  <div className="day">
                    <span>Samedi:</span>
                    <span>{formatOpeningHours(restaurant.openingHours?.saturday)}</span>
                  </div>
                  <div className="day">
                    <span>Dimanche:</span>
                    <span>{formatOpeningHours(restaurant.openingHours?.sunday)}</span>
                  </div>
                </div>
              </div>
              
              <div className="info-section">
                <h2>Contact</h2>
                <div className="contact-info">
                  {restaurant.contact?.phone && (
                    <div className="contact-item">
                      <span className="contact-label">Téléphone:</span>
                      <a href={`tel:${restaurant.contact.phone}`}>{restaurant.contact.phone}</a>
                    </div>
                  )}
                  
                  {restaurant.contact?.email && (
                    <div className="contact-item">
                      <span className="contact-label">Email:</span>
                      <a href={`mailto:${restaurant.contact.email}`}>{restaurant.contact.email}</a>
                    </div>
                  )}
                  
                  {restaurant.contact?.website && (
                    <div className="contact-item">
                      <span className="contact-label">Site web:</span>
                      <a href={restaurant.contact.website} target="_blank" rel="noopener noreferrer">
                        {restaurant.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="info-section">
                <h2>Réseaux sociaux</h2>
                <div className="social-links">
                  {restaurant.socialMedia?.instagram && (
                    <a 
                      href={`https://www.instagram.com/${restaurant.socialMedia.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link instagram"
                    >
                      Instagram
                    </a>
                  )}
                  
                  {restaurant.socialMedia?.facebook && (
                    <a 
                      href={`https://www.facebook.com/${restaurant.socialMedia.facebook}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link facebook"
                    >
                      Facebook
                    </a>
                  )}
                  
                  {restaurant.socialMedia?.tiktok && (
                    <a 
                      href={`https://www.tiktok.com/@${restaurant.socialMedia.tiktok}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link tiktok"
                    >
                      TikTok
                    </a>
                  )}
                </div>
              </div>
              
              <div className="info-section">
                <h2>Services</h2>
                <div className="services-list">
                  {restaurant.services.dineIn && <span className="service">Sur place</span>}
                  {restaurant.services.takeAway && <span className="service">À emporter</span>}
                  {restaurant.services.delivery && <span className="service">Livraison</span>}
                </div>
              </div>
            </div>
          )}
          
          {/* Onglet Menu */}
          {activeTab === 'menu' && (
            <div className="menu-tab">
              {restaurant.menu && restaurant.menu.length > 0 ? (
                <div className="menu-categories">
                  {/* Regrouper les plats par catégorie */}
                  {Object.entries(
                    restaurant.menu.reduce((acc, item) => {
                      if (!acc[item.category]) acc[item.category] = [];
                      acc[item.category].push(item);
                      return acc;
                    }, {})
                  ).map(([category, items]) => (
                    <div key={category} className="menu-category">
                      <h2>{category}</h2>
                      <div className="menu-items">
                        {items.map((item, index) => (
                          <div key={index} className="menu-item">
                            <div className="menu-item-content">
                              <div className="menu-item-header">
                                <h3>{item.name}</h3>
                                <span className="menu-item-price">{item.price.toFixed(2)} €</span>
                              </div>
                              {item.description && (
                                <p className="menu-item-description">{item.description}</p>
                              )}
                            </div>
                            {item.photo && (
                              <div className="menu-item-image">
                                <img src={item.photo} alt={item.name} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-menu">
                  <p>Le menu n'est pas encore disponible pour ce restaurant.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Onglet Avis */}
          {activeTab === 'avis' && (
            <div className="avis-tab">
              <div className="reviews-header">
                <h2>Avis des clients</h2>
                <div className="overall-rating">
                  <div className="rating-number">{restaurant.rating.average.toFixed(1)}</div>
                  <div className="rating-details">
                    <div className="stars">{'★'.repeat(Math.round(restaurant.rating.average))}{'☆'.repeat(5 - Math.round(restaurant.rating.average))}</div>
                    <div className="total-reviews">{restaurant.rating.count} avis</div>
                  </div>
                </div>
              </div>
              
              {/* Ici vous pouvez intégrer les avis des utilisateurs */}
              <div className="reviews-list">
                <p>Les avis des utilisateurs seront affichés ici.</p>
              </div>
              
              <div className="add-review">
                <button className="btn btn-primary">Laisser un avis</button>
              </div>
            </div>
          )}
          
          {/* Onglet Photos */}
          {activeTab === 'photos' && (
            <div className="photos-tab">
              {restaurant.photos && restaurant.photos.length > 0 ? (
                <div className="photo-gallery">
                  {restaurant.photos.map((photo, index) => (
                    <div key={index} className="gallery-item">
                      <img src={photo} alt={`${restaurant.name} - Photo ${index + 1}`} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-photos">
                  <p>Aucune photo disponible pour ce restaurant.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;