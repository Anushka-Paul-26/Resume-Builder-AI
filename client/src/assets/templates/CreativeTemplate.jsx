import { Mail, Phone, MapPin } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 text-zinc-900 p-6 rounded-lg">
      {/* Header */}
      <header className="flex items-center gap-6 mb-6">
        {data.personal_info?.image && (
          <img
            src={
              typeof data.personal_info.image === "string"
                ? data.personal_info.image
                : URL.createObjectURL(data.personal_info.image)
            }
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border-4 border-white"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{data.personal_info?.full_name || "Your Name"}</h1>
          <p className="uppercase text-sm font-semibold">{data.personal_info?.profession || "Profession"}</p>
        </div>
      </header>

      {/* Contact */}
      <section className="mb-6">
        <h2 className="text-sm font-bold tracking-widest mb-2">CONTACT</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} style={{ color: accentColor }} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail size={14} style={{ color: accentColor }} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} style={{ color: accentColor }} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
        </div>
      </section>

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold tracking-widest mb-2">EXPERIENCE</h2>
          <div className="space-y-4 text-sm">
            {data.experience.map((exp, i) => (
              <div key={i} className="bg-white p-3 rounded shadow">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-xs" style={{ color: accentColor }}>
                  {exp.company} | {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </p>
                {exp.description && <p className="mt-1 text-zinc-800">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section>
          <h2 className="text-sm font-bold tracking-widest mb-2">PROJECTS</h2>
          <div className="space-y-3 text-sm">
            {data.project.map((proj, i) => (
              <div key={i} className="bg-white p-3 rounded shadow">
                <h3 className="font-medium">{proj.name}</h3>
                <p className="text-xs" style={{ color: accentColor }}>{proj.type}</p>
                {proj.description && <p className="text-zinc-800">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CreativeTemplate;
