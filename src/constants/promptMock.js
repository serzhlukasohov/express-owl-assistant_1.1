export const mockRoles = [
  {
    lead: "Product Management team leader",
    role: "Product Manager",
  },
  {
    lead: "Quality Engineering Lead",
    role: "Quality Engineer",
  },
  {
    lead: "Back-End team Lead",
    role: "Back-End Engineer",
  },
  {
    lead: "Front-End team Lead",
    role: "Front-End Engineer",
  },
  {
    lead: "Product design team leader",
    role: "Product Designer",
  },
];
export const promptTextMock = `act as a ${mockRoles[0].lead} of software development team and create onboarding document for ${mockRoles[0].role} according to this project`;
