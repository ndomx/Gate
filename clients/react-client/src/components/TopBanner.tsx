type TopBannerProps = {
  userName?: string;
  sideButton: {
    label: string;
    onClick: (e: React.MouseEvent) => void | Promise<void>;
  };
};

export default function TopBanner({ userName, sideButton }: TopBannerProps) {
  return (
    <div className="bg-white text-black p-4 flex justify-end items-center">
      <div>
        <span className="mr-4">Welcome, {userName}</span>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold">
          {sideButton.label}
        </button>
      </div>
    </div>
  );
}
