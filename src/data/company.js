// Legal and contact information of the company behind itenorio.com.
// Shown in the footer and on the home page (required for payment providers
// such as Stripe: who we are, what we offer and how to reach us).
export const COMPANY = {
  brand: "iTenorio Tech",
  legalName: "ITENORIO TECH DESENVOLVIMENTO DE SOFTWARE LTDA",
  cnpj: "68.333.521/0001-02",
  country: "Brazil",
  founder: {
    name: "Paulo Tenório",
    role: "Founder & Managing Partner (Sócio-Administrador)",
  },
  address: {
    street: "Av. Paulista, 777, Andar 15, Conj 15, Sala 3401",
    district: "Bela Vista",
    city: "São Paulo – SP",
    postalCode: "01311-914",
    country: "Brazil",
  },
};

export const CONTACT_EMAILS = [
  {
    id: "contact",
    email: "contact@itenorio.com",
    label: "General & business inquiries",
    icon: "fas fa-building",
  },
  {
    id: "extensions",
    email: "extensions@itenorio.com",
    label: "Extension support & feedback",
    icon: "fas fa-puzzle-piece",
  },
  {
    id: "paulo",
    email: "paulo@itenorio.com",
    label: "Paulo Tenório, directly",
    icon: "fas fa-user",
  },
];

export const formatAddress = ({ street, district, city, postalCode, country }) =>
  `${street}, ${district}, ${city}, ${postalCode}, ${country}`;
