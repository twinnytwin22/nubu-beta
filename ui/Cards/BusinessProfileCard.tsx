'use client'
import { useEntityImagePath } from '@/lib/site/constants';
import Link from 'next/link';
import React from 'react';
import { formatTelephone } from '@/lib/hooks/formatTelephone';

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


export const BizCard = ({ entity }) => {
  console.log(entity);
const image = useEntityImagePath(entity?.image_url)
const telephoneNumber = formatTelephone(entity?.telephone) 
  return entity && image && telephoneNumber && (
    <div className="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
      <div className="bg-white dark:bg-zinc-950 shadow-xl border border-zinc-100 dark:border-zinc-800 rounded-lg overflow-hidden">
        <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${image})` }}>
          <div className="flex justify-end">
            <svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
            </svg>
          </div>
        </div>
        <Link href={`/entity/${entity?.id}`}>
        <div className="p-4">
          <p className="text-3xl text-zinc-900 dark:text-zinc-100 capitalize">{entity.title}</p>
          <p className="text-zinc-700 dark:text-zinc-200">{entity.address_1}&nbsp;{entity.address_2 && entity.address_2}</p>
        </div>
        </Link>
        <div className="flex p-4 border-t border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
          <div className="flex-1 inline-flex items-center">
            <Link href={`https://${entity?.website}`}>
            <p>{entity?.website}</p>
            </Link>
          </div>
          <div className="flex-1 inline-flex items-center gap-1">
            {entity.industries.slice(0,2).map((industry: any) => (
            <p className='text-xs bg-zinc-200 dark:bg-zinc-700 p-2.5 px-3 rounded-full text-black dark:text-white'>{industry}</p>))}
          </div>
        </div>
        <div className="px-4 pt-3 pb-4 border-t border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
          <div className="text-xs uppercase font-bold text-zinc-600 dark:text-zinc-300 tracking-wide">Contact</div>
          <div className="flex items-center pt-2">
            <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)" }}>
            </div>
            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-100">Tiffany Heffner</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{telephoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};