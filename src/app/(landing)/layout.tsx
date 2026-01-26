import Footer from "@/components/landing/footer";
import AppNavigationBar from "@/components/ui/navigation-bar/app-navigation-bar";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <AppNavigationBar isAppNav={false} />
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
