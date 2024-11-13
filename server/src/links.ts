const linksInterface = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "number" },
      link: { type: "string" },
      code: { type: "string" },
    },
    required: ["id", "link", "code"],
  },
};

type Link = {
  id: number;
  link: string;
  code: string;
};

let links: Link[] = [];

export { links };
