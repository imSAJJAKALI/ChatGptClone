// import React from 'react'
// import "./Homepage.css"

// export const Homepage = () => {
//   return (
//     <div >
//         <img
//         src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
//         alt=""
//         className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
//       />
//        <div className='Box'>
//          <div className='Box1'>
//             <h1>Ace your next InterView</h1>
//             <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Cairo&weight=700&size=23&pause=1000&width=435&lines=+Elevating+Your+Interview+Skills+Efficiently.;Personalized+Practice;Progress+Tracking;Virtual+Interview+Practice" alt="Typing SVG" /></a>
//             <h3>Improve your communication and technical skills with private, realtime, <br /> and judgement free speech coaching on your online meetings - powered by AI </h3>
//             <button>Let's Start</button>
//          </div>
//          <div className='Box2'>
//             <img src="" alt="" />
//          </div>
//        </div>
//         {/* <div className='Tech'>
//             <h1>Interview preparation playbooks</h1>
//             <a href=""> <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--HSN807E8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c09kxheisxgq76e0syk1.jpg"/>
//  </a>
//  <a href=""> <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--HSN807E8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c09kxheisxgq76e0syk1.jpg"/>
//  </a>
//  <a href=""> <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--HSN807E8--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c09kxheisxgq76e0syk1.jpg"/>
//  </a>
//         </div> */}
//     </div>
//   )
// }

export default function Homepage() {
    return (
      <div className="bg-black" >
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-10 lg:px-8">
          <div className="relative isolate overflow-hidden bg-teal-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Boost your productivity.
                <br />
                Start using our app today.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              <h1>Ace your next InterView</h1>
              <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Cairo&weight=700&size=23&pause=1000&width=435&lines=+Elevating+Your+Interview+Skills+Efficiently.;Personalized+Practice;Progress+Tracking;Virtual+Interview+Practice" alt="Typing SVG" /></a>
              </p>
             
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
                <a href="https://www.indeed.com/hire/c/info/best-practices-for-virtual-interviews" className="text-sm font-semibold leading-6 text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="absolute left-0 top-0 w-[35rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://i.gifer.com/Ry6p.gif"
                alt="App screenshot"
                
                // height={1080} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  