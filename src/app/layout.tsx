import type { Metadata, Viewport } from "next";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Aquatech CRM — Innovación Hidráulica",
  description: "Sistema de gestión y seguimiento de proyectos en campo para Aquatech Loja",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aquatech CRM",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/custom-sw.js', { scope: '/' })
                    .then(function(reg) {
                      console.log('[App] SW registered, scope:', reg.scope);
                      // Check for updates every 30 minutes
                      setInterval(function() { reg.update(); }, 30 * 60 * 1000);
                    })
                    .catch(function(err) {
                      console.error('[App] SW registration failed:', err);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
