import translations from "./translations.json"

export type Language = "pt-BR" | keyof typeof translations

export function translate(language: Language, text: string): string {
  if (language === "pt-BR") return text
  return (translations[language] as Record<string, string>)[text] ?? text
}
