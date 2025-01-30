import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { League_Spartan, Silkscreen } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
});

export const silkScreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const metadata = {
  title: "Agri Advisor",
  description: "Get the best suggestions based on the conditions",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${leagueSpartan.className} antialiased bg-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <main>{children}</main>
                <Footer />
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
