import Image from "next/image";

import Header from "@/components/Header";

export default function HowItWorks() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <Image
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
          alt="Logo"
          className="object-cover w-40 h-40 mb-8 rounded-full"
          width={300}
          height={300}
        />
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg mb-8 px-4 md:px-0">
          We&lsquo;re working hard to bring you something awesome. Stay tuned!
        </p>
      </div>
    </>
  );
}
