import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeComponent() {
  return (
    <div>
      <Marquee className="my-10  bg-zinc-50 h-32">
        <div className="flex flex-row items-center gap-20">
          <div className=" h-32 w-32 relative">
            <img
              className="absolute object-contain object-center h-full w-full"
              src="https://cdn.prod.website-files.com/65da5aea296bf5f2873443bc/65f186c037904519bebc7ce0_logo_asus.png"
              alt=""
            />
          </div>
          <div className=" h-32 w-32 relative">
            <img
              className="absolute object-contain  h-full w-full"
              src="https://cdn.prod.website-files.com/65da5aea296bf5f2873443bc/65f186c1bdfe41fba8d2c4f9_logo_yamaha.avif"
              alt=""
            />
          </div>
          <div className=" h-32 w-32 relative">
            <img
              className="absolute object-contain  h-full w-full"
              src="https://cdn.prod.website-files.com/65da5aea296bf5f2873443bc/65f186c071b9540ccba48612_logo_christian-louboutin.png"
              alt=""
            />
          </div>
          <div className=" h-32 w-32 relative">
            <img
              className="absolute object-contain  h-full w-full"
              src="https://cdn.prod.website-files.com/65da5aea296bf5f2873443bc/65f186c0db0d1139b05316b5_logo_colonies.png"
              alt=""
            />
          </div>
          <div className="h-32 w-32 relative">
            <img
              className="absolute object-contain  h-full w-full"
              src="https://cdn.prod.website-files.com/65da5aea296bf5f2873443bc/65f186d2fa2bcdd2b5d2158c_logo_lvmh.png"
              alt=""
            />
          </div>
        </div>
      </Marquee>
    </div>
  );
}
