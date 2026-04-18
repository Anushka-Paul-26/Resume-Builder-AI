import React from 'react'

const Features = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section id="features" className="py-32 px-4">
        <h1 className="text-3xl font-semibold text-center mx-auto">
          Build your resume
        </h1>

        <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
          Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered features.
        </p>

        <div className="flex items-center justify-center flex-wrap gap-8 mt-20">

          {/* Card 1 */}
          <div className="group cursor-pointer flex flex-col text-center items-center justify-center rounded-2xl p-8 border border-violet-200 gap-6 max-w-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-200/40">
            <div className="p-6 aspect-square bg-violet-100 rounded-full transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5"
                  stroke="#7F22FE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                AI Resume Insights
              </h3>
              <p className="text-sm text-slate-600">
                Get smart suggestions, keyword analysis, and resume scoring powered by AI.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer flex flex-col text-center items-center justify-center rounded-2xl p-8 border border-green-200 gap-6 max-w-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-200/40">
            <div className="p-6 aspect-square bg-green-100 rounded-full transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7"
                  stroke="#00A63E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                ATS-Optimized & Secure
              </h3>
              <p className="text-sm text-slate-600">
                Built to pass ATS systems while keeping your data private and protected.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group cursor-pointer flex flex-col text-center items-center justify-center rounded-2xl p-8 border border-orange-200 gap-6 max-w-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-200/40">
            <div className="p-6 aspect-square bg-orange-100 rounded-full transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667"
                  stroke="#F54900"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5"
                  stroke="#F54900"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                One-Click Export
              </h3>
              <p className="text-sm text-slate-600">
                Download polished resumes instantly in PDF or DOC format.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Features
