import React from 'react';

interface DashboardDatasetCardProps {
  title: string;
  description: string;
  image: string;
}

const DashboardDatasetCard: React.FC<DashboardDatasetCardProps> = ({ title, description, image }) => {
  return (
    <div className="dataset-card">
      <img src={image} alt={title} className="dataset-card-image" />
      <div className="dataset-card-content">
        <h2 className="dataset-card-title">{title}</h2>
        <p className="dataset-card-description">{description}</p>
      </div>
    </div>
  );
};

export default DashboardDatasetCard;
