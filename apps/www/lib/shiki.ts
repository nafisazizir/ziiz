import type { RehypeCodeOptions } from "fumadocs-core/mdx-plugins"

export const ziizShikiTheme = {
  name: "ziiz",
  type: "dark" as const,
  colors: {
    "editor.foreground": "var(--shiki-color-text, inherit)",
    "editor.background": "var(--shiki-color-background, transparent)",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "var(--shiki-token-comment)" },
    },
    {
      scope: [
        "constant",
        "entity.name.constant",
        "variable.other.constant",
        "variable.other.enummember",
        "variable.language",
        "entity",
      ],
      settings: { foreground: "var(--shiki-token-constant)" },
    },
    {
      scope: ["entity.name", "meta.export.default", "meta.definition.variable"],
      settings: { foreground: "var(--shiki-token-function)" },
    },
    {
      scope: [
        "variable.parameter.function",
        "meta.jsx.children",
        "meta.block",
        "meta.tag.attributes",
        "entity.name.section",
        "text",
        "punctuation.definition.tag",
        "punctuation.separator.inheritance.php",
        "punctuation.definition.tag.html",
        "punctuation.definition.tag.begin.html",
        "punctuation.definition.tag.end.html",
        "punctuation.section.embedded",
        "variable.parameter",
      ],
      settings: { foreground: "var(--shiki-token-parameter)" },
    },
    {
      scope: ["entity.name.tag", "support.class.component"],
      settings: { foreground: "var(--shiki-token-function)" },
    },
    {
      scope: "keyword",
      settings: { foreground: "var(--shiki-token-keyword)" },
    },
    {
      scope: ["storage", "storage.type", "storage.modifier"],
      settings: { foreground: "var(--shiki-token-keyword)" },
    },
    {
      scope: [
        "string",
        "string punctuation.section.embedded source",
        "attribute.value",
      ],
      settings: { foreground: "var(--shiki-token-string)" },
    },
    {
      scope: [
        "punctuation",
        "punctuation.definition.string",
        "punctuation.definition.variable",
        "punctuation.definition.string.begin",
        "punctuation.definition.string.end",
        "punctuation.section.embedded.begin",
        "punctuation.section.embedded.end",
      ],
      settings: { foreground: "var(--shiki-token-punctuation)" },
    },
    {
      scope: "string.regexp",
      settings: { foreground: "var(--shiki-token-string-expression)" },
    },
    {
      scope: [
        "support.function",
        "entity.name.function",
        "meta.function-call.generic",
      ],
      settings: { foreground: "var(--shiki-token-function)" },
    },
    {
      scope: "markup.underline.link",
      settings: { foreground: "var(--shiki-token-link)" },
    },
    {
      scope: [
        "markup.list",
        "string.other.link.title.markdown",
        "string.other.link.description.markdown",
      ],
      settings: { foreground: "var(--shiki-token-parameter)" },
    },
  ],
}

export const shikiConfig = {
  themes: {
    light: ziizShikiTheme,
    dark: ziizShikiTheme,
  },
  defaultColor: "light",
} satisfies RehypeCodeOptions
