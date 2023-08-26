import React from 'react';

interface BusinessProfile {
  id: string;
  title: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postal_code: string;
  description: string;
}

interface BusinessProfilesTableProps {
  profile: BusinessProfile;
}

const BusinessProfileCard: React.FC<BusinessProfilesTableProps> = ({ profile }) => {
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg border mx-auto w-full p-2.5">
      <table className="w-full border-collapse p-4">
        <thead>
          <tr className='text-xs text-left'>
            <th>Title</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className='text-xs'>
            <tr key={profile.id}>
              <td>{profile.title}</td>
              <td>{profile.address_1}<br />{profile.address_2}</td>
              <td>{profile.city}</td>
              <td>{profile.state}</td>
              <td>{profile.postal_code}</td>
              <td>{profile.description}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BusinessProfileCard;
