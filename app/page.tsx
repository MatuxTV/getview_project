import { Hero } from "@/components/ui/hero";

export default async function Home({ searchParams }: { 
  searchParams: Promise<{ error?: string }> 
}) {
  const params = await searchParams;
  
  return (
    <Hero showAuthError={params.error === 'authentication-required'} />
  );
}
