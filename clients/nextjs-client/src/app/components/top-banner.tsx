import { UserButton } from "@clerk/nextjs";

export default function TopBanner() {
  return (
    <div className="bg-white text-black p-4 flex justify-end items-center">
      <UserButton />
    </div>
  );
}
