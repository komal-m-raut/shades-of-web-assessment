'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Community } from '@/types/community';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const SkeletonCard = () => (
  <div>
    <Card className="overflow-hidden border-none rounded-none shadow-[17px_12px_60px_0px_#00000040] transition-shadow duration-300 w-[320px] md:w-[391px] flex flex-col h-full">
      <div className="relative h-[250px] md:h-[292px] w-full overflow-hidden">
        <Skeleton className="h-[250px] md:h-[292px] w-full overflow-hidden" />
      </div>
      <div className="px-6 py-8 flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="bg-[#F8F8F8] p-6">
        <h3 className="font-normal text-[#887C68] text-[22px]/[30px]">
          <Skeleton className="h-4 w-1/2" />
        </h3>
      </div>
    </Card>
  </div>
);

const Home = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <section className="flex flex-col items-center min-h-dvh p-5">
      <h2 className="font-semibold text-[28px]/[51.07px] text-[#887C68] mb-[70px] text-center">
        Communities we manage
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array(6)
              .fill(null)
              .map((_, index) => <SkeletonCard key={index} />)
          : communities.map((community) => (
              <div key={community.ID}>
                <Card className="overflow-hidden border-none rounded-none shadow-[17px_12px_60px_0px_#00000040] transition-shadow duration-300 max-w-[320px] md:max-w-[391px] flex flex-col h-full">
                  <div className="relative h-[250px] md:h-[292px] w-full overflow-hidden">
                    <Image
                      src={community.image_url}
                      alt={community.post_title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-6 py-8 flex-grow">
                    <p className="font-normal text-[#887C68] text-base">
                      {community.post_excerpt}
                    </p>
                  </div>
                  <div className="bg-[#F8F8F8] p-6">
                    <h3 className="font-normal text-[#887C68] text-[22px]/[30px]">
                      {community.post_name}
                    </h3>
                  </div>
                </Card>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Home;
