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
  data: { hr: string; temp: number, icon: string }[];
}) {
  return (
    <div className="md:w-full md:p-5">
      <Carousel >
        <CarouselContent className="w-60">
          {data.map((item: { hr: string; temp: number, icon: string }) => (
            <CarouselItem className="basis-1/7" key={item.hr}>
              <Card day={item.hr} temp={item.temp} icon={item.icon} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block"/>
        <CarouselNext className="hidden md:block"/>
      </Carousel>
    </div>
  );
}
