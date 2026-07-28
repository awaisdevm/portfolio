import { getLocaleServer, getTranslationServer } from "@/i18n/i18n-server";
import Link from "next/link";
import { getLocalizedPath } from "@/lib/utils"; // 👈 Dynamic routing utility

const notFoundStyles = {
  container: "container-page flex min-h-[60vh] flex-col items-center justify-center text-center",
  eyebrow: "eyebrow",
  title: "mt-4 font-display text-3xl font-semibold sm:text-4xl",
  description: "mt-3 max-w-sm text-muted",
  homeButton: "btn-primary mt-8 min-h-[44px]",
};

export default async function NotFound() {
  const locale = await getLocaleServer();
  const translate = await  getTranslationServer(locale); // 👈 Correct descriptive naming

  // 1. Resolve active dynamic home path instead of hardcoding '/'
  const homePath = getLocalizedPath("/", locale);

  return (
    <section className={notFoundStyles.container}>
      <p className={notFoundStyles.eyebrow}>
        {translate("notfound.eyebrow")}
      </p>

      <h1 className={notFoundStyles.title}>
        {translate("notfound.title")}
      </h1>

      <p className={notFoundStyles.description}>
        {translate("notfound.desc")}
      </p>

      <Link href={homePath} className={notFoundStyles.homeButton}>
        {translate("notfound.button")}
      </Link>
    </section>
  );
}