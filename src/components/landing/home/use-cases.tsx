function UseCasesSection() {
  const useCases = ["Agencies", "Consultants", "Freelancers", "Contractors"];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Built for service businesses
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {useCases.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
