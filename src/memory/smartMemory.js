export function shouldRemember(text) {
  const patterns = [
    "ich heiße",
    "mein name ist",
    "mein hund heißt",
    "meine katze heißt",
    "mein lieblingsauto",
    "mein lieblingsessen",
    "ich wohne",
    "ich arbeite",
    "meine firma",
    "venom cars agency",
    "ich liebe",
    "ich mag",
    "mein geburtstag",
    "mein auto",
  ];

  return patterns.some((p) =>
    text.toLowerCase().includes(p)
  );
}