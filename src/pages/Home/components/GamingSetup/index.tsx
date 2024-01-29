import { Button } from '@/components/ui/button';

const GamingSetup = () => {
  return (
    <div>
      {/* Untuk mobile rubah GAMING-SETUP (gambar keyboard,monitor dll) jadi slider */}
      <section id="GAMING-SETUP" className="w-full px-4 md:px-6 xl:px-16 py-4 ">
        <div className="w-full h-[1200px] sm:h-[1800px] md:h-[600px] xl:h-[800px] ">
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 grid-flow-row md:grid-rows-2 gap-4 place-items-center justify-items-center">
            {/* Image 1 */}
            <div className="md:col-span-2 w-full h-full bg-[url('/images/landing/playgame.jpg')] bg-cover bg-center rounded-md overflow-hidden">
              <div className="w-full h-full bg-gradient-to-tl from-rose-700/30 to-sky-700/30 flex items-center justify-center">
                <div className=" w-3/4 text-white text-center flex flex-col">
                  <h1 className="text-2xl lg:text-4xl font-semibold">
                    Power Up Your Play
                  </h1>
                  <p className="text-xs font-medium  text-white/80">
                    Immerse Yourself in Unparalleled Universes!
                  </p>
                </div>
              </div>
            </div>
            {/* headphone */}
            <div className="w-full h-full flex relative bg-gradient-radial from-slate-300 to-slate-200 overflow-hidden rounded-md">
              <div className="w-full top-[50%] md:top-0 absolute -translate-y-[50%] md:translate-y-0 md:static">
                <img
                  className="object-cover scale-50 md:scale-110 md:absolute md:top-[30%] xl:top-[20%]  right-0 md:animate-up-down"
                  src="/images/landing/pc-set3.png"
                  alt="headphone-img"
                />
              </div>
            </div>
            {/* PC */}
            <div className="w-full h-full flex relative bg-gradient-radial overflow-hidden from-slate-300 to-slate-200 rounded-md">
              <div className="absolute top-[50%] -translate-y-[50%] right-0 ">
                <img
                  className="object-cover scale-50 md:scale-110"
                  src="/images/landing/pc-set1.png"
                  alt="headphone-img"
                />
              </div>
            </div>
            {/* Monitor */}
            <div className="w-full h-full flex relative bg-gradient-radial from-slate-300 to-slate-200 overflow-hidden rounded-md">
              <div className="absolute top-[50%] -translate-y-[50%] right-0  w-full">
                <img
                  className="object-cover scale-50 md:scale-100"
                  src="/images/landing/pc-set2.png"
                  alt="headphone-img"
                />
              </div>
            </div>
            {/* Image 2 */}
            <div
              id="bg-playgame"
              className="row-start-2 md:row-start-auto md:col-span-2 w-full h-full bg-[url('/images/landing/playgame2.jpg')] bg-cover bg-center rounded-md overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-tl from-rose-700/30 to-sky-700/30 flex items-center justify-center ">
                <div className=" w-3/4 text-white text-center flex flex-col">
                  <h1 className="text-2xl lg:text-4xl font-semibold">
                    Unlock the Extraordinary
                  </h1>
                  <span className="text-xs font-medium  text-white/80">
                    Dive into Your Next Gaming Obsession!
                  </span>
                </div>
              </div>
            </div>
            {/* Keyboard */}
            <div className="w-full h-full flex relative bg-gradient-radial from-slate-300 to-slate-200 overflow-hidden rounded-md">
              <div className="absolute top-[50%] -translate-y-[50%] right-0 w-full">
                <img
                  className="object-cover scale-50 md:-scale-x-100 md:scale-y-100 md:animate-ligh-on"
                  src="/images/landing/pc-set7.png"
                  alt="keyboard-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* mungkin di bawah ini bisa digunakan untuk benner GET_ALL_GAMING_SETUP  */}
      <section
        id="GET_ALL_GAMING_SETUP"
        className="w-full px-4 md:px-6 xl:px-16"
      >
        <div className="h-full w-full bg-gradient-to-r via-violet-500 from-pink-500 to-sky-500">
          <div className="w-full h-full bg-slate-700/80 flex flex-col items-center justify-center p-4"></div>
        </div>
      </section>
      {/* Di bawah ini masih bisa di improve  */}
      <section className="w-full px-4 md:px-6 xl:px-16 bg-slate-50 py-4 border-y border-input">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center ">
          {/* Headphone */}
          <div className="w-full h-[180px] bg-gradient-to-l from-slate-300 to-slate-200 rounded relative overflow-hidden shadow shadow-slate-400">
            <div>
              <img
                className="h-[300px] md:h-[320px] absolute  -top-16 -right-24 md:-right-16"
                src="/images/special-offer/pngwing.com (5).png"
                alt=""
              />
            </div>
            <div className="flex flex-col w-full h-full justify-center pl-8 ">
              <h1>HEADPHONE</h1>
              <small className="font-semibold ">
                <span className="text-red-700 ">{'50% OFF '}</span>
                FOR EVERYONE
              </small>
              <Button className="w-fit px-6 mt-5 text-lg bg-teal-700 hover:bg-teal-700/90">
                Get Now
              </Button>
            </div>
          </div>
          {/* SmartPhone */}
          <div className="w-full h-[180px] xl:h-[376px] bg-slate-900 rounded row-span-auto xl:row-span-2 relative overflow-hidden  shadow shadow-slate-400">
            <div>
              <img
                className="h-[350px] absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2  drop-shadow-md  "
                src="/images/special-offer/pngwing.com (7).png"
                alt="Apple"
              />
            </div>
            <div></div>
          </div>
          {/* PS% */}
          <div className="w-full h-[180px] bg-gradient-to-tl from-slate-400 to-slate-300 rounded relative overflow-hidden  shadow shadow-slate-400">
            <div>
              <img
                className="h-[400px] absolute -top-36 -right-16 -rotate-0 scale-y-90 -scale-x-90 drop-shadow-md  "
                src="/images/special-offer/pngwing.com (11).png"
                alt=""
              />
            </div>
            <div></div>
          </div>
          {/* Laptop */}
          <div className="w-full h-[180px] bg-gradient-to-tl from-slate-500 to-slate-600 rounded relative overflow-hidden  shadow shadow-slate-400">
            <div>
              <img
                className="h-[360px] absolute -top-44 -left-28  drop-shadow-lg rotate-3 "
                src="/images/special-offer/pngwing.com (2).png"
                alt=""
              />
            </div>
            <div></div>
          </div>
          {/* SmartWatch */}
          <div className="w-full h-[180px] bg-gradient-to-tl from-gray-700 to-gray-600 rounded relative overflow-hidden col-auto lg:col-span-2 xl:col-auto  shadow shadow-slate-400">
            <div>
              <img
                className="h-[320px] absolute -top-16 -left-16 -rotate-0 scale-y-90 -scale-x-90 drop-shadow-md  "
                src="/images/special-offer/pngwing.com (9).png"
                alt=""
              />
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamingSetup;
