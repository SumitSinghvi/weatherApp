// // export default function GaugeChart({value = 20}) {
// //   return (
// //     <div>
// //       <div class="relative">
// //         <div
// //           class="h-24 w-44
// //             rounded-t-full border-b-0 border-[10px]"
// //         ></div>
// //         <div className="absolute
// //          rounded-t-full
// //           translate-y-[-50%]
// //            border-[28px]
// //            top-1/2
// //            border-red-400
// //             h-24 w-44 border-b-0">
// //         </div>
// //         <p className="absolute text-5xl translate-x-[-50%] top-[4.5rem] translate-y-[-50%] left-[50%]">{value}</p>
// //       </div>
// //     </div>
// //   );
// // }

// import React from "react";

// const GaugeChart = ({ value }) => {
//   // Ensure value is within the range of 0 to 100
//   const cappedValue = Math.min(100, Math.max(0, value));

//   // Convert value (percentage) to degrees for the border arc (half-circle is 180 degrees)
//   const degrees = (cappedValue / 100) * 180;

//   return (
//     <div>
//       <div className="relative">
//         {/* Outer Circle Container */}
//         <div
//           className="h-24 w-44
//             rounded-t-full border-b-0 border-[10px] border-gray-200"
//         ></div>

//         {/* Red Gauge Arc */}
//         <div
//           className="absolute
//             rounded-t-full
//             translate-y-[-50%]
//             top-1/2
//             border-red-200
//             h-24 w-44 border-b-0
//             border-[24px]"
//         ></div>

//         {/* Value Display */}
//         <p className="absolute text-5xl translate-x-[-50%] top-[4.5rem] translate-y-[-50%] left-[50%]">
//           {cappedValue}
//         </p>
//       </div>
//     </div>
//   );
// };

// const GaugeChart({ value }: { value: number }) {
//   const min = 0;
//   const max = 100;
//   const percentage = ((value - min) / (max - min)) * 100;
//   const clampedPercentage = Math.min(100, Math.max(0, percentage));
//   const rotation = (clampedPercentage / 100) * 180;

//   return (
//     <div
//     className="w-[250px] h-24 relative border-gray-200 border-[10px] border-b-0"
//     style={{ borderRadius: "250px 250px 0 0" }}
//     >
//       <span className="absolute bottom-0 left-[50%] translate-x-[-50%] text-5xl">
//         {value}
//       </span>
//     </div>
//   );
// }

// export default GaugeChart;

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
