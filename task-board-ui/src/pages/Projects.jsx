export default function Projects() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Projects
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {[1,2,3].map((item) => (
          <div key={item} className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-bold text-lg">Project {item}</h3>
            <p className="text-slate-500 mt-2">
              Modern task workflow management project.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}