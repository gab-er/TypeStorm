import challenges from "@/lib/challenges";

export default async function sitemap() {
  const challengeEntries = challenges.map((challenge, index) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/challenges/${index}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/challenges`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/history`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/yourprofile`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/challenges`,
    },
    ...challengeEntries,
  ];
}
