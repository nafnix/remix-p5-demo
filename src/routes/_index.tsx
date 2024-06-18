import type { MetaFunction } from "@remix-run/node"
// https://github.com/remix-run/remix/discussions/8877
import { ClientOnly } from "remix-utils/client-only"

// import WTF from "~/utils/wtf.client"
import P5 from "~/utils/.client/p5"

// import * as p5 from "p5"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  return (
    <ClientOnly>{() => <P5 />}</ClientOnly>
  )
}
