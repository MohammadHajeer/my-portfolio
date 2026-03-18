import Navbar from "@/components/navbar";
import { getDictionary } from "@/lib/dictionaries";

export default async function Header({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const {
    Navigation,
    Nav: { hireMe },
  } = await getDictionary(lang);
  return <Navbar links={Navigation} lang={lang} hireMe={hireMe} />;
}
