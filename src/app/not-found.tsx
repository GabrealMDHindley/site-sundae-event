import Image from "next/image";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-6 py-24">
      <a href="/" aria-label="Sundae — back to the event page">
        <Image src="/brand/sundae-wordmark-red.svg" alt="Sundae" width={99} height={28} priority className="h-[28px] w-auto" />
      </a>
      <p className="eyebrow mt-14">Page not found</p>
      <h1 className="display mt-4 border-l-[6px] border-[#DB3D55] pl-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.2]">This page could not be found.</h1>
      <p className="mt-6 text-lg leading-relaxed">The Private Dinner &amp; Dialogue page is one click away.</p>
      <a href="/" className="btn btn-primary mt-9">Go to the event page →</a>
    </main>
  );
}
