import Card from "./Cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function TodayWeatherCarousel({
  data,
}: {
  data: { hr: string; temp: number }[];
}) {
  return (
    <div className="md:w-3/4 md:p-5">
      <Carousel>
        <CarouselContent>
          {data.map((item: { hr: string; temp: number }) => (
            <CarouselItem className="basis-1/3" key={item.hr}>
              <Card day={item.hr} temp={item.temp} icon="./Sun.svg" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block"/>
        <CarouselNext className="hidden md:block"/>
      </Carousel>
    </div>
  );
}
