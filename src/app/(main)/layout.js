import Header from '@/components/layout/Header';
import MobileNavbar from '@/components/layout/MobileNavbar';


export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            <Header />
            <main className="pt-24 sm:pt-32 pb-16 md:pb-0">
                {children}
            </main>
            <MobileNavbar />
            {/* <Footer /> */}
        </div>
    );
}