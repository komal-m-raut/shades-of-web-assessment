'use client';

import { Card } from '@/components/ui/card';
import { Community } from '@/types/community';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/communities')
      .then((response) => {
        setCommunities(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching communities:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="flex flex-col items-center min-h-dvh pt-5">
      <h2 className="font-semibold text-[28px]/[51.07px] text-[#887C68] mb-[70px]">
        Communities we manage
      </h2>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community) => (
            <div key={community.ID} className="group">
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 max-w-[391px]">
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={community.image_url}
                    alt={community.post_title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 bg-white">
                  <p className="text-[15px] leading-relaxed text-gray-600 mb-6 h-[120px] overflow-hidden">
                    {community.post_excerpt}
                  </p>

                  <h3 className="text-xl font-medium text-olive-800 pt-2">
                    {community.post_name}
                  </h3>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
