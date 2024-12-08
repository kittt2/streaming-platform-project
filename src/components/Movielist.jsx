import React from "react";
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { moviecardurl } from "@/utils/Constant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Link } from "react-router-dom";
import { SkeletonDemo } from "./Skeletonui";

function Movielist({ title, movies }) {
  
  return (
    <>
      {movies ? (
        <Carousel className="relative  w-full max-w-5xl mx-auto">
          <div className="text-white py-2 pl-4 uppercase  font-bold  font-custom text-2xl   ">
            {title}
          </div>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 border-2 text-white bg-gray-900 bg-opacity-60 p-2 rounded-full cursor-pointer hover:bg-opacity-75" />
          <CarouselContent className="">
            {movies?.length>0 ? movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/3 sm:1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="p-2">
                  <Link to={`/movie/${movie.id}`}>
                    <Card className="w-full">
                      <CardContent className="flex aspect-w-16 aspect-h-9 m-0 p-0 rounded-xl">
                        <img
                          src={moviecardurl + movie.poster_path}
                          className="h-full w-full rounded-xl object-cover"
                          alt={movie.title}
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
              
            )):<div className="text-center w-full" >
            <h1 className="text-center text-white">loading...</h1>
            </div>}
          </CarouselContent>
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75" />
        </Carousel>
      ) : (
        <SkeletonDemo count={5} />
      )}
    </>
  );
}

export default memo(Movielist)
