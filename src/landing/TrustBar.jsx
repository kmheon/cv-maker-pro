export default function TrustBar() {
  const items = [
    "Free PDF Downloads",
    "No Watermarks",
    "Unlimited Editing",
    "No Hidden Paywalls",
  ];

  return (
    <section className="border-y bg-white py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-6">
        {items.map((item) => (
          <div
            key={item}
            className="font-semibold text-slate-700"
          >
            ✓ {item}
          </div>
        ))}
      </div>
    </section>
  );
}