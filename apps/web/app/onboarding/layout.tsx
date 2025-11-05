import Navbar from "components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar hasPageLinks={false} />
      <main>{children}</main>
    </>
  );
}
