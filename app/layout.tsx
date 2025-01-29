import ConvexClerkProvider from "@/components/providers/ConvexClerkkProvider";
import Navbar from "@/components/ui/Navbar";
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Agri Advisor",
  description: "Get the best suggestions based on the coniditions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${leagueSpartan.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <UserButton />
                <main>
                  {children}
                </main>
              </div>
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
            
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
