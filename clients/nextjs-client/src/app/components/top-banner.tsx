import { UserButton } from "@clerk/nextjs";

type TopBannerProps = {
  title?: string;
};

const defaultTitle = "Gate";

export default function TopBanner({ title }: TopBannerProps) {
  return (
    <div className="bg-white text-black py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold mb-4">{title || defaultTitle}</h1>
      <UserButton />
    </div>
  );
}
