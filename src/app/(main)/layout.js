import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNavbar from '@/components/layout/MobileNavbar';


export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            <Header />
            <main className="pt-24 sm:pt-32 pb-16 md:pb-0 min-h-screen">
                {children}
            </main>
            <Footer />
            <MobileNavbar />
        </div>
    );
}