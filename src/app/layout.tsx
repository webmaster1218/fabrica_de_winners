import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalAppContent from "@/components/conditional-app-content";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fabricadewinners.com'),
  title: "Fábrica de Winners | Tecnología y Estrategia para Escalar Negocios",
  description: "En Fábrica de Winners creamos tecnología, sistemas y estrategias para construir negocios que escalan sin límites. Automatización, inteligencia artificial y crecimiento digital.",
  alternates: {
    canonical: "https://fabricadewinners.com/",
  },
  openGraph: {
    title: "Fábrica de Winners | Tecnología y Estrategia para Escalar Negocios",
    description: "Creamos tecnología, sistemas y estrategias para construir negocios que escalan sin límites.",
    url: "https://fabricadewinners.com/",
    siteName: "Fábrica de Winners",
    images: [{
      url: "/images/og-fabrica-winners.png",
      width: 1200,
      height: 630,
      alt: "Fábrica de Winners",
    }],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fábrica de Winners | Tecnología y Estrategia",
    description: "Creamos tecnología y estrategias para negocios que escalan.",
    images: ["/images/og-fabrica-winners.png"],
  },
  icons: {
    icon: "/images/icono-fabrica-winners.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isStaging = process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('fabricadewinners.com');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fabrica de Winners",
    "url": "https://fabricadewinners.com",
    "logo": "https://fabricadewinners.com/images/icono-fabrica-winners.png",
    "description": "Agencia digital especializada en Inteligencia Artificial, Marketing Digital y Desarrollo Web en Colombia.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Medellin",
      "addressCountry": "CO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-324-488-7171",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    }
  };

  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        {isStaging && <meta name="robots" content="noindex, nofollow" />}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <ConditionalAppContent>
          {children}
        </ConditionalAppContent>
      </body>
    </html>
  );
}
