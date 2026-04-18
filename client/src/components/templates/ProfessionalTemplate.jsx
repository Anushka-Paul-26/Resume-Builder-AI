import { Mail, Phone, MapPin } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor = "#0A1F44" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-900 border border-gray-200 shadow-lg rounded-lg overflow-hidden">

      {/* Header */}
      <div className="bg-[#0A1F44] p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Name + Profession */}
        <div>
          <h1 className="text-4xl font-bold text-white">{data.personal_info?.full_name || "Your Name"}</h1>
          <p className="uppercase text-sm font-medium text-white/80 mt-1">{data.personal_info?.profession || "Profession"}</p>

          {/* Contact */}
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-white/90">
            {data.personal_info?.email && (
              <span className="flex items-center gap-1">
                <Mail size={14} className="text-white" /> {data.personal_info.email}
              </span>
            )}
            {data.personal_info?.phone && (
              <span className="flex items-center gap-1">
                <Phone size={14} className="text-white" /> {data.personal_info.phone}
              </span>
            )}
            {data.personal_info?.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-white" /> {data.personal_info.location}
              </span>
            )}
          </div>
        </div>

        {/* Profile Image */}
        {data.personal_info?.image && (
          <img
            src={
              typeof data.personal_info.image === "string"
                ? data.personal_info.image
                : URL.createObjectURL(data.personal_info.image)
            }
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full bg-white border-2 border-white shadow"
          />
        )}
      </div>

      {/* Main Content */}
      <div className="md:flex">

        {/* Sidebar */}
        <aside className="md:w-1/3 bg-gray-50 p-6 border-r border-gray-200 space-y-6">
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-3" style={{ color: accentColor }}>SKILLS</h2>
              <ul className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <li key={i} className="bg-white px-2 py-1 rounded shadow text-xs">{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Sections */}
        <main className="md:w-2/3 p-6 space-y-6">
          {/* Professional Summary */}
          {data.professional_summary && (
            <section className="p-4 bg-gray-50 rounded shadow-sm">
              <h2 className="text-sm font-bold mb-2" style={{ color: accentColor }}>PROFESSIONAL SUMMARY</h2>
              <p className="text-gray-800 leading-relaxed">{data.professional_summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-sm font-bold mb-2" style={{ color: accentColor }}>EXPERIENCE</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded shadow-sm">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-xs text-gray-500 mb-1">{exp.company} | {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                  {exp.description && <p className="text-sm text-gray-800">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold mb-2" style={{ color: accentColor }}>EDUCATION</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded shadow-sm">
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{formatDate(edu.graduation_date)}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold mb-2" style={{ color: accentColor }}>PROJECTS</h2>
              {data.project.map((proj, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded shadow-sm">
                  <h3 className="font-medium">{proj.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{proj.type}</p>
                  {proj.description && <p className="text-sm text-gray-800">{proj.description}</p>}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
