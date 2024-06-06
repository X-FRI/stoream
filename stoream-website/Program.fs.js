import { createElement } from "react";
import React from "react";
import { createObj } from "./fable_modules/fable-library-js.4.18.0/Util.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/./Interop.fs.js";
import { ofArray } from "./fable_modules/fable-library-js.4.18.0/List.js";
import { createRoot } from "react-dom/client";

export function Title() {
    let elems_2, elems_1, elems;
    return createElement("section", createObj(ofArray([["className", "container is-primary"], (elems_2 = [createElement("div", createObj(ofArray([["className", "hero-body"], (elems_1 = [createElement("div", createObj(ofArray([["className", "content"], (elems = [createElement("h1", {
        className: "title block",
        children: "Stoream",
    }), createElement("p", {
        children: ["Minimalist self-hosted network disk system"],
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])));
}

export function App() {
    let elems_1, elems;
    return createElement("div", createObj(ofArray([["className", "fixed-grid has-1-cols mt-6 ml-6"], (elems_1 = [createElement("div", createObj(ofArray([["className", "grid"], (elems = [createElement(Title, null)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])));
}

createRoot(document.getElementById("root")).render(createElement(App, null));

