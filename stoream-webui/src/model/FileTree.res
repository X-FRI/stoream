@genType
type rec t = {
  name: string,
  sub: array<t>,
  path: string,
}

@genType
module TestData = {
  let data = {
    [
      {
        name: "Home",
        sub: [
          {
            name: "Document",
            path: "/bin/subBin",
            sub: [{name: "Books", path: "/bin/subBin", sub: []}],
          },
          {name: "Videos", sub: [], path: ""},
          {name: "Pictures", sub: [], path: ""},
          {name: "Workspace", sub: [], path: ""},
          {name: "Applications", sub: [], path: ""},
          {name: "Music", sub: [], path: ""},
          {name: "Mail", sub: [], path: ""},
        ],
        path: "",
      },
      {name: "User", sub: [], path: ""},
      {name: "Softwares", sub: [], path: ""},
    ]
  }
}
