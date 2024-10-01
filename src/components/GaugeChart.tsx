import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function GaugeChart({ value }: { value: number }) {
 
  return (
    <div>
      <Gauge
        valueMin={0}
        valueMax={12}
        width={250}
        height={150}
        value={value}
        startAngle={-90}
        endAngle={90}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 60,
            transform: "translate(0px, -15px)",
          },
          [`& .${gaugeClasses.valueText} text`]: {
            fill: "gray",
            dominantBaseline: "central",
            textAnchor: "middle",
          },
        }}
        innerRadius="80%"
        outerRadius="100%"
      />
    </div>
  );
  
}
