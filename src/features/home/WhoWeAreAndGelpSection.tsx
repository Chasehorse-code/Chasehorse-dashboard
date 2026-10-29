import React from 'react';
import { WhoWeAre } from './WhoWeAre';
import { WhyGelp } from './WhyGelp';

export { WhoWeAre } from './WhoWeAre';
export { WhyGelp } from './WhyGelp';

export const WhoWeAreAndGelpSection: React.FC = () => {
  return (
    <>
      <WhoWeAre />
      <WhyGelp />
    </>
  );
};

export default WhoWeAreAndGelpSection;
