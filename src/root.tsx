import type { LinksFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react"
import reset from "@unocss/reset/tailwind.css?url"
import styles from "./styles.css?url"
import "virtual:uno.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: reset },
    { rel: "stylesheet", href: styles },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full w-full overflow-hidden">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="absolute left-1/2 top-5/10 flex flex-col transform-translate-x--1/2 transform-translate-y--7/10 items-center space-y-2">
        {error.status}
        <br />
        {error.statusText}
        <br />
        {error.data}
      </div>
    )
  }
  else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }
  else {
    return <div><h1>Unknown Error</h1></div>
  }
}

export default function App() {
  return <Outlet />
}
