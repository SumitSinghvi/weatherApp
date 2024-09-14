import Card from "./Card";
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
    <Carousel>
      <CarouselContent>
        {data.map((item: { hr: string; temp: number }) => (
          <CarouselItem className="basis-1/3" key={item.hr}>
            <Card day={item.hr} temp={item.temp} icon="./Sun.svg" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
