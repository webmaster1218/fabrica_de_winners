import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalAppContent from "@/components/conditional-app-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fábrica de Winners | Tecnología y Estrategia para Escalar Negocios",
  description: "En Fábrica de Winners creamos tecnología, sistemas y estrategias para construir negocios que escalan sin límites. Automatización, inteligencia artificial y crecimiento digital.",
  icons: {
    icon: "/images/icono-fabrica-winners.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevenir flash de tema - establecer tema light inmediatamente
              (function() {
                // Si no hay tema guardado, usar light por defecto
                const savedTheme = localStorage.getItem('marcos-chat-theme');
                const theme = savedTheme || 'light';

                // Aplicar tema inmediatamente antes de que la página renderice
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConditionalAppContent>
          {children}
        </ConditionalAppContent>
      </body>
    </html>
  );
}
