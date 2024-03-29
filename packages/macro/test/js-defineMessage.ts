import { TestCase } from "./index"

const cases: TestCase[] = [
  {
    name: "should expand macros in message property",
    input: `
        import { defineMessage, plural, arg } from '@lingui/macro';
        const message = defineMessage({
          comment: "Description",
          message: plural(arg("value"), { one: "book", other: "books" })
        })
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const message =
          /*i18n*/
          {
            comment: "Description",
            id: "{value, plural, one {book} other {books}}"
          };
    `,
  },
  {
    name: "should left string message intact",
    input: `
        import { defineMessage } from '@lingui/macro';
        const message = defineMessage({
          message: "Message"
        })
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const message =
          /*i18n*/
          {
            id: "Message"
          };
    `,
  },
  {
    name: "should transform template literals",
    input: `
        import { defineMessage } from '@lingui/macro';
        const message = defineMessage({
          message: \`Message \${name}\`
        })
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const message =
          /*i18n*/
          {
            id: "Message {name}",
            values: {
              name: name
            }
          };
    `,
  },
  {
    name: "should preserve custom id",
    input: `
        import { defineMessage } from '@lingui/macro';
        const message = defineMessage({
          id: "msg.id",
          message: "Message"
        })
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const message =
          /*i18n*/
          {
            id: "msg.id",
            message: "Message"
          };
    `,
  },
  {
    name: "Production - only essential props are kept, without id",
    production: true,
    input: `
        import { defineMessage } from '@lingui/macro';
        const msg = defineMessage({
            message: \`Hello $\{name\}\`,
            comment: 'description for translators',
            context: 'My Context',
        })
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const msg =
          /*i18n*/
          {
            id: 'Hello {name}',
            context: 'My Context',
            values: {
              name: name,
            },
         };
    `,
  },
  {
    name: "Production - only essential props are kept",
    production: true,
    input: `
        import { defineMessage } from '@lingui/macro';
        const msg = defineMessage({
            message: \`Hello $\{name\}\`,
            id: 'msgId',
            comment: 'description for translators',
            context: 'My Context',
        })
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const msg =
          /*i18n*/
          {
            id: 'msgId',
            context: 'My Context',
            values: {
              name: name,
            },
         };
    `,
  },
  {
    name: "should preserve values",
    input: `
        import { defineMessage } from '@lingui/macro';
        const message = defineMessage({
          message: t\`Hello $\{name\}\`
        })
    `,
    expected: `
        import { i18n } from "@lingui/core";
        const message =
          /*i18n*/
          {
            id: "Hello {name}",
            values: {
              name: name
            }
          };
    `,
  },
]

export default cases
