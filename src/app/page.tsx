'use client';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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
        COMMUNITIES WE MANAGE
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
                    <h3 className="font-normal text-[#887C68] text-[22px]/[30px] capitalize">
                      {community.post_name}
                    </h3>
                  </div>
                </Card>
              </div>
            ))}
      </div>
      <div className="w-full mt-20">
        <h2 className="font-semibold text-[28px]/[51.07px] text-[#887C68] mb-[70px] text-center">
          OUR SERVICES
        </h2>
        <div className="w-full max-w-[250px] md:max-w-[782px] lg:max-w-[1280px] mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="px-4"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {communities.map((community) => (
                <CarouselItem
                  key={community.ID}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex justify-center">
                    <div className="relative w-[250px] h-[335px] md:w-[391px] md:h-[552px]">
                      <div
                        className="w-full h-full relative overflow-hidden"
                        style={{
                          backgroundImage: `url(${community.image_url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                          <h3 className="text-white font-semibold text-[28px]/[32px] text-center capitalize">
                            {community.post_name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Home;
